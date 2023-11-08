# VS Code Plugin

::: warning

Soon to be released!
The VS Code plugin has not been published yet. Look out for it in the VS Code Marketplace!

:::

::: warning

The plugin is still in experimental phase.
The following describes the current state of the VS Code plugin, which is not yet fully stable.
Consequently, the plugin may crash unexpectedly or become unresponsive.

:::

::: information

The following documentation assumes at least VSCode plugin version 0.4.1 and WARDuino version 0.4.2.

:::

The VSCode Plugin is a VSCode extension designed for debugging applications running on the WARDuino VM. The plugin offers two debugging techniques: 1. [remote debugging](/reference/debugger) and 2. [event-based out-of-place debugging](/reference/edward/index).

In this section, we will delve into the features provided by the plugin. The following non-exhaustive listing gives a brief overview of noteworthy functionality supported by the plugin:

- On-demand switch from [remote debugging](/reference/debugger) to [event-based out-of-place debugging](/reference/edward/index).
- Access to classical debug operations: add a breakpoint, remove a breakpoint, step, step-over, run, and more.
- Access to advanced debug operations: step back debug operations to view past state. (experimental)
- A view on the whole debugging history to easily jump back to a previous state. (experimental)
- Upload new source code on the device once a fault has been fixed.
- Debug on a board
- Debug on an emulator.
- Control over the events (e.g., button press, incoming MQTT message) and the handling of it.

## Installation

Before installing the plugin, make sure that you followed the [installation guide](/guide/get-started.md#installation) for the needed development software.

TODO: change config to allow breakpoints everywhere, etc.

## Configurating VSCode to Use WARDuino

After successfully [installing the plugin](/guide/plugin.md#installation), the initial task is to set up VSCode to utilize the WARDuino debugger.
This can be achieved by following the standard [VSCode configuration approach](https://code.visualstudio.com/docs/editor/debugging): create a `.vscode/launch.json` file in the root directory of your source code. Ensure that the file includes the following entries:

```JSON
{
    "version": "0.4.1",
    "configurations": [
        {
            "type": "WARDuinoDBG",
            "request": "launch",
            "name": "Debug WARDuino",
            "program": "${workspaceFolder}/button.ts",
            "stopOnEntry": true,
            "trace": false
        }
    ]
}
```

The `program` key of the json file specifies the entry file of the application that you want to debug.
In this instance, we've opted for the `button` application introduced in [examples](/guide/examples/button).
Although the `button` application is bug-free, its simplicity makes it ideal for illustrating the various available functionalities.

Throughout the remainder of this plugin documentation, we will continue to employ the same [button](/guide/examples/button) application to demonstrate the diverse range of debugger functionalities

## Configurating the WARDuino Debugger

Once [VSCode has been configured](#configurating-vscode-to-use-warduino) to use the WARDuino debugger.
You need to configure the WARDuino debugger to tell it in which mode you would like to debug the target application (in our case the `button`).
Either the debugger debugs the target application on a [emulator](/guide/plugin.md#debugging-on-a-emulator).
Or the debugger is configured to debug the target application on a [physical board](/guide/plugin.md#debugging-on-the-board) (e.g., ESP32).

After setting up [VSCode to use the WARDuino debugger](#configurating-vscode-to-use-warduino), the next step is to configure the WARDuino debugger to specify the mode in which you want to debug the target application.
You have two options:

- [Emulator mode](/guide/plugin.md#debugging-on-a-emulator): In this mode, the debugger will debug the target application on an emulator.

- [Embedded mode](/guide/plugin.md#debugging-on-the-board): In this mode, you configure the debugger to debug the target application on a physical board, such as an ESP32.

The choice between debugging on a emulator or a physical board is crucial as it opens different debugging functionality and configurations.
Section [Debugging on a Emulator](#debugging-on-a-emulator) and [Debugging on a Physical Board](#debugging-on-a-physical-board) elaboratons on those differences.

## Debugging on a Physical Board

To access the settings for the WARDuino debugger, open the settings of VSCode and search for the WARDuino specific settings by typing "warduino" in the search input area.
For instance, for VSCode version 1.84.0 on OSX:

1. Click on "Code" in the top menu.
2. Select "Settings" from the dropdown.
3. Select "Settings" from the new dropdown.
4. In the search input area, type "warduino" to display the specific WARDuino configurations.

To enable debugging on the physical board set the `Warduino: Debug Mode` configuration value to `Embedded`.
This will cause the Plugin extension to configure the WARDuino debugger to target an application running on a board and to read the configuration values provided by the following entries:

- `Warduino: Port` The serial port address for accessing the physical board during debugging.
  On UNIX-based systems, this address is commonly designated as `/dev/ttyUSB0`.
  Without specifying this port value, the plugin will be unable to establish communication with the physical board, resulting in a failure to initiate.

- `Warduino: Device` this configuration value should be set to the FQBN value of the target board.
  Currently, WARDuino is only supported on the _ESP32_ MCU and should therefore only be used for boards build on top of the ESP32.
  To know which FQBN value to use, make sure to first install the desired target board (see the [official Arduino documentation](https://arduino.github.io/arduino-cli/0.34/)) and then list the FQBN value of the board.
  With the `arduino-cli version 0.34` you can list all installed boards along with the appropriate FQBN value by typing `arduino-cli board listall` in a terminal.
  For instance, to target the _M5StickC_ board the FQBN value should be set to `esp32:esp32:m5stick-c`, to target the _ESP32 Wrover Module_ board the value should be set to `esp32:esp32:esp32wrover`.

- `Warduino: Baudrate` the baudrate to use with the serial connection to the board.
  WARDuino supports the mainstream baudrate values (i.e., 9600, 115200, 19200).
  Custom baudrate values are not supported.
  If another baudrate value is necessary, feel free to open an issue.

- `Warduino: Flash On Start` When debugging an application for the first time on a board toggle the `flash on start` checkbox.
  This will make sure that the WARDuino VM and the target application (pointed by `program` entry of the `.vscode/launch.json` file) is first compiled and flashed into the board.
  After the flashing completes the plugin then connects automatically to the debugger.
  In the situation where you aim to debug an application that has already been previously deployed on the board (e.g., through a previous debug session) and is thus being executed by the WARDuino VM.
  You can uncheck `flash on start`.
  This will bypass the default compilation and flashing process and connect immediately the plugin to the VM debugger.

- `Warduino: WARDuino Tool Chain Path` Is the path that points to the WARDuino VM binary code.
  If you followed the default [plugin installation guide](/guide/plugin#installation), there is no need to change this value.

- `Warduino: WABTool Chain Path`
  Is the path that points to the WABT toolchain version maintained by the TOPLLab.
  If you followed the default [plugin installation guide](/guide/plugin#installation), there is no need to change this value.

## Debugging on a Emulator
