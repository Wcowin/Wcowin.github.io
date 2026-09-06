# 长期记忆

## 用户协作偏好

- **不要代为运行构建/本地服务**：用户明确要求"后面不需要自己跑，只需要改代码就行了"。因此不要自动执行 `zensical build`、`zensical serve`、预览 URL 等验证动作，改完代码直接汇报改动即可（2026-09-06 确认）。

## 项目约定

- 站点生成器是 **Zensical**，唯一配置源是根目录 `zensical.toml`（不是 mkdocs.yml）。
- 首页公告栏有两处使用：
  - 首页 `docs/index.md` 顶部的多条活动公告（class 含 `oneclip-announcement--top`）
  - `docs/blog/OneClip.md`、`docs/develop/Mywork/OneClip.md` 的单行 OneClip 推广条
- 移动端断点：首页 Hero 用 700px，公告栏/全局样式用 767/768px。
- 首页移动端已不再整体隐藏 Hero，改为纵向堆叠；顶部多条公告栏在移动端隐藏（仅 `--top` 变体）。
