export const BRAND = {
  name: 'EuoraCraft Launcher',
  shortName: 'ECL',
  tagline: '使用 Python 编写的现代化 Minecraft 第三方启动器，支持插件拓展功能',
  taglineEn: 'Modern Minecraft third-party launcher written in Python, with plugin extensibility.',
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

export const DOCS = {
  wiki: {
    title: '项目文档（Wiki）',
    description: '使用教程、常见问题与进阶指南，适合首次使用前阅读。',
    href: LINKS.wiki
  },
  themeDesigner: {
    title: '主题设计指南',
    description: '在独立窗口中可视化编辑主题，并导出 .ecltheme 主题包。',
    href: 'https://github.com/ECLTeam/EuoraCraft-Launcher/blob/main/docs/theme-designer-guide.zh-CN.md'
  },
  pluginConnector: {
    title: '联机扩展协议',
    description: '通过插件为联机大厅扩展自定义协议。',
    href: 'https://github.com/ECLTeam/EuoraCraft-Launcher/blob/main/docs/plugin-connector-extensions.md'
  },
  instanceCompat: {
    title: '实例兼容扩展',
    description: '读取其他启动器的只读实例元数据，实现实例兼容。',
    href: 'https://github.com/ECLTeam/EuoraCraft-Launcher/blob/main/docs/plugin-instance-compatibility.md'
  }
}

export const LICENSE = {
  code: 'GNU General Public License v3.0',
  images: 'Creative Commons Attribution-NonCommercial 4.0 (CC BY-NC 4.0)'
}

export const DISCLAIMER
  = 'EuoraCraft Launcher 是独立的第三方社区工具，与 Mojang Studios、Microsoft 或任何其子公司没有任何附属关系、背书关系或官方关联。'

export const TECH_STACK = [
  'Python',
  'Tauri',
  'Vue 3',
  'TypeScript',
  'Naive UI',
  'Tailwind CSS'
]
