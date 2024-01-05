# Debugging on Hardware

You can access the settings for the WARDuino debugger, by opening the settings window of VS Code and typing _"warduino"_ in the search input area.
To enable debugging on the physical board set the `WARDuino: Debug Mode` configuration value to `embedded`.

Now the plugin needs to know to what device to connect to.
Set the right address for the serial port in the `WARDuino: Port` field, and the FQBN of the target hardware in `WARDuino: Device`.

If you are using the Arduino toolchain (see [arduino setup instructions](/guide/get-started.html#arduino-toolchain-setup)),
you can find the FQBN value for your hardware with the `arduino-cli`.

```bash
arduino-cli board listall
```

After updating these settings, you can start the debugger by navigating to the _Run and Debug_ tab, and clicking on `Debug WARDuino`.

The plugin will first compile and flash your software, before starting a debugging session.
Due to these initial steps, it may take a while before the debugger is connected.
A popup notification will appear once the debugger is connected, and you can see the status of the plugin on the bottom right of your VS Code window at any time.

::: tip <span class="icon material-symbols-rounded">menu_book</span> Find out more
Go to the technical reference for more information.

[-> debugging concurrency tutorial](/reference/edward/concurrency.md)

[-> debug protocol API](/reference/debug-protocol.md)

[-> plugin technical reference](/reference/plugin.md)

[-> supported platforms](/reference/platforms.md)
:::

<style>
@import "https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200";

span.icon {
    font-size: 1.2em;
    font-weight: inherit;
    vertical-align: text-bottom;
}
</style>