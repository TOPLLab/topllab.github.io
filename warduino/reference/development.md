# Developing WARDuino

This guide is for people who want to help with development.

## Debugging the WARDuino Virtual Machine

While the WARDuino debugger allows developers to debug their programs on the microcontroller, the VM itself also needs to be debugged from time to time. That includes the debugger of the VM as well.
Luckily the debugger can be debugged with the help of a JTAG interface.

This tutorial goes over the steps you can take to debug the WARDuino virtual machine with the ESP32 WROVER KIT v4.1, but other boards and JTAGs can also be used.

### ESP32 WROVER KIT V4.1 Tutorial

The ESP32 WROVER KIT v4.1 has been extensively used to debug and develop the WARDuino virtual machine.
It comes standard with a JTAG to USB interface, which makes debugging fairly easy to setup &mdash as JTAGs go.

#### First Time Setup

**Step 1.** Before you start, you need to enable the JTAG interface by [installing the right jumper blocks](https://docs.espressif.com/projects/esp-idf/en/latest/esp32/hw-reference/esp32/get-started-wrover-kit.html#setup-options) on the board.

**Step 2.** You need to install [OpenOCD](https://openocd.org/pages/getting-openocd.html).

**Step 3.** You need to install the [ESP-IDF toolchain](https://docs.espressif.com/projects/esp-idf/en/latest/esp32/get-started/#installation).

**Step 4.** In order to connect to the ESP32 device with OpenOCD you need to run[<sup>\[1\]</sup>](https://docs.espressif.com/projects/esp-idf/en/latest/esp32/api-guides/jtag-debugging/index.html#run-openocd):

```bash
openocd -f board/esp32-wrover-kit-3.3v.cfg
```

::: warning

If you encounter an error, `LIBUSB_ERROR_ACCESS`, then this is mostly likely due to OpenOCD lacking the right permissions to access the serial port.

:::

#### Development Environment Setup

**Step 1.** Add the "wrover kit" component to WARDuino:

```bash
cd $WARDUINO_FOLDER
idf.py add-dependency "espressif/esp_wrover_kit^1.5.0"
```

If you use a different board and JTAG this step will be different.

**Step 2.** To use the `gdb` command-line interface, add a `gdbinit` file to the WARDuino root folder[<sup>\[2\]</sup>](https://docs.espressif.com/projects/esp-idf/en/latest/esp32/api-guides/jtag-debugging/using-debugger.html#command-line) with:

```
target remote :3333
set remote hardware-watchpoint-limit 2
mon reset halt
maintenance flush register-cache
thb app_main
c
```

**Step 3.** Now you need to build and flash:

```bash
idf.py build
idf.py flash
```

That concludes the setup. Now you are finally ready to start debugging.

**Debugging with gdb.** You can [use idf.py](https://docs.espressif.com/projects/esp-idf/en/latest/esp32/api-guides/jtag-debugging/using-debugger.html#jtag-debugging-with-idf-py) to start both OpenOCD and `gdb`:

```bash
idf.py openocd &
idf.py gdb
```

