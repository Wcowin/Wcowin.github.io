---
title: 数论基础
tags:
  - 密码学
---

# 数论基础

数论是密码学的基础学科之一，许多现代加密算法（如RSA、AES、ECC等）都依赖于数论中的基本概念和算法。作者总结了密码学常用的数论知识（不分前后顺序）。

## 1. 基础概念

- **整除**：若存在整数 $k$，使 $a = bk$，则称 $b$ 整除 $a$，记作 $b|a$。例如 $12|36$， $36=12\times3$。
- **质数**：大于1且只有1和自身两个正因子的整数。如2, 3, 5, 7等。质数在加密算法中常用于密钥生成。
- **合数**：大于1且除了1和自身外还有其他因子的整数。如4, 6, 8等。
- **互质**：若 $\gcd(a, b) = 1$，则称 $a$ 和 $b$ 互质。例如 $8$ 和 $15$ 互质。
- **同余**：若 $a-b$ 能被 $m$ 整除，记作 $a \equiv b \pmod{m}$。例如 $17 \equiv 5 \pmod{12}$。
- **取模**：$a \bmod m$ 表示 $a$ 除以 $m$ 的余数。例如 $17 \bmod 12 = 5$。

**同余的性质：**

- 若 $a \equiv b \pmod{m}$，$c \equiv d \pmod{m}$，则 $a+c \equiv b+d \pmod{m}$，$ac \equiv bd \pmod{m}$。

- 幂运算：$a \equiv b \pmod{m}$，则 $a^k \equiv b^k \pmod{m}$。

---

## 2. 欧几里得算法

用于求两个整数 $a, b$ 的最大公约数（gcd）。基本思想是 $\gcd(a, b) = \gcd(b, a \bmod b)$，递归直到余数为0。

**示例：**
$\gcd(48, 18) = \gcd(18, 12)$
$ = \gcd(12, 6) = \gcd(6, 0) = 6$

**伪代码：**
```python
def gcd(a, b):
    while b != 0:
        a, b = b, a % b
    return a
```

**应用：**

- 判断两个数是否互质
- 计算分数最简形式
- RSA密钥生成

---

## 3. 扩展欧几里得算法

在求 $\gcd(a, b)$ 的同时，找到整数 $x, y$ 使 $ax + by = \gcd(a, b)$。常用于求模逆元。

**递推关系：**
若 $b \neq 0$，则 $ax + by = bx' + (a \bmod b)y'$，可递归求解。

**伪代码：**
```python
def exgcd(a, b):
    if b == 0:
        return a, 1, 0
    d, x1, y1 = exgcd(b, a % b)
    x, y = y1, x1 - (a // b) * y1
    return d, x, y
```
例题：求（963,657）
![image](https://s1.imagehub.cc/images/2025/05/07/f4652d93abcd1ede83177f4905c04678.png)

**应用：**

- 求解 $ax \equiv 1 \pmod{m}$ 的逆元
- 解线性同余方程 $ax \equiv b \pmod{m}$

---

## 4. 费马小定理

若 $p$ 为质数，且 $a$ 与 $p$ 互质，则 $a^{p-1} \equiv 1 \pmod{p}$。常用于素性检验和逆元计算。

**推论：**

- $a^p \equiv a \pmod{p}$
- 若 $a$ 不是 $p$ 的倍数，则 $a^{p-2} \equiv a^{-1} \pmod{p}$

**应用：**

- 素性测试（Miller-Rabin等）
- 计算模逆元（$m$为质数时）

---

## 5. 欧拉函数

欧拉函数 $\varphi(n)$ 表示小于等于 $n$ 且与 $n$ 互质的正整数个数。

- 若 $n = p_1^{k_1}p_2^{k_2}\cdots p_r^{k_r}$，则
  $\varphi(n) = n \prod_{i=1}^r (1 - \frac{1}{p_i})$

**性质：**

- 若 $p$ 为质数，$\varphi(p) = p-1$
- 若 $p$ 为质数，$\varphi(p^k) = p^k - p^{k-1}$
- 若 $m, n$ 互质，$\varphi(mn) = \varphi(m)\varphi(n)$

**例子：**
$\varphi(12)$：$12 = 2^2 \times 3^1$，所以 $\varphi(12) = 12 \times (1-\frac{1}{2}) \times (1-\frac{1}{3})$
$= 12 \times \frac{1}{2} \times \frac{2}{3} = 4$

---

## 6. 欧拉降幂

欧拉定理：若 $\gcd(a, n) = 1$，则 $a^{\varphi(n)} \equiv 1 \pmod{n}$。
降幂公式：$a^b \equiv a^{b \bmod \varphi(n)} \pmod{n}$（$a$ 与 $n$ 互质时）。

**应用：**

- 简化大指数的模运算
- 解决循环节问题

**例子：**
$3^{100} \bmod 7$，$\varphi(7)=6$，$100 \bmod 6 = 4$，所以 $3^{100} \equiv 3^4 \equiv 81 \equiv 4 \pmod{7}$

---

## 7. 素数筛

用于高效筛选一定范围内的所有质数。

- **埃拉托斯特尼筛法**：依次标记每个质数的倍数为合数。
- **欧拉筛法**：每个合数只被其最小质因子筛去一次，时间复杂度 $O(n)$。

**埃氏筛伪代码：**
```python
N = 100
is_prime = [True] * (N+1)
is_prime[0] = is_prime[1] = False
for i in range(2, int(N**0.5)+1):
    if is_prime[i]:
        for j in range(i*i, N+1, i):
            is_prime[j] = False
```

**欧拉筛伪代码：**
```python
N = 100
is_prime = [True] * (N+1)
primes = []
for i in range(2, N+1):
    if is_prime[i]:
        primes.append(i)
    for p in primes:
        if i * p > N:
            break
        is_prime[i*p] = False
        if i % p == 0:
            break
```

---

## 8. 快速幂

高效计算 $a^b \bmod m$ 的算法。利用二进制分解指数，递归或迭代实现，复杂度 $O(\log b)$。

**例题：**
计算 $7^{222} \bmod 13$。

**解题步骤：**

1. 设 $a = 7$，$b = 222$，$m = 13$。
2. 使用快速幂算法（见下方代码）。
3. 计算过程（部分步骤）：
   - $222$ 的二进制为 $11011110$。
   - 依次平方取模，遇到二进制位为 $1$ 时累乘。
4. 结果：$7^{222} \bmod 13 = 9$。

**代码实现：**
```python
def qpow(a, b, m):
    res = 1
    a = a % m
    while b > 0:
        if b & 1:
            res = res * a % m
        a = a * a % m
        b >>= 1
    return res

print(qpow(7, 222, 13))  # 输出 9
```

**应用：**

- 大数幂模运算
- 计算逆元（结合费马小定理）

---

## 9. 模逆元及其求法

模逆元 $a^{-1}$ 满足 $a a^{-1} \equiv 1 \pmod{m}$，$a$ 与 $m$ 互质时存在。

- **扩展欧几里得法**：解 $ax + my = 1$，$x$ 即为逆元。
- **费马小定理**（$m$ 为质数）：$a^{-1} \equiv a^{m-2} \pmod{m}$。
- **欧拉定理**（$a, m$ 互质）：$a^{-1} \equiv a^{\varphi(m)-1} \pmod{m}$。

**例子：**
求 $3$ 在模 $11$ 下的逆元。

法一：
$3^{11-2} = 3^9 = 19683 \bmod 11 = 4$，所以 $3^{-1} \equiv 4 \pmod{11}$

法二：
$11=3\times3+2$，$3=2+1$,$1=3-(11-3\times3)$，$1=4\times3-11$，所以 $4$ 是 $3$ 在模 $11$ 下的逆元。

**应用：**

- 模意义下的“除法”运算
- 求解线性同余方程
- RSA解密

---

## 10. 中国剩余定理（CRT）

用于解同余方程组：

$$
\begin{cases}
x \equiv a_1 \pmod{m_1} \\
x \equiv a_2 \pmod{m_2} \\
\cdots \\
x \equiv a_k \pmod{m_k}
\end{cases}
$$

其中 $m_i$ 两两互质。
唯一解为 $x \equiv \sum_{i=1}^k a_i M_i M_i^{-1} \pmod{M}$，$M = \prod m_i$，$M_i = M/m_i$，$M_i^{-1}$ 为 $M_i$ 关于 $m_i$ 的逆元。

**例子：**

$$
\begin{cases}
x \equiv 2 \pmod{3} \\
x \equiv 3 \pmod{5} \\
x \equiv 2 \pmod{7}
\end{cases}
$$

$M=105=3\times5\times7$，$M_1=35=5\times7$，$M_2=21=3\times7$，$M_3=15=3\times5$

计算逆元：
- $M_1^{-1} \equiv 35^{-1} \pmod{3}$：$35 \equiv 2 \pmod{3}$，$2 \times 2 = 4 \equiv 1 \pmod{3}$，所以 $M_1^{-1} = 2$
- $M_2^{-1} \equiv 21^{-1} \pmod{5}$：$21 \equiv 1 \pmod{5}$，所以 $M_2^{-1} = 1$  
- $M_3^{-1} \equiv 15^{-1} \pmod{7}$：$15 \equiv 1 \pmod{7}$，所以 $M_3^{-1} = 1$

$x \equiv 2\times35\times2 + 3\times21\times1 + 2\times15\times1 \pmod{105}$

$= 140+63+30=233 \equiv 23 \pmod{105}$

**应用：**

- RSA加速（CRT优化解密）
- 多模数系统

---

## 11. 二次剩余

在模 $p$（$p$ 为奇素数）意义下，若存在整数 $x$ 使 $x^2 \equiv a \pmod{p}$，则称 $a$ 是模 $p$ 的**二次剩余**，否则称为**二次非剩余**。

### Legendre 符号

Legendre 符号 $\left(\frac{a}{p}\right)$ 用于判断 $a$ 是否为模 $p$ 的二次剩余：

- $\left(\frac{a}{p}\right) = 1$，若 $a$ 是模 $p$ 的二次剩余且 $a \not\equiv 0 \pmod{p}$
- $\left(\frac{a}{p}\right) = -1$，若 $a$ 是模 $p$ 的二次非剩余
- $\left(\frac{a}{p}\right) = 0$，若 $a \equiv 0 \pmod{p}$

### 欧拉判别法

欧拉判别法用于计算 Legendre 符号：

$$
\left(\frac{a}{p}\right) \equiv a^{\frac{p-1}{2}} \pmod{p}
$$

- 若 $a^{\frac{p-1}{2}} \equiv 1 \pmod{p}$，则 $a$ 是二次剩余
- 若 $a^{\frac{p-1}{2}} \equiv -1 \pmod{p}$，则 $a$ 是二次非剩余

**例子：**
判断 $5$ 是否为模 $11$ 的二次剩余：

$5^{(11-1)/2} = 5^5 = 3125 \equiv 1 \pmod{11}$，所以 $5$ 是模 $11$ 的二次剩余。

---

## 12. 原根

若 $g$ 是模 $n$ 的原根，则 $g$ 的幂可生成模 $n$ 下所有与 $n$ 互质的数，即 $g$ 的阶为 $\varphi(n)$。

- $g$ 是模 $n$ 的原根 $\iff$ $\forall k \in [1, \varphi(n)-1]$，$g^k \not\equiv 1 \pmod{n}$
- $g^{\varphi(n)} \equiv 1 \pmod{n}$

**例子：**
$2$ 是模 $5$ 的原根，因为 $2^1=2, 2^2=4, 2^3=8\equiv3, 2^4=16\equiv1 \pmod{5}$，$2,4,3,1$ 依次覆盖了 $5$ 的所有非零剩余类。

**原根的存在性：**
只有 $n=2,4,p^k,2p^k$（$p$ 为奇素数）时，模 $n$ 才存在原根。

---

## 13. 最大公约数（gcd）、最小公倍数（lcm）与唯一分解定理

### 最大公约数（gcd）

两个整数 $a, b$ 的最大公约数，记作 $\gcd(a, b)$，是同时整除 $a$ 和 $b$ 的最大正整数。

**性质：**

- $\gcd(a, b) = \gcd(b, a \bmod b)$
- 若 $\gcd(a, b) = 1$，则 $a, b$ 互质

### 最小公倍数（lcm）

两个整数 $a, b$ 的最小公倍数，记作 $\mathrm{lcm}(a, b)$，是能被 $a$ 和 $b$ 同时整除的最小正整数。

$$
\mathrm{lcm}(a, b) = \frac{a \times b}{\gcd(a, b)}
$$

### 唯一分解定理（算术基本定理）

每个大于 $1$ 的整数都可以唯一分解为若干个质数的乘积（不计顺序）。

**形式化表达：**

若 $n > 1$，则存在唯一的质数序列 $p_1 < p_2 < \cdots < p_k$ 和正整数 $a_1, a_2, \ldots, a_k$，使得

$$
n = p_1^{a_1} p_2^{a_2} \cdots p_k^{a_k}
$$

**应用：**

- 计算 $\gcd$ 和 $\mathrm{lcm}$ 的质因数分解法
- RSA 等加密算法的安全性基础

## 结论

数论作为密码学的数学基础，为现代加密算法提供了坚实的理论支撑。从基础的整除、同余概念，到复杂的原根、二次剩余理论，这些数学工具在RSA、ECC、DH等密码算法中发挥着关键作用。

掌握这些数论知识不仅有助于理解现有密码算法的工作原理，更为设计新的密码方案和分析密码系统的安全性提供了必要的数学工具。随着密码学的不断发展，数论在信息安全领域的重要性将持续增长。

## 数论在密码学中的应用总结

| 数论概念 | 主要应用 | 典型算法 |
|----------|----------|----------|
| 大整数分解 | 公钥密码安全性基础 | RSA |
| 离散对数 | 密钥交换、数字签名 | DH, DSA, ECC |
| 模运算 | 加密解密运算 | 所有模运算密码 |
| 欧拉函数 | 密钥生成、安全性分析 | RSA |
| 中国剩余定理 | 加速计算 | RSA-CRT |
| 二次剩余 | 概率加密、零知识证明 | Goldwasser-Micali |
| 原根 | 密钥生成、随机数生成 | DH, ElGamal |

---

## 延伸阅读（本系列）

- [第2章 流密码](Symmetriccryptography.md)、[第3章 分组密码](Groupcipher.md) — 模运算、随机数在对称密码中的应用
- [第4章 非对称密码](Asymmetriccryptography.md) — 欧拉函数、原根、离散对数在 RSA、DH、ECC 中的应用

## 引文

- [Wikipedia: Number theory](https://en.wikipedia.org/wiki/Number_theory)
- [Rosen, Kenneth H.: Elementary Number Theory and Its Applications](https://www.pearson.com/us/higher-education/program/Rosen-Elementary-Number-Theory-and-Its-Applications-6th-Edition/PGM110738.html)
- [Menezes, van Oorschot, Vanstone: Handbook of Applied Cryptography, Chapter 2](http://cacr.uwaterloo.ca/hac/)
- [Shoup, Victor: A Computational Introduction to Number Theory and Algebra](https://shoup.net/ntb/)
- [Hardy, G.H. & Wright, E.M.: An Introduction to the Theory of Numbers](https://global.oup.com/academic/product/an-introduction-to-the-theory-of-numbers-9780199219858)

**本文作者：** [<img class="author-avatar" src="https://s1.imagehub.cc/images/2025/12/06/28380affd86b014a6dcaf082fcc97064.png" width="28" height="28" alt="Wcowin" />](https://github.com/Wcowin)