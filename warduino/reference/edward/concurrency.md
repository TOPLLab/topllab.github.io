---
next: Latch Reference
---
# Debugging Concurrency

The EDWARD debugger is can help debug concurrency issues better than the classic [remote debugger](/reference/debugger.md) of WARDuino. Here we will illustrate how with a representative example.

## The Application

The application is kept as simple as possible. 
Its function is to allow users to dim or brighten an LED remote through MQTT messaging.

To understand the example, it suffices to look at the `main` function only.
After initialising the hardware and connecting to the MQTT broker, the code will subscribe to two topics; `"increase"` and `"decrease"`.

```ts
export function main(): void {
    init();

    // Subscribe to MQTT topics and turn on LED
    MQTT.subscribe("increase", (topic: string, payload: string) => {
            delta = 5
        });
    MQTT.subscribe("decrease", (topic: string, payload: string) => {
            delta = -5
        });
// ...
```

The callbacks will change a delta variable, which the program uses to update the LED brightness accordingly in steps of `5` procent.

After subscribing, the code will continually checking the connection to the MQTT broker and the local Wi-Fi network, as well as update the LED brightness.

```ts
// ...
    while (true) {
        checkConnection();
        if (delta !== 0) updateBrightness();
    }
}
```

The brightness of the LED is tracked by the program in a global mutable variable `brightness`
The `updateBrightness` function updates the LED in the following manner:

```ts
function updateBrightness(): void {
    brightness += (delta);
    delta = 0;
    if (brightness < 0) {
        brightness = 0;
    }
    if (brightness > config.MAX_BRIGHTNESS) {
        brightness = config.MAX_BRIGHTNESS;
    }
    analogWrite(config.CHANNEL, brightness, config.MAX_BRIGHTNESS);
}
```

Since, this is a simple example it is not too difficult, you might have spotted the mistake in the code already.
However, the example merely serves to illustrate how concurrency bugs are more easily debugged with EDWARD than remote debuggers.
That is why we use a program with a very cliché and obvious concurrency bug, because that makes it a representative example and easily understood.

## The Bug

When testing this program with a real hardware setup, the developer notices that the brightness changes irregularly.
When sending two messages to the `"increase"` topic, the LED increases its intensity by only 5% instead of 10%.

The reason is that the second message overwrites the value of the `delta` variable before the `updateBrightness` function updates the LED.
Such concurrency bugs are often time sensitive, and do not always manifest.

In our example the bug only manifests when sending two MQTT messages rapidly.
This made finding the exact conditions for the bug very difficult.
Moreover, the effects of the bug can happen long after the root cause, i.e. when the main loop updates the brightness.

## Debugging with a Remote Debugger

Stepping through code with asynchronous callbacks is very difficult, even when using current state of the art remote debuggers.
The developer has no control over when the asynchronous callbacks are called.
This makes it difficult to reproduce the exact conditions in which the bug manifest.
In turn, this increases the times a developer needs to manually step through the application before reproducing the error, drastically complicating debugging.
Moreover, the developer needs to keep track of all the steps taken and remember these steps carefully for when the bug manifest later, and a new debugging session is needed.
Finally, stepping through the code is relatively slow due to network latency between the developer's machine and the remote device.


## Debugging with EDWARD

EDWARD can help debug concurrency bugs thanks to its event scheduling and time-traveling debugging features.
By using EDWARD, developers can inspect the generated events and schedule their execution one after another (as the developer suspects that this is when the bug manifests).

When stepping through the code, EDWARD allows developers to visually inspect the brightness of the LED and observe that the bug has indeed manifested.
If the root cause was not discovered during the initial debugging session the developer can easily step back in time and go through the code as many times as needed.
During time-traveling, developers can then notice that when receiving two messages in a row, the second may overwrite the `delta` parameter set by the first message before it was processed by the main loop, revealing the cause of the bug.

This is a classic concurrency issue.
To fix it, the program should increase (and decrease) the value of `delta` instead of overwriting it.

```ts [AS]
MQTT.subscribe("increase", (topic: string, payload: string) => {
        delta = 5  // [!code  --]
        delta += 5  // [!code  ++]
    });
MQTT.subscribe("decrease", (topic: string, payload: string) => {
        delta = -5  // [!code  --]
        delta -= 5  // [!code  ++]
    });
```

## Code

Here is the full code.
The example uses a config file to specify the global constants for the LED pin, maximum brightness, channel, MQTT client id, Wi-Fi SSID, and Wi-Fi password.

```ts:line-numbers
import {analogAttach,
        analogSetup,
        analogWrite, 
        delay,
        MQTT,
        print,
        WiFi} from "as-warduino/assembly";
import * as config from "./config";

let brightness: i32 = 0;
let delta: i32 = 0;

function until(attempt: () => void, done: () => boolean): void {
    while (!done()) {
        delay(1000);
        attempt();
    }
}

function checkConnection(): void {
    until(() => {
            MQTT.connect(config.CLIENT_ID);
            MQTT.loop();
        }, MQTT.connected);
}

function init(): void {
    analogSetup(config.CHANNEL, 5000, 12);
    analogAttach(config.LED, config.CHANNEL);

    // Connect to Wi-Fi
    until(() => {
            WiFi.connect(config.SSID, config.PASSWORD);
        },
        WiFi.connected);
    let message = "Connected to wifi network with ip: ";
    print(message.concat(WiFi.localip()));

    // Connect to MQTT broker
    MQTT.configureBroker("192.168.0.24", 1883);
    check_connection();
}

function updateBrightness(): void {
    brightness += delta;
    delta = 0;
    if (brightness < 0) {
        brightness = 0;
    }
    if (brightness > config.MAX_BRIGHTNESS) {
        brightness = config.MAX_BRIGHTNESS;
    }
    analogWrite(config.CHANNEL, brightness, config.MAX_BRIGHTNESS);
}

export function main(): void {
    init();

    // Subscribe to MQTT topics and turn on LED
    MQTT.subscribe("increase", (topic: string, payload: string) => {
            delta = 5
        });
    MQTT.subscribe("decrease", (topic: string, payload: string) => {
            delta = -5
        });

    while (true) {
        checkConnection();
        if (delta !== 0) updateBrightness();
    }
}
```

The contents of the config file looks as follows:

```ts:line-numbers
export const LED: i32            = 10;
export const MAX_BRIGHTNESS: i32 = 100;
export const CHANNEL: i32        = 0;
export const SSID: string        = "local-network";
export const PASSWORD: string    = "network-password";
export const CLIENT_ID: string   = "random-mqtt-client-id";
```
