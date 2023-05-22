# Blink

The _Hello World_ program for microcontrollers, is to turn an LED on and off every second.

```ts
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
