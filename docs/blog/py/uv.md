---
tags:
  - python
  - 工具
status: new
---

# uv：新一代 Python 包管理工具入门

**uv** 是一个用 Rust 写的、速度极快的 Python 包管理和项目管理工具，由开发 Ruff 的 Astral 团队出品。它可以替代 pip、virtualenv、pip-tools 等，装包和创建环境通常比 pip 快一个数量级以上。

下面按**全流程**来：先安装，再验证，最后从零跑起一个项目。

---

## 一、安装 uv

按你的系统选一种方式执行即可。

=== "macOS（推荐用 Homebrew）"

    在终端执行：

    ```bash
    brew install uv
    ```

    安装完成后，**新开一个终端窗口**（或新开一个标签页），再继续后面的「验证安装」。

=== "macOS / Linux（官方安装脚本）"

    在终端执行：

    ```bash
    curl -LsSf https://astral.sh/uv/install.sh | sh
    ```

    脚本会把 `uv` 装到当前用户目录，并提示你把某路径加入 PATH（若未自动配置）。按提示操作后，**新开一个终端**，再继续「验证安装」。

=== "Windows"

    在 PowerShell 中执行（若提示执行策略限制，先选「是」或以管理员运行）：

    ```powershell
    powershell -ExecutionPolicy ByPass -c "irm https://astral.sh/uv/install.ps1 | iex"
    ```

    安装完成后**新开一个 PowerShell 窗口**，再继续「验证安装」。

---

## 二、验证安装

在新开的终端里执行：

```bash
uv --version
```

若显示类似 `uv 0.10.0` 的版本号，说明安装成功。若提示「命令未找到」，说明 PATH 里还没有 uv，需要把安装时提示的路径加入环境变量（或新开终端再试一次）。

---

## 三、国内用户可选：配置镜像

若从国外源装包很慢，可以先配置国内镜像再使用。在终端执行：

```bash
mkdir -p ~/.config/uv
```

然后编辑（或新建）文件 `~/.config/uv/uv.toml`，加入：

```toml
[[index]]
url = "https://mirrors.cloud.tencent.com/pypi/simple/"
default = true
```

保存后，后续 `uv add`、`uv sync` 等会走该镜像，一般会快不少。

---

## 四、全流程：从安装到跑起第一个项目

按顺序做下面几步，就能用 uv 从零跑起一个带依赖的项目。

### 1. 创建项目目录并进入

```bash
mkdir my-demo && cd my-demo
```

### 2. 用 uv 初始化项目

```bash
uv init
```

会生成 `pyproject.toml`、`README.md` 等，并自动创建虚拟环境（无需手写 `python -m venv`）。

### 3. 写一个用第三方库的小脚本（示例）

例如用 `requests` 发请求。新建文件 `main.py`，内容可为：

```python
import requests
r = requests.get("https://httpbin.org/get")
print(r.status_code, r.json().get("url", ""))
```

### 4. 用 uv 添加依赖

```bash
uv add requests
```

uv 会把 `requests` 写入 `pyproject.toml` 并安装到当前项目环境。

### 5. 用项目环境运行脚本

```bash
uv run python main.py
```

这里会用当前项目的虚拟环境和已安装的 `requests` 运行 `main.py`，无需先 `source activate`。

至此：**安装 → 验证 → 初始化项目 → 加依赖 → 运行** 全流程走完。

---

## 五、已有项目：从 requirements.txt 接入

若已有 `requirements.txt`，在项目目录下执行：

```bash
uv init
uv add -r requirements.txt
```

即可把现有依赖接到 uv 项目里，之后用 `uv run python xxx.py` 运行即可。

---

## 六、常用命令速查

| 你想做的事           | 命令 |
|----------------------|------|
| 看 uv 版本           | `uv --version` |
| 新建 Python 项目     | `uv init` |
| 给项目加依赖         | `uv add 包名`（如 `uv add requests`） |
| 按锁文件同步环境     | `uv sync` |
| 用项目环境跑脚本     | `uv run python main.py` 或 `uv run pytest` |
| 安装指定 Python 版本 | `uv python install 3.12` |
| 临时跑一个工具       | `uvx 工具名`（如 `uvx ruff check .`） |

---

## 七、和 pip 对比，一句话

- **pip**：装包、建虚拟环境要自己来，大项目容易慢。
- **uv**：一条命令完成项目初始化、依赖安装和运行，速度快、用法简单。

记住三件事就够日常用：**`uv --version` 看版本，`uv add 包名` 加依赖，`uv run python xxx.py` 跑脚本**。
