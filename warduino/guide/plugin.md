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

The following documentation assumes the usage of at least **WARDuino VSCode plugin version 0.4.1** and **WARDuino version 0.4.2**.

The VSCode Plugin is a VSCode extension designed for debugging applications running on the WARDuino VM. The plugin offers two debugging techniques: 1. [remote debugging](/reference/debugger) and 2. [event-based out-of-place debugging](/reference/edward/index).

In this section, we will delve into the features provided by the plugin. The following non-exhaustive listing gives a brief overview of noteworthy functionality supported by the plugin:

- On-demand switch from [remote debugging](/reference/debugger) to [event-based out-of-place debugging](/reference/edward/index).
- Access to classical debug operations: add a breakpoint, remove a breakpoint, step, step-over, run, and more.
- Access to advanced debug operations: step back debug operations to view past state. (experimental)
- A view on the whole debugging history to easily jump back to a previous state. (experimental)
- Upload new source code on the device once a fault has been fixed.
- Debug on a board
- Debug on an emulator.
- Control over interrupts (e.g., button press, incoming MQTT message) and the handling of it.

## Installation

Before installing the plugin, make sure that you followed the [installation guide](/guide/get-started.md#installation) for the needed development software.

Once the installation is completed follow the following steps:

- Install VS Code (version 1.63.2 or higher)

- (Optional) In case you plan to debug Textual WebAssembly source files make sure to install this [VSCode WebAssembly Syntax Highlight plugin](https://github.com/AlanCezarAraujo/vscode-webassembly-syntax-highlight).

- Change the VSCode settings to enable allow `Allow Breakpoints Everywhere`.
  For this, navigate to the VSCode settings and search for `Allow Breakpoints Everywhere` in the search bar.
- Download the [WARDuino VSCode plugin](https://github.com/TOPLLab/WARDuino-VSCode) repo and execute the installation bash script named `install.sh`.
  This script downloads and builds the essential libraries such as the WARDuino VM.

## Debugger Configuration

### Configurating VSCode to Use WARDuino

Once the [plugin installation](/guide/plugin.md#installation) completes, the initial task is to configure VSCode to use the WARDuino debugger.
This can be achieved by following the standard [VSCode configuration method](https://code.visualstudio.com/docs/editor/debugging): create a `.vscode/launch.json` file in the root directory of your source code.
Ensure that the file includes the following entries:

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

The `program` key within the JSON file specifies the application's entry file that needs to be debugged.
In this instance, we've opted for the `button` application introduced in [examples](/guide/examples/button).

Depending on the file extension pointed by the `program` entry, the plugin will load the required WebAssembly compiler and create source mappers accordindly.

### Configurating the WARDuino Debugger

Upon [configuring VSCode for WARDuino](#configurating-vscode-to-use-warduino), the next step involves configuring the WARDuino debugger itself to specify the debugging mode for the target application (as specified by the `program` key in the `.vscode/launch.json` file).
The debugger supprots the following modes for debugging:

- [Emulator mode](#configuring-warduino-for-debugging-on-a-emulator): Debugging takes place on an emulator, where the WARDuino VM runs the target application locally on the same machine as the plugin.
  When debugging on a emulator, the plugin connects to the emulator process and applies debug operations on the process as requested by the developer.

- [Embedded mode](#configuring-warduino-for-debugging-on-a-physical-board): Configure the debugger to debug the target application on a physical board (e.g., ESP32).
  In this mode, the WARDuino VM is deployed on the physical board and runs the target application.
  The plugin connects to the physical board and applies debug operations issued by the developer.

- [Proxy mode](#edward-event-based-out-of-place-debugger-for-warduino): This unique mode enables [event-based out-of-place debugging](/reference/edward/index).
  Activating this mode is not possible via configuration (although the two other modes can).
  To activate this mode, start by first enabling `embedded` mode and then switch to event-based out-of-place.
  The required steps are detailed in [setting up EDWARD](#edward-event-based-out-of-place-debugger-for-warduino).

To configure the debugger for a specific mode, access the settings for the WARDuino debugger.
For this you can open the settings of VSCode and search for the WARDuino specific settings by typing "warduino" in the search input area.
For instance, for VSCode version 1.84.0 on OSX, you can access such settings by:

1. Clicking on "Code" in the top menu.
2. From the dropdown, select "Settings". Then select "Settings" again from the new dropdown.
3. In the search input area, type "warduino" to reveal the WARDuino specific configurations.

Once the WARDuino vscode settings have been opened, you will be able to choose a mode.
The following two sections elaborate on how to choose a particular mode.

### Configuring WARDuino for debugging on a Physical Board

To enable debugging on the physical board set the `Warduino: Debug Mode` configuration value to `Embedded`.
This will cause the Plugin extension to configure the WARDuino debugger to target an application running on a board.

If you opt for the `embedded` debug mode, additional mandatory and optional configuration values are made available to the developer.
The following lists and clarifies such configuration values:

- `Warduino: Port` The serial port address for accessing the physical board during debugging.
  On UNIX-based systems, this address is commonly designated as `/dev/ttyUSB0`.
  Without specifying this port value, the plugin will be unable to establish communication with the physical board, resulting in a plugin initialization failure.

- `Warduino: Device` this configuration value should be set to the FQBN value of the target board.
  Currently, WARDuino is only supported on the _ESP32_ MCU and should therefore only be used for boards build on top of the ESP32.
  To know which FQBN value to use, make sure to first install the desired target board (see the [official Arduino documentation](https://arduino.github.io/arduino-cli/0.34/)) and then list the FQBN value of the board.
  With the `arduino-cli version 0.34` you can list all installed boards along with the appropriate FQBN value by typing `arduino-cli board listall` in a terminal.
  For instance, to target the _M5StickC_ board the FQBN value should be set to `esp32:esp32:m5stick-c`, to target the _ESP32 Wrover Module_ board the value should be set to `esp32:esp32:esp32wrover`.

- `Warduino: Baudrate` the baudrate to use with the serial connection to the board.
  WARDuino supports mainstream baudrate values (i.e., 9600, 115200, 19200) but custom baudrate values are not supported.
  If a custom baudrate value is needed, feel free to open an issue.

- `Warduino: Flash On Start` When debugging an application for the first time on a board toggle the `flash on start` checkbox.
  This will make sure that the WARDuino VM and the target application (pointed by `program` entry of the `.vscode/launch.json` file) is first compiled and flashed into the board.
  After the flashing completes the plugin then connects automatically to the debugger.
  In the situation where you aim to debug an application that has already been previously deployed on the board (e.g., through a previous debug session) and is thus being executed by the WARDuino VM.
  You can uncheck `flash on start`.
  This will bypass the default compilation and flashing process.
  Instead, the plugin will immediately connect to the VM debugger.

- `Warduino: WARDuino Tool Chain Path` Is the path that points to the WARDuino VM binary code.
  If you followed the default [plugin installation guide](/guide/plugin#installation), there is no need to change this value.

- `Warduino: WABTool Chain Path`
  Is the path that points to the WABT toolchain version maintained by the TOPLLab.
  If you followed the default [plugin installation guide](/guide/plugin#installation), there is no need to change this value.

### Configuring WARDuino for debugging on a Emulator

To enable debugging on the emulator set the `Warduino: Debug Mode` configuration value to `Embedded`.
This will cause the Plugin extension to spawn a local WARDuino VM emulator process that runs the target application.
Once the local WARDuino VM emulator is spawned, the plugin connects to the VM debugger and applies user-specified debug operations to the process.

The plugin disregards the other configuration fields as they are only relevant for debugging on a physical board.

## Remote Debugging on a Physical Board

When configuring the debugger to [target a physical board](#configuring-warduino-for-debugging-on-a-physical-board), the plugin defaults to launching a remote debugger.
Consequently, each debug operation is applied on the application running on the Physical board.

For a comprehensive overview of the available functionality when debugging on a board, refer to the [available functionality documentation](#functionality-overview).

Note that while remote debugging on a phyiscal board you can easily switch to [EDWARD](/reference/edward/index) an event-based-out-place debugger that provides powerful debugging operations.
See [EDWARD](#edward-event-based-out-of-place-debugger-for-warduino) on how to start such debugger.

## Remote Debugging on a Emulator

When [configuring WARDuino for debugging on a Emulator](#configuring-warduino-for-debugging-on-a-emulator),
you are opting for remote debugging the target application on a process called an emulator.
This emulator, spawned by the plugin, runs the WARDuino VM alongside the target application on the local machine where the plugin also runs.

An advantage of debugging on a emulator is speed.
Each debug operation issued through the plugin is instantely applied to the emulator process resulting in a remarkably fast debugging experience.
In contrast, [remote debugging on a physical board](#remote-debugging-on-a-physical-board) involves debug operations traversing a serial connection, potentially introducing delays specially signficant with network-based communication.

However, a major disadvantage when debugging on a emulator is the absence of the board hardware resources (e.g., pins, LEDs).
Therefore, an emulator is primairly useful during the initial debugging stages where the focus is on software correctness rather than the interaction between software and hardware.

For a comprehensive overview of the available functionality when debugging on a emulator, refer to the [available functionality documentation](#functionality-overview).

## EDWARD: Event-based Out-of-place Debugger for WARDuino

The following introduces how to start EDWARD which is the event-based out-of-place debugger of WARDuino.
If you are not yet familiar with event-based out-of-place debugging which is different from remote debugging please consult the introductory page [event-based out-of-place debugging documentation](/reference/edward/index).

To enable EDWARD (Event-based out-of-place Debugger of WARDuino) you have two options:

- Run the [pull debug session command](#pull-debug-session).
- Go to the [Debugging Timeline view](#debugging-timeline-view) and click on the `save` button to extract a debug session from the physical board.
  Once the whole session has been extracted click then on the `debug` button to start the EDRWARD debugger on the selected debug session.

## Functionality Overview

The following subsections details each of functionality supported by the plugin.

### Mainstream debug operations

Whether using the remote debugger or EDWARD, both provide access to fundamental debug operations accessible through a draggable pop-up interface.
The operations include:

- `pause`: pauses the application execution
- `step`: step to the next instruction.
- `stop`: stops the debugger.
- `step back`: shows the previous program location.
  Note that in case of applying this operation on a physical board.
  Step back will not undo side-effects but instead will only show the previous state.

### Variables View

As with other debuggers, you have access to view local and global variables as well as function arguments, all conveniently displayed in the variables view.

While debugging, the variables view allows you to modify displayed states, but only valid modifications are accepted.
For example, changing a variable holding a float number to another float value is permitted.
However, attempting to change it to a string will be rejected.

Regarding the [step back operation](#mainstream-debug-operations) and the [debugging history view](#debugging-timeline-view), revisiting previous application states is feasible.
Modifying variables within those past states is possible under specific conditions.
For further details, refer to the documentation on [modifying the history](#modifying-the-history).

### Stack View

When debugging at the level of WebAssembly, the stack view will display the current state of the stack.
The stack will grow and shrink throughout application execution.

### Events View

The events view displays the events that can occur while debugging on the target application.
These events can be either caused by hardware interrupts (e.g., press of a button) or incoming network messages (e.g., incoming MQTT message) and may arise at any time.
As they occur, events are appended at the bottom of the events view.

The plugin enables the possibility to decide when events get handled by the VM.
However, this is (for now) only possible when debugging with EDWARD.
To trigger the handling of an event, you can click on the `arrow down` button <img src="/images/arrow-down-icon-light.svg" class="inline-icon light"><img src="/images/arrow-down-icon-dark.svg" class="inline-icon dark"> on the right of the `Events` view name.
Once clicked the VM will make sure that the next event in the queue gets handled.
This implies that after clicking on the buttona and advencing the computation with for instance a step debug operation, will cause the program counter to jump to the callback handler of the event.

### Proxies View

The proxies view is only relevant when debugging with EDWARD which is an event-based out-of-place debugger.
To get acquinted with event-based out-of-place debugging technique see [documentation](/reference/edward/index).
For information on how to start the EDWARD debugger see [debugging with EDWARD](#edward-event-based-out-of-place-debugger-for-warduino).

The proxies view displays the primitive functions that are proxied by EDWARD during event-based out-of-place debugging.
Developers can selectively stop proxying any of these functions by toggling the checkbox on the left side of the primitive function name.
Deactivated functions can be reactivated for proxying by clicking on the toggle box again.
During debugging, if a deactivated primitive function is encountered, the VM will execute a default function implementation instead.

The ability to choose at will which functions to proxy gives more fine-grained control over potential overhead imposed on physical boards.
For instance, in the situation where it is crucial to preserve battery life, the developer could opt for proxying only the bare minimal functions.

### Debugging Timeline View

::: warning

The debugging timeline view is currently in an experimental phase and is actively undergoing enhancements.
Consequently, certain functionality might not behave as anticipated.

For example, stepping back to a specific moment when the LED of a physical board was off will not automatically turn the LED off again."
:::

The debugging timeline view provides a comprehensive history of every application state encountered while debugging the target application.
Each entry in this view represents a specific application state during the debugging session.
Developers can access these entries at their convenience and, under certain conditions, modify them.
The following elaborates on these capabilities.

### Viewing the History

To view previous application states, simply click on the eye icon <img src="/images/eye-icon-dark.svg" class="inline-icon dark"><img src="/images/eye-icon-light.svg" class="inline-icon light"> associated with an entry in the view.
Clicking this button prompts the plugin to switch the views to display the application state from that specific point in time.

Every time that you advance the computation of the target application while debugging (e.g., `step`, `run` until breakpoint is reached), a new entry is added at the top of the view.
Consequently, the top entry in the view corresponds with the present i.e., the current application state which is valid for your target application.
Whereas entries lower than the top entry display the past.
The most bottom entry corresponds with the application state that the developer had when the debugger got started.

Alternatively, another way on how to look at past application states is by pressing the `step back` button.
The availability of the complete debugging timeline aims to provide developers with an overview of the entire history, simplifying the process of navigating to a specific point in time.

### Modifying the History

The capability to modify past states is particularly valuable in exploratory debugging scenarios.
For instance, if a developer suspects that a function previously called might fail for specific arguments, revisiting the point before that function call to adjust the arguments would be highly beneficial.
However, as noted in the [variables view](#variables-view), altering variable values is restricted to the present.
Attempting to modify past variables (e.g., when you are in the present and then you press `step back` and then try to change a variable) requires an additional step, which we'll clarify now.

To enable alterning past application state, developers needs to click on the `save` button <img src="/images/save-icon-light.svg" class="inline-icon light"><img src="/images/save-icon-dark.svg" class="inline-icon dark"> displayed on the top entry of the debugging timeline.
Upon clicking the `save` button, the plugin preserves the present state.
The preserved state can be:

- Modified in subsequent debugging phases: For instance, after advancing the application's execution through one-step debug operation, you can step back and modify the previously saved state.
  The plugin will automatically deploy the modified state to the target VM (either the physical board or emulator depending on your debugging mode).
  Debugging then resumes from the adjusted state.

- Used as the starting point when initiating EDWARD:
  Once the complete application state is successfully saved, the `save` button icon transforms into a `debug start` icon <img src="/images/debug-start-icon-light.svg" class="inline-icon light"><img src="/images/debug-start-icon-dark.svg" class="inline-icon dark">.
  Clicking this `debug start` button launches EDWARD to debug starting from that specific saved point in time.

Note that the `save` button is intentionally available only for the present.
Saving the application state is a time-consuming process that may significantly impact battery life when debugging on a physical board.
Deciding which points in time to save is a decision best left to the developers.

## Plugin Commands

The following details the commands made available by the plugin when you press on `cmd+shift+p` for OSX and `ctr+shift+p` on a Linux-based OS.

### Pull Debug Session

> `warduino: Pull debugsession`

During remote debugging on a physical board, you have the option to start EDWARD.
For this, you can execute the `pull debug session` at any point in time during remote debugging.
Upon execution of the command, the plugin captures a snapshot from the board and initiates an emulator.
This emulator proxies all environment primitive functions from the physical board.

### Update Module

> `warduino: Update Module`

The `update module` command allows you to modify the source code running on the WARDuino VM.
Executing this command compiles the source code and deploys the resulting Wasm binary module to the WARDuino VM, which can be either an emulated VM or one deployed on a physical board.
After updating the module, you can restart the plugin, enabling debugging with the new source code.

Note: As outlined in [issue 121](https://github.com/TOPLLab/WARDuino/issues/121), using the `update module` command on a physical board doesn't flash the updated module, leading to loss of the module upon board reboot.
Future efforts are underway to address this issue.

### Commit Changes

> `warduino: Commit changes`

This command is only allowed for when using the event-based out-of-place debugger.
Once you identified any potential bug and applied the necessery source-code fixes.
The command can be used to then compile the new bug-free source-code and deploy the obtained WebAssembly module to the physical board.
After updating the module you can, if desired, restart the plugin which will enable debugging on the new source code.

Note: the command suffers from the same issue as [update module command](#update-module).
