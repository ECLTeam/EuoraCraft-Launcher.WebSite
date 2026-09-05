# EuoraCraft Launcher 官网

[EuoraCraft Launcher](https://github.com/ECLTeam/EuoraCraft-Launcher) 的官方社区网站，多页面静态站点。

- 技术栈：Nuxt 4 + Nuxt UI 4 + Tailwind CSS 4 + TypeScript
- 构建形态：`nuxt generate` 输出静态产物，可部署到任意静态托管
- 站点语言：中文（zh-CN）

## 页面

| 路由 | 页面 |
|:--|:--|
| `/` | 首页 |
| `/features` | 特性 |
| `/download` | 下载 |
| `/docs` | 文档 |
| `/about` | 关于 |

## 开发

```bash
pnpm install
pnpm dev        # 开发服务器 http://localhost:3000
pnpm build      # 生产构建（nuxt generate）
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