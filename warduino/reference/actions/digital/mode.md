# Pin mode ⏪

This action changes the mode of a digital I/O pin to either `INPUT` or `OUTPUT`.

## Interface

:::

```wasm [WebAssembly]
(func chip_pin_mode (param $pin i32) (param $mode i32))
```

```ts [AS]
function pinMode(pin: i32, mode: PinMode): void
```
:::

## Supported platforms
