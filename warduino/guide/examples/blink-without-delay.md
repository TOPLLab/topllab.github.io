# Blink Without Delay

The previous [blink](/guide/examples/blink) example uses a busy loop and a delay, that prevents the program from doing anything useful in between changing the LED's state.
Alternatively, we want to avoid using the `delay` primitive, and instead do something else while we wait.

## Circuit

<img src="/images/led-circuit.svg" class="circuit">

## Program

We removed the delay from the previous blink example, and use the `millis` primitive that returns the number of milliseconds since the device started running.

::: code-group
```ts [AS]
// Blinking LED example
import {pinMode, PinMode, PinVoltage,
        digitalWrite, delay} from "as-warduino/assembly";
import * as config from "./config";

export function main(): void {
    let led = config.LED;
    pinMode(led, PinMode.OUTPUT);

    let pause: u32 = 1000;
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

mod config;

#[no_mangle]
pub fn main() {
    let led: u32 = config::LED;
    pin_mode(led, PinMode::OUTPUT);

    let pause: u32 = 1000;
    loop {
        digital_write(led, PinVoltage::HIGH);
        delay(pause);
        digital_write(led, PinVoltage::LOW);
        delay(pause);
    }
}
```
:::
