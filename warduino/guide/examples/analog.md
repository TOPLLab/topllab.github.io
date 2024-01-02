<script setup>
import illustration from '../../components/illustration.vue'
</script>

# Analog Read Serial

This is the smallest example for WARDuino, the program shows how to read analog input from the physical world, and print it out via the serial bus.

## Circuit

We can connect a potentiometer or similar sensor to one of the I/O pins of the embedded device.
With WARDuino you can measure the resistance produced by the potentiometer.

For this example you require:

1. A microcontroller
2. Potentiometer or other sensor

<illustration src="/images/analog-circuit.svg" darkmode="/images/analog-circuit-dark.svg" classes="circuit"/>

## Program

Read a sensor, print its state out to the serial bus.

::: code-group
```ts [AS]
import {analogRead, delay, print} from "as-warduino/assembly";

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
