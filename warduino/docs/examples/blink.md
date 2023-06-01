# Blink

The _Hello World_ program for microcontrollers, is to turn an LED on and off every second.

::: code-group
```ts [AS]
// Blinking LED example
import {pinMode, PinMode, PinVoltage, digitalWrite, delay} from "as-warduino";
import {config} from "./config";

export function main(): void {
    let led = config.led;
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

The example uses a config file to specify the number of the digital pin to which the LED is connected.
The contents of the file looks as follows:

::: code-group
```ts [AS]
class Config {
    led: u32;

    constructor(led: u32) {
        this.led = led;
    }
}

export let config: Config = new Config(26);
```

```rust [Rust]
pub static LED: u32 = 26;
```
::: code-group

The config is not saved as a `.json` or `.yaml` file since the configuration needs to be embedded in the code when compiling to WebAssembly. If this sounds weird, remember that WebAssembly has no standard way of reading from files.

