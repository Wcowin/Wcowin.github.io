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