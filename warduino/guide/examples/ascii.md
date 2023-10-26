# ASCII Table

Demonstrates advanced serial output functions.

## Circuit

No wiring is required for this example, you only need a microcontroller with UART support that is connected with your computer through the serial or USB port.

## Program

::: code-group
```ts [AS]
import {print} from "as-warduino/assembly";

export function main(): void {
    print("ASCII Table ~ Character Map\n");
    let byte: i32 = 33;

    while (byte !== 126) {
        print(String.fromCharCode(byte));

        print(", dec: " + byte.toString());
        print(", hex: " + byte.toString(16));
        print(", oct: " + byte.toString(8));
        print(", bin: " + byte.toString(2) + "\n");

        if (byte == 126) {
          while (true) {
            continue;
          }
        }

        byte++;
    }
}
```

```rust [Rust]
use warduino::{print};

#[no_mangle]
pub fn main() {
    print("ASCII Table ~ Character Map\n");

    for byte in 33..=125 {
        print(&format!("{}, dec: {}, hex: {:x}, oct: {:o}, bin: {:b}\n",
            char::from_u32(0xDE01).unwrap(), byte, byte, byte, byte).to_string());
    }
}
```
::: code-group

