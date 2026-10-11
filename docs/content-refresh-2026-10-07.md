# 官网内容核对与更新

核对日期：2026-10-07。保留上一轮视觉改版，更新内容、链接与营销截图。

## 当前证据

- GitHub 主仓库 main：`8fc1aaa119db601a38974fb2eef774801cafdbaa`；前端 main：`ca483b05c185df25c11a431d7849d64f0f0f2e16`。仅通过 API 读取，没有拉取、合并或推送。
- 本地主仓库 `180b1d1`，前端 `a247a59`；本地前端包含 2026-10-07 的 Java 管理卡片修正，用于生成当前开发版演示截图。
- [GitHub Releases](https://github.com/ECLTeam/EuoraCraft-Launcher/releases)：最新公开记录为 `v0.1.0-beta.2+20260919` 预发布，附件包括 Windows x64/ARM64、Linux x64、macOS ARM64 DMG、Arch x86_64 包。开发版与公开发布包不能混为同一个版本。
- [官方文档站](https://docs.euora.cn/) 及英文入口 `/en/`、中英文 `/guide/introduction/` 均返回 HTTP 200。
- 官网原有三个 GitHub 专题指南仍有效，新增插件归档、主题协议和命令行指南均返回 HTTP 200。
- 后端 `ECL/host/app_update.py`：内置更新适用于打包运行的 beta / rc / release；前端 `features/settings/composables/useUpdateCheck.ts` 和 `views/settings/AboutTab.vue` 已提供检查、下载与重启更新操作。
- `frontend/src/views/settings/JavaTab.vue`、`features/java/` 和 `ECL/java/`：本地扫描、Temurin 安装、选择和管理已实现。
- `frontend/src/views/more/ToolsTab.vue`：自定义下载、Minecraft 皮肤头像导出、NAT 检测已实现。
- `ECL/services/game/resources.py` 和 `frontend/src/components/mods/OnlineModSearch.vue`：Modrinth / CurseForge 资源搜索、版本与加载器过滤、安装资源和更新管理。
- `ECL/services/game/crash/`：实际崩溃收集、规则和模组信息分析代码。
- 远程 [插件格式文档](https://github.com/ECLTeam/EuoraCraft-Launcher/blob/main/docs/eclplugin-package-format.md) 明确插件在主进程中运行，依赖目录隔离不提供安全沙箱。
- 主仓库 `pyproject.toml` 与前端 `package.json` 确认 Python、PyTauri/Tauri、Vue、TypeScript、Vite、Naive UI、Tailwind CSS 与 EasyTier 仍在使用；未把待迁移的框架写成已落地。

## 修正内容

1. 官方文档站替代 Wiki 为主要入口，官网英文切换时优先进入英文文档。主题与插件专题保留有内容的 GitHub 文档。
2. 特性页从六项扩展为十一项：实例、资源、Java、账户与皮肤、联机、插件、外观、崩溃分析、工具、更新、多语言。
3. 外观文案改为 Classic / Folia、Aurora、背景和主题包，框架信息集中到 About。
4. 删除“不提供自动更新”，按打包运行形态与通道说明更新流程；保留手动更新入口。
5. 不再宣传插件权限模型能够提供运行安全沙箱，说明真实安装、依赖与重启行为。
6. 补全 About 和 SEO，全部同步中英文；特性与 About 说明内容基于当前开发版，发布包以对应说明为准。
7. 平台卡使用实际发布架构，避免把 macOS 写成 x86_64。
8. 主图改为当前实例管理界面；四个功能故事重新截图，亮暗各一套；OG 图同步刷新。

## 截图来源

在被 git 忽略的 `output/playwright/current-frontend/` 中展开前端 `a247a59` 的 git archive，使用已有依赖启动 `--mode showcase`，仅截图演示数据。没有改动启动器或前端原仓库。

1280×800，路由为 `/versions`、`/download?tab=mod`、`/more/room`、`/more/plugins`。主图复用实例管理截图。图片转码为 WebP，并同步默认尺寸与 alt；页面明确标注当前开发版与演示数据。没有继续使用 2026-08-05 的旧主界面宣传图。

## 维护边界

功能说明来自已落地代码，不从 plan 文档推断完成状态。官网不在浏览器请求 GitHub API，不伪造统计、自动检测平台或新版本号。下一次更新平台与功能说明时应重新核对 Release 附件和当前代码。

## 验证结果

- `pnpm lint`：通过；保留已有 Markdown 渲染的 `vue/no-v-html` 提示。
- `pnpm typecheck`：通过。
- `pnpm build`：通过，输出静态 `dist/` 与全部亮暗营销图片。
- 中英字典键一致，预渲染 HTML 含新增功能、官方文档链接和修正后的 About，已无“不提供自动更新”。
- Playwright / Edge：159 项内容与布局断言通过。核对六路由、中英文、1440/390/320px、11 项特性、8 个文档入口、语言对应的文档 URL、真实架构、主图尺寸与暗色切换；无 console、hydration 或图标错误。
- 外链 HTTP 检查通过：官方文档站及中英文首次使用入口、三份原有专题和三份新增专题。
- 页面截图留在 `output/playwright/current-home.png`、`current-home-dark.png`、`current-features.png`、`current-docs.png`，是被 git 忽略的本地验证产物。
- 前端原仓库工作区保持干净；本轮只修改官网及其文档与营销资源。

## 后续小幅调整

根据用户反馈，首页 H1 改为统一品牌名 `EuoraCraft Launcher`，移除原宣传语标题的双语字段。顶部语言选择改为 Nuxt UI `USelect`，沿用原语言状态与保存机制，统一触发器、弹层、选中态和键盘操作。1440/390/320px 下中英文切换、下拉关闭与横向布局通过浏览器检查；类型检查、lint 和静态构建通过。

## 下拉样式与首页简化

- 修复全局 `:focus-visible` 样式覆盖 Nuxt UI 下拉选项，导致弹层内出现裁切蓝线的问题；组合控件使用自身高亮与焦点状态。
- 语言弹层使用独立、实底的亮暗 Surface，统一边界、圆角、阴影、选中背景与勾选图标。
- Logo 固定不收缩，1024px 以下使用折叠导航；修复英文平板宽度下 Logo 与导航重叠。小屏留足控件空间。
- 首屏收敛多余留白，手机下载／在线体验按钮统一全宽对齐。
- 删除首页 `HomeShowcasePreview` 和对应 `site-section demo-section`，清理未使用的 home.showcase 翻译；导航、Hero 的在线体验入口及 `/showcase` 专页继续可用。
- lint、typecheck、build 通过。82 项浏览器断言通过，覆盖中英 × 320/390/768/900/1024/1440px 的菜单样式、触控区域、弹层位置、控件边界和导航无重叠，以及暗色弹层、移动导航与 Showcase 路由。无浏览器错误。
- 截图：`output/playwright/dropdown-fixed-light.png`、`dropdown-fixed-dark.png`、`home-refined.png`。

补充验证：下拉支持 Space 打开、ArrowDown 聚焦、Enter 选择，键盘高亮为完整背景且无裁切轮廓；另检查六个页面在英文 390/768/1440px 下均无横向溢出。

## 用户主图与主题区块移除

按用户最新要求：首页使用用户提供的启动器截图，原始 PNG 保存为 `public/marketing/launcher-overview.png`，与附件 SHA-256 一致，尺寸为 962×602。Nuxt Image 负责静态 WebP 输出；亮暗模式均展示原图，未制作虚假的暗色版本。分享图同步更新，首页 alt 与图注改为启动器主界面。功能故事保留其各自的真实亮暗截图。

删除 `site-section site-container theme-section` 对应的 ThemePlayground 组件、翻译和六色选择逻辑。删除无其他消费者的 Accent composable 与颜色工具；默认 ECL 蓝、亮暗模式和 Aurora 保留，Aurora 使用原算法派生出的固定蓝色数值。补齐字典引用的静态图标，避免删除主题组件后特性页丢失实例／外观图标。README 已同步。

lint、typecheck、build 通过；静态图片路径与双语键一致性检查通过。320/390/768/1024/1440px 验证原图加载、尺寸与无横向溢出，主题区块确实不存在；暗色模式下原图仍可见、Aurora 正常，无浏览器错误。截图在 `output/playwright/user-image-home.png` 和 `user-image-home-dark.png`。
