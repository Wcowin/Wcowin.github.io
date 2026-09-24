---
title: zk-SNARK 原理详解：从直觉到可运行实现
date: 2026-09-19
tags:
  - 密码学
---

# zk-SNARK 原理详解：从直觉到可运行实现

在[现代密码学发展](ModernCryptography.md)一文里，我们曾把零知识证明（ZKP）当作“可证明不泄露”这条主线上的一个代表。本文单独把其中影响最大、工程落地最广的一类——**zk-SNARK**——拿出来，沿着 *Why and How zk-SNARK Works*（Maksym Petkus，中文译本见[参考资料](#_1)）的思路，讲清楚它“为什么能工作”以及“为什么被设计成这样”。

读完你会明白：zk-SNARK 并不是一堆魔法模块拼起来的黑盒，而是一条非常自然的推理链——**把“计算正确”翻译成“一个多项式的整除关系”，再用一条概率引理把它压成“一个点的等式”。**

## 1. zk-SNARK 是什么

先拆开这个名字，四个性质各管一件事：

**Zero-Knowledge（零知识）：**

验证者除了得到“命题为真”这一结论外，学不到任何额外信息——尤其是证明者私有的 **witness（见证）**，例如某个密码、某个私钥、某段隐私输入。

**Succinct（简洁）：**

证明本身很短、验证很快：**证明大小与验证时间关于被证明计算的规模是常数级**（与电路规模无关），而不是线性。这正是它能用于链上扩容的关键（证明者生成证明的开销虽明显更大，但链上只需常数级验证）。

**Non-interactive（非交互）：**

证明者一次性产出证明，验证者拿去即可验证，双方不需要多轮问答。这让证明可以被写进区块链、被任何人离线复查。

**ARgument of Knowledge（知识论证）：**

它不仅能证明“这样的解存在”，还能证明“证明者确实*知道*某个 witness”。注意这里用的是 **Argument** 而非 **Proof**：安全性是**计算意义下**的（假设攻击者算力有限），而不是信息论意义下的。换句话说，一个拥有无限算力的敌手理论上仍可能伪造——这与经典数学证明的“绝对正确”不同。

**为什么这四个性质凑在一起很贵？**

零知识、简洁、非交互、知识性，任意挑一两个都不难；难点在于让它们**同时成立**且证明还要足够小。后面几节就是在解释：前人是如何用代数把这几件事捏到一起的。

## 2. 核心直觉：为什么是“多项式”

zk-SNARK 最巧妙的一步，是找对了“证明的媒介”——**多项式**。

**把秘密藏进多项式的根：**

假设证明者想证明“我知道一个数 $a$（秘密），使得某个关系成立”。他可以构造一个多项式

$$
p(x) = (x - a)\cdot q(x)
$$

这里 $a$ 是 $p(x)$ 的一个根。如果证明者能向验证者展示“$p(x)$ 在 $x=a$ 处为 0”，而又不直接说出 $a$，就相当于在不泄露 $a$ 的前提下证明了“我知道这个根”。

**Schwartz–Zippel 引理（简洁性的根源）：**

这是整个 succinctness 的数学支点。它说：两个次数都不超过 $d$ 的多项式，如果它们**不是同一个多项式**，那么在一个随机点上的取值相等的概率至多是 $d/|F|$（$F$ 是有限域）。

**效果：**

只要在一个**随机点** $s$ 上验证两个多项式相等，就几乎等价于“它们在所有点上都相等”。于是“验证一整段庞大的计算”被压缩成“验证一个点的等式”——证明因此又短又快。

**一句话总结这一节：**

多项式让“知识”有了可被单点检验的外形；Schwartz–Zippel 让“单点检验”足够可信。接下来要做的，只是把“计算”也变成“多项式”。

## 3. 逐步构造：从交互到非交互

下面的演化，正是 *Why and How zk-SNARK Works* 一书“如何工作”的主线。

### 3.1 用同态承诺把系数锁进密文

我们希望验证者在**不知道随机点 $s$** 的情况下，仍能检验多项式关系。办法是把多项式的值“承诺”到椭圆曲线群上：用群元素 $g^{p(s)}$ 表示多项式在点 $s$ 处的取值。

**核心能力：**

- 给定 $g^{a}$、$g^{b}$，可以在不知道 $a,b$ 明文的情况下算出 $g^{a+b}$（同态加法）。
- 借助**双线性配对** $e$，还能跨群做乘法：$e(g^{a}, g^{b}) = e(g,g)^{ab}$。这让验证者得以在“密文态”上检查乘积与等式——这是把多项式乘法搬进验证端的关键。

**知识系数假设（KCA）：**

这类构造依赖一个关键前提：如果证明者能给出一个“合法响应”，那么他一定**知道**对应的系数。这把“能响应”和“确实知道 witness”绑在了一起，也就是前面那个“ARgument of Knowledge”的来源。

### 3.2 Fiat–Shamir 变换：去掉交互

最初的协议需要验证者发一个**随机挑战**给证明者。Fiat–Shamir 的做法是：把“验证者发来的随机挑战”替换成“对前面所有消息做密码学哈希”的结果。

**效果：**

在随机预言机模型下，证明者无法预先知道挑战、也就无法作弊预测，于是多轮问答被压成**一次性的非交互证明**。这一步直接给了名字里的 **Non-interactive**。

### 3.3 把“计算”变成“多项式”——QAP

这是把任意程序塞进 zk-SNARK 的桥梁。

**第零步：先看一段普通程序怎么变成约束。**

这是最容易被跳过、却最能建立直觉的一步。设有这样一段程序：

```text
如果 w = 1：v = a × b
否则：      v = a + b
```

电路里没有 if/else，只有乘法。技巧是把分支**代数化**：

$$
v = w(ab) + (1-w)(a+b)
$$

引入中间变量 $m=a\times b$，上式可改写为

$$
w(m-a-b) = v-a-b
$$

再补一条约束把开关 $w$ 钉死为 0 或 1：$w\times w=w$。于是原程序被翻译成三条纯乘法约束：

1. $a\times b = m$
2. $w\times(m-a-b) = v-a-b$
3. $w\times w = w$

当 $w=1$ 时第 2 条给出 $v=m=ab$；当 $w=0$ 时给出 $v=a+b$。**分支被消掉了，代价是多一个约束。**

**第一步：算术电路 → R1CS。**

任何计算都能写成算术电路（加法门、乘法门）。每个门对应一个约束：

$$
(\vec{A}\cdot \vec{w})\times(\vec{B}\cdot \vec{w}) = (\vec{C}\cdot \vec{w})
$$

其中 $\vec{w}$ 是包含公开输入与私有 witness 的向量。这叫 **R1CS（秩 1 约束系统）**。

**三种最常用的“电路编程”技巧**（把高级语义翻译成 R1CS）：

| 想要的效果 | 写成的约束 | 原理 |
|---|---|---|
| 限定 $a$ 只能是 0 或 1 | $a\times a=a$ | 即 $a(a-1)=0$，解只有 $a=0,1$ |
| 强制 $a=2$ | $(a-2)\times 1=0$ | 需要一个恒为 1 的变量 $v_{one}=1$ 提供常数项 |
| 限定 $a$ 是 4 位无符号数 | $a=8b_3+4b_2+2b_1+b_0$，且每个 $b_i\times b_i=b_i$ | 位分解后逐位约束，于是 $a\in[0,15]$ |

**第二步：R1CS → QAP。**

把所有门的约束“拼”成一个 **二次算术程序（QAP）**：存在目标多项式 $t(x)$（其根恰好是各个门的编号），使得

$$
A(x)\cdot B(x) - C(x) \text{ 能被 } t(x) \text{ 整除}
$$

**当且仅当**所有约束都被满足，即原计算执行正确。

**第三步：回到单点检验。**

“能被 $t(x)$ 整除”等价于“在随机点 $s$ 处，$(A(s)B(s)-C(s))/t(s)$ 等于某个商多项式的值”。验证者只需检查**一个点**上的等式——又回到了第 2 节的工具箱。

**手算一遍：完整数值例子**

沿用第零步那三条约束，取 $w=1,\ a=3,\ b=2$。先执行程序：$m=a\times b=6$，$w=1$ 故 $v=m=6$。三个运算位置上的左/右/输出值为：

| 运算 | 左 $L$ | 右 $R$ | 输出 $O$ |
|---|---|---|---|
| ① $a\times b=m$ | $3$ | $2$ | $6$ |
| ② $w(m-a-b)=v-a-b$ | $w=1$ | $6-3-2=1$ | $6-3-2=1$ |
| ③ $w^2=w$ | $1$ | $1$ | $1$ |

在 $x=1,2,3$ 上做 Lagrange 插值：

$$
L(1),L(2),L(3)=3,1,1 \;\Rightarrow\; L(x)=x^2-5x+7
$$

$$
R(1),R(2),R(3)=2,1,1 \;\Rightarrow\; R(x)=\tfrac{1}{2}x^2-\tfrac{5}{2}x+4
$$

$$
O(1),O(2),O(3)=6,1,1 \;\Rightarrow\; O(x)=\tfrac{5}{2}x^2-\tfrac{25}{2}x+16
$$

（把 $x=1,2,3$ 代回可逐一验证。）最后检查

$$
\frac{L(x)R(x)-O(x)}{(x-1)(x-2)(x-3)}
$$

能否除尽得到一个合法多项式 $h(x)$；能除尽，就说明三个运算全部满足。

**易错点：这里不是要求“恒等于 0”**

$L(x)R(x)-O(x)$ **并非**对所有 $x$ 恒为 0，它只要求在运算位置 $x=1,2,3$ 上为 0。正确的条件是逐点成立：

$$
L(i)\,R(i)=O(i),\quad i=1,2,3
$$

这等价于它能被 $t(x)=(x-1)(x-2)(x-3)$ 整除，即 $L(x)R(x)-O(x)=t(x)h(x)$。把“逐点成立”误读成“多项式恒等”，是初学时最常见的错误。

### 3.4 可信设置（Trusted Setup）

为了生成验证密钥与证明密钥，需要预先产生一组“有毒废料”（秘密参数 $\alpha,\beta,\gamma,\delta$ 以及各多项式在秘密点上的加密值）。

**风险：**

任何人只要拿到这些原始值，就能**伪造任意证明**。因此这些有毒废料必须在使用后被彻底销毁。

**工程现实：**

实践中通过**多方计算（MPC）仪式**来生成：只要其中**至少一个**参与者诚实销毁了自己的碎片，整体就是安全的。也有弱化乃至去除可信设置的方案：**STARK**（基于哈希/FRI）与采用 IPA 承诺的 **Halo2** 是**透明**的（无需可信设置）；PLONK、Halo2(KZG) 等只需一次**通用**可信设置（一套参数复用所有电路）。代价通常是证明体积更大或证明者开销更高。

这些有毒废料的产物称为**结构化参考串（SRS, Structured Reference String）**，其中包含以秘密点 $s$ 与各系数求幂的群元素——正是 3.1 节里验证者用来在密态检验多项式的那些 $g^{s^i}$、$g^{\alpha s^i}$。MPC 仪式的意义，就是让任何人都不曾完整掌握这些秘密。

### 3.5 那些随机参数各管什么事

上一节只说“有毒废料包含一堆秘密参数”，但没说它们分别防什么。真实协议里每个参数都有明确分工（下表沿用原书第 4 章的记号）：

| 参数 | 作用 | 它防止的作弊 |
|---|---|---|
| $s$ | 隐藏多项式求值点，只公开 $g^{s},g^{s^2},\ldots$ | 证明者针对已知验证点“凑”出一个多项式 |
| $\rho_l,\rho_r,\rho_o$（$\rho_o=\rho_l\rho_r$） | 给左/右/输出打不同标记：$g_l=g^{\rho_l},g_r=g^{\rho_r},g_o=g^{\rho_o}$ | 把左操作数和输出互换 |
| $\alpha_l,\alpha_r,\alpha_o$ | 要求提交值与其 $\alpha$-移位一致 | 偷偷改写多项式的系数与结构 |
| $\beta$ | 构造跨运算的一致性校验值 $Z$ | 同一个变量在不同运算里被赋成不同值 |
| $\gamma$ | 只公开 $g^{\beta\gamma}$ 与 $g^{\gamma}$，不公开 $\beta,\gamma$ 本身 | 证明者改动一边后精确补上另一边，绕过一致性检查 |
| $\delta_l,\delta_r,\delta_o$ | 随机化：$L'(x)=L(x)+\delta_l t(x)$，同理 $R',O'$ | **不是防作弊，而是实现零知识** |

最后一行尤其关键，它揭示了零知识的真正机制：**零知识不是“把数藏起来”，而是加一个在真实约束点上恒为 0 的随机倍式**——因为 $t(i)=0$，扰动不改变约束是否成立，却让原多项式的取值不可辨认。

### 3.6 公开输入与秘密输入如何合并

变量最终分成两组：

- **验证者负责**：公开输入、公开输出，以及固定的常量 $v_{one}=1$；
- **证明者负责**：秘密输入与所有中间变量。

验证者用自己的输入直接算出他那部分的多项式贡献（第 0 项代表常量 1）：

$$
g_l^{L_v(s)} = g_l^{l_0(s)}\cdot\prod_{i=1}^{m}\left(g_l^{l_i(s)}\right)^{v_i}
$$

证明者提交自己的部分 $g_l^{L_p(s)},\,g_r^{R_p(s)},\,g_o^{O_p(s)}$。两部分在群上相乘即自动相加：

$$
g_l^{L_v(s)}\cdot g_l^{L_p(s)}
= g_l^{L_v(s)+L_p(s)}
= g_l^{L(s)}
$$

因此最终被验证的，确实是“验证者指定的公开输入 + 证明者提交的秘密部分”之和——公开输入被正确地钉进了计算，无法被证明者事后篡改。

## 4. 一个最小例子（直觉版）

用文字示意，不求数值严密：

> 命题：我知道一个数 $x$，使得 $x^3 + x + 5 = 35$。（$x=3$ 是解，但我**不想告诉你 $x=3$**。）

按上面的框架：

1. 把等式改写成多项式 $p(X)=X^3+X+5-35$，秘密 $x$ 是它的根。
2. 通过 QAP，把“我对 $x$ 的求值满足电路”转换成“某个多项式能被目标多项式整除”。
3. 用同态承诺在密文态下给出该多项式在随机点 $s$ 上的取值与商。
4. 验证者用配对检查一个点上的等式：成立，则相信“你确实知道这样的 $x$”；且整个过程里他没有看到 $x$ 本身。

这就是“证明你知道，却不暴露你知道什么”。

## 5. 局限与现实

**不抗量子：**

zk-SNARK 依赖椭圆曲线离散对数与双线性配对，在量子计算机（Shor 算法）下是可破解的。抗量子的替代路线是 **STARK**（基于哈希/纠错码，且无需可信设置），但证明体积通常更大。

**可信设置是软肋：**

Groth16 等经典方案需要**每个程序单独做一次**可信设置；一旦有毒废料泄漏，整个系统的“知识性”就崩塌。

**证明开销仍高：**

生成证明比直接执行计算慢很多（涉及大数多点标量乘法 MSM、FFT 等），需要专门的硬件与算法优化。

**工程易错：**

把业务“编译成电路”本身就很容易出错——一个未被约束的变量，可能让攻击者构造出“假的真证明”。这也是审计与形式化验证在 ZK 项目里格外重要的原因。

## 6. 形式化定义、可运行实现与 Groth16 验证式

前面是直觉，这里给出能让实现者直接落地的形式化表述与代码。一个 zk-SNARK 是三元组 $(\mathsf{Setup}, \mathsf{Prove}, \mathsf{Verify})$，其中关系 $R$ 刻画“语句—见证”的配对 $(stmt, wit)\in R$。

### 6.1 形式化安全定义

**完备性（Completeness）：**

对任意 $(stmt, wit)\in R$，都有

$$
\Pr\!\left[\ \mathsf{Verify}(vk, stmt, \mathsf{Prove}(pk, stmt, wit)) = 1\ \right] = 1
$$

**知识可靠性 / 知识性（Knowledge Soundness / PoK）：**

存在 PPT 抽取器 $E$，使得对任意 PPT 证明者 $P^*$：只要它输出一个被接受的证明 $\pi$，$E$ 就能从交互记录中还原出见证 $wit$。等价地，**无解语句被接受**的概率可忽略：

$$
\Pr\!\left[\ \mathsf{Verify}(vk, stmt, \pi)=1 \ \land\ \nexists\,wit.\ (stmt,wit)\in R\ \right] \le \mathrm{negl}(\lambda)
$$

因为名字里是 **Argument**，这个安全性只在**计算意义**下成立（敌手算力受限），而非信息论意义上的无条件成立。

**零知识（Zero-Knowledge）：**

存在 PPT 模拟器 $S$，使得对任意 PPT 验证者 $V^*$，真实交互的视野分布与 $S(1^\lambda, stmt)$ 的输出分布**计算不可区分**：

$$
\big\{\ \mathrm{view}_{V^*}\big(\langle P(wit), V^*(stmt)\rangle\big)\ \big\} \;\approx_c\; \big\{\ S(1^\lambda, stmt)\ \big\}
$$

即验证者除了“$stmt$ 为真”之外学不到任何额外信息。

### 6.2 知识系数假设（KCA）

这是“ARgument of **Knowledge**”这一条的形式化根基（d-KCA 的简化表述）。

**Setup**：随机选 $s,\alpha \xleftarrow{\$} \mathbb{F}_p^*$，公开群元素

$$
\mathcal{G} = \big\{\ g^{s^i},\ g^{\alpha s^i}\ \big\}_{i=0}^{d}
$$

**假设**：若敌手输出一对 $(a,b)\in \mathbb{G}_1$ 满足

$$
a = g^{p(s)},\qquad b = g^{\alpha p(s)} = a^{\alpha}
$$

其中 $p$ 是某个（对验证者未知、）次数 $\le d$ 的多项式，则存在一个抽取器能从 $(a,b)$ 还原出 $p$ 的系数（也就是见证）。在 QAP 场景下用到的是 **d-KCA**：证明者把成百上千个这样的对做线性组合，假设保证它“确实知道”对应的多项式组合——这正是强迫证明者在**所有门**上使用**同一个**见证 $w$ 的机制。

### 6.3 Schnorr 知识证明：最小的真 ZKP（积木）

在 SNARK 之前，最简单的零知识知识证明（离散对数）已经集齐了 ZK + PoK 两大属性，其结构也是后续 Fiat–Shamir 的种子：

- 公开：群 $\mathbb{G}$、生成元 $g$、承诺 $h=g^x$（$x$ 为秘密）
- 证明者随机选 $r$，发送 $t = g^r$
- 验证者发送随机挑战 $c$
- 证明者发送 $s = r + c\cdot x \pmod q$
- 验证：$g^s \stackrel{?}{=} t \cdot h^{c}$

**零知识**：模拟器随机选 $c,s$，令 $t = g^s \cdot h^{-c}$，得到与真实交互同分布的 $(t,c,s)$。
**知识性**：抽取器拿到同一 $t$ 下的两个挑战不同的 transcript $(t,c,s)$ 与 $(t,c',s')$，直接解出 $x = (s-s')\cdot(c-c')^{-1} \pmod q$。

这种“承诺—挑战—响应”（Σ 协议）正是 zk-SNARK Interactive 形式的雏形；后面用 Fiat–Shamir 把 $c$ 换成 $\mathcal{H}(\text{transcript})$ 即去除交互。

### 6.4 QAP 形式化与可运行 Python 实现

**R1CS → QAP（公式）**：给定含 $m$ 个门的电路，每个门 $k\in\{1,\dots,m\}$ 对应向量 $(A_k, B_k, C_k)$。对每个变量下标 $j$，用 Lagrange 插值得到多项式 $A_j(x),B_j(x),C_j(x)$ 满足 $A_j(k)=A_k[j]$。对见证 $w$ 定义

$$
A(x)=\sum_j w_j A_j(x),\quad B(x)=\sum_j w_j B_j(x),\quad C(x)=\sum_j w_j C_j(x)
$$

目标多项式 $t(x)=\prod_{k=1}^{m}(x-k)$。则电路被正确执行 **当且仅当**

$$
A(x)\,B(x) - C(x) \text{ 能被 } t(x) \text{ 整除，即 } = h(x)\,t(x)
$$

下面是一段可直接运行的 Python：在有限域上完成 R1CS→QAP 转换，并对“我知道 $x$ 使 $x^3+x+5=35$”（$x=3$）做整除检验与单点 Schwartz–Zippel 检验。

```python
# 玩具 zk-SNARK 的 QAP 内核：R1CS -> QAP -> 整除/单点检验
# 目标电路: y = x^3 + x + 5, 私密输入 x=3, 公开输出 y=35
import functools

P = 0x30644E72E131A029B85045B68181585D2833E84879B9709143E1F593F0000001  # bn254 标量域(仅作模数)

def inv(a): return pow(a % P, -1, P)
def eval_poly(coeffs, x):  # coeffs: 低次->高次
    return sum(c * pow(x, i, P) for i, c in enumerate(coeffs)) % P
def polymul(a, b):
    c = [0] * (len(a) + len(b) - 1)
    for i, ai in enumerate(a):
        for j, bj in enumerate(b):
            c[i + j] = (c[i + j] + ai * bj) % P
    return c
def polyadd(a, b):
    return [( (a[i] if i < len(a) else 0) + (b[i] if i < len(b) else 0) ) % P
            for i in range(max(len(a), len(b)))]
def polydivmod(A, B):  # A = Q*B + R (模 P)
    A, B = list(A), [c for c in B if c or True]
    while len(B) > 1 and B[-1] == 0: B.pop()
    while len(A) > 1 and A[-1] == 0: A.pop()
    dA, dB = len(A) - 1, len(B) - 1
    if dA < dB: return [0], A
    Q = [0] * (dA - dB + 1)
    while dA >= dB and not (len(A) == 1 and A[0] == 0):
        coef = (A[-1] * inv(B[-1])) % P
        deg = dA - dB
        term = [0] * deg + [(c * coef) % P for c in B]
        Q[deg] = (Q[deg] + coef) % P
        A = [(A[i] - term[i]) % P for i in range(len(A))]
        while len(A) > 1 and A[-1] == 0: A.pop()
        dA = len(A) - 1
    return Q, A

# ---- R1CS: 变量 w = [1, x, x^2, x^3, x^3+x, y] (长度6) ----
# 门(插值点 x=1..4), 每行为 (A, B, C) 向量
gates = [
    ([0,1,0,0,0,0],[0,1,0,0,0,0],[0,0,1,0,0,0]),  # w2 = x*x
    ([0,0,1,0,0,0],[0,1,0,0,0,0],[0,0,0,1,0,0]),  # w3 = w2*x
    ([0,1,0,1,0,0],[1,0,0,0,0,0],[0,0,0,0,1,0]),  # w4 = w3 + x
    ([5,0,0,0,1,0],[1,0,0,0,0,0],[0,0,0,0,0,1]),  # y  = w4 + 5
]
n_vars, n_gates = 6, 4
X = list(range(1, n_gates + 1))

def lagrange(vec):  # 在 X 上插值, 返回低次->高次系数
    poly = [0] * n_gates
    for i, xi in enumerate(X):
        num = [1]; den = 1
        for j, xj in enumerate(X):
            if j == i: continue
            num = polymul(num, [(-xj) % P, 1])
            den = (den * (xi - xj)) % P
        coef = (vec[i] * inv(den)) % P
        poly = polyadd(poly, [(c * coef) % P for c in num])
    return poly

x = 3
w = [1, x, x*x, x**3, x**3 + x, x**3 + x + 5]  # = [1,3,9,27,30,35]

Aj = [lagrange([g[0][j] for g in gates]) for j in range(n_vars)]
Bj = [lagrange([g[1][j] for g in gates]) for j in range(n_vars)]
Cj = [lagrange([g[2][j] for g in gates]) for j in range(n_vars)]

A = functools.reduce(polyadd, [polymul([w[j]], Aj[j]) for j in range(n_vars)])
B = functools.reduce(polyadd, [polymul([w[j]], Bj[j]) for j in range(n_vars)])
C = functools.reduce(polyadd, [polymul([w[j]], Cj[j]) for j in range(n_vars)])

t = [24, -50, 35, -10, 1]  # (x-1)(x-2)(x-3)(x-4) = x^4-10x^3+35x^2-50x+24
ABmC = polyadd(polymul(A, B), [(-c) % P for c in C])
Q, R = polydivmod(ABmC, t)
print("余式 R(应全为0):", [r % P for r in R])
print("整除成立(有效见证):", all(r % P == 0 for r in R))

# Schwartz-Zippel 单点检验: 随机点 s 上 A(s)B(s)-C(s) == Q(s)t(s)
s = 1234567
lhs = (eval_poly(A, s) * eval_poly(B, s) - eval_poly(C, s)) % P
rhs = (eval_poly(Q, s) * eval_poly(t, s)) % P
print("单点检验通过:", lhs == rhs)
```

实际运行输出（Python 3 标准库，无需任何第三方依赖）：

```text
余式 R(应全为0): [0]
整除成立(有效见证): True
单点检验通过: True
```

注意：这段脚本只演示 QAP 背后的**代数**（整除与单点检验），全程没有隐藏 $A,B,C,Q$ 的取值，因此它本身**不是**零知识协议。真正的 SNARK 在椭圆曲线上用同态承诺与配对完成同一个等式，才同时获得零知识与简洁性。

关键输出是：`R` 应全为 0（整除成立，证明这是有效见证），且 Schwartz–Zippel 单点检验 `lhs == rhs` 通过。在真实 SNARK 中，证明者不再明文发送 $A,B,C,Q$，而是发送它们在椭圆曲线上的**同态承诺**，验证者用双线性配对在密态下完成这一等式检验——下面给出这一最终形式。

### 6.5 协议层的三个验证检查

第 6.4 节只验证了 QAP 的**代数**（整除关系）。真实协议还要在配对层再查三件事，缺一不可。下面沿用 3.5 节的记号 $g_l=g^{\rho_l},g_r=g^{\rho_r},g_o=g^{\rho_o}$，$L,R,O$ 为证明者提交的多项式在秘密点 $s$ 处的取值。

**① 结构检查：左/右/输出没被互换，结构没被改写**

$$
e(g_l^{L},\,g^{\alpha_l}) = e(g_l^{\alpha_l L},\,g)
$$

右操作数与输出各有一条同类检查。它保证提交的两个群元素确实对应**同一个** $L$：若证明者改了系数却造不出对应的 $\alpha$-移位，等式立刻崩溃。

**② 变量一致性检查：同一个变量在各处取值相同**

$$
e(g_l^{L}\,g_r^{R}\,g_o^{O},\,g^{\beta\gamma}) = e(g_Z,\,g^{\gamma})
$$

其中 $Z=\beta(\rho_l L+\rho_r R+\rho_o O)$。它强迫证明者在**所有门**上使用同一份 witness，防止“这个门用 $a$、那个门用 $a'$”这类各说各话的攻击。

**③ 计算正确性检查：QAP 关系成立**

$$
e(g_l^{L},\,g_r^{R}) = e(g_o^{t(s)},\,g^{h(s)})\cdot e(g_o^{O},\,g)
$$

从指数上看，它正是

$$
\rho_l\rho_r\,LR = \rho_o\,(t\,h + O)
\;\Longleftrightarrow\;
LR - O = t\,h
$$

**一个高频误读**：左边的 $e(g_l^L,\,g_r^R)$ 是**配对**——两个指数在指数上相乘，才得到 $L\times R$。若误写成 $e(g_l^L g_r^R,\,g)$，第一参数是**群元素相乘**（指数相加，得 $\rho_l L+\rho_r R$），含义完全不同。这两者务必分清：

$$
g^a\cdot g^b = g^{a+b}\quad(\text{群乘：指数相加}),
\qquad
e(g^a,\,g^b) = e(g,g)^{ab}\quad(\text{配对：指数相乘})
$$

只有后者才会产生 $L\times R$——这正是“乘法门”能被验证的原因。

### 6.6 Groth16 验证式（配对）

Groth16 是目前最紧凑的 zk-SNARK。给定验证密钥 $vk=(\alpha,\beta,\gamma,\delta,\{L_i\})$ 与公开输入 $l_i$，证明 $\pi=(A\in\mathbb{G}_1,\,B\in\mathbb{G}_2,\,C\in\mathbb{G}_1)$，验证等式为（其中 $L=\sum_i l_i L_i$ 已并入常数项 $l_0=1$）：

$$
e(A,\,B) \;=\; e\!\left(\alpha,\,\beta\right)\;\cdot\; e\!\left(\sum_i l_i L_i,\;\gamma\right)\;\cdot\; e\!\left(C,\,\delta\right)
$$

其中 $e:\mathbb{G}_1\times\mathbb{G}_2\to\mathbb{G}_T$ 是双线性配对。这一等式把“多项式整除关系 + 知识性 + 零知识”一次性压缩成**一次配对乘积**：证明仅 3 个群元素、验证只需 3 次配对——这正是 zk-SNARK “Succinct” 的集中体现。工程实现通常借助 `py_ecc`(bn128/bls12-381)、`arkworks` 或 `circom`+`snarkjs` 完成有限域与配对运算，并用第 3.4 节“可信设置”中的 MPC 仪式生成可信参数。

## 7. 小结

**一句话总结：**

zk-SNARK 把“计算正确”翻译成“一个多项式的整除关系”，用 Schwartz–Zippel 引理把整段计算压成“一个点的等式”，用同态承诺加双线性配对在密态下验证，再用 Fiat–Shamir 变换去掉交互。它的美，在于把看似毫不相干的几块数学（多项式、配对、哈希、代数几何）缝合成一个又短又快的证明。

它也因此成为区块链扩容（Rollup）、隐私交易、链上身份与可验证 AI 推理的底层支柱。理解了“为什么这样设计”，再看各种 zk 项目，就不会再觉得那是个无法拆开的黑盒。

**组件速查表**（读完全文可回头对照，不必死记每一个指数）：

| 组件 | 作用 |
|---|---|
| $L,R,O$ | 记录每个运算的左操作数、右操作数、输出 |
| $t(x)$ | 目标多项式，在所有运算位置 $x=i$ 处为 0 |
| $h(x)$ | 商多项式，见证 $LR-O$ 能被 $t$ 整除 |
| $s$ | 隐藏的多项式求值点 |
| $\rho_l,\rho_r,\rho_o$ | 区分左、右、输出三种位置 |
| $\alpha_l,\alpha_r,\alpha_o$ | 防止多项式结构被篡改 |
| $\beta$ | 检查变量值跨运算一致 |
| $\gamma$ | 保护 $\beta$ 的一致性检查 |
| $\delta_l,\delta_r,\delta_o$ | 随机扰动，实现零知识 |
| 配对 $e$ | 在不知道明文指数的情况下检查关系 |

```mermaid
flowchart LR
    A["计算（程序）"] --> B["算术电路 / R1CS"]
    B --> C["QAP：多项式整除关系"]
    C --> D["同态承诺 + 配对：密态验证"]
    D --> E["Schwartz-Zippel：单点检验"]
    E --> F["Fiat-Shamir：去交互"]
    F --> G["zk-SNARK 证明"]
    style A fill:#e3f2fd
    style G fill:#e8f5e9
```

---

## 参考资料

**一、本文主要参考的中文译本与系列**

- Maksym Petkus, *Why and How zk-SNARK Works*（英文原文）
- 安比实验室 even 译本（2020）：《Why and How zk-SNARK Works》中文版
- 当前简体中文重译版（zyw271828）：《zk-SNARK 为什么以及如何工作》— <https://zyw271828.github.io/wahzw-zh-cn/index.html>（及其[参考文献页](https://zyw271828.github.io/wahzw-zh-cn/references.html)）
- 本系列：[现代密码学发展](ModernCryptography.md)（零知识证明简述）、[KZG 多项式承诺](KZG.md)（本文 6.5 / 6.6 节配对验证背后的承诺层）、[密码协议与应用](ProtocolAndApplication.md)

**二、原始文献与延伸阅读**（沿用该译本的参考文献编号，便于对照原书）

**理论基础与定义**

- **[GMR85]** S. Goldwasser, S. Micali, C. Rackoff. *The Knowledge Complexity of Interactive Proof-systems*. STOC ’85, pp. 291–304. [doi:10.1145/22145.22178](http://doi.acm.org/10.1145/22145.22178)
- **[BFM88]** M. Blum, P. Feldman, S. Micali. *Non-interactive Zero-knowledge and Its Applications*. STOC ’88, pp. 103–112. [doi:10.1145/62212.62222](http://doi.acm.org/10.1145/62212.62222)
- **[Dam91]** I. Damgård. *Towards practical public key systems secure against chosen ciphertext attacks*. CRYPTO ’91, pp. 445–456.（知识系数假设 KCA 的来源）
- **[DBS04]** R. Dutta, R. Barua, P. Sarkar. *Pairing-Based Cryptographic Protocols: A Survey*. [ePrint 2004/064](https://eprint.iacr.org/2004/064)
- **[JSI96]** M. Jakobsson, K. Sako, R. Impagliazzo. *Designated verifier proofs and their applications*. EUROCRYPT ’96, pp. 143–154.

**核心构造（QAP / Pinocchio / Groth16）**

- **[Bit+11]** N. Bitansky, R. Canetti, A. Chiesa, E. Tromer. *From Extractable Collision Resistance to Succinct Non-Interactive Arguments of Knowledge, and Back Again*. [ePrint 2011/443](https://eprint.iacr.org/2011/443)
- **[Gen+12]** R. Gennaro, C. Gentry, B. Parno, M. Raykova. *Quadratic Span Programs and Succinct NIZKs without PCPs*（QAP/GGPR）. [ePrint 2012/215](https://eprint.iacr.org/2012/215)
- **[Ben+13]** E. Ben-Sasson, A. Chiesa, E. Tromer, M. Virza. *Succinct Non-Interactive Zero Knowledge for a von Neumann Architecture*. [ePrint 2013/879](https://eprint.iacr.org/2013/879)
- **[Par+13]** B. Parno, C. Gentry, J. Howell, M. Raykova. *Pinocchio: Nearly Practical Verifiable Computation*. [ePrint 2013/279](https://eprint.iacr.org/2013/279)
- **[Ben+14]** E. Ben-Sasson et al. *Zerocash: Decentralized Anonymous Payments from Bitcoin*. [ePrint 2014/349](https://eprint.iacr.org/2014/349)
- **[Gro10]** J. Groth. *Short pairing-based non-interactive zero-knowledge arguments*. ASIACRYPT 2010, pp. 321–340.
- **[Gro16]** J. Groth. *On the Size of Pairing-based Non-interactive Arguments*（Groth16）. [ePrint 2016/260](https://eprint.iacr.org/2016/260)

**扩展、变体与可信设置**

- **[GM17]** J. Groth, M. Maller. *Snarky Signatures: Minimal Signatures of Knowledge from Simulation-Extractable SNARKs*. [ePrint 2017/540](https://eprint.iacr.org/2017/540)
- **[DK18]** A. Deshpande, Y. Kalai. *Proofs of Ignorance and Applications to 2-Message Witness Hiding*. [ePrint 2018/896](https://eprint.iacr.org/2018/896)
- **[Gro+18]** J. Groth, M. Kohlweiss, M. Maller, S. Meiklejohn, I. Miers. *Updatable and Universal Common Reference Strings with Applications to zk-SNARKs*. [ePrint 2018/280](https://eprint.iacr.org/2018/280)
- **[Bün+17]** B. Bünz et al. *Bulletproofs: Short Proofs for Confidential Transactions and More*. [ePrint 2017/1066](https://eprint.iacr.org/2017/1066)
- **[Ben+18]** E. Ben-Sasson, I. Bentov, Y. Horesh, M. Riabzev. *Scalable, transparent, and post-quantum secure computational integrity*（STARK）. [ePrint 2018/046](https://eprint.iacr.org/2018/046)
- **[Mal+19]** M. Maller, S. Bowe, M. Kohlweiss, S. Meiklejohn. *Sonic: Zero-Knowledge SNARKs from Linear-Size Universal and Updateable Structured Reference Strings*. [ePrint 2019/099](https://eprint.iacr.org/2019/099)
- **[Wil16]** Z. Wilcox. *The Design of the Ceremony*（Zcash 可信设置仪式）. [z.cash/blog/the-design-of-the-ceremony](https://z.cash/blog/the-design-of-the-ceremony/)

**教程、科普与数学基础**

- **[Rei16]** C. Reitwiessner. *zkSNARKs in a Nutshell*. [blog.ethereum.org/2016/12/05/zksnarks-in-a-nutshell](https://blog.ethereum.org/2016/12/05/zksnarks-in-a-nutshell/)
- **[But16]** V. Buterin. *Quadratic Arithmetic Programs: from Zero to Hero*. [medium.com/@VitalikButerin/quadratic-arithmetic-programs-from-zero-to-hero-f6d558cea649](https://medium.com/@VitalikButerin/quadratic-arithmetic-programs-from-zero-to-hero-f6d558cea649)
- **[But17]** V. Buterin. *zk-SNARKs: Under the Hood*. [medium.com/@VitalikButerin/zk-snarks-under-the-hood-b33151a013f6](https://medium.com/@VitalikButerin/zk-snarks-under-the-hood-b33151a013f6)
- **[Gab17]** A. Gabizon. *Explaining SNARKs*. [z.cash/blog/snark-explain](https://z.cash/blog/snark-explain/)
- **[con18]** Wikipedia contributors. *Constraint satisfaction*. [Wikipedia](https://en.wikipedia.org/wiki/Constraint_satisfaction)
- **[Pik13]** S. Pike. *Evaluating Polynomial Functions*. [mesacc.edu](http://www.mesacc.edu/~scotz47781/mat120/notes/polynomials/evaluating/evaluating.html)
- **[Pik14]** S. Pike. *Dividing by a Polynomial*. [mesacc.edu](http://www.mesacc.edu/~scotz47781/mat120/notes/divide_poly/long_division/long_division.html)
