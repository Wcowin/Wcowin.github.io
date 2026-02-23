---
title: Anaconda 语法与简单使用教程
tags:
  - Python
  - Anaconda
---

# Anaconda 语法与简单使用教程

> 本文介绍 Anaconda / Miniconda 的安装、conda 常用语法以及环境与包管理的基本用法，便于日常开发与复现环境。参考 [Conda 官方速查表](https://docs.conda.org.cn/projects/conda/en/stable/user-guide/cheatsheet.html)。**以下命令与行为以 conda 25.x（如 25.1.x）为准；若遇大版本变更，以 [Conda 发行说明](https://docs.conda.org.cn/projects/conda/en/stable/release-notes.html) 为准。**

**适用读者**：需要在本地管理多 Python 版本、多项目依赖，或做数据科学/机器学习环境的开发者；对命令行有基本了解即可。

## 什么是 Anaconda

**Anaconda** 是一个面向科学计算的 Python 发行版，支持 Linux、macOS、Windows，预装了大量科学计算与数据分析相关的 Python 包。

**Miniconda** 是 Anaconda 的轻量版，只包含 Python 和 conda，需要什么包再自己用 `conda` 或 `pip` 安装，更适合自定义环境。

**Conda** 是随 Anaconda/Miniconda 一起提供的包管理与环境管理工具，可以：

- 创建、激活、删除隔离的 Python 环境
- 安装、更新、卸载包并自动处理依赖
- 导出/导入环境配置，便于复现

!!! tip "建议"
    为每个新项目或工作流单独创建一个环境，避免依赖冲突；日常开发尽量不在 `base` 环境中装包。

**与 pip / venv 的选用**：conda 同时管「Python 版本」和「包」，且能安装非 Python 依赖（如 CUDA、R）；若只需纯 Python 项目隔离，用系统 Python + `venv` + `pip` 也可。科学计算、多语言混用或需精确复现环境时，conda 更合适。

---

## 安装

**前置条件**：具备系统安装权限；Windows 下建议以当前用户安装并勾选「加入 PATH」（或安装后手动配置环境变量）。

### 官方下载

- **Anaconda**（完整版）：[https://www.anaconda.com/download](https://www.anaconda.com/download)
- **Miniconda**（精简版）：[https://docs.conda.io/en/latest/miniconda.html](https://docs.conda.io/en/latest/miniconda.html)

### 国内镜像（推荐）

国内用户可从镜像站下载安装包并配置 conda 使用国内源，加速安装与后续包下载。

**清华大学 TUNA 镜像：**

- Anaconda 仓库：<https://mirror.tuna.tsinghua.edu.cn/help/anaconda/>
- 安装包目录：`https://mirror.tuna.tsinghua.edu.cn/anaconda/archive/`（Anaconda）、`https://mirror.tuna.tsinghua.edu.cn/anaconda/miniconda/`（Miniconda）

**配置 conda 使用清华镜像：**

在用户目录下编辑或创建 `.condarc`：

- Linux / macOS：`~/.condarc`
- Windows：`C:\Users\<用户名>\.condarc`

Windows 若没有该文件，可先执行：

```bash
conda config --set show_channel_urls yes
```

再编辑生成的 `.condarc`，内容示例（将 `{{endpoint}}` 替换为 `https://mirror.tuna.tsinghua.edu.cn/anaconda`）：

```yaml
channels:
  - defaults
show_channel_urls: true
default_channels:
  - https://mirror.tuna.tsinghua.edu.cn/anaconda/pkgs/main
  - https://mirror.tuna.tsinghua.edu.cn/anaconda/pkgs/r
  - https://mirror.tuna.tsinghua.edu.cn/anaconda/pkgs/msys2
custom_channels:
  conda-forge: https://mirror.tuna.tsinghua.edu.cn/anaconda/cloud
  pytorch: https://mirror.tuna.tsinghua.edu.cn/anaconda/cloud
```

保存后建议执行：

```bash
conda clean -i
```

以清除索引缓存，然后可用 `conda create -n myenv numpy` 等命令测试是否正常。

---

## 验证安装与版本

```bash
# 验证 conda 是否可用
conda info

# 查看 conda 版本
conda --version
```

---

## Conda 常用语法速查

### 快速入门

| 操作           | 命令 |
|----------------|------|
| 更新 base 中的 conda | `conda update -n base conda` |
| 创建新环境（建议用描述性名称） | `conda create --name ENVNAME` |
| 激活环境（安装包前先激活） | `conda activate ENVNAME` |
| 退出当前环境       | `conda deactivate` |

### 环境管理

| 操作           | 命令 |
|----------------|------|
| 列出所有环境及路径   | `conda info --envs` |
| 创建指定 Python 版本的环境 | `conda create -n ENVNAME python=3.10` |
| 克隆环境         | `conda create --clone ENVNAME -n NEWENV` |
| 重命名环境        | `conda rename -n ENVNAME NEWENVNAME` |
| 删除环境         | `conda remove -n ENVNAME --all`（等价别名：`conda env remove -n ENVNAME --all`） |
| 查看环境修订历史     | `conda list -n ENVNAME --revisions` |
| 恢复到某次修订      | `conda install -n ENVNAME --revision NUMBER` |

### 包管理

| 操作           | 命令 |
|----------------|------|
| 列出当前环境已安装的包 | `conda list` |
| 列出包并显示来源频道   | `conda list --show-channel-urls` |
| 在当前环境安装包     | `conda install PKGNAME` |
| 安装指定版本       | `conda install PKGNAME=3.1.4` |
| 在指定环境中安装包   | `conda install -n ENVNAME PKGNAME1 PKGNAME2` |
| 从指定频道安装      | `conda install -c CHANNELNAME PKGNAME` 或 `conda install CHANNELNAME::PKGNAME` |
| 版本范围（AND）    | `conda install "PKGNAME>2.5,<3.2"` |
| 卸载包          | `conda uninstall PKGNAME` 或 `conda remove -n ENVNAME PKGNAME` |
| 更新当前环境所有包   | `conda update --all` |
| 更新指定环境所有包   | `conda update --all -n ENVNAME` |
| 搜索包          | `conda search PKGNAME` |
| 查看包详细信息      | `conda search PKGNAME --info` |

### 频道配置

| 操作     | 命令 |
|----------|------|
| 查看当前频道来源 | `conda config --show-sources` |
| 添加频道     | `conda config --add channels CHANNELNAME` |
| 设置严格频道优先级 | `conda config --set channel_priority strict` |
| 查看全部配置   | `conda config --show` |

### 导出环境

| 用途         | 命令 |
|--------------|------|
| 跨平台（仅记录显式安装的包） | `conda env export --from-history > ENV.yml` |
| 含平台与包信息   | `conda env export ENVNAME > ENV.yml` |
| 含平台+包+频道（精确复现） | `conda list --explicit > ENV.txt` |

### 导入环境

| 来源     | 命令 |
|----------|------|
| 从 .yml 文件 | `conda env create -n ENVNAME --file ENV.yml` |
| 从 .txt 文件 | `conda create -n ENVNAME --file ENV.txt` |

### 其他常用

| 操作     | 命令 |
|----------|------|
| 命令帮助   | `conda COMMAND --help` |
| 非交互式执行（如批量安装） | `conda install PKGNAME1 PKGNAME2 --yes` |
| 清理未使用缓存 | `conda clean --all` |

---

## 简单使用流程示例

### 1. 为新项目创建环境

```bash
# 创建名为 myproject、Python 3.10 的环境
conda create -n myproject python=3.10 -y

# 激活环境
conda activate myproject

# 安装依赖（示例）
conda install numpy pandas
# 或使用 pip
pip install -r requirements.txt
```

### 2. 日常开发

```bash
# 进入项目目录并激活对应环境
cd /path/to/project
conda activate myproject

# 开发结束后可导出依赖，便于复现
pip freeze > requirements.txt
# 或导出完整 conda 环境
conda env export > environment.yml

conda deactivate
```

### 3. 与他人/另一台机器复现环境

对方拿到 `environment.yml` 后：

```bash
conda env create -n myproject -f environment.yml
conda activate myproject
```

若使用 `conda list --explicit > ENV.txt` 导出的 `.txt`，则用：

```bash
conda create -n myproject --file ENV.txt
conda activate myproject
```

---

## 常见问题

- **误在 base 里装了大量包**：可新建一个环境专门做日常开发，base 仅保留 `conda` 更新；或用 `conda list -n base` 查看后按需清理。
- **conda 与 pip 混用**：同一环境内可以混用，但优先用 `conda install` 装能通过 conda 获得的包，再用 `pip` 装其余包，避免同一包被两者重复管理导致冲突。导出时用 `pip freeze > requirements.txt` 与 `conda env export > environment.yml` 分别保留，便于复现。
- **环境损坏或无法激活**：用 `conda info --envs` 或 `conda env list` 列出环境后，用 `conda remove -n 环境名 --all` 删除问题环境，再按 `environment.yml` 或 `ENV.txt` 重新创建。
- **下载慢或 CondaHTTPError**：确认已按上文配置国内镜像（如清华 `.condarc`），并执行 `conda clean -i` 清索引缓存后重试。
- **conda 25.3 及以后**：若遇频道相关报错，可显式添加默认频道：`conda config --add channels defaults`（新版本可能不再隐式使用 defaults）。

---

## 小结

- **Anaconda** 适合“开箱即用”的科学计算环境，**Miniconda** 适合只要 Python + conda 的轻量使用。
- 建议**为每个项目单独建环境**，用 `conda activate` / `conda deactivate` 切换。
- 常用命令：`conda create`、`conda activate`、`conda install`、`conda list`、`conda env export` / `conda env create -f`。
- 国内用户建议配置 **清华等镜像** 的 `.condarc`，并执行 `conda clean -i` 后使用。

更多细节可查阅 [Conda 官方文档](https://docs.conda.org.cn/)、[入门指南](https://docs.conda.org.cn/projects/conda/en/stable/user-guide/getting-started.html) 与 [速查表 PDF](https://docs.conda.org.cn/projects/conda/en/stable/user-guide/cheatsheet.html)。本站 [Python 环境管理最佳实践](environment.md) 可与本文搭配使用，用于项目级环境规范。
