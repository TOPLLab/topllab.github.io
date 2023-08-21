# Using Configuration Files

Often your programs require information that would typically be stored in a configuration files, such as hardware pins, Wi-Fi network SSIDs, passwords, URLs, etc.

Unfortunately we cannot save the config as a .json or .yaml file since the configuration needs to be embedded in the code when compiling to WebAssembly.
If this sounds weird, remember that WebAssembly has no standard way of reading from files.

Instead of a data file, you can save the configuration in a separate program file.

## Program

Say, we want to move the pin number for the LED from the previous examples, to a configuration file.
The contents of the config file looks as follows:

::: code-group
```ts [AS]
export const LED: u32 = 26;
```

```rust [Rust]
pub static LED: u32 = 26;
```
:::

Then, we can import the configuration in our program as a normal dependency.

::: code-group
```ts [AS]
// Blinking LED example
import {pinMode, PinMode} from "as-warduino/assembly";
import * as config from "./config";

export function main(): void {
    let led = config.LED;
    pinMode(led, PinMode.OUTPUT);
}
```

```rust [Rust]
// Blinking LED example
use warduino::{pin_mode, PinMode};

mod config;

#[no_mangle]
pub fn main() {
    let led: u32 = config::LED;
    pin_mode(led, PinMode::OUTPUT);
}
```
:::

In the next examples, we will move sensitive information such as Wi-Fi passwords to configuration files.

