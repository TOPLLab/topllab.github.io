# Blink

The blinking LED example is the traditional _Hello World_ program for microcontrollers.
The program turns an LED on and off at a regular interval.

## Circuit

## Program

Once you have built the circuit, you can write the blinking LED example for WARDuino.
First you need to initialize the pin connecting the LED as an output pin.

::: code-group
```ts [AS]
pinMode(led, PinMode.OUTPUT);
```
```rust [Rust]
pin_mode(led, PinMode::OUTPUT);
```
:::

Then in an infinite loop, we want to turn the LED on.
In the code we use a variable `led` that holds the correct pin number.

::: code-group
```ts [AS]
digitalWrite(led, PinVoltage.HIGH);
```
```rust [Rust]
digital_write(led, PinVoltage::HIGH);
```
:::

Here, the `digitialWrite` primitive makes the microcontroller supply 5 volts to the LED anode, turning the LED on.
Next we want to turn the LED off, by bringing the pin back to 0 volts.

::: code-group
```ts [AS]
digitalWrite(led, PinVoltage.LOW);
```
```rust [Rust]
digital_write(led, PinVoltage::LOW);
```
:::

Without a delay between these commands, a person could never observe the change.
So we can tell the board to do nothing for a number of milliseconds.

::: code-group
```ts [AS]
delay(1000);
```
```rust [Rust]
delay(1000);
```
:::

Here is the full code.
The example uses a config file to specify the digital pin number to which the LED is connected.

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

The contents of the config file looks as follows:

::: code-group
```ts [AS]
export const LED: u32 = 26;
```

```rust [Rust]
pub static LED: u32 = 26;
```
::: code-group

The config is not saved as a `.json` or `.yaml` file since the configuration needs to be embedded in the code when compiling to WebAssembly. If this sounds weird, remember that WebAssembly has no standard way of reading from files.

## Learn More

Also, check out the [Blink Without Delay](./blink-without-delay.md) example to learn how to create a delay while doing other things.

