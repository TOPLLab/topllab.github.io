# Analog Read Serial

## Circuit

We can connect a potentiometer or similar sensor to one of the I/O pins of the embedded device.
With WARDuino you can measure the resistance produced by the potentiometer.

## Program

Read a sensor, print its state out to the serial bus.

::: code-group
```ts [AS]
import {analogRead, delay, print} from "as-warduino";

export function main(): void {
    const value = analogRead(13);
    print(value);
    delay(1);
}
```

```rust [Rust]
use warduino::{analog_read, delay, print};

#[no_mangle]
pub fn main() {
    let value: u32 = analog_read(13);
    print(value);
    delay(1);
}
```
:::
