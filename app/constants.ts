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
