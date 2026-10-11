# 官网改版调研与实施记录

日期：2026-10-07。依据用户提供的《ECL Website Redesign Implementation Spec v1.0》实施。

## 调研依据

- 官网原有六个路由、轻量双语字典、Nuxt UI、亮暗切换和在线 iframe 均保留。
- 本地 Launcher Frontend，基准提交 `ca483b05c185df25c11a431d7849d64f0f0f2e16`：`src/config/theme.ts` 的六个预设色；`src/composables/useTheme.ts` 的 HSL 转换、色相偏移、深色压暗与 Aurora 透明度；`src/styles/tokens.css`、`base.css`、`design-system.css`、`folia.css`、`components/layout/SideBar.css`、`TitleBar.css` 和 `src/App.vue` 的表面、控件、层级与背景结构。仅参考，未修改该仓库。
- [Nuxt 预渲染](https://nuxt.com/docs/4.x/getting-started/prerendering)：使用 SSR 加 `nuxt generate` 输出完整静态 HTML。
- [Nuxt Image 静态图片](https://image.nuxt.com/advanced/static-images)：在生成时预先输出 IPX 图片；暗色图片也必须进入预渲染范围。
- [Nuxt UI 主题](https://ui.nuxt.com/docs/getting-started/theme)：建立 `ecl` 色阶并将 primary 映射为 `ecl`，避免覆写 green 色阶。
- GitHub Releases API 调研：当前 `/releases/latest` 返回 404，最近版本为预发布；下载仍以 [Releases](https://github.com/ECLTeam/EuoraCraft-Launcher/releases) 实际附件为准，不伪造稳定版、统计或自动平台检测。

## 选定实现

1. 移植纯色彩计算，不引入 Pinia、Naive UI 或 Material You；通过 Nuxt `useState` 共享会话主色。
2. Light/Dark Aurora 变量一并输出，由 CSS `.dark` 选择，避免预渲染时猜测系统主题。默认主色 `#5B6FF5`。
3. 全站固定 Aurora 安全置底；营销信息用 Classic，导航、主题体验和最终 CTA 用 Folia。控件 6px、卡片 8px、大面板 12px。
4. 首页由 Hero、四个交替 Feature Stories、主题体验、在线体验预览、社区和下载 CTA 组成。技术栈仅留在 About。
5. 采用现有真实界面和项目在线演示截图，不生成虚假 UI；没有授权独立角色立绘，因此不启用角色层。
6. 语言状态改为 SSR 安全的 `useState`，浏览器存储在挂载后读取；主题图同时输出亮暗资源，避免 hydration 差异。
7. SSR 注册 reveal 指令，服务端保留可读内容；只对屏幕下方元素在客户端启用进入动画。减少动效时全部静止。
8. 打开 `@nuxt/image`，图片写明尺寸；首屏 eager，其余 lazy。首页不加载 iframe。
9. 补充翻译 SEO、OG 图、随语言变化的 lang 与页面标题；保持 License 和免责声明。
10. 分阶段修改并运行 lint、typecheck、build，再检查真实静态预览的路由、图片、双语、主题、移动导航、无 JS 与 reduced-motion。

## 素材边界

已有截图可以继续使用；项目原创或明确授权的独立角色素材缺失，角色 slot 保留但不渲染。需要后续提供清晰、统一版本的生产截图时，只替换营销图片，不改页面布局。

## 首轮改版图片来源（后续已更新）

- `launcher-overview.webp` 与 `launcher-overview-dark.webp`：仓库原有 `app/img/show-1*.png`，仅转码，不重绘界面。
- instances / mods / connect / plugins 亮暗截图：2026-10-07 从项目自有 `https://frontend.euora.cn/` 演示站在 1280×800 下截取；分别对应 `/versions`、`/download?tab=mod`、`/more/room`、`/more/plugins`。页面明确标注为演示截图。
- `og-cover.png`：现有主界面截图适配 1200×630；不引入新的角色资产。
- 图片许可沿用原仓库 CC BY-NC 4.0。缺少原创或明确授权的独立角色立绘，以及统一发布版本的正式营销截图。

## 构建配套修正

`better-sqlite3` 13 已附带平台预编译包，但原 pnpm allowBuilds 会在本机触发不必要的 node-gyp 编译。禁用该包构建后，实际内存数据库查询及冻结锁文件安装均通过；不需要安装 C++ 工具或改变依赖版本。Nuxt UI 自动字体下载关闭，保留文档要求的系统字体栈。静态站所需图标（包括字典内动态引用）在构建时打包，不请求不存在的静态图标接口。

## 对比度处理

原始 Accent 继续用于主题变量和装饰。文字链接从 Accent 派生更深的浅色文本色和更浅的暗色文本色；实心操作按钮使用单独的 `--ecl-action`，避免薄荷绿、天空蓝等预设下白色按钮文字对比度过低。简化主题预览明确标注为预览，不伪装成实际启动器截图。

## 文件清单

- `.gitignore`
- `README.md`
- `app/app.config.ts`
- `app/app.vue`
- `app/assets/css/ecl-theme.css`
- `app/assets/css/main.css`
- `app/components/AppFooter.vue`
- `app/components/AppHeader.vue`
- `app/components/ColorModeToggle.vue`
- `app/components/EclAuroraBackdrop.vue`
- `app/components/EclSurface.vue`
- `app/components/MdContent.vue`
- `app/components/PageHeader.vue`
- `app/components/ShowcaseFrame.vue`
- `app/components/home/FeatureStory.vue`
- `app/components/home/HomeDownloadCta.vue`
- `app/components/home/HomeFeatureStories.vue`
- `app/components/home/HomeHero.vue`
- `app/components/home/HomeOpenSource.vue`
- `app/components/home/HomeShowcasePreview.vue`
- `app/components/home/LauncherWindowMockup.vue`
- `app/components/home/ThemePlayground.vue`
- `app/composables/useEclAccent.ts`
- `app/composables/useI18n.ts`
- `app/locales/en-US.json`
- `app/locales/zh-CN.json`
- `app/pages/about.vue`
- `app/pages/docs.vue`
- `app/pages/download.vue`
- `app/pages/features.vue`
- `app/pages/index.vue`
- `app/pages/showcase.vue`
- `app/plugins/locale.client.ts`
- `app/types/raw.d.ts`（补齐原文件缺少的末尾换行，使 lint 通过）
- `app/plugins/reveal.client.ts`
- `app/plugins/reveal.ts`
- `app/utils/eclColor.ts`
- `docs/redesign-research.md`
- `nuxt.config.ts`
- `pnpm-workspace.yaml`
- `public/marketing/launcher-connect-dark.webp`
- `public/marketing/launcher-connect.webp`
- `public/marketing/launcher-instances-dark.webp`
- `public/marketing/launcher-instances.webp`
- `public/marketing/launcher-mods-dark.webp`
- `public/marketing/launcher-mods.webp`
- `public/marketing/launcher-overview-dark.webp`
- `public/marketing/launcher-overview.webp`
- `public/marketing/launcher-plugins-dark.webp`
- `public/marketing/launcher-plugins.webp`
- `public/marketing/og-cover.png`

## 验证结果

- `pnpm install --frozen-lockfile`：通过。
- `pnpm lint`：退出码 0；保留已有 MdContent 的 `vue/no-v-html` 警告，内容仅来自仓库自有 Markdown。
- `pnpm typecheck`：通过。
- `pnpm build`：通过，生成 `dist/`；75 条预渲染资源（含六个页面、payload 与亮暗图片）。构建工具仍有 Windows 路径／依赖注释和 Content 默认集合的告警，无构建失败。
- 静态产物核对：六页各有一个 H1，lang、canonical 正确；首页无 iframe，showcase 保留 iframe；HTML 内所有 IPX src/srcset 对应静态文件均存在。
- 双语字典键完全对应。
- Edge / Playwright：148 项断言通过，六路由 × 中英 × 1440/390/320px，无横向溢出；补查 768/1024px 首页。
- 六色选择、跨路由保留 Accent、刷新恢复默认、语言偏好刷新恢复、移动导航打开／Escape 关闭／跳转关闭、暗色图片、reduced-motion 均通过。
- 全部可见营销图片加载成功，验证期间浏览器 console 零错误／警告，无 hydration 警告、无静态资产失败请求。
- 六路由禁用 JavaScript 后 H1 和正文仍可阅读。
- 实际截图：`output/playwright/home-desktop.png`、`home-mobile.png`、`home-dark.png`、`home-full.png`；脚本与日志在同目录，均为被 git 忽略的本地验证产物。
- 本次未运行 Lighthouse，不宣称达到文档中的分数目标。

- 补充实际交互验证：iframe 内的账户管理控件成功加载；等待颜色过渡完成后，Aurora 计算样式与下载按钮背景均随天空蓝／珊瑚橙切换而变化。截图 `showcase.png` 与 `theme-playground.png` 已留存。

2026-10-07 后续内容刷新已替换本记录中的首轮营销截图，并修正更新能力、插件边界、文档入口与功能清单；以 [内容更新记录](content-refresh-2026-10-07.md) 为当前内容依据。
