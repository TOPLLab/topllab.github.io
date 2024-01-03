<script setup>
import illustration from '../../.vitepress/components/illustration.vue'
</script>

# Blink Without Delay

The previous [blink](/guide/examples/blink) example uses a busy loop and a delay, that prevents the program from doing anything useful in between changing the LED's state.
Alternatively, we want to avoid using the `delay` primitive, and instead do something else while we wait.

## Circuit

For this example you require:

1. A microcontroller
2. An LED
3. 220 ohm resistor

<illustration src="/images/led-circuit.svg" darkmode="/images/led-circuit-dark.svg" classes="circuit"/>

## Program

We removed the delay from the previous blink example, and use the `millis` primitive that returns the number of milliseconds since the device started running.

::: code-group
```ts [AS]
// Blinking LED example
import {pinMode, PinMode, PinVoltage,
        digitalWrite, delay} from "as-warduino/assembly";

export function main(): void {
    const led = 26;
    const pause: u32 = 1000;

    pinMode(led, PinMode.OUTPUT);

    while (true) {
        digitalWrite(led, PinVoltage.HIGH);
        delay(pause);
        digitalWrite(led, PinVoltage.LOW);
        delay(pause);
    }
}
```

```rust [Rust]
// Blinking LED example
use warduino::{delay, digital_write, pin_mode, PinMode, PinVoltage};

#[no_mangle]
pub fn main() {
    let led: u32 = 26;
    let pause: u32 = 1000;

    pin_mode(led, PinMode::OUTPUT);

    loop {
        digital_write(led, PinVoltage::HIGH);
        delay(pause);
        digital_write(led, PinVoltage::LOW);
        delay(pause);
    }
}
```
:::
