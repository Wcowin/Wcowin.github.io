# Mac 开发环境检查清单

## 概述

这份清单用于全面检查和优化 Mac 开发环境。通过系统的检查和配置，可以确保开发工具正常运行，提升开发效率。

## 系统信息检查

### 基础系统

- [ ] macOS 版本（建议 12.0+）
  ```bash
  sw_vers
  ```
- [ ] 硬件配置（处理器、内存、磁盘）
  ```bash
  system_profiler SPHardwareDataType | grep -E "Model|Processor|Memory"
  ```
- [ ] 磁盘空间充足（建议 100GB+ 可用）
  ```bash
  df -h /
  ```

## Xcode 和编译工具

### 必需项

- [ ] Xcode 已安装
  ```bash
  xcode-select -p
  xcodebuild -version
  ```
- [ ] Xcode Command Line Tools 已安装
  ```bash
  pkgutil --pkg-info=com.apple.pkg.CLTools_Executables
  ```
- [ ] Swift 编译器可用
  ```bash
  swift --version
  ```
- [ ] iOS SDK 完整
  ```bash
  xcrun --show-sdk-version --sdk iphoneos
  ```

## 编程语言检查

### Python

- [ ] Python 3.13+ 已安装
  ```bash
  python3 --version
  which python3
  ```
- [ ] pip 可用
  ```bash
  pip3 --version
  ```
- [ ] 虚拟环境工具可用
  ```bash
  python3 -m venv --help
  ```

### Node.js

- [ ] Node.js 最新版本已安装
  ```bash
  node --version
  npm --version
  ```
- [ ] npm 全局包管理正常
  ```bash
  npm list -g --depth=0
  ```
- [ ] pnpm 已安装（可选）
  ```bash
  pnpm --version
  ```

### Ruby

- [ ] Ruby 已安装
  ```bash
  ruby --version
  ```
- [ ] Gem 可用
  ```bash
  gem --version
  ```

### Java

- [ ] Java 已安装
  ```bash
  java -version
  ```
- [ ] JAVA_HOME 已配置
  ```bash
  echo $JAVA_HOME
  ```

### 其他语言

- [ ] Rust（如需要）
  ```bash
  rustc --version
  cargo --version
  ```
- [ ] Go（如需要）
  ```bash
  go version
  ```

## 包管理器检查

### Homebrew

- [ ] Homebrew 已安装
  ```bash
  brew --version
  ```
- [ ] 无错误或警告
  ```bash
  brew doctor
  ```
- [ ] 包列表正常
  ```bash
  brew list | wc -l
  ```
- [ ] 更新可用的包数量合理
  ```bash
  brew outdated | wc -l
  ```

### Conda/Anaconda

- [ ] Conda 已安装（如需要）
  ```bash
  conda --version
  ```
- [ ] 环境列表正常
  ```bash
  conda info --envs
  ```
- [ ] 自动激活 base 环境已禁用
  ```bash
  echo $CONDA_AUTO_ACTIVATE_BASE
  ```

## 版本控制

### Git

- [ ] Git 已安装
  ```bash
  git --version
  ```
- [ ] 用户信息已配置
  ```bash
  git config --global user.name
  git config --global user.email
  ```
- [ ] SSH 密钥已生成
  ```bash
  ls -la ~/.ssh/id_rsa
  ls -la ~/.ssh/id_ed25519
  ```
- [ ] SSH 配置文件存在
  ```bash
  [ -f ~/.ssh/config ] && echo "存在" || echo "不存在"
  ```

## Shell 环境检查

### 配置文件

- [ ] .zshrc 语法正确
  ```bash
  zsh -n ~/.zshrc
  ```
- [ ] .bash_profile 语法正确
  ```bash
  bash -n ~/.bash_profile
  ```
- [ ] .zprofile 语法正确
  ```bash
  zsh -n ~/.zprofile
  ```

### PATH 环境变量

- [ ] PATH 长度合理（建议 < 2000 字符）
  ```bash
  echo ${#PATH}
  ```
- [ ] PATH 中无重复项
  ```bash
  echo $PATH | tr ':' '\n' | sort | uniq -c | grep -v "^ *1 "
  ```
- [ ] 关键工具在 PATH 中
  ```bash
  which java python3 node ruby git docker
  ```

### 环境变量

- [ ] JAVA_HOME 已配置
  ```bash
  echo $JAVA_HOME
  ```
- [ ] CONDA_AUTO_ACTIVATE_BASE 已禁用
  ```bash
  echo $CONDA_AUTO_ACTIVATE_BASE
  ```
- [ ] NVM_DIR 已配置（如使用 NVM）
  ```bash
  echo $NVM_DIR
  ```

## 开发工具检查

### 编辑器/IDE

- [ ] Xcode 已安装
  ```bash
  xcode-select -p
  ```
- [ ] VS Code 已安装（可选）
  ```bash
  code --version
  ```
- [ ] Windsurf 已安装（可选）
  ```bash
  windsurf --version
  ```

### 容器化

- [ ] Docker 已安装（如需要）
  ```bash
  docker --version
  ```
- [ ] Docker 守护进程运行正常
  ```bash
  docker ps
  ```

### 其他工具

- [ ] Git 图形工具（可选）
  ```bash
  which gitk
  ```
- [ ] 包管理工具（CocoaPods 等）
  ```bash
  pod --version
  ```

## 项目环境检查

### OneClip 项目（如适用）

- [ ] 项目目录存在
  ```bash
  [ -d ~/Pictures/OneClipProMax ] && echo "存在"
  ```
- [ ] Xcode 项目文件存在
  ```bash
  [ -f ~/Pictures/OneClipProMax/OneClip.xcodeproj/project.pbxproj ] && echo "存在"
  ```
- [ ] 编译命令可用
  ```bash
  xcodebuild -project OneClip.xcodeproj -scheme OneClip -configuration Debug build
  ```

## 性能和缓存

### Xcode 缓存

- [ ] DerivedData 大小合理（建议 < 5GB）
  ```bash
  du -sh ~/Library/Developer/Xcode/DerivedData
  ```
- [ ] 定期清理缓存
  ```bash
  rm -rf ~/Library/Developer/Xcode/DerivedData/*
  ```

### Homebrew 缓存

- [ ] 缓存大小合理
  ```bash
  du -sh ~/Library/Caches/Homebrew
  ```

### npm 缓存

- [ ] 缓存验证正常
  ```bash
  npm cache verify
  ```

## 安全检查

### SSH 密钥

- [ ] RSA 密钥存在
  ```bash
  [ -f ~/.ssh/id_rsa ] && echo "存在"
  ```
- [ ] Ed25519 密钥存在（推荐）
  ```bash
  [ -f ~/.ssh/id_ed25519 ] && echo "存在"
  ```
- [ ] 密钥权限正确
  ```bash
  ls -la ~/.ssh/id_*
  ```

### 凭证管理

- [ ] Git 凭证助手已配置
  ```bash
  git config --global credential.helper
  ```
- [ ] API 密钥安全存储（不在配置文件中）

## 常见问题修复

### 问题：Xcode 环境解析超时

**检查步骤**：  

1. 检查 PATH 长度：`echo ${#PATH}`
2. 检查 PATH 重复项：`echo $PATH | tr ':' '\n' | sort | uniq -c | grep -v "^ *1 "`
3. 清理重复项（参考 Shell 环境优化指南）

### 问题：Shell 启动缓慢

**检查步骤**：  

1. 测试启动时间：`time zsh -i -c exit`
2. 检查 Conda 初始化：`grep -n "conda initialize" ~/.zshrc`
3. 禁用不需要的插件

### 问题：JAVA_HOME 未设置

**检查步骤**：  

1. 验证 Java 安装：`java -version`
2. 检查 .zprofile：`grep JAVA_HOME ~/.zprofile`
3. 检查 .bash_profile：`grep JAVA_HOME ~/.bash_profile`
4. 重新加载配置：`exec zsh` 或 `exec bash`

## 优化建议

### 高优先级

- [ ] 清理 PATH 中的重复项
- [ ] 配置 JAVA_HOME
- [ ] 验证 Xcode 环境完整性
- [ ] 检查 Homebrew 健康状态

### 中优先级

- [ ] 生成 Ed25519 SSH 密钥
- [ ] 配置 Git 凭证助手
- [ ] 清理 Xcode 缓存
- [ ] 更新过期的 Homebrew 包

### 低优先级

- [ ] 安装可选开发工具
- [ ] 配置编辑器插件
- [ ] 优化 shell 主题和插件
- [ ] 设置开发环境文档

## 环境评分

使用以下标准评分开发环境：

| 项目 | 权重 | 评分标准 |
|------|------|--------|
| 系统和硬件 | 10% | 硬件配置充足，系统最新 |
| 编译工具 | 20% | Xcode 完整，无错误 |
| 编程语言 | 20% | 所有需要的语言已安装且版本最新 |
| 包管理器 | 15% | Homebrew 健康，无警告 |
| Shell 环境 | 15% | PATH 清洁，无重复，配置正确 |
| 开发工具 | 10% | 必需工具已安装且可用 |
| 项目环境 | 10% | 项目文件完整，可编译 |

**评分范围**：  

- 9.0-10.0：优秀（所有项目都完成）  
- 8.0-8.9：良好（大部分项目完成，有轻微问题）  
- 7.0-7.9：一般（存在多个问题但不影响开发）  
- < 7.0：需要改进（存在严重问题，影响开发效率）  

## 定期维护计划

### 每周

- [ ] 检查 Homebrew 更新：`brew outdated`
- [ ] 验证关键工具可用性

### 每月

- [ ] 运行 `brew doctor` 检查
- [ ] 检查 PATH 健康状态
- [ ] 清理 npm 缓存：`npm cache clean --force`

### 每季度

- [ ] 清理 Xcode 缓存
- [ ] 更新所有 Homebrew 包：`brew upgrade`
- [ ] 检查 SSH 密钥安全性

### 每年

- [ ] 完整的开发环境审计
- [ ] 升级 macOS 和 Xcode
- [ ] 更新所有编程语言到最新版本

## 相关文档

- [Mac Shell 环境优化指南](./Mac-Shell-Environment-Optimization.md)
- [Xcode 最佳实践](./Xcode-Best-Practices.md)
- [Homebrew 包管理指南](./Homebrew-Guide.md)

## 快速参考

### 一键检查脚本

```bash
#!/bin/bash

echo "=== Mac 开发环境检查 ==="
echo ""
echo "系统信息:"
sw_vers | grep ProductVersion
echo ""
echo "Xcode:"
xcode-select -p
echo ""
echo "编程语言:"
echo "Python: $(python3 --version)"
echo "Node: $(node --version)"
echo "Ruby: $(ruby --version)"
echo "Java: $(java -version 2>&1 | head -1)"
echo ""
echo "包管理器:"
echo "Homebrew: $(brew --version)"
echo ""
echo "Shell 环境:"
echo "PATH 长度: ${#PATH}"
echo "PATH 重复项: $(echo $PATH | tr ':' '\n' | sort | uniq -c | grep -v '^ *1 ' | wc -l)"
echo ""
echo "开发工具:"
echo "Git: $(git --version)"
echo "Docker: $(docker --version 2>/dev/null || echo '未安装')"
echo ""
echo "JAVA_HOME: $JAVA_HOME"
echo ""
echo "=== 检查完成 ==="
```

保存为 `check-dev-env.sh`，使用 `bash check-dev-env.sh` 运行。
