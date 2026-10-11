# EuoraCraft Launcher 官网

[EuoraCraft Launcher](https://github.com/ECLTeam/EuoraCraft-Launcher) 的官方社区网站，多页面预渲染静态站点，视觉沿用启动器的 ECL Aurora、Classic Surface 和 Folia Glass。

- 技术栈：Nuxt 4 + Nuxt UI 4 + Tailwind CSS 4 + TypeScript
- 构建形态：`nuxt generate` 输出静态产物，可部署到任意静态托管
- 站点语言：中文（zh-CN）与英文（en-US）
- 静态产物：`dist/`，兼容现有 GitHub Pages 工作流
- 主题：亮暗模式、ECL 蓝品牌色与 Aurora 背景

## 页面

| 路由 | 页面 |
|:--|:--|
| `/` | 首页 |
| `/features` | 特性 |
| `/download` | 下载 |
| `/docs` | 文档 |
| `/about` | 关于 |
| `/showcase` | 在线体验 |

## 开发

```bash
pnpm install
pnpm dev        # 开发服务器 http://localhost:3000
pnpm lint       # ESLint
pnpm typecheck  # Vue / TypeScript 检查
pnpm build      # 生产构建（nuxt generate，完整静态 HTML + 图片）
pnpm preview    # 本地预览构建产物
```

## 目录结构

```text
app/
├─ assets/css/       # 全局样式与品牌主题
├─ components/       # AppHeader / AppFooter / PageHeader 等
├─ data/features.ts  # 特性数据（首页与特性页共用）
├─ pages/            # 页面路由
├─ constants.ts      # 品牌名、链接、许可证等共享常量
└─ app.vue           # 应用骨架（布局 / SEO）
public/              # 静态资源（favicon 等）
```

## 品牌与链接

- 品牌名：EuoraCraft Launcher（ECL），由 ECLTeam 维护
- 代码许可：GPL-3.0；Logo 与图片：CC BY-NC 4.0
- 仓库：https://github.com/ECLTeam/EuoraCraft-Launcher
## 改版实现

- [调研与实施记录](docs/redesign-research.md)
- `app/assets/css/ecl-theme.css`：ECL 色彩、Surface、圆角和 Nuxt UI Token 映射。
- `app/components/home/`：首页独立区块；首页不加载演示 iframe。
- `public/marketing/`：用户提供的首页原始 PNG、功能演示的亮暗截图；营销图片由 Nuxt Image 输出 WebP。

语言偏好在 hydration 后从 localStorage 恢复，无存储权限时仍能使用。营销内容在无 JavaScript 时可阅读。

构建时可通过 `NUXT_PUBLIC_SITE_URL` 修改 canonical 和 OG 图的域名，默认 `https://euora.cn`；通过 `NUXT_PUBLIC_SHOWCASE_URL` 修改在线演示目标，默认 `https://frontend.euora.cn/`。目标站需允许 iframe 嵌入。

图标打包在静态站点中，不依赖图标接口；字体只使用系统 fallback，不自动下载 Web Font。

内容核对依据与当前截图来源见 [2026-10-07 内容更新记录](docs/content-refresh-2026-10-07.md)。
