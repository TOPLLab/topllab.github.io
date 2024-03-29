<script setup>
import illustration from '../../.vitepress/components/illustration.vue'
</script>

# Blink

The blinking LED example is the traditional _Hello World_ program for microcontrollers.
The program turns an LED on and off at a regular interval.

## Circuit

For this example you require:

1. A microcontroller
2. An LED (optional)
3. 220 ohm resistor (optional)

The LED and 220 ohm resistor are optional, most microcontrollers come with a built-in LED that you can use for this example.

<illustration src="/images/led-circuit.svg" darkmode="/images/led-circuit-dark.svg" classes="circuit"/>

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

::: code-group
```ts [AS]
// Blinking LED example
import {pinMode, PinMode, PinVoltage,
        digitalWrite, delay} from "as-warduino/assembly";

export function main(): void {
    const led: u32 = 26;
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

## Learn More

Also, check out the [Blink Without Delay](./blink-without-delay.md) example to learn how to create a delay while doing other things.

