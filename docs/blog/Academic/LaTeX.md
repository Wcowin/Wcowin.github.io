---
title: LaTeX常用符号整理
tags:
  - Math
---  

# LaTeX常用符号整理

## 希腊字母
| Name       | Display      | Capital Case   | Display      | Var Case      | Display         |
| :---------: | :----------: | :--------------: | :----------: | :------------:  | :-------------: |
| `\alpha`   | $\alpha$     |       `A`         |      $A$        |              |                 |
| `\beta`    | $\beta$      |          `B`      |       $B$       |              |                 |
| `\gamma`   | $\gamma$     | `\Gamma`       | $\Gamma$     |               |        |
| `\theta`   | $\theta$     | `\Theta`       | $\Theta$     | `\vartheta`   | $\vartheta$     |
| `\mu`      | $\mu$        |        `M`        |      $M$        |               |                 |
| `\delta`   | $\delta$     | `\Delta`       | $\Delta$     |               |                 |
| `\epsilon` | $\epsilon$   |       `E`         |      $E$    | `\varepsilon` | $\varepsilon$   |
| `\sigma`   | $\sigma$     | `\Sigma`       | $\Sigma$     | `\varsigma`   | $\varsigma$     |
| `\pi`      | $\pi$        | `\Pi`          | $\Pi$        | `\varpi`      | $\varpi$        |
| `\omega`   | $\omega$     | `\Omega`       | $\Omega$     |               |                 |
| `\xi`      | $\xi$        | `\Xi`          | $\Xi$        |               |                 |
| `\zeta`    | $\zeta$      |        `Z`        |  $Z$            |               |                 |
| `\chi`     | $\chi$       |        `X`        |  $X$            |               |                 |
| `\rho`     | $\rho$       |        `P`        |   $P$          | `\varrho`     | $\varrho$       |
| `\phi`     | $\phi$       | `\Phi`         | $\Phi$       | `\varphi`     | $\varphi$       |
| `\eta`     | $\eta$       |         `H`       | $H$             |               |                 |
| `\lambda`  | $\lambda$    | `\Lambda`      | $\Lambda$    |               |                 |
| `\kappa`   | $\kappa$     |         `K`       | $K$             |          |                 |
| `\nu`      | $\nu$        |         `N`       | $N$             |               |                 |
| `\upsilon` | $\upsilon$   | `\Upsilon`     | $\Upsilon$   |               |                 |
| `\psi`     | $\psi$       | `\Psi`         | $\Psi$       |               |                 |
| `\tau`     | $\tau$       |      `T`          |  $T$            |               |                 |
| `\iota`    | $\iota$      |      `I`          | $I$             |               |                 |
| `\omicron`     | $\omicron$          |      `O`          | $O$             |               |                 |

有代码的大写希腊字母，直接敲获得正体，使用`\var`前缀转化为斜体

如：`\Gamma` $\Gamma$（正） `\varGamma` $\varGamma$（斜）

没有代码的大写希腊字母，直接敲得斜体，使用`\text `命令转化为正体

如：`T` $T$直接敲（斜） `\text T` $\text T$（正）

（也可以使用`\rm`将下一个单词变正，`\text T`的作用范围只是下一个字母；可以尝试加`{}`）

## 运算

### 微分与导数正体

| Type | Typeset |
| :-: | :-: |
|`\mathrm{d}`|$\mathrm{d}$|
|`\mathrm{d}x`|$\mathrm{d}x$|
|`\mathrm{d}y`|$\mathrm{d}y$|

### 简单运算
| Type | Typeset |
| :-: | :-: |
| `+` | $+$ |
| `-` | $-$ |
|`\pm`  | $\pm$ |
|  `\mp`| $\mp$ |
| `\times` | $\times$ |
|`\cdot`  | $\cdot$ |
| `\div` | $\div$ |
| `\bmod` | $\bmod$ |
|  `\cap`| $\cap$ |
|  `\cup`| $\cup$ |
| `\wedge` `\land` | $\land$ |
| `\vee` `\lor` | $\lor$ |
| `\ast` | $\ast$ |
| `\det` | $\det$ |

### 复杂运算

| Type | Typeset |
| :-: | :-: |
|`\sqrt{abc}`  | $\sqrt{abc}$ |
| `\sqrt[n]{abc}` | $\sqrt[n]{abc}$ |
|  `\frac{abc}{xyz}`| $\frac{abc}{xyz}$ |
| `\int_{a}^{b}` | $\int_{a}^{b}$ |
| `\iiint_{a}^{b}` | $\iiint_{a}^{b}$ |
| `\oint_{a}^{b}` | $\oint_{a}^{b}$ |
|`\frac{\mathrm{d} y}{\mathrm{d} x}`|$\frac{\mathrm{d} y}{\mathrm{d} x}$|
|`\frac{\mathrm{d}^{n} y}{\mathrm{d} x^{n}}`|$\frac{\mathrm{d}^{n} y}{\mathrm{d} x^{n}}$|
|`\frac{\partial f}{\partial x}`|$\frac{\partial f}{\partial x}$ |
|`\frac{\partial ^{n} f}{\partial x^{n}}`|$\frac{\partial ^{n} f}{\partial x^{n}}$|
| `\sum_{i=1}^{n}` | $\sum_{i=1}^{n}$ |
| `\prod_{i=1}^{n}` | $\prod_{i=1}^{n}$ |
| `\bigcap_{i=1}^{n}` | $\bigcap_{i=1}^{n}$ |
| `\bigcup_{i=1}^{n}` | $\bigcup_{i=1}^{n}$ |

(想要让角标出现在正上和正下方，使用块级公式而不是行内公式)

### 函数

| Type | Typeset |
| :-: | :-: |
| `\arccos` | $\arccos$ |
| `\arcsin` | $\arcsin$ |
|  `\arctan`| $\arctan$ |
| `\arg` | $\arg$ |
| `\cos` | $\cos$ |
| `\cosh` | $\cosh$ |
| `\cot` | $\cot$ |
| `\coth` | $\coth$ |
| `\csc` | $\csc$ |
| `\deg` | $\deg$ |
| `\dim` | $\dim$ |
| `\exp` | $\exp$ |
| `\gcd` | $\gcd$ |
| `\hom` | $\hom$ |
| `\ker` | $\ker$ |
| `\lg` | $\lg$ |
| `\liminf` | $\liminf$ |
| `\limsup` | $\limsup$ |
| `\ln` | $\ln$ |
| `\log` | $\log$ |
| `\Pr` | $\Pr$ |
| `\sec` | $\sec$ |
| `\sin` | $\sin$ |
| `\sinh` | $\sinh$ |
|`\tan`  | $\tan$ |
|  `\tanh`| $\tanh$ |

### 自定义算子

| Type | Typeset |
| :-: | :-: |
|`\operatorname{diag}`  | $\operatorname{diag}$ |
| `\operatorname{rank}` | $\operatorname{rank}$ |
| `\operatorname{tr}` | $\operatorname{tr}$ |
| `\operatorname{Var}` | $\operatorname{Var}$ |
| `\operatorname{Cov}` | $\operatorname{Cov}$ |
| `\operatorname{sgn}` | $\operatorname{sgn}$ |

### 极限运算符

| Type | Typeset |
| :-: | :-: |
|`\lim`  | $\lim$ |
|  `\inf`| $\inf$ |
|  `\sup`| $\sup$ |
| `\min` | $\min$ |
| `\max` | $\max$ |

## 符号

> 一些键盘上可直接敲出的符号，前面加`\`即可。
>
> 如：`\%` $\to \%$ `\_` $\to \_$

### 点缀

| Type | Typeset |
| :-: | :-: |
|`a^2`|$a^2$|
|`a_1`|$a_1$|
| `\bar{a}` | $\bar{a}$ |
| `\dot{a}` | $\dot{a}$ |
|`\ddot{a}`  | $\ddot{a}$ |
| `\vec{a}` | $\vec{a}$ |
|  `\hat{a}`| $\hat{a}$ |
| `\tilde{a}` | $\tilde{a}$ |
|`\mathring{a}`  | $\mathring{a}$ |
|`f^{''}`|$f^{''}$|
|`90^\circ`|$90^\circ$|
|`\overset{\frown}\psi` | $\overset{\frown}\psi$ |
|`\overset{?}{=}`|$\overset{?}{=}$|
|`\overset{ping}{拼}\overset{yin}{音}` | $\overset{ping}{拼}\overset{yin}{音}$ |
|`\overset{はい}{入}る` | $\overset{はい}{入}る$ |
|`\underset{t\in R}{max}`|$\underset{t\in R}{max}$|

### 二元关系

| Type | Typeset |
| :-: | :-: |
| `<` | $<$ |
| `>` | $>$ |
| `\le` | $\le$ |
| `\ge` | $\ge$ |
| `\leqslant` | $\leqslant$ |
| `\geqslant` | $\geqslant$ |
| `=` | $=$ |
| `\ne` | $\ne$ |
| `:` | $:$  |
| `\in` | $\in$ |
| `\notin` | $\notin$ |
| `\ni` `\owns` | $\ni$ |
| `\ll` | $\ll$ |
| `\gg` | $\gg$ |
| `\sim` | $\sim$ |
| `\approx` | $\approx$ |
| `\cong` | $\cong$ |
| `\equiv` | $\equiv$ |
| `\subset` | $\subset$ |
| `\supset` | $\supset$ |
| `\subseteq`| $\subseteq$ |
| `\subseteqq` | $\subseteqq$ |
| `\subsetneq` | $\subsetneq$ |
| `\subsetneqq`| $\subsetneqq$ |
| `\supseteq` | $\supseteq$ |
| `\supseteqq` | $\supseteqq$ |
| `\supsetneq` | $\supsetneq$ |
| `\supsetneqq` | $\supsetneqq$ |
| `\perp` | $\perp$ |
| `\parallel` | $\parallel$ |
| `\mid` | $\mid$ |
| `\propto` | $\propto$ |
| `\oplus` | $\oplus$ |
| `\ominus` | $\ominus$ |
| `\odot` | $\odot$ |
| `\oslash` | $\oslash$ |
| `\otimes` | $\otimes$ |
| `\vdash` | $\vdash$ |
| `\dashv` | $\dashv$ |
| `\models` | $\models$ |
| `\not<` | $\not<$ |
| `\not=` | $\not=$ |

### Miscellaneous Symbols

| Type | Typeset |
| :-: | :-: |
| `\therefore` | $\therefore$ |
| `\because` | $\because$ |
|`\ell`  | $\ell$ |
|`\partial`  | $\partial$ |
| `\infty` | $\infty$ |
|`\varnothing` `\emptyset`  | $\emptyset$ |
| `\forall` | $\forall$ |
| `\exists` | $\exists$ |
| `\nexists` | $\nexists$ |
| `\triangle` | $\triangle$  |
|`\angle`  | $\angle$ |
|  `\surd`| $\surd$ |
| `\nabla` | $\nabla$ |
| `\hbar` | $\hbar$ |
| `\aleph` | $\aleph$ |
| `\Re` | $\Re$ |
| `\Im` | $\Im$ |
| `\wp` | $\wp$ |
|`\ldots`|$\ldots$|
|`\cdots`  | $\cdots$ |
|  `\vdots`| $\vdots$ |
| `\ddots` | $\ddots$ |
| `\dots` | $\dots$ |
| `\dotsc` | $\dotsc$ |
| `\dotsb` | $\dotsb$ |
| `\dotsm` | $\dotsm$ |
| `\S` | $\S$ |

### 其他

| Type | Typeset |
| :-: | :-: |
| `\mathbb{R}` | $\mathbb{R}$ |
| `\mathbb{C}` | $\mathbb{C}$ |
| `\mathbb{N}` | $\mathbb{N}$ |
| `\mathbb{Z}` | $\mathbb{Z}$ |
| `\mathbb{Q}` | $\mathbb{Q}$ |
| `\mathbb{P}` | $\mathbb{P}$ |
| `\mathbb{H}` | $\mathbb{H}$ |
| `\spadesuit`| $\spadesuit$ |
|  `\heartsuit`| $\heartsuit$ |
| `\diamondsuit` | $\diamondsuit$ |
| `\clubsuit` | $\clubsuit$ |

### 箭头

| Type | Typeset |
| :-: | :-: |
| `\to` `\rightarrow` | $\to$ |
| `\leftarrow` | $\leftarrow$ |
| `\Rightarrow` | $\Rightarrow$ |
| `\Leftarrow` | $\Leftarrow$ |
| `\Longrightarrow` | $\Longrightarrow$ |
| `\Longleftarrow` | $\Longleftarrow$ |
|`\Leftrightarrow`  | $\Leftrightarrow$ |
|`\iff` `\Longleftrightarrow`| $\iff$ |

### 包裹结构

| Type | Typeset |
| :-: | :-: |
| `\overrightarrow{AB}` | $\overrightarrow{AB}$ |
| `\overline{AB}` | $\overline{AB}$ |
|`\underline{abc}`  | $\underline{abc}$ |
|`\tilde{abc}`  | $\tilde{abc}$ |
|`\widetilde{abc}`  | $\widetilde{abc}$ |
|  `\overbrace{abc}`| $\overbrace{abc}$ |
| `\underbrace{abc}` | $\underbrace{abc}$ |

### 括号

### 普通括号

| Type | Typeset |
| :-: | :-: |
| `(` `)` | $(\quad)$ |
| `[` `]` | $[\quad]$ |
|`\lbrace` `\rbrace`  | $\lbrace\quad\rbrace$ |
|`\langle` `\rangle`  | $\langle\quad\rangle$ |

使用`\left \(`和`\right \}`打出大的包裹括号. 用`.`代替括号可以空出来一半的括号

### 绝对值/范数

| Type | Typeset |
| :-: | :-: |
|`\left\lvert a \right\rvert`|$\left\lvert a \right\rvert$|
|`\left\lVert \vec{a} \right\rVert`|$\left\lVert \vec{a} \right\rVert$|
|`\left\lfloor a \right\rfloor`|$\left\lfloor a \right\rfloor$|
|`\left\lceil a \right\rceil`|$\left\lceil a \right\rceil$|
|`\operatorname{abs}(a)`|$\operatorname{abs}(a)$|

> **注意**：`\lvert` / `\rvert` / `\lVert` / `\rVert` 需要 `amsmath` 宏包。直接写 `|` 或 `\|` 间距不对，且左右无法区分。
>
> `\lfloor` `\rfloor` 下取整；`\lceil` `\rceil` 上取整。

### 手动缩放定界符

当 `\left` `\right` 自动缩放不满足需求时：

| Type | Typeset |
| :-: | :-: |
|`\big( a \big)` | $\big( a \big)$ |
|`\Big( a \Big)` | $\Big( a \Big)$ |
|`\bigg( a \bigg)` | $\bigg( a \bigg)$ |
|`\Bigg( a \Bigg)` | $\Bigg( a \Bigg)$ |

> 左缩放左括号用 `\bigl`，右括号用 `\bigr`（如 `\bigl(` `\bigr)`），可获得正确间距。

### 向量

| Type | Typeset |
| :-: | :-: |
| `\begin{matrix} a&b \\ c&d \end{matrix}` | $\begin{matrix}a&b\\c&d\end{matrix}$|
| `\begin{pmatrix} a&b \\ c&d \end{pmatrix}` | $\begin{pmatrix}a&b\\c&d\end{pmatrix}$|
| `\begin{bmatrix} a&b \\ c&d \end{bmatrix}` | $\begin{bmatrix}a&b\\c&d\end{bmatrix}$|
| `\begin{Bmatrix} a&b \\ c&d \end{Bmatrix}` | $\begin{Bmatrix}a&b\\c&d\end{Bmatrix}$|
| `\begin{vmatrix} a&b \\ c&d \end{vmatrix}` | $\begin{vmatrix}a&b\\c&d\end{vmatrix}$|
| `\begin{Vmatrix} a&b \\ c&d \end{Vmatrix}` | $\begin{Vmatrix}a&b\\c&d\end{Vmatrix}$|

两侧括号也可以用 `\left` `\right`+括号 来包裹

**增广矩阵**

```
\left[
    \begin{array}{cc|c}
      1 & 2 & 3 \\
      4 & 5 & 6
    \end{array}
\right]
```

$$
\left[
    \begin{array}{cc|c}
      1 & 2 & 3 \\
      4 & 5 & 6
    \end{array}
\right]
$$

### 数组与对齐

| Type | Typeset |
| :-: | :-: |
| `\begin{cases} x>0 \\ x\le 0 \end{cases}` | $\begin{cases} x>0 \\ x\le 0 \end{cases}$ |
| `\begin{aligned} a&=b \\ c&=d \end{aligned}` | $\begin{aligned} a&=b \\ c&=d \end{aligned}$ |
| `\begin{align} a&=b \\ c&=d \end{align}` | $\begin{align} a&=b \\ c&=d \end{align}$ |

**更多左对齐：**

```
f(x) =
\begin{cases}
x,  & x \ge 0 \\
-x, & x < 0
\end{cases}
```

$$
f(x) =
\begin{cases}
x,  & x \ge 0 \\
-x, & x < 0
\end{cases}
$$

### 公式中插入文字

`\text{}` 命令可以在公式中插入正常字体文字

| Type | Typeset |
| :-: | :-: |
| `\text{若} x>0` | $\text{若} x>0$ |
| `\text{当 } n\to\infty` | $\text{当 } n\to\infty$ |
| `\text{max}` | $\text{max}$ |

### 方程组

```
\left\{
\begin{array}{c}
    a_{11}x_1+a_{12}x_2+\cdots+a_{1n}x_n=b_1 \\
    a_{21}x_1+a_{22}x_2+\cdots+a_{2n}x_n=b_2 \\
    \vdots \\
    a_{n1}x_1+a_{n2}x_2+\cdots+a_{nn}x_n=b_n
\end{array}
\right.
```

$$
\left\{
\begin{array}{c}
    a_{11}x_1+a_{12}x_2+\cdots+a_{1n}x_n=b_1 \\
    a_{21}x_1+a_{22}x_2+\cdots+a_{2n}x_n=b_2 \\
    \vdots \\
    a_{n1}x_1+a_{n2}x_2+\cdots+a_{nn}x_n=b_n
\end{array}
\right.
$$

## 文档布局

### 空格

|Name| Type | Typeset |
|:-:| :-: | :-: |
|| `aa` | $aa$ |
|interword space| `a\ a` | $a\ a$ |
|1 em| `a\quad a` | $a\quad a$ |
|2 em|`a\qquad a`  | $a\qquad a$ |
|thinspace (3/18 em)| `a\,a` | $a\,a$ |
|medspace (4/18 em)| `a\:a` | $a\:a$ |
|thickspace (5/18 em)| `a\;a` | $a\;a$ |
|normal space | `a\ b` | $a\ b$ |

### 紧缩

|Name| Type | Typeset |
| :-: | :-: | :-: |
|| `aa` | $aa$ |
|thinspace| `a\!a` | $a\!a$ |
|medspcae|  `a\negmedspace a`| $a\negmedspace a$ |
|thickspace|  `a\negthickspace a`| $a\negthickspace a$ |

### 字号

| Type | Typeset |
| :-: | :-: |
| `text` | $text$ |
| `\tiny text` | $\tiny text$ |
| `\small text` | $\small text$ |
| `\normalsize text` | $\normalsize text$ |
| `\large text` | $\large text$ |
|  `\huge text`| $\huge text$ |

### 字体

| Type | Typeset |
| :-: | :-: |
| `\mathbf{A}` | $\mathbf{A}$ |
|  `\mathcal{A}`| $\mathcal{A}$ |
|  `\mathit{A}`| $\mathit{A}$ |
| `\mathrm{A}` | $\mathrm{A}$ |
| `\mathsf{A}` | $\mathsf{A}$ |
| `\mathtt{A}` | $\mathtt{A}$ |
| `\mathbb{A}` | $\mathbb{A}$ |
| `\mathfrak{A}` | $\mathfrak{A}$ |
| `\mathscr{A}` | $\mathscr{A}$ |

## 参考资料

[百度文库 | Latex符号对应表](https://wenku.baidu.com/view/81eff8d628ea81c758f5786b.html)

[百度文库 | LaTeX Symbols符号](https://wenku.baidu.com/view/577cc72c84254b35effd346a.html?rec_flag=default&sxts=1586221206403)

[CSDN | Markdown中Latex 数学公式基本语法](https://blog.csdn.net/u014630987/article/details/70156489)

[CSDN | 最全 Markdown + Latex 编写技巧](https://blog.csdn.net/HaleyPKU/article/details/80341932)

[CSDN | LaTeX数学符号总结](https://blog.csdn.net/qq_39232265/article/details/78868487)

[简书 | LaTeX 导数相关符号](https://www.jianshu.com/p/8aa646fad1c5)
