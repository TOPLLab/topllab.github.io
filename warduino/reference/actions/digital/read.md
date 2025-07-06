# Digital read ⏪

This action changes changes the signal of a digital I/O pin to either `LOW` or `HIGH`.

---

|               | Emulator |      Arduino          |        ESP IDF        |         Zephyr        |
|:------------------- |:--------:|:---------------------:|:---------------------:|:---------------------:|
| Support | ⏪ | ✅ | ✅ | ⏪ |

## Interface

::: code-group

```wasm [WebAssembly]
(func chip_digital_read (param $pin i32) (result i32))
```

```ts [AS]
function digitalRead(pin: i32, value: PinVoltage): void
```

```rust [Rust]
fn digital_read(pin: u32, value: PinVoltage)
```
:::

## Parameters

### WebAssembly

- **pin**: must be a valid I/O pin number of the microcontroller

## Return value

### WebAssembly

- a unsigned 32 integer, either 0 (low) or 1 (high)


### AssemblyScript

```ts [AS]
enum PinVoltage {
    /** Low voltage on a digital I/O pin */
    LOW  = 0,
    /** High voltage on a digital I/O pin */
    HIGH = 1,
}
```

### Rust

```rust [Rust]
enum PinVoltage {
    /** Low voltage on a digital I/O pin */
    LOW  = 0,
    /** High voltage on a digital I/O pin */
    HIGH = 1,
}
```
