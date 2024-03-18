<script setup>
    import { data } from '../../.vitepress/config.data.ts'
</script>
# Getting Started

##  Launch the Plugin {#launch}

Open your local plugin repository (see [install step](./index.md)), and click on `Run Extension` under the _Run and Debug_ tab.
This will launch the plugin in a new VS Code window.

In this new window, open your project folder.
If you don't have a project yet, you can use the [AssemblyScript template](https://github.com/TOPLLab/as-warduino-template) for WARDuino to get started quickly.

##  Project Configuration {#vscode-config}

::: tip Add `launch.json` file
If you use any of our templates, you can skip this configuration step.
The template contains the correct launch file.
:::

To use the WARDuino plugin to debug your project, you need to create a `launch.json` file in the `.vscode` subfolder of your project root directory [<sup>\[1\]</sup>](https://code.visualstudio.com/docs/editor/debugging).
The file should look like this:

```json-vue
{
    "version": "{{ data.plugin.version }}",
    "configurations": [
        {
            "type": "WARDuinoDBG",
            "request": "launch",
            "name": "Debug WARDuino",
            "program": "${workspaceFolder}/src/main.ts",
            "stopOnEntry": true,
            "trace": false
        }
    ]
}
```

The `program` key within the JSON file specifies the application's entry file that needs to be debugged.

Depending on the file extension pointed by the `program` entry, the plugin will load the required WebAssembly compiler and create source mappers accordingly.

## Start Debugging

By default, the plugin will debug using a local running instance of WARDuino (emulator).
This means you don't need any further configuration.
Navigate to the _Run and Debug_ tab, and click on `Debug WARDuino`.

The next tutorial goes through the steps needed to debug on real hardware.
