export const BRAND = {
  name: 'EuoraCraft Launcher',
  shortName: 'ECL',
  org: 'ECLTeam',
  email: 'ECL@eclteam.top',
  year: 2026
}

export const LINKS = {
  repo: 'https://github.com/ECLTeam/EuoraCraft-Launcher',
  releases: 'https://github.com/ECLTeam/EuoraCraft-Launcher/releases',
  wiki: 'https://github.com/ECLTeam/EuoraCraft-Launcher/wiki',
  issues: 'https://github.com/ECLTeam/EuoraCraft-Launcher/issues'
}

// 「页面浏览」内嵌来源：指向启动器前端 `pnpm build:showcase` 构建产物的托管地址。
// 未填入时 /showcase 页面显示「尚未配置」占位；填入后页面会用 iframe 实时内嵌启动器界面。
export const SHOWCASE_URL = ''

// 文档入口仅保留「翻译 key + 跳转地址」，文案统一存放在 locales/ 字典
export const DOCS = [
  { key: 'wiki', href: LINKS.wiki },
  {
    key: 'themeDesigner',
    href: 'https://github.com/ECLTeam/EuoraCraft-Launcher/blob/main/docs/theme-designer-guide.zh-CN.md'
  },
  {
    key: 'pluginConnector',
    href: 'https://github.com/ECLTeam/EuoraCraft-Launcher/blob/main/docs/plugin-connector-extensions.md'
  },
  {
    key: 'instanceCompat',
    href: 'https://github.com/ECLTeam/EuoraCraft-Launcher/blob/main/docs/plugin-instance-compatibility.md'
  }
]

export const LICENSE = {
  code: 'GNU General Public License v3.0',
  images: 'Creative Commons Attribution-NonCommercial 4.0 (CC BY-NC 4.0)'
}

export const TECH_STACK = [
  'Python',
  'Tauri',
  'Vue 3',
  'TypeScript',
  'Naive UI',
  'Tailwind CSS'
]
