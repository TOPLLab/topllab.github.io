---
next: Technical References
---
# Platform Support

The WARDuino VM currently supports the Arduino toolchain, and has limited support for the ESP-IDF toolchain.
Normally, devices that support these toolchains should be able to run WARDuino.

The callback handling system in WARDuino currently requires significant memory because it allocates memory, following the WebAssembly specification, in pages of 64 KiB.
This is a major constraint for some microcontrollers, however all other parts of the VM can still work without allocating any WebAssembly memory pages.

## Compatibility

The following table lists the devices on which the WARDuino VM has been verified to work.

| Device Family / OS                                                                                                           |         CLI        |      Arduino       |       Zephyr       |                              ESP IDF                              |     Callbacks      |
|:---------------------------------------------------------------------------------------------------------------------------- |:------------------:|:------------------:|:------------------:|:-----------------------------------------------------------------:|:------------------:|
| Windows                                                                                                                      | :heavy_minus_sign: | :heavy_minus_sign: | :heavy_minus_sign: |                        :heavy_minus_sign:                         | :heavy_minus_sign: |
| Linux                                                                                                                        | :white_check_mark: | :heavy_minus_sign: | :heavy_minus_sign: |                        :heavy_minus_sign:                         | :white_check_mark: |
| macOS                                                                                                                        | :white_check_mark: | :heavy_minus_sign: | :heavy_minus_sign: |                        :heavy_minus_sign:                         | :white_check_mark: |
| [ESP8266](https://www.espressif.com/en/products/socs/esp8266)                                                                | :heavy_minus_sign: | :white_check_mark: | :heavy_minus_sign: |                        :white_check_mark:                         | :heavy_minus_sign: |
| [ESP32 WROOM](https://www.espressif.com/sites/default/files/documentation/esp32-wroom-32e_esp32-wroom-32ue_datasheet_en.pdf) | :heavy_minus_sign: | :white_check_mark: | :heavy_minus_sign: | :exclamation:[\*](https://github.com/TOPLLab/WARDuino/issues/210) |   :exclamation:    |
| [ESP32 WROVER](https://www.espressif.com/sites/default/files/documentation/esp32-wrover-e_esp32-wrover-ie_datasheet_en.pdf)  | :heavy_minus_sign: | :white_check_mark: | :heavy_minus_sign: |                        :white_check_mark:                         | :white_check_mark: |
| [Openbot Brain](https://github.com/OpenBotBrain)                                                                             | :heavy_minus_sign: | :heavy_minus_sign: | :white_check_mark: |                        :heavy_minus_sign:                         | :heavy_minus_sign: |
| STM32 Cortex M4                                                                                                              | :heavy_minus_sign: | :heavy_minus_sign: | :white_check_mark: |                        :heavy_minus_sign:                         | :heavy_minus_sign: |
| [Adafruit ESP32 Feather V2](https://www.adafruit.com/product/5400)                                                           | :heavy_minus_sign: | :white_check_mark: | :heavy_minus_sign: |                        :heavy_minus_sign:                         | :white_check_mark: |

:white_check_mark: = supported | :exclamation: = unstable | :heavy_minus_sign: = not supported  

