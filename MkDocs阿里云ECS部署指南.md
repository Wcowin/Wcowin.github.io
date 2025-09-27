# 🚀 MkDocs 网站部署到阿里云服务器 - 超详细小白教程

## 📖 这个教程是干什么的？

想象一下，你有一个很漂亮的个人网站（用 MkDocs 制作的），现在它只存在于你的电脑上。这个教程就是教你怎么把这个网站放到互联网上，让全世界的人都能访问！

**简单来说：** 把网站从你的电脑 → 上传到阿里云服务器 → 全世界都能看到

## 🎯 学完这个教程你能得到什么？

✅ 一个可以在互联网上访问的网站  
✅ 自动更新功能（代码一改，网站自动更新）  
✅ 免费的 SSL 证书（网址前面有绿色小锁）  
✅ 专业的域名（比如 www.yourname.com）  

## 📋 准备工作清单

在开始之前，你需要准备这些东西：

### 1. 阿里云服务器
- **什么是服务器？** 就像一台 24 小时不关机的电脑，专门用来放网站
- **怎么买？** 去阿里云官网买一台 Ubuntu 系统的服务器（最便宜的就行，大概 1-2 元/天）
- **推荐配置：** 1核2G内存，40G硬盘（够用了）

### 2. 域名（可选但推荐）
- **什么是域名？** 就是网址，比如 www.baidu.com
- **在哪里买？** 阿里云、腾讯云都可以买
- **价格：** 一般 10-50 元/年

### 3. GitHub 账号
- **什么是 GitHub？** 一个存放代码的网站
- **为什么需要？** 你的网站代码就存在这里
- **免费吗？** 完全免费

### 4. 一台能上网的电脑
- Windows、Mac、Linux 都可以
- 需要安装一个叫"终端"或"命令行"的工具

## ⚠️ 重要提醒

- **不要害怕！** 这个教程很详细，跟着做就行
- **出错了？** 没关系，每个步骤都有解决方案
- **看不懂？** 可以随时问我
- **时间：** 大概需要 1-2 小时完成

# 🛠️ 第一步：连接你的服务器

## 1.1 什么是连接服务器？

想象服务器就像一台在很远地方的电脑，你需要通过"遥控器"来控制它。这个"遥控器"就是终端（命令行）。

## 1.2 如何连接服务器？

### Windows 用户：
1. 按 `Win + R`，输入 `cmd`，按回车
2. 在黑色窗口里输入：
```bash
ssh root@你的服务器IP地址
```
**例子：** `ssh root@123.456.789.123`

### Mac 用户：
1. 按 `Command + 空格`，搜索"终端"
2. 在终端里输入：
```bash
ssh root@你的服务器IP地址
```

### 如果提示输入密码：
- 输入你买服务器时设置的密码
- **注意：** 输入密码时屏幕上不会显示任何字符，这是正常的！

### 如果连接成功：
你会看到类似这样的提示：
```bash
root@your-server:~#
```
恭喜！你已经成功连接到服务器了！

## 1.3 安装必要的软件

现在我们要在服务器上安装一些"工具"，就像在手机上安装 App 一样。

**复制下面这行命令，粘贴到终端里，然后按回车：**

```bash
sudo apt update && sudo apt upgrade -y
```

**解释：** 这行命令是更新服务器，就像更新手机系统一样。

**等待完成后，再复制这行命令：**

```bash
sudo apt install -y python3 python3-pip python3-venv python3-dev git nginx supervisor curl wget unzip build-essential libssl-dev libffi-dev
```

**解释：** 这行命令安装了：
- `python3`：运行网站需要的程序
- `git`：从 GitHub 下载代码的工具
- `nginx`：让网站能被访问的工具
- 其他一些辅助工具

**等待时间：** 大概 5-10 分钟，请耐心等待！

## 1.4 检查安装是否成功

输入这个命令检查：
```bash
python3 --version
```

如果显示类似 `Python 3.8.10` 这样的版本号，说明安装成功了！

## ✅ 第一步完成！

现在你的服务器已经准备好了，可以进入下一步了！

# 📁 第二步：下载你的网站代码

## 2.1 创建网站文件夹

想象服务器就像你的电脑，我们需要创建一个专门的文件夹来放网站。

**复制这行命令：**
```bash
sudo mkdir -p /var/www/mkdocs
```

**解释：** 在服务器上创建一个叫 `mkdocs` 的文件夹

**再复制这行命令：**
```bash
sudo chown -R root:root /var/www/mkdocs
```

**解释：** 设置文件夹的权限，让系统知道这是你的文件夹

**最后复制这行命令：**
```bash
cd /var/www/mkdocs
```

**解释：** 进入这个文件夹，就像双击文件夹一样

## 2.2 从 GitHub 下载你的网站代码

现在我们要从 GitHub 把网站代码下载到服务器上。

**重要：** 把下面的 `你的GitHub用户名` 和 `你的仓库名` 替换成真实的！

```bash
git clone https://github.com/你的GitHub用户名/你的仓库名.git .
```

**例子：** 如果你的 GitHub 地址是 `https://github.com/wangkewen/my-blog`，那么命令就是：
```bash
git clone https://github.com/wangkewen/my-blog.git .
```

**等待时间：** 大概 1-2 分钟

## 2.3 设置 Python 环境

现在我们要设置一个"虚拟环境"，就像给网站准备一个独立的小房间。

**复制这行命令：**
```bash
python3 -m venv venv
```

**解释：** 创建一个叫 `venv` 的虚拟环境

**再复制这行命令：**
```bash
source venv/bin/activate
```

**解释：** 进入这个虚拟环境

**你会看到命令前面多了 `(venv)`，这说明成功了！**

**最后复制这行命令：**
```bash
pip install --upgrade pip
```

**解释：** 升级 pip（一个安装工具）

## 2.4 安装网站需要的程序

现在我们要安装网站运行需要的各种程序。

**如果你的项目有 `requirements.txt` 文件：**
```bash
pip install -r requirements.txt
```

**如果没有这个文件，就安装基础的：**
```bash
pip install mkdocs mkdocs-material
```

**等待时间：** 大概 3-5 分钟

## 2.5 测试网站是否能正常运行

现在我们来测试一下网站能不能正常生成。

**复制这行命令：**
```bash
mkdocs build
```

**解释：** 把网站代码转换成网页文件

**如果成功了，你会看到类似这样的信息：**
```
INFO    -  Cleaning site directory
INFO    -  Building documentation to directory: /var/www/mkdocs/site
INFO    -  Documentation built in 2.34 seconds
```

**检查生成的文件：**
```bash
ls -la site/
```

**解释：** 查看生成的网站文件

**如果看到很多 `.html` 文件，说明成功了！**

## ✅ 第二步完成！

你的网站代码已经成功下载到服务器上了！

# 🌐 第三步：让全世界都能访问你的网站

## 3.1 什么是 Nginx？

Nginx 就像一个"门卫"，当有人想访问你的网站时，它会：
1. 检查这个人有没有权限
2. 找到对应的网页文件
3. 把网页发送给访问者

## 3.2 配置 Nginx（网站门卫）

现在我们要告诉 Nginx 你的网站在哪里，以及怎么处理访问请求。

**复制这行命令：**
```bash
sudo nano /etc/nginx/sites-available/mkdocs
```

**解释：** 打开一个文本编辑器，用来写配置文件

**你会看到一个空白的编辑界面，把下面的内容复制粘贴进去：**

```nginx
server {
    listen 80;
    server_name 你的域名.com www.你的域名.com;  # 把"你的域名.com"改成你的真实域名
    
    root /var/www/mkdocs/site;
    index index.html;
    
    # 日志配置
    access_log /var/log/nginx/mkdocs_access.log;
    error_log /var/log/nginx/mkdocs_error.log;
    
    # 启用压缩（让网站加载更快）
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_proxied any;
    gzip_comp_level 6;
    gzip_types
        text/plain
        text/css
        text/xml
        text/javascript
        application/json
        application/javascript
        application/xml+rss
        application/atom+xml
        image/svg+xml;
    
    # 静态文件缓存（让图片、CSS等加载更快）
    location ~* \.(css|js|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
        add_header Vary "Accept-Encoding";
    }
    
    # HTML 文件缓存
    location ~* \.html$ {
        expires 1h;
        add_header Cache-Control "public";
    }
    
    # 处理网站路由
    location / {
        try_files $uri $uri/ /index.html;
    }
    
    # 安全设置
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;
    add_header Content-Security-Policy "default-src 'self' http: https: data: blob: 'unsafe-inline'" always;
    
    # 隐藏 Nginx 版本
    server_tokens off;
}
```

**重要：** 记得把 `你的域名.com` 改成你的真实域名！

**保存文件：**
- 按 `Ctrl + X`
- 按 `Y`
- 按 `回车`

## 3.3 启用网站配置

现在我们要告诉 Nginx 使用刚才的配置。

**复制这行命令：**
```bash
sudo ln -s /etc/nginx/sites-available/mkdocs /etc/nginx/sites-enabled/
```

**解释：** 启用我们的网站配置

**再复制这行命令：**
```bash
sudo rm /etc/nginx/sites-enabled/default
```

**解释：** 删除默认的配置（避免冲突）

**检查配置是否正确：**
```bash
sudo nginx -t
```

**如果看到 `syntax is ok` 和 `test is successful`，说明配置正确！**

**重启 Nginx：**
```bash
sudo systemctl restart nginx
```

**让 Nginx 开机自动启动：**
```bash
sudo systemctl enable nginx
```

## 3.4 测试网站是否能访问

现在我们来测试一下网站能不能正常访问。

**在浏览器中打开：**
```
http://你的服务器IP地址
```

**或者如果你有域名：**
```
http://你的域名.com
```

**如果能看到你的网站，恭喜！成功了！**

## ✅ 第三步完成！

你的网站现在已经可以在互联网上访问了！

# 🔒 第四步：给网站加个"安全锁"（SSL证书）

## 4.1 什么是 SSL 证书？

SSL 证书就像给网站加了一把"安全锁"，有了它：
- 网址前面会有一个绿色的小锁 🔒
- 网站传输的数据会被加密，更安全
- 搜索引擎会更喜欢你的网站
- 用户访问时不会看到"不安全"的警告

## 4.2 安装证书工具

我们要使用一个叫 Certbot 的工具来获取免费的 SSL 证书。

**复制这行命令：**
```bash
sudo apt install certbot python3-certbot-nginx -y
```

**解释：** 安装获取 SSL 证书的工具

**等待时间：** 大概 2-3 分钟

## 4.3 获取免费的 SSL 证书

现在我们来获取免费的 SSL 证书。

**重要：** 把下面的域名改成你的真实域名！

```bash
sudo certbot --nginx -d 你的域名.com -d www.你的域名.com
```

**例子：** 如果你的域名是 `example.com`，那么命令就是：
```bash
sudo certbot --nginx -d example.com -d www.example.com
```

**接下来会问你一些问题：**

1. **邮箱地址：** 输入你的邮箱（用来接收证书到期提醒）
2. **同意条款：** 输入 `Y` 然后按回车
3. **是否分享邮箱：** 输入 `N` 然后按回车（推荐）

**等待时间：** 大概 1-2 分钟

**如果成功了，你会看到类似这样的信息：**
```
Successfully deployed certificate for your-domain.com
Congratulations! You have successfully enabled HTTPS on https://your-domain.com
```

## 4.4 设置自动续期

SSL 证书每年需要更新一次，我们设置自动更新，这样就不用担心过期了。

**复制这行命令：**
```bash
sudo crontab -e
```

**解释：** 打开定时任务编辑器

**在文件最后添加这行：**
```
0 12 * * * /usr/bin/certbot renew --quiet
```

**保存文件：**
- 按 `Ctrl + X`
- 按 `Y`
- 按 `回车`

**解释：** 这行命令的意思是每天中午 12 点自动检查证书是否需要更新

## 4.5 测试 HTTPS 是否工作

现在我们来测试一下 HTTPS 是否正常工作。

**在浏览器中打开：**
```
https://你的域名.com
```

**注意：** 这次是 `https://` 而不是 `http://`

**如果看到：**
- 网址前面有绿色的小锁 🔒
- 网站正常显示
- 没有安全警告

**恭喜！SSL 证书配置成功了！**

## ✅ 第四步完成！

你的网站现在有了安全锁，更加安全了！

# 🤖 第五步：让网站自动更新

## 5.1 什么是自动部署？

想象一下，每次你修改了网站内容，都要手动登录服务器、下载代码、重新构建...这样太麻烦了！

自动部署就是：**你只需要在 GitHub 上更新代码，服务器就会自动更新网站！**

## 5.2 创建自动部署脚本

我们要创建一个"机器人"，让它帮我们自动更新网站。

**复制这行命令：**
```bash
nano /var/www/mkdocs/deploy.sh
```

**解释：** 创建一个叫 `deploy.sh` 的脚本文件

**你会看到一个空白的编辑界面，把下面的内容复制粘贴进去：**

```bash
#!/bin/bash

# 部署脚本配置
PROJECT_DIR="/var/www/mkdocs"
LOG_FILE="/var/log/mkdocs-deploy.log"
BACKUP_DIR="/var/backups/mkdocs"

# 创建日志函数
log() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1" | tee -a $LOG_FILE
}

log "开始部署 MkDocs 项目..."

# 进入项目目录
cd $PROJECT_DIR

# 激活虚拟环境
source venv/bin/activate

# 备份当前版本
if [ -d "site" ]; then
    log "备份当前版本..."
    sudo mkdir -p $BACKUP_DIR
    sudo cp -r site $BACKUP_DIR/site-$(date +%Y%m%d-%H%M%S)
fi

# 拉取最新代码
log "拉取最新代码..."
git fetch origin
git reset --hard origin/main  # 或 origin/master，根据您的默认分支

# 安装/更新依赖
log "更新依赖..."
pip install -r requirements.txt

# 构建网站
log "构建网站..."
mkdocs build

# 检查构建是否成功
if [ $? -eq 0 ]; then
    log "构建成功！"
    
    # 设置正确的文件权限
    sudo chown -R www-data:www-data site/
    sudo chmod -R 755 site/
    
    # 重新加载 Nginx
    sudo systemctl reload nginx
    
    log "部署完成！"
    
    # 清理旧备份（保留最近 5 个）
    sudo find $BACKUP_DIR -name "site-*" -type d | sort -r | tail -n +6 | sudo xargs rm -rf
    
else
    log "构建失败！"
    exit 1
fi
```

**保存文件：**
- 按 `Ctrl + X`
- 按 `Y`
- 按 `回车`

## 5.3 让脚本可以运行

**复制这行命令：**
```bash
chmod +x /var/www/mkdocs/deploy.sh
```

**解释：** 让脚本文件可以执行

## 5.4 测试自动部署脚本

现在我们来测试一下脚本是否正常工作。

**复制这行命令：**
```bash
/var/www/mkdocs/deploy.sh
```

**解释：** 运行部署脚本

**如果成功了，你会看到类似这样的信息：**
```
[2024-01-15 10:30:00] 开始部署 MkDocs 项目...
[2024-01-15 10:30:01] 备份当前版本...
[2024-01-15 10:30:02] 拉取最新代码...
[2024-01-15 10:30:05] 更新依赖...
[2024-01-15 10:30:08] 构建网站...
[2024-01-15 10:30:10] 构建成功！
[2024-01-15 10:30:11] 部署完成！
```

**查看详细日志：**
```bash
tail -f /var/log/mkdocs-deploy.log
```

**解释：** 实时查看部署日志

## 5.5 设置定时自动更新

现在我们来设置每天自动检查更新。

**复制这行命令：**
```bash
crontab -e
```

**解释：** 打开定时任务编辑器

**在文件最后添加这行：**
```
0 2 * * * /var/www/mkdocs/deploy.sh >> /var/log/mkdocs-deploy.log 2>&1
```

**保存文件：**
- 按 `Ctrl + X`
- 按 `Y`
- 按 `回车`

**解释：** 这行命令的意思是每天凌晨 2 点自动运行部署脚本

## ✅ 第五步完成！

现在你的网站可以自动更新了！每次你在 GitHub 上更新代码，服务器就会自动更新网站。

# 🎉 恭喜！你的网站已经部署成功了！

## 📋 部署完成清单

让我们检查一下你的网站是否完全部署成功：

### ✅ 基础功能
- [ ] 网站可以在浏览器中正常访问
- [ ] 网站显示正常，没有错误
- [ ] 所有页面都能正常打开

### ✅ 安全功能
- [ ] 网址前面有绿色小锁 🔒（HTTPS）
- [ ] 没有安全警告
- [ ] SSL 证书正常工作

### ✅ 自动更新功能
- [ ] 部署脚本可以正常运行
- [ ] 定时任务已设置
- [ ] 日志文件正常生成

## 🔧 常用管理命令

以后你需要管理网站时，可以使用这些命令：

### 手动更新网站
```bash
/var/www/mkdocs/deploy.sh
```

### 查看更新日志
```bash
tail -f /var/log/mkdocs-deploy.log
```

### 重启网站服务
```bash
sudo systemctl restart nginx
```

### 检查网站状态
```bash
sudo systemctl status nginx
```

## 🚨 常见问题解决

### 问题1：网站打不开
**解决方法：**
```bash
# 检查 Nginx 是否运行
sudo systemctl status nginx

# 如果没有运行，启动它
sudo systemctl start nginx
```

### 问题2：网站显示错误
**解决方法：**
```bash
# 查看错误日志
sudo tail -f /var/log/nginx/error.log

# 重新部署网站
/var/www/mkdocs/deploy.sh
```

### 问题3：SSL 证书问题
**解决方法：**
```bash
# 检查证书状态
sudo certbot certificates

# 重新获取证书
sudo certbot --nginx -d 你的域名.com
```

## 🎯 下一步你可以做什么？

### 1. 自定义域名
- 在阿里云购买域名
- 将域名解析到你的服务器 IP
- 更新 Nginx 配置

### 2. 添加更多功能
- 添加评论系统
- 添加搜索功能
- 添加统计功能

### 3. 优化性能
- 配置 CDN
- 优化图片
- 启用缓存

## 📞 需要帮助？

如果你在部署过程中遇到任何问题：

1. **查看日志文件** - 大多数问题都能在日志中找到原因
2. **检查命令是否正确** - 确保复制粘贴的命令没有错误
3. **重启服务** - 有时候重启一下就能解决问题
4. **联系技术支持** - 如果实在解决不了，可以寻求帮助

## 🎊 总结

恭喜你！你已经成功完成了：

✅ **服务器环境配置** - 安装了所有必要的软件  
✅ **网站代码部署** - 从 GitHub 下载并配置了网站  
✅ **Web 服务器配置** - 让全世界都能访问你的网站  
✅ **SSL 证书配置** - 给网站加上了安全锁  
✅ **自动更新配置** - 让网站能够自动更新  

现在你的网站已经：
- 🌐 可以在互联网上访问
- 🔒 有安全的 HTTPS 连接
- 🤖 可以自动更新
- 📱 支持手机和电脑访问

**你的网站地址：** `https://你的域名.com`

**管理地址：** 通过 SSH 连接服务器进行管理

---

**🎉 再次恭喜！你的个人网站已经成功上线了！**
