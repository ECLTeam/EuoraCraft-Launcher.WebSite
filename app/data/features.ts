export interface Feature {
  icon: string
  title: string
  description: string
}

export const features: Feature[] = [
  {
    icon: 'i-lucide-puzzle',
    title: '插件系统',
    description:
      '后端插件、主题、联机扩展、认证、崩溃分析等扩展点，使用声明式权限模型控制插件能力。'
  },
  {
    icon: 'i-lucide-palette',
    title: '现代化 UI',
    description:
      'Vue 3 + Naive UI + Tailwind CSS，支持亮暗主题、自定义外观与可视化主题设计器。'
  },
  {
    icon: 'i-lucide-users',
    title: '多账户支持',
    description: '微软账户登录 + Yggdrasil 认证，并支持离线模式与皮肤衣柜。'
  },
  {
    icon: 'i-lucide-boxes',
    title: '实例管理',
    description: '多版本实例隔离，独立配置，统一管理模组、资源包、世界、服务器与截图。'
  },
  {
    icon: 'i-lucide-wifi',
    title: '联机大厅',
    description: '内置 EasyTier 虚拟网络与联机房间管理，支持插件扩展联机协议。'
  },
  {
    icon: 'i-lucide-languages',
    title: '国际化',
    description: '内置 vue-i18n，支持多种语言，面向全球用户。'
  },
  {
    icon: 'i-lucide-rocket',
    title: '版本发布',
    description: '基于 GitHub Releases 发布安装包，由用户从 Release 页面手动下载更新。'
  },
  {
    icon: 'i-lucide-shield-check',
    title: '安全可靠',
    description: '插件在宿主进程内执行，通过声明式权限限制访问范围；GPL-3.0 开源协议。'
  }
]
