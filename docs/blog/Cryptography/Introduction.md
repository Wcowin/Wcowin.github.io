---
title: 密码学引言
tags:
  - 密码学
---

# 第1章 密码学引言

![4cab66c1344ffa6ce96ccbb5e0b55b23](https://s1.imagehub.cc/images/2025/07/15/8eafb8c385b5ca3b08719f59ba5cccba.webp)

密码学（Cryptography）是研究信息加密与解密、保障信息安全的一门科学。它在现代通信、数据存储、网络安全等领域有着极其重要的作用。

## 定义与核心概念

密码学来源于希腊语“kryptós”（隐藏）和“gráphein”（书写），其核心目标是通过构建和分析协议，确保信息的保密性、完整性、认证和不可否认性，从而防止第三方或公众读取私人消息。
根据 [Wikipedia: Cryptography](https://en.wikipedia.org/wiki/Cryptography)，现代密码学涉及数学、计算机科学、信息安全、电气工程、数字信号处理和物理学等多个学科的交叉。

基本概念包括：

- **明文（Plaintext）**：原始的、可读的信息或数据。
- **密文（Ciphertext）**：通过加密算法和密钥转换后的不可读形式。
- **加密（Encryption）**：将明文转换为密文的过程。
- **解密（Decryption）**：将密文转换回明文的过程。
- **密钥（Key）**：加密和解密算法使用的秘密信息，其安全性通常依赖于密钥的保密性。

这些概念共同构成了密码学的基础，确保通信在敌对环境下的安全性。

## 历史与演变

密码学的历史可以追溯到古代文明，例如凯撒密码（Caesar cipher），由罗马皇帝尤利乌斯·凯撒用于与将军的通信，通过将字母表循环移动三位来加密消息（[Wikipedia: Cryptography](https://en.wikipedia.org/wiki/Cryptography)）。
随着时间的推移，密码学从简单的替换密码和转置密码（如古希腊的 scytale）发展到更复杂的系统。

20 世纪的两次世界大战推动了密码学的现代化。转子密码机在 20 世纪初已出现（恩尼格玛机 1918 年申请专利），在第二次世界大战期间被广泛使用；二战中计算机的广泛使用进一步加速了这一进程。
根据 [GeeksforGeeks: History of Cryptography](https://www.geeksforgeeks.org/history-of-cryptography/)，现代密码学依赖于数学理论和计算硬度假设，被称为“计算安全”（computationally secure）。信息理论安全方案（如一次性密码本）被证明在无限计算能力下不可破解，但使用起来较为困难。

## 密码学类型

密码学主要分为两种类型，基于密钥的使用方式：

### 对称密钥密码学

- **描述**：使用单一密钥进行加密和解密，效率高，适合大批量数据加密。
- **密钥管理**：密钥必须在发送方和接收方之间安全共享，否则系统安全性会受到威胁。
- **示例**：高级加密标准（AES）、数据加密标准（DES）。
- **使用场景**：如文件加密、VPN 通信等。

根据 [GeeksforGeeks: Cryptography Introduction](https://www.geeksforgeeks.org/cryptography-introduction/)，对称密钥密码学的优点在于其计算效率，但缺点是密钥分发的安全性问题。

### 非对称密钥密码学

- **描述**：使用一对密钥——公钥用于加密，私钥用于解密。
- **密钥管理**：公钥可以公开分享，私钥必须由所有者严格保密。
- **示例**：RSA 算法、椭圆曲线密码学（ECC）。
- **使用场景**：如 HTTPS 协议中的安全网页浏览、数字签名验证。

非对称密钥密码学解决了密钥分发问题，但计算开销通常高于对称密钥方法，适合需要安全密钥交换的场景。

## 重要性与应用

密码学在现代信息安全中扮演着不可或缺的角色，其核心目标包括：

- **保密性**：确保只有授权方能访问信息。
- **完整性**：验证数据在传输或存储过程中未被篡改。
- **认证性**：确认通信方的身份。

**以上称为信息安全的三大基本原则（CIA）。**

- **不可否认性**：防止一方否认其行为，如发送消息。

其应用范围广泛，包括但不限于：

- **电子商务**：通过 SSL/TLS 协议保护在线支付和交易的安全。
- **安全通信**：如加密电子邮件（PGP）、消息应用（如 WhatsApp）和语音通话。
- **数据保护**：加密存储在设备或云端的敏感数据。
- **数字签名**：验证文档、软件或交易的真实性，如 PDF 签名。
- **区块链和加密货币**：如比特币交易的哈希和签名，确保交易的不可篡改性。

根据 [Fortinet: What is Cryptography?](https://www.fortinet.com/resources/cyberglossary/what-is-cryptography)，现代密码学技术如 128 位和 256 位加密密钥被认为是几乎不可破解的，广泛应用于银行卡、计算机密码和电子商务。

本系列将依次介绍数论基础、对称密码（流密码与分组密码）、非对称密码、消息认证与哈希函数、区块链应用（比特币）以及密码协议与现代密码学发展，建议按[学习路径](index.md)阅读。

## 结论

密码学是现代信息安全的基础，其发展历程从古代的简单加密到今天的复杂算法，体现了人类对通信安全需求的不断提升。通过对称和非对称密钥密码学的结合，密码学在电子商务、安全通信和数据保护等领域发挥了关键作用。随着技术的进步，密码学将继续适应新的挑战和威胁，确保数字世界的安全。

## 密码学类型对比

| 类型               | 密钥管理               | 效率     | 典型应用           |
|--------------------|------------------------|----------|--------------------|
| 对称密钥密码学     | 单一密钥需安全共享     | 高效率   | 文件加密、VPN通信  |
| 非对称密钥密码学   | 公钥公开，私钥保密     | 计算开销大 | HTTPS、数字签名    |

---

## 延伸阅读（本系列）

- [数论基础](Numbertheory.md) — 整除、同余、欧拉函数等密码学常用数学工具
- [第2章 流密码](Symmetriccryptography.md)、[第3章 分组密码](Groupcipher.md) — 对称密码原理与应用
- [第4章 非对称密码](Asymmetriccryptography.md) — 公钥加密与数字签名
- [第5章 消息认证与哈希函数](HashAndMAC.md) — 完整性与认证
- [密码协议与应用](ProtocolAndApplication.md)、[现代密码学发展](ModernCryptography.md) — 协议与前沿

## 引文

- [Wikipedia: Cryptography](https://en.wikipedia.org/wiki/Cryptography)
- [GeeksforGeeks: Cryptography Introduction](https://www.geeksforgeeks.org/cryptography-introduction/)
- [GeeksforGeeks: History of Cryptography](https://www.geeksforgeeks.org/history-of-cryptography/)
- [Fortinet: What is Cryptography? Definition, Importance, Types](https://www.fortinet.com/resources/cyberglossary/what-is-cryptography)

**本文作者：** [<img class="author-avatar" src="https://s1.imagehub.cc/images/2025/12/06/28380affd86b014a6dcaf082fcc97064.png" width="28" height="28" alt="Wcowin" />](https://github.com/Wcowin)