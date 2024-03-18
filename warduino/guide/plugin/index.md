<script setup>
    import { data } from '../../.vitepress/config.data.ts'

    const vm = "https://github.com/TOPLLab/WARDuino/releases/tag/v" + data.vm.version;
    const plugin = "https://github.com/TOPLLab/WARDuino-VSCode/releases/tag/v" + data.plugin.version;
</script>
# VS Code Plugin

::: tip WARDuino VS Code {{ data.plugin.version }}

This page describes the VS Code plugin <a :href="plugin" target="_blank">version {{ data.plugin.version }}</a>, which works with WARDuino <a :href="vm" target="_blank">version {{ data.vm.version }}</a>.

:::

::: warning Unstable prerelease

The plugin is still in experimental phase.
The following describes the current state of the VS Code plugin, which is not yet fully stable.
Consequently, the plugin may crash unexpectedly or become unresponsive.

:::

The WARDuino plugin is a VS Code extension designed for debugging applications running on the WARDuino VM. The plugin offers two debugging techniques:

1. [remote debugging](/reference/architecture.md#classic) and
2. [event-based out-of-place debugging](/reference/edward/index).

Noteworthy functionality of the plugin:

- On-demand switching from [remote debugging](/reference/architecture.md#classic) to [event-based out-of-place debugging](/reference/edward/index).
- Access to classic debug operations: add a breakpoint, remove a breakpoint, step, step-over, run, and more.
- Access to advanced debug operations: step back debug operations to view past state. (experimental)
- A view on the whole debugging history to easily jump back to a previous state. (experimental)
- Upload new source code on the device once a fault has been fixed.
- Debug on a board
- Debug on an emulator.
- Control over interrupts (e.g., button press, incoming MQTT message) and the handling of it.

## Manual Installation {#installation}

::: warning Soon to be released!

The VS Code plugin has not been published yet. Look out for it in the VS Code Marketplace!
:::

Before installing the plugin, make sure that you followed the [installation guide](/guide/get-started.md#installation) for the needed development software.

Once the installation is completed follow these steps:

- Install VS Code (version 1.63.2 or higher)

- (Optional) In case you plan to debug Textual WebAssembly source files make sure to install this [VS Code WebAssembly Syntax Highlight plugin](https://github.com/AlanCezarAraujo/vscode-webassembly-syntax-highlight).

- Change the VS Code settings to enable allow `Allow Breakpoints Everywhere`.
  For this, navigate to the VS Code settings and search for `Allow Breakpoints Everywhere` in the search bar.
- Download the [WARDuino VS Code plugin](https://github.com/TOPLLab/WARDuino-VSCode) repo and execute the installation bash script named `install.sh`.
  This script downloads and builds the essential libraries such as the WARDuino VM.
