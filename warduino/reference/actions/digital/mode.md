# Pin mode ⏪

This action changes the mode of a digital I/O pin to either `INPUT` or `OUTPUT`.

## Interface

::: code-group

```wasm [WebAssembly]
(func chip_pin_mode (param $pin i32) (param $mode i32))
```

```ts [AS]
function pinMode(pin: i32, mode: PinMode): void
```

```rust [Rust]
fn pin_mode(pin: i32, mode: PinMode)
:::

## Supported platforms

|               | Emulator |      Arduino          |        ESP IDF        |         Zephyr        |
|:------------------- |:--------:|:---------------------:|:---------------------:|:---------------------:|
| Support | ⏪ | ✅ | ✅ | ⏪ |

## Parameters

### WebAssembly

- **pin**: must be a valid I/O pin number of the microcontroller
- **mode**: either 0 (input) or 1 (output)

