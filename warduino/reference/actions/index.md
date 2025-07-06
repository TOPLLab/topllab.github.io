# Built-in Actions

The WARDuino virtual machine includes built-in actions (sometimes we refer to these as primitives) that provide access to hardware and IoT specific functionality in WebAssembly programs.

## Modules

The built-in actions are implemented seperately for each hardware platform.
We group the built-in actions into modules, which are listed in the table below.

| Module              | Emulator |      Arduino          |        ESP IDF        |         Zephyr        |   Open Bot Brain      |
|:------------------- |:--------:|:---------------------:|:---------------------:|:---------------------:|:---------------------:|
| analog I/O          | ➖ | :white_check_mark:    | :heavy_minus_sign:    | :heavy_minus_sign:    | :heavy_minus_sign:    |
| digital I/O         | ⏪ | :white_check_mark:    | :white_check_mark:    | ⏪                    | ⏪                    |
| external interrupts | ✅ | :white_check_mark:    | :heavy_minus_sign:    | :heavy_minus_sign:    | :heavy_minus_sign:    |
| http                | ➖ | :construction_worker: | :heavy_minus_sign:    | :heavy_minus_sign:    | :heavy_minus_sign:    |
| mqtt                | ➖ | :construction_worker: | :heavy_minus_sign:    | :heavy_minus_sign:    | :heavy_minus_sign:    |
| neopixel            | ➖ | :construction_worker: | :heavy_minus_sign:    | :heavy_minus_sign:    | :heavy_minus_sign:    |
| servo motors        | ➖ | :heavy_minus_sign:    | :heavy_minus_sign:    | :heavy_minus_sign:    | ⏪                    |
| serial              | ✅ | :white_check_mark:    | :heavy_minus_sign:    | :construction_worker: | :construction_worker: |
| spi                 | ➖ | :white_check_mark:    | :heavy_minus_sign:    | :heavy_minus_sign:    | :heavy_minus_sign:    |
| time                | ✅ | :white_check_mark:    | :construction_worker: | :heavy_minus_sign:    | :heavy_minus_sign:    |
| wifi                | ➖ | :white_check_mark:    | :heavy_minus_sign:    | :heavy_minus_sign:    | :heavy_minus_sign:    |

⏪ = implemented and reversible | ✅ = implemented | 👷 = partially implemented | ➖ = not implemented

The built-in primitives are divided conceptually into different modules, according to the functionality they provide. The primitives are hardware dependent and so have to be implemented for each hardware platform separately. The table below list all modules, and on which platforms they are supported.

### Using Actions

The actions can be imported in WebAssembly from the `env` module.

```wasm
(import "env" "chip_delay" (func $delay (type $int->void)))
```

## Custom Actions

The WARDuino virtual machine is open-source, and developers are encouraged to extend the existing primitives with their own functionality.

## Overview

**Digital I/O**

- [pin mode](/reference/actions/digital/mode)
- [digital write](/reference/actions/digital/write)
- [digital read](/reference/actions/digital/read)
