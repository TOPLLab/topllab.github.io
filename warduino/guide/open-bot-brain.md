# Open Bot Brain
The WARDuino VM has support for [specialised hardware](https://www.openbotbrain.org/) that can be used to control Lego Mindstorms components.

## Prerequisites
To use WARDuino on this hardware, the Zephyr platform should be used. To get started you will first need to install Zephyr by following the [official installation guide](https://docs.zephyrproject.org/latest/develop/getting_started/index.html).

By default Zephyr will use the [STM32CubeProgrammer](https://www.st.com/en/development-tools/stm32cubeprog.html) to flash the board, which you will also need to install.

## Adding your program
Before building WARDuino you will need to specify the program which the VM will execute when starting. To achieve this, you will need to compile your WebAssembly program and place the resulting executable in the `platforms/Zephyr` directory with the name `upload.wasm`.

### Example
The following program written in [AssemblyScript](https://www.assemblyscript.org/) will make one of the built-in LEDs on the board blink.
```ts [AS]
@external("env", "chip_delay") declare function delay(value: i32): void;
@external("env", "chip_pin_mode") declare function pinMode(pin: i32, mode: i32): void;
@external("env", "chip_digital_write") declare function digitalWrite(pin: i32, value: i32): void;

enum PinVoltage {
    LOW  = 0,
    HIGH = 1,
}

enum PinMode {
  INPUT = 0,
  OUTPUT = 2
}

enum Pin {
  powerSupply = 60,
  led1 = 45,
}

function setup(): void {
    // Configure and enable power supply pin (active low).
    pinMode(Pin.powerSupply, PinMode.OUTPUT);
    delay(500); // Wait for 500ms to avoid current spike.
    digitalWrite(Pin.powerSupply, PinVoltage.LOW);

    // Configure LED.
    pinMode(Pin.led1, PinMode.OUTPUT);
}

export function main(): void {
    setup();

    while (true) {
        digitalWrite(Pin.led1, PinVoltage.HIGH);
        delay(500);
        digitalWrite(Pin.led1, PinVoltage.LOW);
        delay(500);
    }
}
```

This program can be compiled using the following command if you have the [AssemblyScript](https://www.assemblyscript.org/) compiler globally installed on your system:
```bash
asc blink.ts -o upload.wasm
```

With the program compiled and placed in the `platforms/Zephyr` directory you should now have the following directory structure:

```tree
.
├── app.overlay
├── boards
│   ├── ...
├── CMakeLists.txt
├── Kconfig
├── main.cpp
├── prj.conf
└── upload.wasm
```

## Building
To build WARDuino for Open Bot Brain, run the following commands starting from the root directory of the repository:
```bash
cd platforms/Zephyr
source ~/zephyrproject/zephyr/zephyr-env.sh
source ~/zephyrproject/.venv/bin/activate
west build -b stm32l496g_disco
```

## Flashing
To flash WARDuino to the board, the following command can be used. By default this will use the [STM32CubeProgrammer](https://www.st.com/en/development-tools/stm32cubeprog.html). You can also use a different runner by using the `--runner` flag, more info can be found in the [Zephyr documentation](https://docs.zephyrproject.org/latest/boards/st/nucleo_l496zg/doc/index.html#flashing).
```bash
west flash
```

Once flashed, you should start seeing one of the LEDs blink.

## Board information
The Open Bot Brain has various built-in LEDs and buttons, in the following table we list some of the pin numbers for use in your programs.
|Description|Pin number|
|:--|---:|
|Power supply|60|
|Motor AB Driver sleep|46|
|Motor CD Driver sleep|78|
|Led 1|45|
|Led 2|56|
|Led 3|39|
|Button SW1 |21|
|Button SW5 |20|
|Button SW2 |10|

## Lego Mindstorms Primitives
Aside from the built-in LEDs and buttons, Open Bot Brain also has 4 input and 4 output ports that can be used to control Lego Mindstorms components.

### Outputs
In terms of outputs we support both the NXT and EV3 (medium and large) motors. These can be controlled using the following primitives:

| Primitive                  | Description                               |
|----------------------------|-------------------------------------------|
| `drive_motor(port, speed)` | Makes the motor spin at a constant speed. |
| `drive_motor_ms(port, speed, time)` | Makes the motor spin for x ms. |
| `drive_motor_degrees(port, speed, angle)` | Makes the motor rotate x degrees. |
| `stop_motor(port)` | Actively slows down the motor. |

### Inputs
In terms of inputs we supports UART based sensors such as the EV3 Color and Gyro sensors. These can be controlled using the following primitives:

| Primitive                  | Description                               |
|----------------------------|-------------------------------------------|
| `setup_uart_sensor(port, mode)` | Configure the UART sensor and set its mode. |
| `read_uart_sensor(port)` | Read the latest value from the UART sensor. |
