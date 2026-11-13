EuoraCraft Launcher (**ECL**) is an **open-source, extensible** third-party Minecraft launcher. It brings accounts, instances and resources together, with plugins for further customization.

The current development version offers:

- Multiple game directories and isolated instances, with per-instance Java, memory and launch arguments
- Modrinth / CurseForge searches and management of mods, resource packs, shaders, data packs and modpacks
- Local Java discovery and Temurin download, installation and selection
- Microsoft, offline and external authentication accounts, plus a skin wardrobe
- Game logs and crash analysis, custom downloads, skin avatar export and 3D schematic preview
- Classic, Folia, Absolutely and Catppuccin themes, light and dark mode, image and video backgrounds, and a visual theme designer
- Launcher version checks and built-in updates in supported packaged versions

The desktop launcher uses **Python + PyTauri / Tauri 2**. Its frontend uses **Vue 3, TypeScript and Vite**, alongside its own interface components, Naive UI and Tailwind CSS.

Plugins are installed as **.eclplugin** archives, with dependency checks and usually a restart before loading. **Plugins run in the launcher process. Separate dependency directories are not a security sandbox; install only plugins from trusted sources.**

This overview describes the current development version. Older releases may differ. Read the release notes before downloading, and visit the [official documentation](https://docs.euora.cn/en/) for user and development guides.
