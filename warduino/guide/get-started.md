---
next: 'Examples'
---

<script setup>
    import { data } from '../.vitepress/config.data.ts'
</script>

# Getting Started

In this guide, you will find instructions on how to start programming software for microcontrollers in AssemblyScript and Rust by using WARDuino.

## 📦️ Prerequisites

- node and npm
- arduino toolchain: [see our guide](#arduino)

## ✨ Installation {#installation}

To start writing programs for WARDuino in your favorite language you need to install the WARDuino **language library**.

::: warning Prerelease libraries

The WARDuino library packages for AssemblyScript and Rust have not been released officially yet.
You can download them from [GitHub](https://github.com/TOPLLab/WARDuino-libs).

:::

::: code-group

```bash [AS]
npm install 'https://gitpkg.now.sh/TOPLLab/WARDuino-libs/glue/assemblyscript?main'
```

```bash [Rust]
cargo install warduino
```

:::

The language library provides access to the [actions](/reference/actions/) of WARDuino directly from AssemblyScript or Rust. 
Once you have written your program and compiled it to WebAssembly, you need to install WARDuino and the toolchains of the platform you are targeting.


```bash-vue
cd $HOME/Arduino/libraries/
git clone --recurse-submodules --branch v{{ data.vm.version }} git@github.com:TOPLLab/WARDuino.git
```



WARDuino currently supports both the Arduino and ESP-IDF toolchains. To use Arduino, you need to install the [arduino-cli](https://github.com/arduino/arduino-cli). For ESP-IDF you need to install the full toolchain, instructions can be found on the [official website](https://docs.espressif.com/projects/esp-idf/en/latest/esp32/get-started/index.html#get-started-step-by-step).

## 🎉 Your First Project

To get started quickly, you can use the [AssemblyScript template](https://github.com/TOPLLab/as-warduino-template).

```bash
git clone git@github.com:TOPLLab/as-warduino-template.git
cd as-warduino-template
npm i
```

Now you can compile the example program.

```bash
npm run build
```

Now you can flash your program.

```bash
cd ~/Arduino/libraries/WARDuino/
```

## 📸 Flashing using Arduino

After setting up the Arduino toolchain, you can upload your programs with the Makefile in the `platforms/Arduino` folder of the WARDuino virtual machine.
You can supply all the arguments through the command-line, or write all of them in a `.config` file in the same directory as the Makefile.

```make
PORT   = /dev/ttyUSB0
FQBN   = esp32:esp32:esp32wrover
PAUSED = true
BINARY = /path/to/test.wasm
```

Starting from the root of the WARDuino repository, run the following commands:

```bash
cd platforms/Arduino
make compile
make flash
```

Command-line arguments always overwrite commands in the `.config` file.

## 📸 Flashing using ESP-IDF

::: warning Under construction
Primitive support for IDF is incomplete (see [implementation status](/reference/actions/)).
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

## 🛠️ Arduino Toolchain Setup {#arduino}

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
      - https://espressif.github.io/arduino-esp32/package_esp32_index.json
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

If you haven't done so already, clone (or symlink) the WARDuino repository to `~/Arduino/libraries/WARDuino` to make it available to Arduino. (see [#installation](#installation))

