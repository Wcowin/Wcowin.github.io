---
title: 数字签名与认证协议
date: 2026-09-23
tags:
  - 密码学
---

# 第6章 数字签名与认证协议

[第4章 非对称密码](Asymmetriccryptography.md)讲了公钥如何加密，[第5章 消息认证与哈希函数](HashAndMAC.md)讲了哈希与 MAC 如何保证完整性。本章把两条线合流，回答两个递进的问题：

- **数字签名**：如何让人人都能验证"这份文件确实出自某人、且未被篡改"，并且签字人无法抵赖？——**哈希 + 公钥密码**的组合。
- **认证协议**：在交互式通信中，如何证明"我此刻正在和你说话"，而不是和一个重放旧消息的家伙说话？——并顺带协商出一把会话密钥。

第 4 章 4.5 节已出现过数字签名的粗略轮廓（RSA 签名、DSA），本章做系统化深入：给出**形式化定义与安全模型（EUF-CMA）**，解释为什么"朴素 RSA 签名"是彻底坏的、RSA-PSS 如何修好它，讲清 ECDSA / Schnorr / EdDSA 的构造与真实世界踩过的坑，最后进入认证协议的经典设计与攻击。

## 6.1 数字签名的定义与性质

### 6.1.1 与手写签名的对照

数字签名是手写签名在数字世界的对应物，但 stronger：手写签名与文件是"松耦合"（同一笔迹可贴到别处），而数字签名与消息是**密码学绑定**的——换一个字节，签名就失效。

它提供三个性质：

| 性质 | 含义 | 类比 |
|---|---|---|
| **完整性** | 消息未被篡改 | 文件未被涂改 |
| **认证性**（来源认证） | 确实出自声称的签名者 | 笔迹是真的 |
| **不可否认性** | 签名者事后不能否认签过 | 无法抵赖 |

注意 **MAC 无法提供不可否认性**：因为验证方和签名方共享同一把密钥，验证者自己也能造出这个标签，第三方无法判断到底是"他签的"还是"你伪造的"。这正是必须用公钥签名而非 MAC 的核心理由。

### 6.1.2 与公钥加密的对偶

数字签名不是"加密的逆过程"（这是常见误解），但二者结构确实对偶：

$$
\begin{array}{c|c}
\text{公钥加密} & \text{数字签名} \\
\hline
\text{公钥加密，私钥解密} & \text{私钥签名，公钥验证} \\
\text{目标是保密性} & \text{目标是认证性} \\
\text{用 } pk \text{ 计算 } c \text{ 是容易的} & \text{用 } pk \text{ 造 } \sigma \text{ 是困难的} \\
\text{从 } c \text{ 恢复 } m \text{ 是困难的} & \text{用 } pk \text{ 检验 } \sigma \text{ 是容易的}
\end{array}
$$

从代数角度看，签名本质是一个**带陷门的单向函数族**：签名者用陷门（私钥）计算单向函数的"逆"，验证者用公钥检查这个逆是否正确。

### 6.1.3 形式化定义

一个数字签名方案是三元组 $\Pi = (\mathsf{KeyGen}, \mathsf{Sign}, \mathsf{Verify})$：

- $\mathsf{KeyGen}(1^\lambda) \to (pk, sk)$：输入安全参数，输出公钥与私钥；
- $\mathsf{Sign}(sk, m) \to \sigma$：用私钥对消息 $m$ 生成签名 $\sigma$（可为确定性或概率性算法）；
- $\mathsf{Verify}(pk, m, \sigma) \to \{0,1\}$：确定性算法，输出接受或拒绝。

**正确性**要求：对任意由 $\mathsf{KeyGen}$ 生成的 $(pk,sk)$ 与任意 $m\in\mathcal{M}$，

$$
\Pr\big[\ \mathsf{Verify}(pk, m, \mathsf{Sign}(sk, m)) = 1\ \big] = 1
$$

### 6.1.4 哈希-签名范式

实际方案几乎从不直接对长消息签名，而是先压缩：

$$
\mathsf{Sign}(sk, m) = \mathsf{Sign}'(sk,\, H(m))
$$

其中 $H:\{0,1\}^* \to \{0,1\}^n$ 是密码学哈希函数，$\mathsf{Sign}'$ 是作用于固定长度输入的核心算法。

这么做的三个理由：**效率**（一次哈希代替大量模幂/标量乘）、**兼容性**（任意长度消息都能进有限域）、**安全**（把"能否伪造"绑定到底层哈希的抗碰撞性上，见 6.2.5）。

## 6.2 安全模型：什么叫"不可伪造"

这是本章最重要的一节。说"这个签名方案很安全"是空洞的，**必须说清：敌手有多强、他要伪造到什么程度才算成功**。

### 6.2.1 伪造的三个层次（从强到弱）

| 层次 | 敌手能做到的事 |
|---|---|
| **全面破解**（Total Break） | 恢复出私钥 $sk$ |
| **选择性伪造**（Selective Forgery） | 对**他指定的**某条消息伪造出有效签名 |
| **存在性伪造**（Existential Forgery） | 对**某条**（哪怕毫无意义的）消息伪造出有效签名 |

看起来"存在性伪造"最弱，但它是**正确的安全门槛**：如果一个方案连"存在性伪造"都防不住，攻击者就能拿一个随机数反推出消息，凭空造出"你签名了某句胡话"的证据——在金融、合同、证书场景下这已经足以造成危害。

### 6.2.2 攻击模型（敌手有多强）

| 模型 | 敌手掌握的资源 |
|---|---|
| **仅知公钥攻击**（KOA） | 只有 $pk$ |
| **已知消息攻击**（KMA） | 一批 $(m_i,\sigma_i)$，但消息不是他选的 |
| **选择消息攻击**（CMA） | 可以访问**签名预言机**，任意选 $m_i$ 换取合法签名 $\sigma_i$ |

CMA 是最强的现实模型——签名服务（如 CA、API 网关、时间戳服务）天然就是一台签名预言机。

### 6.2.3 EUF-CMA：签名的黄金标准

**定义（EUF-CMA）**：签名方案 $\Pi$ 在**适应性选择消息攻击下存在性不可伪造**，若对任意 PPT 敌手 $\mathcal{A}$，下列实验输出 1 的概率可忽略。

$$
\begin{aligned}
&\text{Exp}^{\mathsf{euf\text{-}cma}}_{\Pi,\mathcal{A}}(\lambda):\\
&\quad 1.\ (pk, sk) \leftarrow \mathsf{KeyGen}(1^\lambda),\quad Q \leftarrow \varnothing\\
&\quad 2.\ (m^*, \sigma^*) \leftarrow \mathcal{A}^{\mathsf{Sign}(sk,\cdot)}(pk)\\
&\quad\quad\text{（对每次查询 } m_i \text{，返回 } \sigma_i \text{ 并把 } m_i \text{ 加入 } Q）\\
&\quad 3.\ \text{输出 } 1 \iff \mathsf{Verify}(pk, m^*, \sigma^*) = 1 \ \land\ m^* \notin Q
\end{aligned}
$$

敌手优势定义为 $\mathrm{Adv}^{\mathsf{euf\text{-}cma}}_{\Pi,\mathcal{A}}(\lambda) = \Pr[\text{Exp} = 1]$，要求它 $\le \mathrm{negl}(\lambda)$。

**"适应性"**三个字很关键：敌手可以**先看前面的签名结果、再决定下一个查询什么**，而不是一次性提交查询列表。

### 6.2.4 SUF-CMA：更强的不可伪造性

**定义（SUF-CMA，强不可伪造）**：把判定条件改为

$$
\mathsf{Verify}(pk, m^*, \sigma^*) = 1 \ \land\ (m^*, \sigma^*) \notin \{(m_i, \sigma_i) : m_i \in Q\}
$$

即：即使对**已签过的消息**，敌手也不能造出一个**新的、不同的**有效签名。

这排除了**签名延展性（malleability）**攻击：从有效签名 $(m,\sigma)$ 变换出另一个对同一 $m$ 也有效的 $\sigma'$。ECDSA 天然具有延展性（见 6.4.4），比特币早期正因为此出现"交易 ID 被第三方篡改"的问题。**区块链场景应选 SUF-CMA 方案。**

### 6.2.5 安全性怎么证：归约

标准套路是**归约（reduction）**，四步：

1. **假设**敌手 $\mathcal{A}$ 能以不可忽略概率伪造签名；
2. **构造**算法 $\mathcal{B}$，把 $\mathcal{A}$ 当作子程序嵌入，去解某个公认的困难问题（大整数分解、离散对数、RSA 问题）；
3. **分析**$\mathcal{B}$ 的成功概率与 $\mathcal{A}$ 的优势之间的关系；
4. **得出矛盾**——若 $\mathcal{A}$ 存在，则困难问题可高效求解。

多数实用签名的证明需要**随机预言机模型（ROM）**：把哈希函数理想化为一个真正随机的函数。这是 ROM 下可证安全，而非标准模型下——理解这一点，才能读懂"RSA-PSS 在 ROM 下 EUF-CMA 安全"这类表述的真实含义。

## 6.3 RSA 签名：朴素方案的三个致命漏洞

### 6.3.1 朴素 RSA 签名

沿用第 4 章的 RSA 参数：$N=pq$，$ed \equiv 1 \pmod{\phi(N)}$，$pk=(N,e)$，$sk=(N,d)$。

- **签名**：$\sigma = m^d \bmod N$
- **验证**：$\sigma^e \stackrel{?}{\equiv} m \pmod N$

正确性由欧拉定理保证：$(\sigma)^e = (m^d)^e = m^{ed} \equiv m \pmod N$。

**这个方案是彻底不安全的。** 下面三个攻击每一个都能当场击穿它。

### 6.3.2 漏洞一：存在性伪造

敌手**根本不需要私钥**：

1. 随机选一个 $\sigma \in \mathbb{Z}_N^*$；
2. 计算 $m = \sigma^e \bmod N$；
3. 输出 $(m, \sigma)$。

验证时 $\sigma^e = m$ 成立——伪造成功。这个攻击之所以得手，是因为**朴素 RSA 对消息没有任何结构要求**：随便一个 $\sigma$ 经 $e$ 次幂后都对应某个"合法消息"。虽然 $m$ 通常是乱码，但存在性伪造并不要求消息有意义。

### 6.3.3 漏洞二：乘性同态

RSA 具有乘性：

$$
\mathsf{Sign}(m_1)\cdot\mathsf{Sign}(m_2) = m_1^d \cdot m_2^d = (m_1 m_2)^d = \mathsf{Sign}(m_1 m_2)
$$

敌手只要拿到 $m_1$、$m_2$ 的签名，就能免费得到 $m_1m_2 \bmod N$ 的签名——**无需询问签名预言机**。这是从"已知消息攻击"直接升级成"选择性伪造"。

### 6.3.4 漏洞三：选择消息攻击（盲化）

这一条最阴险，因为它能伪造**有意义的目标消息** $m$：

1. 敌手随机选 $r \in \mathbb{Z}_N^*$，构造 $m' = m \cdot r^e \bmod N$；
2. 向签名预言机查询 $m'$ 的签名，得 $\sigma' = (m\cdot r^e)^d = m^d \cdot r \bmod N$；
3. 恢复目标签名：$\sigma = \sigma' \cdot r^{-1} = m^d \bmod N$。

$m'$ 看起来是一串无意义随机数，签名者毫无戒心，但敌手一除就拿到了 $m$ 的合法签名。这直接说明**朴素 RSA 连 CMA 安全都没有**。

### 6.3.5 RSA-PSS：加盐加掩码的工程答案

修复思路不是换算法，而是**给消息加上不可预测的结构**。PSS（Probabilistic Signature Scheme）流程：

1. 计算 $\text{mHash} = H(M)$；
2. 随机选盐 $\text{salt} \leftarrow \{0,1\}^{\text{sLen}}$；
3. 拼接 $M' = 0^8 \| \text{mHash} \| \text{salt}$，计算 $H = H(M')$；
4. 用掩码生成函数 $\text{MGF}$ 生成 $\text{mask} = \text{MGF}(H, \text{emLen}-\text{hLen}-1)$；
5. $\text{maskedDB} = \text{DB} \oplus \text{mask}$，其中 $\text{DB} = \text{PS} \| 0\text{x}01 \| \text{salt}$；
6. 组帧 $\text{EM} = \text{maskedDB} \| H \| 0\text{xbc}$；
7. 签名 $s = \text{EM}^d \bmod N$。

**安全性定理**：在随机预言机模型下，若 RSA 问题困难，则 RSA-PSS 是 EUF-CMA 安全的。

关键在于**随机盐**：同一条消息每次签名得到不同的 $\text{EM}$，敌手无法预先构造出能利用 RSA 代数结构的输入，6.3.2–6.3.4 的三个攻击全部失效。

### 6.3.6 参数选择与性能

| 模数长度 | 状态 |
|---|---|
| 1024 bit | **已不安全**（768 bit 已于 2009 年被分解） |
| 2048 bit | 当前主流标准 |
| 3072 bit | 长期使用推荐 |
| 4096 bit | 高安全场景 |

签名需要大指数幂 $m^d \bmod N$，实用实现一律用**中国剩余定理**加速（约 4 倍）：

$$
\sigma_p = m^{d_p} \bmod p,\qquad \sigma_q = m^{d_q} \bmod q,\qquad \sigma = \mathrm{CRT}(\sigma_p, \sigma_q)
$$

验证只需 $\sigma^e \bmod N$，当 $e = 65537$ 时仅约 17 次模乘，**验证极快**——这正是 RSA 在 TLS 握手、证书链校验中长期占优的原因。

## 6.4 离散对数类签名：DSA 与 ECDSA

### 6.4.1 参数与密钥

域参数：椭圆曲线 $E: y^2 = x^3 + ax + b \pmod p$，基点 $G$，阶为素数 $n$。

- **密钥生成**：私钥 $d \in [1, n-1]$，公钥 $Q = dG$。

### 6.4.2 签名与验证

**签名**（对消息 $m$）：

1. $e = H(m)$；
2. 随机选 $k \in [1, n-1]$（**每次都要新鲜**）；
3. 计算 $(x_1, y_1) = kG$，$r = x_1 \bmod n$；若 $r=0$ 重选 $k$；
4. 计算 $s = k^{-1}(e + d r) \bmod n$；若 $s=0$ 重选 $k$；
5. 输出 $\sigma = (r, s)$。

**验证**：

1. 检查 $r, s \in [1, n-1]$；
2. $e = H(m)$，$w = s^{-1} \bmod n$；
3. $u_1 = ew \bmod n$，$u_2 = rw \bmod n$；
4. 计算 $(x_1, y_1) = u_1 G + u_2 Q$；
5. 接受当且仅当 $r \equiv x_1 \pmod n$。

**正确性推导**：由 $s = k^{-1}(e+dr)$ 得 $k = s^{-1}(e+dr) = w(e+dr)$，于是

$$
u_1 G + u_2 Q = ew\,G + rw\,(dG) = w(e + dr)\,G = kG
$$

其横坐标正是 $r$。✓

### 6.4.3 致命陷阱：nonce 重用直接泄露私钥

这是密码学史上最著名的"一行 bug 毁掉全部"案例。若两次签名用了**同一个 $k$**：

$$
s_1 = k^{-1}(e_1 + dr),\qquad s_2 = k^{-1}(e_2 + dr)
$$

两式相减消去 $dr$：

$$
k = (e_1 - e_2)\,(s_1 - s_2)^{-1} \bmod n
$$

再代回即可解出私钥：

$$
d = (s_1 k - e_1)\, r^{-1} \bmod n
$$

**真实事故**：

- **PlayStation 3 破解（2010）**：Sony 在固件签名中使用了**固定** nonce，私钥被直接算出，随后任何人都能给自制固件签上"官方签名"。
- **Android 比特币钱包（2013）**：Java `SecureRandom` 的实现缺陷导致 nonce 重复，用户私钥泄露、比特币被盗。

即使 $k$ 只是**部分可预测**（某些比特已知、或与密钥有统计相关性），也足以通过格攻击（如 Bleichenbacher、LLL）恢复私钥。

**对策**：使用 **RFC 6979 确定性 nonce**——用私钥与消息哈希确定性导出 $k$，从根上消除"随机数发生器出问题"这一类故障；或使用本身就确定性设计的 EdDSA（见 6.5.4）。

### 6.4.4 签名延展性

ECDSA 中若 $(r, s)$ 有效，则 $(r,\,-s \bmod n)$ **同样有效**（因为 $y$ 坐标取负不改变 $r$ 的横坐标，且验证式只涉及 $r$）。

后果：第三方可以在**不知道私钥**的情况下，把你的合法签名改写成另一个合法签名。在比特币这类"交易 ID 由签名内容哈希得出"的系统中，攻击者篡改交易 ID 后会破坏依赖原始 ID 的上层逻辑（这也是 BIP 62/146 与 segwit 要解决的问题之一）。

**对策**：强制**低 $s$ 规范化**（要求 $s \le n/2$，取两个合法值中较小的那个）；或改用 Schnorr 类签名。

## 6.5 Schnorr 签名与 EdDSA

### 6.5.1 Schnorr 身份识别协议（Σ 协议）

在讲签名前，先看它的前身——一个**证明"我知道离散对数"但不泄露它的交互式协议**。设 $y = g^x \bmod p$ 为公钥，$x$ 为私钥：

$$
\begin{array}{c|c}
\text{证明者 } P\ (\text{知道 } x) & \text{验证者 } V \\
\hline
r \leftarrow \mathbb{Z}_q,\ a = g^r \bmod p \quad \xrightarrow{\ \ a\ \ } & \\
& \xleftarrow{\ \ c\ \ } \quad c \leftarrow \{0,1\}^t \\
z = r + c x \bmod q \quad \xrightarrow{\ \ z\ \ } & \text{验证：} g^z \stackrel{?}{=} a \cdot y^c \bmod p
\end{array}
$$

**零知识性**（模拟器）：随机选 $c', z'$，令 $a' = g^{z'} \cdot y^{-c'} \bmod p$，输出 $(a', c', z')$——与真实交互同分布。

**知识性**（抽取器）：若对同一个 $a$ 能回答两个不同挑战 $c_1 \neq c_2$，则

$$
x = (z_1 - z_2)\,(c_1 - c_2)^{-1} \bmod q
$$

这正是我们在 [zk-SNARK](zkSNARK.md) 6.3 节见过的"承诺—挑战—响应"结构。

### 6.5.2 Fiat–Shamir 变换 → Schnorr 签名

把验证者的随机挑战换成哈希：$c = H(m, a)$。

- **签名**：$r \leftarrow \mathbb{Z}_q$，$a = g^r$，$c = H(m, a)$，$z = r + c x \bmod q$，输出 $\sigma = (c, z)$。
- **验证**：$a' = g^z \cdot y^{-c} \bmod p$，检查 $c \stackrel{?}{=} H(m, a')$。

### 6.5.3 Schnorr 为什么更好

| 维度 | ECDSA | Schnorr / EdDSA |
|---|---|---|
| nonce | 必须高质量随机数（出错即泄私钥） | 可确定性生成（RFC 6979 / EdDSA 内建） |
| 可证安全 | 证明较弱 | ROM 下有较紧的安全归约 |
| **线性性** | 无 | **有** —— 支持密钥聚合、多签、门限 |
| 签名大小 | 64 B | 64 B（聚合后可更小） |

**线性性**是最有价值的一点：Schnorr 签名对密钥和 nonce 都是线性组合，因此多方可以把各自的签名份额**相加**成一个普通签名。这直接支撑了 **MuSig2**（n-of-n 多重签名，看起来和单签一模一样）、**门限签名**与**密钥聚合**——比特币 Taproot 升级正是为此引入 Schnorr 签名（BIP 340）。

### 6.5.4 EdDSA / Ed25519

**EdDSA**（RFC 8032）是 Schnorr 签名在 **Twisted Edwards 曲线**上的实例化，代表参数是 **Ed25519**：

- 私钥 $k = H(sk)$，标量 $a$ 与 nonce 种子由此导出；
- **确定性 nonce**：$r = H(k_b \| M)$——彻底根除 6.4.3 的 nonce 灾难；
- $R = rB$，$S = r + H(R \| A \| M)\, a \bmod \ell$，签名 $\sigma = (R, S)$；
- 验证：$8 S B = 8 R + 8 H(R \| A \| M) A$。

优势：公钥仅 **32 B**、签名 **64 B**，签名与验证都快，且**无需高质量随机数源**。SSH、TLS 1.3、越来越多的区块链系统都已默认支持 Ed25519。

## 6.6 特殊签名一览

基础签名之外，还有许多为特定场景设计的变体：

| 类型 | 解决的问题 | 代表方案 |
|---|---|---|
| **盲签名** | 签名者不知道自己签了什么（电子现金、电子投票） | Chaum 盲签名（RSA 型） |
| **环签名** | 证明"签名者在这群人之中"，但不指出是谁 | Ring signatures（Monero 用其保护发送方隐私） |
| **群签名** | 群成员匿名签名，但群管理员可追责 | BBS04 等 |
| **聚合签名** | 把 $n$ 个签名压成 1 个 | BLS（基于配对，可跨消息聚合） |
| **多重签名** | $n$ 方共同签一条消息，输出形如单签 | MuSig2（Schnorr 型）、BLS 多签 |
| **门限签名** | $t$-of-$n$ 才能签出有效签名 | FROST、门限 ECDSA |
| **一次/有状态哈希签名** | 仅依赖哈希抗碰撞性，抗量子 | LMS、XMSS（NIST SP 800-208） |

**BLS 签名**值得一提：利用双线性配对，签名 $\sigma = H(m)^{x} \in \mathbb{G}_1$，验证 $e(\sigma, g_2) = e(H(m), pk)$。多个签名的群元素相乘即得聚合签名，验证时相应地把右边各项相乘——这正是以太坊共识层选择 BLS 的原因（成千上万个验证者签名可高效聚合）。（配对本身见 [KZG 多项式承诺](KZG.md)。）

## 6.7 标准化现状

依据 [NIST 数字签名项目页](https://csrc.nist.gov/projects/digital-signatures)：

- **FIPS 186-5**（2023-02 发布，《Digital Signature Standard》）规定三种签名技术：**RSA、ECDSA、EdDSA**。旧版中的 **DSA 仅保留用于验证历史签名**，不再推荐新用。
- **SP 800-186** 给出推荐的椭圆曲线域参数，除原有的 Weierstrass 曲线外，新增 **Ed25519、Ed448** 两条 Edwards 曲线用于 EdDSA。
- **SP 800-208**（2020-10）批准两种**有状态**哈希签名 **XMSS** 与 **LMS**——它们抗量子，但安全性依赖严格的状态管理，只适合私钥使用可被严格控制的场景。

## 6.8 认证协议

前面所有内容回答的是"这条消息是谁签的"。认证协议回答的是另一个问题：**此刻和我在通信的，是不是我以为的那个人？**（实体认证，entity authentication）

### 6.8.1 两个必须解决的问题

单纯"给每条消息附一个认证器"是不够的，因为存在：

- **重放攻击**（replay）：敌手原样重发一条旧消息。认证器依然有效——消息确实是你造的、也没被改过。
- **抑制-重放攻击**（suppress-replay）：敌手扣下消息、在不当的时机再发出（例如延迟你的股票买入指令）。

因此需要保证**新鲜性（originality）**与**时效性（timeliness）**。此外，认证完成后通常还要协商一把**会话密钥（session key）**，供后续通信高效加密——所以认证协议与密钥建立协议几乎是同义词。

### 6.8.2 保证新鲜性的两种工具

| 工具 | 做法 | 代价 |
|---|---|---|
| **时间戳** | 消息中带时间，须被认证器覆盖 | 需要分布式时钟同步，同步本身也要防护 |
| **nonce** | 一次性随机数，接收方检查是否用过 | 需要记录历史 nonce，量大时难管理 |

工程上常**两者结合**：nonce 只需在一段时间窗口内唯一，时钟只需松散同步。

### 6.8.3 挑战-响应

最基础的认证范式：Alice 发一个新鲜的挑战（时间戳或 nonce），Bob 用**只有他才知道的密钥**处理它并返回。

- **对称密钥版**：Bob 用共享密钥 $K$ 加密挑战：$E_K(N_A)$；
- **公钥版**：Bob 用自己的私钥**签名**挑战：$\mathrm{Sig}_{sk_B}(N_A)$；
- **零知识版**：即 6.5.1 的 Schnorr 识别协议——证明"我知道私钥"而不泄露私钥本身。

精妙之处在于**同时获得了时效性与认证**：只有 Bob 能对这个从未出现过的挑战给出正确响应。

### 6.8.4 Needham–Schroeder（对称密钥版）

1978 年的经典方案，引入可信第三方 **KDC**（每个实体只与 KDC 共享一把主密钥）。

$$
\begin{aligned}
1.\ &A \to \text{KDC}: && ID_A \| ID_B \| N_1 \\
2.\ &\text{KDC} \to A: && E_{K_A}\big[\,K_S \| ID_B \| N_1 \| E_{K_B}[K_S \| ID_A]\,\big] \\
3.\ &A \to B: && E_{K_B}[\,K_S \| ID_A\,] \\
4.\ &B \to A: && E_{K_S}[N_2] \\
5.\ &A \to B: && E_{K_S}[f(N_2)]
\end{aligned}
$$

- 第 2 步中 $E_{K_B}[K_S \| ID_A]$ 是一张"密钥证书"——KDC 用 Bob 的主密钥加密，等价于 KDC 为"会话密钥 $K_S$ 属于 A 和 B"做了担保；只有 Bob 能解开。
- $N_1$ 保证 Alice 收到的 KDC 应答是新鲜的；$N_2$ 与 $f(N_2)$ 让 Bob 确认 Alice 确实持有 $K_S$。

### 6.8.5 N-S 的缺陷与修复

**缺陷**：第 3 条消息**没有新鲜性保护**。若敌手截获一条旧的 $E_{K_B}[K_S \| ID_A]$，就可以重放它给 Bob，诱使 Bob 使用一个**已被破解或已过期**的旧会话密钥 $K_S$（**Denning–Sacco 攻击**）。问题根源在于：Bob 无法判断这张"票据"是不是刚生成的。

**修复思路**：

- **Denning–Sacco 改进**：在票据中加入时间戳，Bob 只接受时间窗内的票据；
- **Kerberos 的做法**：直接用**时间戳 + 有效期（lifetime）**替代 nonce，从设计上消除该弱点（见 6.8.7）。

### 6.8.6 公钥版 N-S 与 Lowe 的中间人攻击

公钥版本（无需 KDC）：

$$
\begin{aligned}
1.\ &A \to B: && E_{PK_B}[\,N_A \| ID_A\,] \\
2.\ &B \to A: && E_{PK_A}[\,N_A \| N_B\,] \\
3.\ &A \to B: && E_{PK_B}[\,N_B\,]
\end{aligned}
$$

看起来天衣无缝——直到 1995 年 **Gavin Lowe** 给出了一个中间人攻击：敌手 $M$ 与 A、B 各开一个会话，把 A 发起的会话"转发"给 B：

$$
\begin{aligned}
1.\ &A \to M(B): && E_{PK_B}[N_A \| ID_A] \\
1'.\ &M(A) \to B: && E_{PK_B}[N_A \| ID_A] \\
2'.\ &B \to M(A): && E_{PK_A}[N_A \| N_B] \\
2.\ &M(B) \to A: && E_{PK_A}[N_A \| N_B] \\
3.\ &A \to M(B): && E_{PK_B}[N_B] \\
3'.\ &M(A) \to B: && E_{PK_B}[N_B]
\end{aligned}
$$

结果：**B 以为自己在和 A 通信，A 以为自己在和 B 通信，实际上两者都在和 M 通信**。漏洞在于第 2 条消息中没有绑定 B 的身份——B 不知道自己是在响应 A 发起的那一次会话。

**修复**：在第 2 步中加入 B 的标识：

$$
2.\quad B \to A:\ E_{PK_A}[\,N_A \| N_B \| ID_B\,]
$$

这样 A 收到后能立刻发现"对方声称的身份与我以为的不符"，攻击失败。这个例子常被用来说明：**认证协议的正确性极难靠肉眼保证，必须用形式化方法（BAN 逻辑、Strand Space、Tamarin/ProVerif 等工具）验证。**

### 6.8.7 Kerberos

Kerberos 源自 N-S，是**客户端/服务器环境**最成功的工业化认证系统（MIT 起源，IETF 标准化，Windows Active Directory 的核心）。

它对 N-S 做了两项关键改造：

1. **拆分 KDC**：把"证明身份"和"发票据"两个角色分开——
   - **AS（Authentication Server）**：验证用户身份，返回一张可用来向 TGS 证明身份的凭据（TGT）；
   - **TGS（Ticket Granting Server）**：据此为用户签发访问具体服务器（如 Bob）的**票据（ticket）**。
   - 好处：用户要访问多个服务时，只需向 TGS 逐个取票，**不必反复回 AS**。
2. **用时间戳 + 有效期替代 nonce**：在客户端/服务器场景中假定有一定程度的时钟同步，从而消除 N-S 的重放弱点。

工程细节上，Kerberos 假定客户机可能被物理接触，因此**用户的口令派生主密钥**只在收到 AS 应答、需要解密的那一刻才被计算并驻留内存，用完立即擦除，最小化口令暴露。此外它支持可插拔的哈希与对称加密算法，能随算法演进而更新。

### 6.8.8 认证协议的设计教训

从上述案例中可提炼出一份检查清单：

1. **每条消息都要绑定身份**——缺失身份绑定是 Lowe 攻击的直接成因；
2. **每条消息都要保证新鲜性**——nonce 或时间戳，缺一即可能被重放（N-S 第 3 步）；
3. **区分会话**——并行会话下要能区分"这是哪一次运行"，否则会被交叉装配；
4. **不要自己发明协议**——优先使用经过形式化验证的标准协议（TLS 1.3、Kerberos、SIGMA/IKEv2）；
5. **用工具验证**——BAN 逻辑适合快速发现身份/新鲜性缺失，Tamarin、ProVerif 可做自动化的符号化证明。

## 6.9 后量子签名

本章所有经典方案（RSA、ECDSA、EdDSA、Schnorr，以及 BLS）都基于大整数分解或离散对数，在大规模量子计算机（Shor 算法）下**全部不安全**。后量子替代已经标准化：

| 标准 | 算法 | 基础 |
|---|---|---|
| **FIPS 204** | **ML-DSA**（源自 CRYSTALS-Dilithium） | 模格 |
| **FIPS 205** | **SLH-DSA**（源自 SPHINCS+） | 哈希（无状态） |
| FIPS 206（草案） | **FN-DSA**（源自 FALCON） | 格（签名更短） |
| SP 800-208 | XMSS / LMS | 哈希（有状态） |

详见本系列 [现代密码学发展](ModernCryptography.md) 中"NIST 后量子标准"一节。**签名（身份认证）这一侧的后量子迁移尤其紧迫**：正如该文指出的，互联网上混合密钥交换已过半，但**证书与签名的后量子化几乎还没开始**——而证书恰恰是量子攻击者伪造身份的入口。

## 6.10 常见陷阱清单

| 陷阱 | 后果 | 对策 |
|---|---|---|
| nonce 重用 / 弱随机（ECDSA、DSA） | **私钥直接泄露**（PS3、Android 钱包） | RFC 6979 确定性 nonce，或用 EdDSA |
| 使用 MD5 / SHA-1 签名 | 碰撞攻击：两个文档同一哈希 | SHA-256 及以上 |
| 忽略签名延展性 | 第三方改写签名（比特币交易 ID 篡改） | 低 $s$ 规范化；改用 Schnorr |
| 自造 RSA 填充 | 6.3.2–6.3.4 三类伪造 | 一律使用 RSA-PSS |
| 把 MAC 当签名用 | 无法提供不可否认性 | 需要不可否认性时用公钥签名 |
| 认证协议缺新鲜性/身份绑定 | 重放、中间人 | 用 TLS/Kerberos 等标准协议，形式化验证 |
| 非常量时间比较 | 时序侧信道 | 常量时间比较（`hmac.compare_digest`） |
| 不验证证书链 | 伪造身份 | 完整的 PKI 校验（含有效期、吊销） |

## 结论

数字签名把"哈希 + 公钥密码"组合成一个能提供**完整性、认证性、不可否认性**的原语，其安全性的正确表述是 **EUF-CMA**——必须在"适应性选择消息攻击"下仍无法存在性伪造。朴素 RSA 签名的三个漏洞说明了为什么填充（PSS）不是可选项；ECDSA 的 nonce 灾难与延展性则说明：

> **签名方案的弱点，往往不在数学难题本身，而在随机数、填充与协议绑定这些"工程细节"。**

认证协议把问题从"谁签的"推进到"此刻我在和谁说话"。Needham–Schroeder 与 Lowe 攻击留下的最大教训是：**认证协议的正确性无法靠直觉保证**——必须显式处理新鲜性与身份绑定，并用形式化工具验证。

后量子迁移正在把这一章的标准整体重写：ML-DSA、SLH-DSA 已经就位，而签名/PKI 侧的迁移比密钥交换侧更滞后，也更紧迫。

---

## 延伸阅读（本系列）

- [第4章 非对称密码](Asymmetriccryptography.md) — RSA、离散对数、椭圆曲线的数学基础
- [第5章 消息认证与哈希函数](HashAndMAC.md) — MAC、HMAC 与哈希在签名中的作用
- [密码协议与应用](ProtocolAndApplication.md) — TLS/SSH 中的证书、签名与密钥交换
- [比特币体系](Bitcoin.md) — ECDSA/Schnorr 签名在区块链中的实际用法
- [现代密码学发展](ModernCryptography.md) — 后量子签名标准与迁移现状
- [zk-SNARK 原理详解](zkSNARK.md) — Schnorr 协议与 Fiat–Shamir 的深入应用

## 引文

- [NIST: Digital Signatures Project](https://csrc.nist.gov/projects/digital-signatures)
- [NIST FIPS 186-5: Digital Signature Standard (DSS)](https://csrc.nist.gov/pubs/fips/186-5/final)
- [NIST SP 800-186: Recommendations for Discrete Logarithm-based Cryptography](https://csrc.nist.gov/pubs/sp/800-186/final)
- [NIST SP 800-208: Recommendation for Stateful Hash-Based Signature Schemes](https://csrc.nist.gov/pubs/sp/800/208/final)
- [NIST FIPS 204 (ML-DSA)](https://csrc.nist.gov/pubs/fips/204/final)、[FIPS 205 (SLH-DSA)](https://csrc.nist.gov/pubs/fips/205/final)
- [RFC 8032: Edwards-Curve Digital Signature Algorithm (EdDSA)](https://www.rfc-editor.org/info/rfc8032)
- [RFC 6979: Deterministic Usage of DSA and ECDSA](https://www.rfc-editor.org/info/rfc6979)
- [BIP 340: Schnorr Signatures for secp256k1](https://github.com/bitcoin/bips/blob/master/bip-0340.mediawiki)
- Schnorr, C.-P. *Efficient Signature Generation by Smart Cards*. Journal of Cryptology, 4(3), 1991.
- Needham, R. M., Schroeder, M. D. *Using Encryption for Authentication in Large Networks of Computers*. CACM, 21(12), 1978.
- Denning, D. E., Sacco, G. M. *Timestamps in Key Distribution Protocols*. CACM, 24(8), 1981.
- Lowe, G. *An Attack on the Needham-Schroeder Public-Key Authentication Protocol*. Information Processing Letters, 56(3), 1995.
- [Systems Approach: 8.4 Authentication Protocols](https://book.systemsapproach.org/security/authentication.html)（N-S、挑战-响应与 Kerberos 的图示讲解）
- [cryptography_tutorial 第五章：数字签名与认证](https://zsc.github.io/cryptography_tutorial/chapter5.html)
- [Wikipedia: Digital signature](https://en.wikipedia.org/wiki/Digital_signature)、[Needham–Schroeder protocol](https://en.wikipedia.org/wiki/Needham%E2%80%93Schroeder_protocol)

**本文作者：** [<span class="author-avatar-wrapper"><img class="author-avatar" src="https://s1.imagehub.cc/images/2025/12/06/28380affd86b014a6dcaf082fcc97064.png" width="28" height="28" alt="Wcowin" /><span class="author-name-popover">王科文</span></span>](https://github.com/Wcowin)
