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

## Flashing using Arduino

## Flashing using ESP-IDF
