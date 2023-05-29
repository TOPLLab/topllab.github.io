# Getting Started

In this guide, you will find instructions on how to start programming software for microcontrollers in AssemblyScript and Rust by using WARDuino.

## Installation

To get started you need to install the WARDuino library for your favorite language. You can use the following command:

<code-group>
<code-block title="AS">
```bash
npm install as-warduino
```
</code-block>

<code-block title="Rust">
```bash
cargo install warduino
```
</code-block>
</code-group>

The command install the language library that provides you access to the [primitives](/en/warduino/modules/) of the WARDuino from AssemblyScript or Rust. It does not yet install the VM and all necessary tools to compile and upload your program to your microcontroller. Once you have written your program with the language library, and compiled it to WebAssembly, you need to install WARDuino and toolchain of the platform you are targeting.

To install the virtual machine use the following commands.

```bash
cd $HOME/Arduino/libraries/
git clone git@github.com:TOPLLab/WARDuino.git
```

WARDuino currently supports both the Arduino and ESP-IDF toolchains. To use Arduino, you need to install the [arduino-cli](https://github.com/arduino/arduino-cli). For ESP-IDF you need to install the full toolchain, instructions can be found on the [official website](https://docs.espressif.com/projects/esp-idf/en/latest/esp32/get-started/index.html#get-started-step-by-step).

### Arduino Toolchain Setup

In order to setup the Arduino toolchain for WARDuino, you need to first install the [arduino-cli](https://arduino.github.io/arduino-cli/0.21/installation/).
You will also need `python3` with the `pyserial` package.

Second, create the config file:

```bash
arduino-cli config init
```

If you need additional boards, such as the esp32 boards, you can add them in the generated config file.

To find the location of your config file you can run:

```bash
arduino-cli config dump --verbose
```

Add the ESP32 board manager URL to the config file:

```yaml
board_manager:
  additional_urls:
      - https://raw.githubusercontent.com/espressif/arduino-esp32/gh-pages/package_esp32_dev_index.json
```

Then, update the index and install the ESP32 platform.

```bash
arduino-cli core update-index
arduino-cli core install esp32:esp32
```

::: warning
To use ESP32 boards with WARDuino you need at least version 2.0.2 of the board manager.
:::

Thirdly, make sure you install the `PubSubClient` and `Adafruit NeoPixel` library, which are used by some primitives.

```bash
arduino-cli lib install "PubSubClient" # for MQTT
arduino-cli lib install "Adafruit NeoPixel"
```

If you haven't done so already, clone (or symlink) the WARDuino repository to `~/Arduino/libraries` to make it available to Arduino.


## Flashing using Arduino

If you have setup the Arduino toolchain as described above, you can upload the example program as follows, starting from the root of the WARDuino repository:

```bash
cd platforms/Arduino
make compile
make flash
```

## Flashing using ESP-IDF

::: warning
Primitive support for IDF is under construction.
:::

Before you can compile and flash with ESP-IDF, you must install and enable the toolchain. You also need to disable the watchdog timer:

1. Go to the root folder of the WARDuino repo
2. Run `idf.py menuconfig`
3. Under **Component config → ESP System Settings** disable the following options:
    - Interrupt watchdog
    - Initialize Task Watchdog Timer on startup
4. Save and quit the menu


To flash with the ESP-IDF toolchain perform the following steps starting from the project root folder.
Make sure the ESP-IDF tools are enabled, or they will not work.

```bash
mkdir build
cd build
cmake .. -D BUILD_ESP=ON
make flash
```

Or simply run `idf.py flash`.

