# Cloudflare Worker 代理部署指南

使用 Cloudflare Worker 作为硅基流动 API 的代理，保护 API Key 不被前端暴露。

## 部署步骤

### 1. 安装 Wrangler CLI

```bash
npm install -g wrangler
```

### 2. 登录 Cloudflare

```bash
wrangler login
```

### 3. 设置 API Key

```bash
wrangler secret put SILICONFLOW_API_KEY
```

输入你的硅基流动 API Key。

### 4. 部署 Worker

```bash
cd workers
wrangler deploy
```

部署成功后，你会得到一个类似 `https://siliconflow-proxy.your-subdomain.workers.dev` 的地址。

### 5. 更新前端配置

修改以下文件中的 Worker 地址：

1. `docs/javascripts/glm-config.js` - 翻译功能
2. `docs/javascripts/chat-widget.js` - Ask AI 功能

将 `https://siliconflow-proxy.your-subdomain.workers.dev` 替换为实际的 Worker 地址。

### 6. 测试

部署完成后，访问你的博客，测试翻译和 Ask AI 功能是否正常工作。

## 安全配置

### 限制访问来源（可选）

编辑 `siliconflow-proxy.js`，取消注释以下代码来限制只允许特定域名访问：

```javascript
// 验证来源（可选，如果你希望公开访问可以注释掉）
if (!isAllowedOrigin(origin)) {
  return new Response(JSON.stringify({ error: 'Origin not allowed' }), {
    status: 403,
    headers: {
      'Content-Type': 'application/json',
      ...getCorsHeaders(origin)
    }
  });
}
```

同时更新 `ALLOWED_ORIGINS` 列表：

```javascript
const ALLOWED_ORIGINS = [
  'https://wcowin.work',
  'https://www.wcowin.work',
  // 添加其他允许的域名
];
```

## 监控和日志

在 Cloudflare Dashboard 中可以查看：
- 请求次数
- 错误率
- 执行时间

免费版每天 10万次请求，对于个人博客完全够用。

## 故障排查

### Worker 返回 500 错误
- 检查 `SILICONFLOW_API_KEY` 是否正确设置
- 查看 Cloudflare Dashboard 中的日志

### 跨域错误
- 确保 Worker 的 CORS 配置正确
- 检查请求的 `Origin` 头是否在允许列表中

### API 调用失败
- 检查硅基流动 API Key 是否有效
- 确认没有超出免费额度
