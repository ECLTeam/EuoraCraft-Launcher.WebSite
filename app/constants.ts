export const BRAND = {
  name: 'EuoraCraft Launcher',
  shortName: 'ECL',
  org: 'ECLTeam',
  email: 'ECL@euora.cn',
  year: 2026
}

export const LINKS = {
  repo: 'https://github.com/ECLTeam/EuoraCraft-Launcher',
  releases: 'https://github.com/ECLTeam/EuoraCraft-Launcher/releases',
  docs: 'https://docs.euora.cn/',
  docsEn: 'https://docs.euora.cn/en/',
  issues: 'https://github.com/ECLTeam/EuoraCraft-Launcher/issues'
}

// 文档入口仅保留「翻译 key + 跳转地址」，文案统一存放在 locales/ 字典
export const DOCS: { key: string, href: string, hrefEn?: string }[] = [
  { key: 'guide', href: LINKS.docs, hrefEn: LINKS.docsEn },
  {
    key: 'gettingStarted',
    href: 'https://docs.euora.cn/guide/introduction/',
    hrefEn: 'https://docs.euora.cn/en/guide/introduction/'
  },
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
  },
  {
    key: 'pluginPackages',
    href: 'https://github.com/ECLTeam/EuoraCraft-Launcher/blob/main/docs/eclplugin-package-format.md'
  },
  {
    key: 'themePlugin',
    href: 'https://github.com/ECLTeam/EuoraCraft-Launcher/blob/main/docs/theme-plugin-protocol.md'
  },
  {
    key: 'cli',
    href: 'https://github.com/ECLTeam/EuoraCraft-Launcher/blob/main/docs/launcher-cli.md'
  }
]

export const LICENSE = {
  code: 'GNU General Public License v3.0',
  images: 'Creative Commons Attribution-NonCommercial 4.0 (CC BY-NC 4.0)'
}

export const TECH_STACK = [
  'Python',
  'PyTauri / Tauri 2',
  'Vue 3',
  'TypeScript',
  'Vite',
  'Tailwind CSS',
  'Naive UI',
  'EasyTier'
]
