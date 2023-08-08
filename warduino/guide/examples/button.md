# Button

Push-buttons and switches connect two points in a circuit when you press them.
This example turns on an LED when you press the button.

## Circuit

For this example you require:

1. A microcontroller
2. A momentary button or switch
3. 10K ohm resistor
4. An LED
5. 220 ohm resistor

<img src="/images/button-circuit.svg" class="circuit">

## Code

::: code-group
```ts [AS]
import {
    delay,
    digitalRead,
    digitalWrite,
    InterruptMode,
    interruptOn,
    pinMode,
    PinMode,
    PinVoltage
} from "as-warduino/assembly";
import {config} from "./config";

function invert(voltage: PinVoltage): PinVoltage {
    switch (voltage) {
        case PinVoltage.LOW:
            return PinVoltage.HIGH;
        case PinVoltage.HIGH:
        default:
            return PinVoltage.LOW;
    }
}

function toggleLED(_topic: string, _payload: string): void {
    // Get current status of LED
    let status = digitalRead(config.led);
    // Toggle LED
    digitalWrite(config.led, invert(status));
}

export function main(): void {
    pinMode(config.button, PinMode.INPUT);
    pinMode(config.led, PinMode.OUTPUT);

    interruptOn(config.button, InterruptMode.FALLING, toggleLED);

    while (true) {
        delay(1000);
    }
}
```

```rust [Rust]
use warduino::{delay,
               digital_read,
               digital_write,
               InterruptMode,
               pin_mode,
               PinMode,
               PinVoltage,
               sub_interrupt};

mod config;

fn callback(_topic: &str, _payload: &str, _length: u32) {
    let voltage = digital_read(config::LED);
    match voltage {
        PinVoltage::HIGH => digital_write(config::LED, PinVoltage::LOW),
        PinVoltage::LOW => digital_write(config::LED, PinVoltage::HIGH)
    }
}

#[no_mangle]
pub fn main() {
    pin_mode(config::BUTTON, PinMode::INPUT);
    pin_mode(config::LED, PinMode::OUTPUT);

    sub_interrupt(config::BUTTON, InterruptMode::FALLING, callback);

    loop {
        delay(1000);
    }
}
```
::: code-group
