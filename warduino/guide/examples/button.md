<script setup>
import illustration from '../../components/illustration.vue'
</script>

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

<illustration src="/images/button-circuit.svg" darkmode="/images/button-circuit-dark.svg" classes="circuit"/>

## Program

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

const button = 25;
const led = 26;

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
    let status = digitalRead(led);
    // Toggle LED
    digitalWrite(led, invert(status));
}

export function main(): void {
    pinMode(button, PinMode.INPUT);
    pinMode(led, PinMode.OUTPUT);

    interruptOn(button, InterruptMode.FALLING, toggleLED);

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

static BUTTON: u32 = 25;
static LED: u32 = 26;

fn callback(_topic: &str, _payload: &str, _length: u32) {
    let voltage = digital_read(LED);
    match voltage {
        PinVoltage::HIGH => digital_write(LED, PinVoltage::LOW),
        PinVoltage::LOW => digital_write(LED, PinVoltage::HIGH)
    }
}

#[no_mangle]
pub fn main() {
    pin_mode(BUTTON, PinMode::INPUT);
    pin_mode(LED, PinMode::OUTPUT);

    sub_interrupt(BUTTON, InterruptMode::FALLING, callback);

    loop {
        delay(1000);
    }
}
```
::: code-group
