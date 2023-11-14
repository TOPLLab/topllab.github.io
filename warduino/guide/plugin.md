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
- Control over interrupts (e.g., button press, incoming MQTT message) and the handling of it.

## Installation

Before installing the plugin, make sure that you followed the [installation guide](/guide/get-started.md#installation) for the needed development software.

Once the installation is completed follow the following steps:

- Install VS Code (version 1.63.2 or higher)

- (Optional) In case you plan to debug Textual WebAssembly source files make sure to install this [VSCode WebAssembly Syntax Highlight plugin](https://github.com/AlanCezarAraujo/vscode-webassembly-syntax-highlight).

- Change the VSCode settings to enable allow `Allow Breakpoints Everywhere`.
  This can be enabled by opening the VSCode settings and searching for `allow breakpoints everywhere` in the settings search input area.
- run the installation bash script called `install.sh`.
  This script will make sure to download the needed libraries such as the WARDuino VM and perform the right compilations.

## Debugger Configuration

### Configurating VSCode to Use WARDuino

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

Depending on the extension of the file pointed by the `program` entry.
The plugin will load the required WebAssembly compilers and create source mappers accordindly.

### Configurating the WARDuino Debugger

Once [VSCode has been configured](#configurating-vscode-to-use-warduino) to use the WARDuino debugger.
You need to configure the WARDuino debugger to tell it in which mode you would like to debug the target application (application specified through the `program` key in the `.vscode/launch.json` file):

- [Emulator mode](#configuring-warduino-for-debugging-on-a-emulator): In this mode, the debugger will debug the target application on an emulator. The emulator is a process that runs the WARDuino VM which in turn runs the target application locally on the same machine as the plugin. When debugging on a emulator, the plugin connects to the emulator process and applies debug operations on the process as requested by the developer.

- [Embedded mode](#configuring-warduino-for-debugging-on-a-physical-board): In this mode, you configure the debugger to debug the target application on a physical board, such as an ESP32. In this mode, the WARDuino VM is deployed on the physical board and runs the target application. The plugin connects to the physical board and applies debug operations issued by the developer.

- [Proxy mode](#edward-event-based-out-of-place-debugger-for-warduino): This is a special mode that once activated enables [event-based out-of-place debugging](/reference/edward/index).
  Activating this mode is not possible via configuration but can be activated by first enabling `embedded` mode.
  Then switching to event-based out-of-place.
  The required steps are detailed in [setting up EDWARD](#edward-event-based-out-of-place-debugger-for-warduino).

To configure the debugger for a particular mode, you first need to access the settings for the WARDuino debugger.
For this you can open the settings of VSCode and search for the WARDuino specific settings by typing "warduino" in the search input area.
For instance, for VSCode version 1.84.0 on OSX, you can access such settings by:

1. Click on "Code" in the top menu.
2. Select "Settings" from the dropdown.
3. Select "Settings" from the new dropdown.
4. In the search input area, type "warduino" to display the specific WARDuino configurations.

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
This will cause the Plugin extension to spawn a local WARDuino VM emulator process which will run the target application.
Once the local WARDuino VM emulator is spawned the plugin will connect to the VM debugger and will apply user specified debug operations to the process.
The other configuration fields are ignored by the plugin since those only make sense for when debugging on a physical board.

## Remote Debugging on a Physical Board

When you configured the debugger to [target a physical board](#configuring-warduino-for-debugging-on-a-physical-board) and you start the debugger, the plugin automatically starts by default a remote debugger.
Consequently, each debug operation is applied on the application running on the Physical board.

See [available functionality](#functionality-overview) for a detailed overview of the available functionality.

Note that while remote debugging on a phyiscal board, it is very easy to switch to [EDWARD](/reference/edward/index) an event-based-out-place debugger that provides powerful debugging operations.
See [EDWARD](#edward-event-based-out-of-place-debugger-for-warduino) on how to start such debugger.

## Remote Debugging on a Emulator

When [configuring WARDuino for debugging on a Emulator](#configuring-warduino-for-debugging-on-a-emulator)
you are implicitely chosing to remote debug the target application on a process called an emulator.
The emulator is a process spawned by the plugin and that runs the WARDuino VM along the target application locally on the same machine as the plugin.

An advantage of debugging on a emulator is the faster debugging experience: each debug operation issued through the plugin is instantely applied to the emulator process making the whole debugging experience blazingly fast.
In contrast, when [remote debugging on a physical board](#remote-debugging-on-a-physical-board), each debug operation needs to first traverse a serial connection which can introduce delay in the debugging experience.
This delay can become significant when opting for network-based communication.

However, a major disadvantage when debugging on a emulator is the absence of the board hardware resources (e.g., pins, leds).
Therefore, an emulator is mainly interesting to use during an early stage of debugging where the focus is on correctness of the software rather the correctness of interplay between software and hardware.

See [available functionality](#functionality-overview) for a detailed overview of the available functionality.

## EDWARD: Event-based Out-of-place Debugger for WARDuino

The following introduces how to start EDWARD which is the event-based out-of-place debugger of WARDuino.
If you are not yet familiar with event-based out-of-place debugging which is different than remote debugging please consult the introductory page [event-based out-of-place debugging documentation](/reference/edward/index).

To enable EDWARD (Event-based out-of-place Debugger of WARDuino) you have two options:

- Run the [pull debugsession command](#pull-debug-session).
- Go to the [Debugging Timeline view](#debugging-timeline-view) and click on the `save` button to extract a debug session from the physical board.
  Once the whole session has been extracted click then on the `debug` button to start the EDRWARD debugger on the selected debug session.

## Functionality Overview

The following subsections details each of functionality supported by the plugin.

### Mainstream debug operations

Regardless of the used debugger (remote or EDWARD), the debugger gives access to mainstream debug operations like adding a breakpoint, removing a breakpoint, pause the execution, etc, which are accessible via the little draggable pop-up.
The following lists the currently available debug operations:

- `pause`: pauses the application execution
- `step over`: steps over the current instruction.
- `stop`: stops the debugger.
- `step back`: shows the previous program location. Note that in case of applying this operation on a physical board. Step back will not undo side-effects. Instead it will only show the previous state. There is a relation with `step-back` and the `debugging timeline` view of the plugin. More detail in [debugging timeline functionality](#debugging-timeline-view).

### Variables View

As any other debugger, you can also get a view on the local variables, globals variables and arguments provided to functions.
All of this information is displayed in the variables view.

You can also freely modify any state displayed on the variables view.
However, only valid state modifications will go through.
For instance, if you decided to modify a variable holding a float number with a float value that will be accepted.
In contrast, changing the variable to a string will naturally be refused.

As explained in [step back operation](#mainstream-debug-operations) and [debugging history view](#debugging-timeline-view), it is possible to go back to previous application states.
Modifying the variables of those past states is possible but only under special conditions.
See [modifying the history](#modifying-the-history) for more details.

### Stack View

When debugging at the level of WebAssembly, the stack view will display the current state of the stack.
The stack will grow and shrink throughout application execution.

### Events View

The events view displays the events that can occur while debugging on the target application.
These events can be either caused by hardware interrupts (e.g., press of a button) or incoming network messages (e.g., incoming MQTT message), may arise at any time.
When they arise, events are added at the bottom of the events view.

The plugin enables the possibility to decide when events get handled by the VM.
However, this is (for now) only possible when debugging with EDWARD.
To trigger the handling of an event, you can click on the `arrow down` button <img src="/images/arrow-down-icon-light.svg" class="inline-icon light"><img src="/images/arrow-down-icon-dark.svg" class="inline-icon dark"> on the right of the `Events` view name.
Once clicked the VM will make sure that the event gets handled.
This implies that advencing the computation will cause the program counter to jump to the callback handler of the event.

### Proxies View

The proxies view is only relevant when debugging with EDWARD which is an event-based out-of-place debugger.
To get acquinted with event-based out-of-place debugging technique see [documentation](/reference/edward/index).
For information on how to start the EDWARD debugger see [debugging with EDWARD](#edward-event-based-out-of-place-debugger-for-warduino).

The proxies view displays the primitive functions that are proxied by EDWARD during event-based out-of-place debugging.
And for any of those functions the developer can decide when to stop proxying the function.
For this, it suffices to click on the toggle box on the left of the primitive function name.
Naturally, deactivated functions can be reactivated for proxy by clicking again on the toggle box.
While debugging when encountering a primitive function that has been desactivated for proxy, the VM will run instead a default function implementation.

The ability to choose at will which functions to proxy gives more fine-grained control over potential overhead imposed on physical boards.
For instance, in the situation where it is crucial to preserve battery life, the developer could opt for proxying only the bare minimal functions.

### Debugging Timeline View

::: warning

The debugging timeline view is still in an experimental state and is currently being improved.
Therefore some functionality may not behave as expected.

For instance, going back to a point in time where the LED of a physical board was off, will not turn the LED off.
:::

The debugging timeline view gives an history of each application state encountered by the developer when debugging the target application.
Each entry in the view corresponds with a particular application state during the debugging session and can be viewed on demand by the developer and even modified under certain conditions.
The following details these abilities.

### Viewing the History

To display previous application states, it suffices to click on the
eye button <img src="/images/eye-icon-dark.svg" class="inline-icon dark"><img src="/images/eye-icon-light.svg" class="inline-icon light">
associated to an entry in the view.
When you click on the button, this will cause the plugin to change the views so to display the application state that was valid back in that time.

Every time that you advance the computation of the target application while debugging (e.g., `step`, `run` until breakpoint is reached), a new entry is added at the top of the view.
Consequently, the top entry in the view corresponds with the present i.e., the current application state which is valid for your target application.
Whereas entries lower than the top entry display the past.
The most bottom entry corresponds with the application state that the developer had when the debugger got started.

Alternatively, another way on how to look at past application states is to press the `step back` button.
The reason why you also get to see the whole debugging timeline is to give the developer a general overview of the whole history.
This should make the jump back to a particular point in time much easier.

### Modifying the History

The possibility to alter the past is particularly interesting for exploratory debugging.
For instance, if the developer suspects that a function that already got called may fail for particular arguments.
It would be highly beneficial to the developer to go back to the point before the function gets called to let the developer change the arguments provided to the function.
However, as explained in the [variables view](#variables-view), changing variables values is only possible for the present.
Trying to modify past variables values (e.g., if you press `step back` and then try to change a variable) requires an additional step that we will clarify now.

To enable the possibility to alter past application state.
The developer needs to click on the `save` button <img src="/images/save-icon-light.svg" class="inline-icon light"><img src="/images/save-icon-dark.svg" class="inline-icon dark"> displayed on the top debugging timeline entry.
When the `save` button is clicked, the plugin will ensure that the present state is saved as a point in time that can be:

- Modified during a later debugging phase. For instance, if you advance the applicaiton execution through one step debug operation. You can now also step back and modify the state of the previous point in time since this was saved previously. If you modifiy a past state, the plugin will automatically redeploy the modified state to either the physical board or emulator. And debugging will then resume starting from that modified state.

- Used as starting debugging point for when EDWARD is started. This is possible as soon as the full application state is successfully saved. The state is successfully saved once the `save` button icon gets replaced by the `debug start` icon <img src="/images/debug-start-icon-light.svg" class="inline-icon light"><img src="/images/debug-start-icon-dark.svg" class="inline-icon dark">
  By pressing on the `debug start` button, you can start EDWARD on that particular point in time.

You will notice that the `save` button is only available for the present.
This is an intentional design choice since saving each point in time not only is a time consuming process but may also drastically affect battery life when debugging on a physical board.
Deciding which points in time should be saved is a decision best left to the developers.

## Plugin Commands

The following details the commands made available by the plugin when you press on `cmd+shift+p` for OSX and `ctr+shift+p` on a Linux-based OS.

### Pull Debug Session

> `warduino: Pull debugsession`

While you are remote debugging on a physical board you can apply the command on demand to start the event-based out-of-place debugger.
Once the command executes, it will cause the plugin to pull a snapshot from the board and spawn a emulator that proxies all the environment primitive function from the physical board.
The snapshot will make sure that the emulator is started on the same state as the physical board.

### Update Module

> `warduino: Update Module`

Is a command that you can execute to update the source code running on the WARDuino VM.
The command will compile the source code and deploy the obtained Wasm binary module to the WARDuino VM.
The WARDuino VM can be an emulated VM or a VM deployed on a physical board.
After updating the module you can, if desired, restart the plugin which will enable debugging on the new source code.

Note: as explained in [issue 121](https://github.com/TOPLLab/WARDuino/issues/121), when using update module command on a physical board, the updated module is not flashed which causes the new module to be lost in case of a board reboot.
Future work aims to tackle this issue.

### Commit Changes

> `warduino: Commit changes`

This command is only allowed for when using the event-based out-of-place debugger.
Once you identified any potential bug and applied the necessery source-code fixes.
The command can be used to then compile the new bug-free source-code and deploy the obtained WebAssembly module to the physical board.
After updating the module you can, if desired, restart the plugin which will enable debugging on the new source code.

Note: the command suffers from the same issue as [update module command](#update-module).
