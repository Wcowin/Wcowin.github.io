---
title: OneClip 代码签名与辅助功能授权方案
description: 分享 OneClip 代码签名与辅助功能授权方案
tags:
  - macOS
  - SwiftUI
---

# OneClip 代码签名与辅助功能授权方案

## 概述

苹果官方的开发者证书99美刀一年，独立开发者可能无力承担，本文介绍 [OneClip](https://github.com/Wcowin/OneClip) 如何通过**脚本自动化**实现个人证书对应用签名和应用分发，确保用户首次授权后，后续更新无需重新授权辅助功能。

[直接看完整脚本示例](#_12)

## 核心原理

### 为什么需要代码签名？

1. **应用身份识别**：macOS 通过证书识别应用
2. **同一应用判定**：同证书签名的应用被视为同一应用
3. **更新无需重授权**：更新时保持相同身份，辅助功能授权保留

### 授权流程

```
首次安装 → 用户授权辅助功能 → 授权记录保存
    ↓
应用更新（同证书签名）→ macOS 识别为同一应用 → 授权保留 ✅
```

## OneClip 脚本实现

### 1. 构建脚本 (`build.sh`)

OneClip 使用构建脚本自动化编译和签名：

```bash
#!/bin/bash

# 配置
APP_NAME="OneClip"
SCHEME="OneClip"
PROJECT="OneClip.xcodeproj"
CONFIGURATION="Release"

# 获取开发者身份
# 使用固定的证书 ID 确保签名一致性
FIXED_SIGNING_IDENTITY="xx"

# 构建应用
xcodebuild -project "$PROJECT" \
    -scheme "$SCHEME" \
    -configuration "$CONFIGURATION" \
    -derivedDataPath build \
    CODE_SIGN_IDENTITY="$FIXED_SIGNING_IDENTITY" \
    build

# 验证签名
codesign -v dist/builds/universal/OneClip.app
```

**关键点**：

- 使用固定的 `FIXED_SIGNING_IDENTITY` 证书 ID
- 所有版本使用相同身份签名
- 构建后验证签名有效性

### 2. 发布脚本 (`sparkle_release.sh`)

OneClip 使用 Sparkle 框架进行自动更新，发布脚本负责：

```bash
#!/bin/bash

# 配置
APP_NAME="OneClip"
VERSION="1.3.8"
DIST_DIR="./dist"
BUILDS_DIR="$DIST_DIR/builds"
RELEASE_DIR="$DIST_DIR/releases/$VERSION"

# 1. 构建应用
echo "📦 构建应用..."
xcodebuild -project OneClip.xcodeproj \
    -scheme OneClip \
    -configuration Release \
    -derivedDataPath build

# 2. 创建 DMG 包
echo "📀 创建 DMG..."
mkdir -p "$RELEASE_DIR"
hdiutil create -volname "OneClip" \
    -srcfolder build/Release/OneClip.app \
    -ov -format UDZO \
    "$RELEASE_DIR/OneClip-$VERSION.dmg"

# 3. 生成 Sparkle 签名
echo "🔐 生成更新签名..."
PRIVATE_KEY="./tools/sparkle/keys/private.ed25519"
SIGNATURE=$(./tools/sparkle/bin/sign_update \
    "$RELEASE_DIR/OneClip-$VERSION.dmg" \
    "$PRIVATE_KEY")

# 4. 生成 appcast.xml
echo "📝 生成 appcast.xml..."
cat > "$RELEASE_DIR/appcast.xml" << EOF
<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:sparkle="http://www.andymatuschak.org/xml-namespaces/sparkle">
  <channel>
    <title>OneClip Updates</title>
    <item>
      <title>Version $VERSION</title>
      <sparkle:version>$VERSION</sparkle:version>
      <sparkle:shortVersionString>$VERSION</sparkle:shortVersionString>
      <link>https://github.com/Wcowin/OneClip/releases</link>
      <description>OneClip $VERSION 更新</description>
      <pubDate>$(date -u +"%a, %d %b %Y %H:%M:%S +0000")</pubDate>
      <enclosure url="https://github.com/Wcowin/OneClip/releases/download/$VERSION/OneClip-$VERSION.dmg"
                 sparkle:version="$VERSION"
                 sparkle:shortVersionString="$VERSION"
                 sparkle:edSignature="$SIGNATURE"
                 length="$(stat -f%z "$RELEASE_DIR/OneClip-$VERSION.dmg")"
                 type="application/octet-stream"/>
    </item>
  </channel>
</rss>
EOF

echo "✅ 发布完成！"
```

**核心流程**：

1. 使用相同证书构建应用
2. 创建 DMG 分发包
3. 使用 Sparkle 私钥签名更新
4. 生成 appcast.xml 供应用检查更新

### 3. 配置文件

#### `OneClip/OneClip.entitlements`

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <!-- 应用标识符：唯一标识应用 -->
    <key>com.apple.application-identifier</key>
    <string>$(AppIdentifierPrefix)wcowin.OneClip</string>
    
    <!-- 键盘输入权限 -->
    <key>com.apple.security.device.keyboard-input</key>
    <true/>
    
    <!-- 文件访问权限 -->
    <key>com.apple.security.files.user-selected.read-only</key>
    <true/>
    
    <!-- Apple Events 权限：支持辅助功能 -->
    <key>com.apple.security.temporary-exception.apple-events</key>
    <array>
        <string>com.apple.systemevents</string>
    </array>
    
    <!-- 调试权限 -->
    <key>com.apple.security.get-task-allow</key>
    <true/>
    
    <!-- 钥匙串访问 -->
    <key>com.apple.security.keychain-access-groups</key>
    <array>
        <string>$(AppIdentifierPrefix)wcowin.OneClip</string>
    </array>
</dict>
</plist>
```

#### `Info.plist` 中的关键配置

```xml
<!-- 应用标识符：必须保持一致 -->
<key>CFBundleIdentifier</key>
<string>wcowin.OneClip</string>

<!-- 版本号：每次更新递增 -->
<key>CFBundleShortVersionString</key>
<string>1.3.8</string>

<!-- Sparkle 更新配置 -->
<key>SUFeedURL</key>
<string>https://wcowin.work/OneClip/updates/appcast.xml</string>

<key>SUPublicEDKey</key>
<string>YOUR_PUBLIC_ED_KEY</string>

<!-- 权限声明 -->
<key>NSAccessibilityUsageDescription</key>
<string>OneClip需要辅助功能权限来监控剪贴板变化。</string>

<key>NSAppleEventsUsageDescription</key>
<string>OneClip需要Apple Events权限来监控剪贴板变化。</string>
```

## 完整工作流程

### 步骤 1：本地开发和测试

```bash
# 1. 在本地构建和测试
./build.sh

# 2. 验证应用签名
codesign -dvvv build/Release/OneClip.app

# 3. 测试应用功能
open build/Release/OneClip.app
```

### 步骤 2：发布新版本

```bash
# 1. 更新版本号
# 编辑 OneClip/Info.plist，更新 CFBundleShortVersionString

# 2. 运行发布脚本
./sparkle_release.sh -u  # -u 表示通用版本

# 3. 脚本自动执行：
#    - 构建应用
#    - 创建 DMG
#    - 生成 Sparkle 签名
#    - 生成 appcast.xml
```

### 步骤 3：上传到分发服务器

```bash
# 上传 DMG 到 GitHub Releases
gh release create v1.3.8 \
    dist/releases/1.3.8/OneClip-1.3.8.dmg

# 上传 appcast.xml 到更新服务器
scp dist/releases/1.3.8/appcast.xml \
    user@server:/var/www/oneclip/updates/
```

### 步骤 4：用户更新流程

```
用户运行 OneClip
    ↓
应用检查 SUFeedURL (appcast.xml)
    ↓
发现新版本 1.3.8
    ↓
下载 DMG（使用 Sparkle 签名验证）
    ↓
验证签名有效 ✅
    ↓
安装新版本（同证书签名）
    ↓
macOS 识别为同一应用 → 保留授权 ✅
    ↓
应用重启，无需重新授权
```

## 关键脚本命令详解

### 代码签名验证

```bash
# 查看应用的完整签名信息
codesign -dvvv /path/to/OneClip.app

# 输出示例：
# Executable=/path/to/OneClip.app/Contents/MacOS/OneClip
# Identifier=wcowin.OneClip
# Format=Mach-O universal (Intel x86_64 + Apple Silicon arm64)
# CodeDirectory v=20500 size=12345 flags=0x10000(runtime)
# Authority=Apple Development: your-email@example.com (TEAM_ID)
# Authority=Apple Worldwide Developer Relations Certification Authority
# Authority=Apple Root CA
# Timestamp=2025-12-04 02:00:00 +0000
# Info.plist entries=15
# Sealed Resources version=2 rules=13 files=42
# Internal requirements count=1 size=172
```

### Sparkle 签名生成

```bash
# 使用 Sparkle 私钥签名更新包
./tools/sparkle/bin/sign_update \
    dist/releases/1.3.8/OneClip-1.3.8.dmg \
    tools/sparkle/keys/private.ed25519

# 输出：签名字符串（用于 appcast.xml 中的 sparkle:edSignature）
```

### 版本号管理脚本

```bash
#!/bin/bash
# 自动更新版本号

NEW_VERSION="1.3.9"
PLIST_FILE="OneClip/Info.plist"

# 更新 CFBundleShortVersionString
plutil -replace CFBundleShortVersionString -string "$NEW_VERSION" "$PLIST_FILE"

# 更新 CFBundleVersion
plutil -replace CFBundleVersion -string "$NEW_VERSION" "$PLIST_FILE"

# 验证
plutil -p "$PLIST_FILE" | grep -E "CFBundle.*Version"
```

## 常见问题

### Q1: 为什么更新后还是要授权？

**原因分析**：

| 原因 | 检查方法 |
|------|----------|
| 证书不同 | `codesign -dvvv` 检查 Authority 字段 |
| Bundle ID 改变 | `plutil -p Info.plist` 检查 CFBundleIdentifier |
| 签名失败 | `codesign -v` 验证签名有效性 |

**解决方案**：

```bash
# 确保使用相同的证书
FIXED_SIGNING_IDENTITY="YOUR_CERTIFICATE_ID"

# 检查所有版本的 Bundle ID
for app in build/Release/OneClip*.app; do
    plutil -p "$app/Contents/Info.plist" | grep CFBundleIdentifier
done

# 重新签名
codesign -f -s "$FIXED_SIGNING_IDENTITY" dist/builds/universal/OneClip.app
```

### Q2: 如何在 CI/CD 中自动签名？

```bash
#!/bin/bash
# CI/CD 自动签名脚本

# 导入证书到 keychain
security import certificate.p12 \
    -k ~/Library/Keychains/login.keychain \
    -P "$CERTIFICATE_PASSWORD" \
    -T /usr/bin/codesign

# 设置 keychain 为默认
security default-keychain -s ~/Library/Keychains/login.keychain

# 构建和签名
xcodebuild -project OneClip.xcodeproj \
    -scheme OneClip \
    -configuration Release \
    CODE_SIGN_IDENTITY="$FIXED_SIGNING_IDENTITY"

# 验证
codesign -v dist/builds/universal/OneClip.app
```

### Q3: 如何测试更新流程？

```bash
# 1. 修改 Info.plist 中的 SUFeedURL 指向本地服务器
plutil -replace SUFeedURL -string "http://localhost:8000/appcast.xml" \
    OneClip/Info.plist

# 2. 启动本地 HTTP 服务器
python3 -m http.server 8000 --directory dist/releases/1.3.8

# 3. 运行应用，手动检查更新
# 应用 → 菜单 → 检查更新

# 4. 观察日志
log stream --predicate 'process == "OneClip"' --level debug
```

## 脚本最佳实践

### 1. 错误处理

```bash
#!/bin/bash
set -e  # 任何命令失败立即退出

# 添加错误处理
if ! codesign -v "$APP_PATH"; then
    echo "❌ 签名验证失败"
    exit 1
fi

echo "✅ 签名验证成功"
```

### 2. 日志记录

```bash
#!/bin/bash

LOG_FILE="build.log"

# 记录所有输出
{
    echo "=== OneClip 构建开始 ==="
    echo "时间: $(date)"
    echo "版本: $VERSION"
    
    # 构建命令
    xcodebuild -project OneClip.xcodeproj ...
    
    echo "=== 构建完成 ==="
} | tee "$LOG_FILE"
```

### 3. 版本控制

```bash
#!/bin/bash

# 从 git tag 读取版本
VERSION=$(git describe --tags --abbrev=0)

# 或从 version.txt 读取
VERSION=$(cat version.txt)

# 验证版本格式
if [[ ! $VERSION =~ ^[0-9]+\.[0-9]+\.[0-9]+$ ]]; then
    echo "❌ 版本格式错误: $VERSION"
    exit 1
fi
```

## 总结

OneClip 通过脚本自动化实现了完整的代码签名和分发流程：

| 阶段 | 脚本 | 作用 |
|------|------|------|
| **开发** | `build.sh` | 编译和本地签名 |
| **发布** | `sparkle_release.sh` | 生成分发包和签名 |
| **验证** | `codesign` | 验证签名有效性 |
| **更新** | Sparkle 框架 | 自动检查和安装更新 |

**关键成果**：

- ✅ 自动化构建和签名
- ✅ 用户首次授权后，后续更新无需重新授权
- ✅ 完整的签名验证链
- ✅ 可靠的版本管理

## **完整脚本示例**

```bash
#!/bin/bash
# OneClip 完整构建发布脚本
# 用法: ./release.sh <版本号>
# 示例: ./release.sh 1.3.9

set -e  # 遇到错误立即退出

# ==================== 配置 ====================
APP_NAME="OneClip"
PROJECT="OneClip.xcodeproj"
SCHEME="OneClip"
CONFIGURATION="Release"
FIXED_SIGNING_IDENTITY="YOUR_CERTIFICATE_ID"  # 替换为你的证书 ID
SPARKLE_PRIVATE_KEY="./tools/sparkle/keys/private.ed25519" #你的sparkle私钥
DIST_DIR="./dist" #输出目录

# ==================== 参数检查 ====================
VERSION=${1:-$(plutil -p "$APP_NAME/Info.plist" | grep CFBundleShortVersionString | awk -F'"' '{print $2}')}

if [[ ! $VERSION =~ ^[0-9]+\.[0-9]+\.[0-9]+$ ]]; then
    echo "❌ 版本格式错误: $VERSION (应为 x.y.z)"
    exit 1
fi

echo "🚀 开始构建 $APP_NAME v$VERSION"

# ==================== 更新版本号 ====================
echo "📝 更新版本号..."
plutil -replace CFBundleShortVersionString -string "$VERSION" "$APP_NAME/Info.plist"
plutil -replace CFBundleVersion -string "$VERSION" "$APP_NAME/Info.plist"

# ==================== 构建应用 ====================
echo "🔨 构建应用..."
xcodebuild -project "$PROJECT" \
    -scheme "$SCHEME" \
    -configuration "$CONFIGURATION" \
    -derivedDataPath build \
    CODE_SIGN_IDENTITY="$FIXED_SIGNING_IDENTITY" \
    clean build

# ==================== 验证签名 ====================
APP_PATH="build/Build/Products/$CONFIGURATION/$APP_NAME.app"
echo "🔐 验证签名..."
if ! codesign -v "$APP_PATH"; then
    echo "❌ 签名验证失败"
    exit 1
fi
echo "✅ 签名验证成功"

# ==================== 创建发布目录 ====================
RELEASE_DIR="$DIST_DIR/releases/$VERSION"
mkdir -p "$RELEASE_DIR"

# ==================== 创建 DMG ====================
echo "📀 创建 DMG..."
DMG_PATH="$RELEASE_DIR/$APP_NAME-$VERSION.dmg"
hdiutil create -volname "$APP_NAME" \
    -srcfolder "$APP_PATH" \
    -ov -format UDZO \
    "$DMG_PATH"

# ==================== 生成 Sparkle 签名 ====================
echo "🔏 生成 Sparkle 签名..."
SIGNATURE=$(./tools/sparkle/bin/sign_update "$DMG_PATH" "$SPARKLE_PRIVATE_KEY")
FILE_SIZE=$(stat -f%z "$DMG_PATH")
PUB_DATE=$(date -u +"%a, %d %b %Y %H:%M:%S +0000")

# ==================== 生成 appcast.xml ====================
echo "📝 生成 appcast.xml..."
cat > "$RELEASE_DIR/appcast.xml" << EOF
<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:sparkle="http://www.andymatuschak.org/xml-namespaces/sparkle">
  <channel>
    <title>$APP_NAME Updates</title>
    <item>
      <title>Version $VERSION</title>
      <sparkle:version>$VERSION</sparkle:version>
      <sparkle:shortVersionString>$VERSION</sparkle:shortVersionString>
      <link>https://github.com/Wcowin/OneClip/releases</link>
      <description>$APP_NAME $VERSION 更新</description>
      <pubDate>$PUB_DATE</pubDate>
      <enclosure url="https://github.com/Wcowin/OneClip/releases/download/v$VERSION/$APP_NAME-$VERSION.dmg"
                 sparkle:version="$VERSION"
                 sparkle:shortVersionString="$VERSION"
                 sparkle:edSignature="$SIGNATURE"
                 length="$FILE_SIZE"
                 type="application/octet-stream"/>
    </item>
  </channel>
</rss>
EOF

# ==================== 完成 ====================
echo ""
echo "=========================================="
echo "✅ $APP_NAME v$VERSION 构建完成！"
echo "=========================================="
echo "📦 DMG: $DMG_PATH"
echo "📄 Appcast: $RELEASE_DIR/appcast.xml"
echo ""
echo "下一步："
echo "  1. gh release create v$VERSION $DMG_PATH"
echo "  2. 上传 appcast.xml 到更新服务器"
echo "=========================================="
```


## 参考资源

- [Sparkle Framework Documentation](https://sparkle-project.org/)
- [Apple Code Signing Guide](https://developer.apple.com/documentation/security/code_signing_services)
- [macOS Entitlements](https://developer.apple.com/documentation/bundleresources/entitlements)
- [OneClip 官网](https://oneclip.cloud)
