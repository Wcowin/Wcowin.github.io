# 王虹、Joshua Zahl 与三维挂谷猜想的解决

## 摘要

挂谷集合猜想（Kakeya set conjecture）是几何测度论与调和分析中的核心问题之一。它断言：在 $\mathbb{R}^n$ 中，任何包含每个方向上一条单位线段的集合，都必须具有最大的 Minkowski 维数和 Hausdorff 维数 $n$。

2025 年 2 月，王虹（Hong Wang）与 Joshua Zahl 发布了 127 页的预印本 *Volume estimates for unions of convex sets, and the Kakeya set conjecture in three dimensions*，证明三维 Kakeya 集的 Minkowski 维数和 Hausdorff 维数均为 $3$。2026 年，Larry Guth、王虹与 Zahl 又给出一份更精简的证明；同年，Guth 为 Séminaire Bourbaki 撰写了面向较广泛数学读者的系统综述。因此，当前数学文献已将三维挂谷集合猜想作为得到解决的问题讨论。

本文介绍问题的准确表述、历史进展、Wang–Zahl 证明的主要结构及仍然开放的问题。证明部分只提供有文献依据的概念性路线，不试图用少量公式替代原论文中的技术细节。

---

## 0. 作者与论文背景

### 王虹（Hong Wang）

王虹 1991 年出生于中国广西桂林。她于 2011 年获得北京大学数学学士学位，2014 年获得巴黎综合理工学院工程师文凭及巴黎南大学（现属巴黎萨克雷大学体系）数学硕士学位，2019 年在 Larry Guth 指导下获得麻省理工学院数学博士学位。

她于 2019—2021 年在普林斯顿高等研究院工作，2021 年加入加州大学洛杉矶分校，2023 年加入纽约大学柯朗数学科学研究所，并于 2025 年 9 月起担任法国高等科学研究院（IHES）永久数学教授。

她获得的主要奖项包括：

| 年份 | 奖项 |
|---|---|
| 2022 | Maryam Mirzakhani New Frontiers Prize |
| 2025 | Salem Prize、Ostrowski Prize、ICCM 数学金奖、Antonio Ambrosetti Medal |
| 2026 | AWM Sadosky Research Prize、New Horizons in Mathematics Prize、Clay Research Award |

以上履历和奖项可由 IHES、Clay Mathematics Institute 等机构的官方资料核实。

### Joshua Zahl

Joshua Zahl 从事调和分析、组合几何与几何测度论研究，曾任职于英属哥伦比亚大学，近期论文同时署名南开大学陈省身数学研究所。将他简单称为“加拿大数学家”容易把任职地与国籍混为一谈，因此本文只陈述其研究领域和机构信息。

王虹与 Zahl 围绕三维 Kakeya 问题完成了三项相互衔接的工作：

1. 证明三维 sticky Kakeya 猜想；
2. 证明三维 Kakeya 集的 Assouad 维数为 $3$；
3. 证明完整的三维 Kakeya 集合猜想。

---

## 1. 从转针问题到维数猜想

### 1.1 挂谷转针问题

1917 年，日本数学家挂谷宗一（Sōichi Kakeya）研究如下问题：在平面区域内，一根单位长度的针完成所有方向的转动，区域面积最小可以是多少？文献中既有“旋转 $180^\circ$”也有“旋转 $360^\circ$”的说法；由于无向线段旋转 $180^\circ$ 后已经遍历所有方向，这两种表述在相关几何问题中本质等价，但讨论连续运动时应说明所采用的约定。

在区域被要求为凸集时，Gyula Pál 于 1921 年证明最小面积为

$$
\frac{1}{\sqrt{3}},
$$

由高为 $1$ 的等边三角形达到。若取消凸性限制，情形则完全不同。

### 1.2 Besicovitch 的零测度构造

Besicovitch 构造了平面中的零测度集合，使其包含每个方向上的单位线段。现在通常把这类集合称为 Besicovitch 集或 Kakeya 集。

需要区分两个相关但不完全相同的命题：

- 集合中包含每个方向的一条单位线段；
- 一根针可以在区域内沿连续路径完成转动。

借助所谓 Pál joins，可以从线段方向构型得到允许连续转动且面积任意小的区域。因此，Lebesgue 测度不能有效区分 Kakeya 集的几何复杂程度，现代问题转而研究其分形维数。

### 1.3 现代挂谷集合猜想

一个 Kakeya 集通常定义为紧集 $K\subset\mathbb{R}^n$，并且对每个方向 $e\in S^{n-1}$，存在一条平行于 $e$ 的单位线段包含在 $K$ 中。

挂谷集合猜想断言

$$
\dim_{\mathrm H}K=\dim_{\mathrm M}K=n,
$$

其中 $\dim_{\mathrm H}$ 和 $\dim_{\mathrm M}$ 分别表示 Hausdorff 维数和 Minkowski 维数。由于 Hausdorff 维数不超过上 Minkowski 维数，Hausdorff 维数结论通常是更精细的一部分。

截至 2026 年，猜想在 $n=2$ 和 $n=3$ 时已经解决，在 $n\geq4$ 时仍然开放。

---

## 2. 正确的离散化表述

### 2.1 $\delta$-管与“几乎最大体积”

在 $\mathbb{R}^3$ 中，$\delta$-管是单位线段的 $\delta$-邻域，可以近似看成尺寸为 $\delta\times\delta\times1$ 的细管，其体积满足 $|T|\asymp\delta^2$。

取约 $\delta^{-2}$ 个方向两两 $\delta$-分离的管。虽然它们的体积总和约为

$$
\sum_{T\in\mathbb T}|T|\asymp1,
$$

但这些管可能高度重叠，所以管并体积可以趋于零。三维维数猜想对应的正确数量级不是统一正下界，而是：对每个 $\varepsilon>0$，

$$
\left|\bigcup_{T\in\mathbb T}T\right|
\gtrsim_{\varepsilon}\delta^{\varepsilon}.
$$

这里的 $\delta^\varepsilon$ 表示允许任意小的幂次损失。这个区别非常重要：若错误地写成 $\gtrsim1$，得到的将是比维数猜想更强、并且与零测度 Kakeya 集现象不相容的结论。

### 2.2 Wang–Zahl 的定量定理

Wang–Zahl 证明的结果比只研究完整管更灵活。设 $\mathbb T$ 是单位球内的一族 $\delta$-管，并满足如下非聚集条件：每个尺寸为 $a\times b\times2$ 的长方棱柱至多包含

$$
100ab\delta^{-2}
$$

根来自 $\mathbb T$ 的管。方向两两 $\delta$-分离的管族自动满足这一条件。

对每根管取一个可测的“着色部分”（shading）$Y(T)\subset T$，并假设

$$
|Y(T)|\geq\lambda|T|.
$$

原论文的 Theorem 1.2 断言：对每个 $\varepsilon>0$，存在 $K>1$，使得当 $\delta$ 足够小时，

$$
\left|\bigcup_{T\in\mathbb T}Y(T)\right|
\geq
\delta^{\varepsilon}\lambda^K
\sum_{T\in\mathbb T}|T|.
$$

这里的非聚集条件属于 Wolff axioms 的凸几何版本。取 $Y(T)=T$、$\lambda=1$，并使用方向分离管族，即得到管并体积的 $\delta^\varepsilon$ 下界。论文进一步通过适合 Hausdorff 维数的离散化与覆盖论证，推出：

> 每个 $K\subset\mathbb{R}^3$ 的 Kakeya 集都满足
> $\dim_{\mathrm H}K=\dim_{\mathrm M}K=3$。

### 2.3 重数观点

把

$$
m(x)=\sum_{T\in\mathbb T}\mathbf 1_{Y(T)}(x)
$$

记为点 $x$ 处的覆盖重数，则

$$
\int m(x)\,dx=\sum_{T\in\mathbb T}|Y(T)|.
$$

如果着色部分的总量很大而管并很小，平均重数就必须很高。因此，Kakeya 体积估计的核心可以理解为：在方向丰富且满足非聚集条件的管族中，证明过高的重叠不可能在所有尺度上持续存在。

这一表述比直接写出未经定义的“粗重数乘细重数”公式更可靠。实际证明还需要 dyadic pigeonholing、shading、凸 Wolff axioms 以及多个尺度参数，不能只用一个简单乘法恒等式概括。

---

## 3. 三维问题解决前的主要进展

### 3.1 二维情形

Davies 于 1971 年证明平面 Kakeya 集的 Hausdorff 维数为 $2$。Córdoba 随后使用 $L^2$ 与 Fourier 分析方法研究二维 Kakeya 极大函数。

对于每个 $\delta$-分离方向取一根 $1\times\delta$ 管，典型的二维管并下界是

$$
\left|\bigcup_{T\in\mathbb T}T\right|
\gtrsim \frac{1}{\log(1/\delta)}.
$$

这个对数下界已经足以推出 Minkowski 维数为 $2$。它不能写成 $\delta^{-1}$：所有管的面积总和只有 $O(1)$，管并面积不可能具有趋于无穷的下界。

### 3.2 Wolff、Katz–Łaba–Tao 与 Katz–Zahl

在三维中，Wolff 于 1995 年通过著名的 hairbrush argument 证明 Kakeya 集的维数至少为 $5/2$。

此后应区分两类结果：

- Katz、Łaba 与 Tao 证明上 Minkowski 维数至少为 $5/2+\varepsilon$，其中可得到的显式增益非常小；
- Katz 与 Zahl 证明 Hausdorff 维数至少为 $5/2+\varepsilon_0$，其中 $\varepsilon_0>0$ 是某个绝对常数。

因此，不能把三维问题在 2025 年以前的最佳结果简单写成“$2.5417$”。该数值不是公认的三维 Kakeya 集历史最佳维数下界，还容易把其他维数、和差估计或不同版本的 Kakeya 问题混在一起。

### 3.3 有限域版本

标准有限域 Kakeya 猜想并不是开放问题。Dvir 于 2008 年利用多项式方法证明：若 $K\subset\mathbb F_q^n$ 包含每个方向上的一条直线，则

$$
|K|\geq C_nq^n,
$$

从而在正确的幂次意义下解决了有限域 Kakeya 猜想。有限域证明对多项式方法的发展影响深远，但它不能直接推出欧氏空间中的挂谷猜想。

---

## 4. Wang–Zahl 三部曲

### 4.1 Sticky Kakeya 定理

“粘性”（sticky）并不只是指细管在某根粗管中尽可能拥挤。它描述的是一种跨尺度的近似自相似结构：细尺度管能够以相互协调的方式嵌套进较粗尺度的管，并且这种组织在多个尺度上保持稳定。

这一思想可追溯到 Katz–Łaba–Tao 对接近 Wolff 指数的假想极端构型的研究，以及 Katz–Tao 后来提出的证明计划。王虹与 Zahl 证明了三维 sticky Kakeya 猜想，即所有三维 sticky Kakeya 集都具有完整维数 $3$。该论文现已正式发表于 *Journal of the American Mathematical Society*。

### 4.2 Assouad 维数与多尺度结构

在第二篇论文中，王虹与 Zahl 证明：

$$
\dim_{\mathrm A}K=3
$$

对每个三维 Kakeya 集 $K$ 都成立，其中 $\dim_{\mathrm A}$ 表示 Assouad 维数。

他们还证明了若干更强的特殊情形，例如 Ahlfors–David 正则 Kakeya 集的 Hausdorff 维数为 $3$，以及具有“稳定相等”的 Hausdorff 维数与 packing 维数的 Kakeya 集也具有完整维数。该工作于 2025 年发表于 *Inventiones Mathematicae*。

Assouad 维数允许观察集合在最不均匀局部、最有利尺度上的复杂程度，因此“Assouad 维数为 $3$”本身并不自动推出所有 Kakeya 集的 Hausdorff 维数为 $3$。最终论文正是补上了这一差距。

### 4.3 凸非聚集与完整证明

最终论文研究满足凸几何非聚集条件的管族。直观地说，如果大量管可以同时塞进一个体积很小的凸区域，那么高重叠并不奇怪；证明的关键是说明：除此类凸聚集障碍外，管族的平均重数至多只有 $\delta^{-\varepsilon}$ 级别的损失。

由于方向 $\delta$-分离的 Kakeya 管族自动满足相应的非聚集条件，定量体积估计最终推出三维 Kakeya 集的 Minkowski 和 Hausdorff 维数均为 $3$。

---

## 5. 2025 年原始证明的概念性路线

以下内容是对证明结构的启发式说明，而不是严格证明。原论文需要处理带 shading 的管、多个非一致尺度以及凸 Wolff axioms；省略这些条件后，许多看似简单的重数公式并不严格成立。

### 5.1 归纳尺度

证明在细尺度 $\delta$ 和中间尺度 $\rho$ 之间反复切换，其中 $\delta\ll\rho\ll1$。细管被组织进较粗的 $\rho$-管，再对粗管内部作横向归一化，将问题转化为较大尺度上的类似问题。

如果粗尺度和细尺度的重叠估计都只是恰好达到已有界，那么归纳只会恢复原结论，不能获得维数增益。因此必须从管族的多尺度组织中找出额外信息。

### 5.2 Sticky 与 non-sticky 构型

在 sticky 情形中，细管和粗管之间呈现稳定的多尺度嵌套结构，可以调用先前的 sticky Kakeya 定理。

在 non-sticky 情形中，粗尺度上可能出现比普通方向分离管族更多的“超 Kakeya”粗管，而每根粗管内部只有较少的“亚 Kakeya”细管。直接分别使用粗、细尺度估计会产生不平衡，这正是最终论文需要克服的困难。

### 5.3 Graininess 与结构定理

Kakeya 型管族常会形成 graininess：细管的有效部分不只是散乱的 $\delta$-立方体，而会组织成方向相关的细长棱柱，即 grains。

在 2025 年证明的组织方式中，Guth 的多项式方法为 graininess 约化提供了重要工具。随后，Wang–Zahl 的结构定理分析 grains 的排列：

- 如果适当缩放后的 grains 本身接近 Kakeya 或亚 Kakeya 构型，可以重新应用归纳假设；
- 否则，grains 会进一步组织进更大的凸棱柱，并在其中表现出超 Kakeya 特征。

对这些棱柱还要区分“厚”与“薄”的情形。厚棱柱通过归纳尺度和 x-ray 型估计处理；薄棱柱则结合 Córdoba 型 $L^2$ 论证，迫使棱柱几乎被有效集合填满，并与所选 grains 的最大性发生矛盾。

### 5.4 增强重数估计与 Frostman 机制

普通的粗管重数会把粗管中没有真正被细管占据的空间也计算进去。Wang–Zahl 改为估计粗管内部实际着色部分或 grains 的重叠，从而得到比粗管重数更精细的控制。

另一种关闭归纳的机制是发现 Frostman 型非集中估计的违反：如果集合在某个中间尺度球内异常稠密，那么把这一局部密度与较粗尺度的覆盖数结合，就会反过来给出更强的全局体积下界。原论文通过细致的结构分解，证明所有可能的构型最终都会产生重数增益、Frostman 增益或结构矛盾。

---

## 6. 2026 年的精简证明

2026 年，Larry Guth、王虹与 Joshua Zahl 发布 *A streamlined proof of the Kakeya set conjecture in $\mathbb{R}^3$*，重新组织了从 sticky Kakeya 定理到完整三维猜想的推导。

精简证明保留了原始工作的核心多尺度思想，但删除了若干技术分支；作者特别指出，新的组织方式不再需要原证明中的 polynomial partitioning 部分。因此，更准确的说法是：多项式方法是 2025 年原始证明路线中的重要工具，但并不是目前所有已知证明表述中不可替代的步骤。

同年，Guth 在 Séminaire Bourbaki 的综述 *The Kakeya conjecture in $\mathbb{R}^3$*（after Hong Wang and Joshua Zahl）中，以平均重数、凸聚集参数和 sticky Kakeya 定理为主线介绍了证明。对于希望继续学习技术细节的读者，这两份 2026 年资料通常比直接进入 127 页原论文更合适。

---

## 7. 意义与仍然开放的问题

三维挂谷集合猜想的解决，首先完成了一个长期悬而未决的几何测度论问题；同时，它也为研究 Fourier restriction、局部平滑、Bochner–Riesz 问题以及相关几何关联估计提供了新的结构工具。不过，解决 Kakeya 集合的维数猜想并不等于自动解决所有这些更强的调和分析猜想。

目前重要的开放方向包括：

1. **高维 Kakeya 集合猜想**：欧氏空间 $\mathbb{R}^n$ 中 $n\geq4$ 的情形仍然开放。
2. **三维 Kakeya 极大函数猜想**：Wang–Zahl 的定理允许某个 $K>1$，而极大函数猜想要求与正确的 $\lambda$ 指数（在原论文归一化下为 $K=3$）相匹配，因此仍然更强。
3. **证明的进一步简化与高维推广**：2026 年精简证明已经移除部分原有技术，哪些结构能够推广到四维及以上仍是核心问题。
4. **相关关联几何与曲线版本**：标准有限域 Kakeya 猜想已经解决，但曲线、变系数及更精细的极大函数版本仍包含大量开放问题。

---

## 8. 参考文献与延伸阅读

1. H. Wang, J. Zahl. [*Volume estimates for unions of convex sets, and the Kakeya set conjecture in three dimensions*](https://arxiv.org/abs/2502.17655). arXiv:2502.17655, 2025.
2. L. Guth, H. Wang, J. Zahl. [*A streamlined proof of the Kakeya set conjecture in $\mathbb{R}^3$*](https://arxiv.org/abs/2601.14411). arXiv:2601.14411, 2026.
3. L. Guth. [*The Kakeya conjecture in $\mathbb{R}^3$* (after Hong Wang and Joshua Zahl)](https://arxiv.org/abs/2604.03416). Séminaire Bourbaki, exposé no. 1251, 2026.
4. H. Wang, J. Zahl. [*Sticky Kakeya sets and the sticky Kakeya conjecture*](https://doi.org/10.1090/jams/1067). *J. Amer. Math. Soc.* **39** (2026), 515–585.
5. H. Wang, J. Zahl. [*The Assouad dimension of Kakeya sets in $\mathbb{R}^3$*](https://doi.org/10.1007/s00222-025-01336-x). *Invent. Math.* **241** (2025), 153–206.
6. T. Tao. [*The three-dimensional Kakeya conjecture, after Wang and Zahl*](https://terrytao.wordpress.com/2025/02/25/the-three-dimensional-kakeya-conjecture-after-wang-and-zahl/). What's New, 25 February 2025.
7. R. O. Davies. *Some remarks on the Kakeya problem*. *Math. Proc. Cambridge Philos. Soc.* **69** (1971), 417–421.
8. A. Córdoba. [*The Kakeya maximal function and the spherical summation multipliers*](https://doi.org/10.2307/2374006). *Amer. J. Math.* **99** (1977), 1–22.
9. T. Wolff. *An improved bound for Kakeya type maximal functions*. *Rev. Mat. Iberoamericana* **11** (1995), 651–674.
10. N. H. Katz, I. Łaba, T. Tao. [*An improved bound on the Minkowski dimension of Besicovitch sets in $\mathbb{R}^3$*](https://doi.org/10.2307/2661389). *Ann. of Math.* **152** (2000), 383–446.
11. N. H. Katz, J. Zahl. [*An improved bound on the Hausdorff dimension of Besicovitch sets in $\mathbb{R}^3$*](https://doi.org/10.1090/jams/907). *J. Amer. Math. Soc.* **32** (2019), 195–259.
12. Z. Dvir. [*On the size of Kakeya sets in finite fields*](https://doi.org/10.1090/S0894-0347-08-00607-3). *J. Amer. Math. Soc.* **22** (2009), 1093–1097.
13. Institute for Advanced Study. [*A Three-Dimensional Breakthrough*](https://www.ias.edu/ideas/three-dimensional-breakthrough), 2025.
14. IHES. [*Hong Wang — Permanent Professor*](https://www.ihes.fr/en/professeur/hong-wang/).
15. Clay Mathematics Institute. [*Hong Wang — Research Award Winner*](https://www.claymath.org/people/hong-wang/), 2026.
16. J. Howlett. [*‘Once in a Century’ Proof Settles Math’s Kakeya Conjecture*](https://www.quantamagazine.org/once-in-a-century-proof-settles-maths-kakeya-conjecture-20250314/). *Quanta Magazine*, 14 March 2025.



**本文作者：** [<span class="author-avatar-wrapper"><img class="author-avatar" src="https://s1.imagehub.cc/images/2025/12/06/28380affd86b014a6dcaf082fcc97064.png" width="28" height="28" alt="Wcowin" /><span class="author-name-popover">王科文</span></span>](https://github.com/Wcowin)
