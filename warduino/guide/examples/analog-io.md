<script setup>
import illustration from '../../.vitepress/components/illustration.vue'
</script>

# Analog In, Out Serial

This example adjusts the brightness of an LED based on an analog input.

## Circuit

For this example you require:

1. A microcontroller
2. Potentiometer or other sensor
3. An LED
4. 220 ohm resistor

<illustration src="/images/analog-io-circuit.svg" darkmode="/images/analog-io-circuit-dark.svg" classes="circuit"/>

## Program

This example program reads an analog input pin, maps the value, and uses it to adjust the LED brightness.
To read an analog value from a potentiometer or similar sensor we use the `analogWrite` primitive:

::: code-group

```ts [AS]
const value = analogRead(13);
```

```rust [Rust]
let value: u32 = analog_read(13);
```

:::

The analog input spans from 0 to 1023 and `analogWrite` accepts values only from 0 to 255, therefore the input data
needs to be converted to fit the smaller range before dimming the LED.

::: code-group

```ts [AS]
function map(value: u32, x1: u32, y1: u32, x2: u32, y2: u32): u32 {
    return <u32>((value - x1) * (y2 - x2) / (y1 - x1) + x2);
}
```

```rust [Rust]
function map(value: u32, x1: u32, y1: u32, x2: u32, y2: u32) => u32 {
((value - x1) * (y2 - x2) / (y1 - x1) + x2).ceil();
}

```

:::

The full program is given below.

::: code-group

```ts [AS]
import {
    analogRead,
    analogWrite,
    delay,
    print
} from "as-warduino/assembly";

const IN: u32 = 13;
const OUT: u32 = 9;

function map(value: u32, x1: u32, y1: u32, x2: u32, y2: u32): u32 {
    return <u32>((value - x1) * (y2 - x2) / (y1 - x1) + x2);
}

export function main(): void {
    const value = analogRead(IN);

    const output = map(value, 0, 1023, 0, 255);

    analogWrite(OUT, output);

    print(`sensor = ${value}\t output = ${output}`);
    delay(1);
}
```

```rust [Rust]
use warduino::{analog_read, analog_write, delay, print};

static IN: u32 = 13;
static OUT: u32 = 9;

fn map(value: u32, x1: u32, y1: u32, x2: u32, y2: u32) -> u32 {
    (value - x1) * (y2 - x2) / (y1 - x1) + x2
}

#[no_mangle]
pub fn main() {
    let value: u32 = analog_read(IN);
    let output: u32 = map(value, 0, 1023, 0, 255);

    analog_write(OUT, output);

    print(&format!("sensor = {:#?}\t output = {:#?}", value, output).to_string());
    delay(1);
}
```

:::
