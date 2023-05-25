# Built-in Primitives

::: tip Programming in high-level languages

Language specific libraries for AssemblyScript and Rust, give access to the built-in primitives. [This guide](/en/guide/) has more information on how to get started with them.

:::

The WARDuino virtual machine includes built-in primitives that provide access to hardware and IoT specific functionality to WebAssembly programs.

The built-in primitives are divided conceptually into different modules, according to the functionality they provide. The primitives are hardware dependent and so have to be implemented for each hardware platform separately. The table below list all modules, and on which platforms they are supported.

| Module              |      Arduino          |        ESP IDF        |    Raspberry Pi    |
|:------------------- |:---------------------:|:---------------------:|:------------------:|
| analog I/O          | :white_check_mark:    |  :heavy_minus_sign:   | :heavy_minus_sign: |
| digital I/O         | :white_check_mark:    |  :white_check_mark:   | :heavy_minus_sign: |
| external interrupts | :white_check_mark:    |  :heavy_minus_sign:   | :heavy_minus_sign: |
| http                | :construction_worker: |  :heavy_minus_sign:   | :heavy_minus_sign: |
| mqtt                | :construction_worker: |  :heavy_minus_sign:   | :heavy_minus_sign: |
| neopixel            | :construction_worker: |  :heavy_minus_sign:   | :heavy_minus_sign: |
| serial              | :white_check_mark:    |  :heavy_minus_sign:   | :heavy_minus_sign: |
| spi                 | :white_check_mark:    |  :heavy_minus_sign:   | :heavy_minus_sign: |
| time                | :white_check_mark:    | :construction_worker: | :heavy_minus_sign: |
| wifi                | :white_check_mark:    |  :heavy_minus_sign:   | :heavy_minus_sign: |

:white_check_mark: = implemented | :construction_worker: = partially implemented | :heavy_minus_sign: = not implemented

## Using Primitives

The primitives can be imported in WebAssembly from the `env` module.

```wasm
(import "env" "chip_delay" (func $delay (type $int->void)))
```

## Custom Primitives

The WARDuino virtual machine is open-source, and developers are encouraged to extend the existing primitives with their own functionality.

