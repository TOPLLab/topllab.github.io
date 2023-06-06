# Debugging Hardware

In IoT projects, the most frequent types of bugs are related to software development and device issues.
It is therefore very important to be able to debug on real hardware over emulators.

Remote debuggers allow developers to already debug in a limited way on hardware.
However, they have severe limitations.
They are limited by the hardware constraints, they can suffer from high latency, and they can increase the *probe effect*.

The out-of-place EDWARD debugger, improves upon remote debuggers, by overcoming these limitations.
Additionally, debugging on a more powerful local machine allows for more advanced debugging views and operations to further help debugging.
We will go over an example of a common hardware issue to illustrate the benefits of EDWARD over classic remote debuggers.

## The Application

The code below uses hardware interrupts to program a button to toggle an LED on and off at each press.

```ts
export function main() : void {
  interruptOn(BUTTON, InterruptMode.FALLING, buttonPressed);
  while(true);
}

function buttonPressed(): void {
  digitalWrite(LED, !digitalRead(LED));
}
```

## The Bug

Many device issues are related to handling interrupts.
The example application listens for a hardware interrupts triggered on the falling edge of the button pin.

```ts
interruptOn(BUTTON, InterruptMode.FALLING, buttonPressed);
```

Upon receiving an interrupt, the `buttonPressed` function is called, which toggles the LED.

```
digitalWrite(LED, !digitalRead(LED));
```

While the code does not contain errors, the hardware can cause bugs in it.
Consider the following scenario: when testing the application with a real button, the LED sometimes does not change despite the button being pressed.

## Debugging with a Remote Debugging

With a regular remote debugger, developers can start by adding a breakpoint in the `buttonPressed` callback function.

```ts {2}
function buttonPressed(): void {
  digitalWrite(LED, !digitalRead(LED));
}
```

Note that in this simple example, there is only one single callback function.
In more complex applications you quickly need to place breakpoints in many callback functions as it is difficult to rule out callbacks beforehand, by only looking at the code.

Stepping through code with asynchronous callbacks is generally not easy with current state of the art remote debuggers.
Keeping track of all the asynchronous callbacks increases the number of times a developer needs to manually step through the application before discovering the error, complicating debugging.
Moreover, stepping through the code is relatively slow, as the network latency between the developer's machine and the remote device slows down the debug session.
Finally, most applications will not feature a busy loop as in our example, but the main thread runs concurrently with the asynchronous invocations, making it harder to notice errors.

Once the developer has stepped through all the asynchronous code letting the callbacks execute, the de developer might notice that the `buttonPressed` callback is invoked multiple times.
The reason is that a single button press can trigger multiple hardware interrupts due to a common problem of physical buttons called *contact bouncing*.

::: tip Contact bouncing

Contact bouncing happens when the voltage of a mechanical switch pulses rapidly, instead of performing a clean transition from high to low.

:::

Due to contact bouncing, the pin can register a falling edge multiple times in a row for a single button press.
Subsequently, the `buttonPressed` function is triggered multiple times.

If contact bouncing causes the function to be triggered an even number of times, the state of the LED seems to remain the same, making the developer believe the code does nothing.
It is not trivial to deduce the underlying contact bouncing problem by only stepping forward through the program.

## Debugging with EDWARD

Let's revisit the scenario using out-of-place debugging with EDWARD.
With EDWARD, developers can pull an out-of-place debug session from the remote device, and begin debugging locally at their machine.
EDWARD provides the developer with a dedicated view on the event queue with all asynchronous events that happen at the remote device, and the ability to choose when the next event happens.
When the developer pushes the physical button once during debugging, they will immediately notice that EDWARD's events view suddenly contains multiple identical events for a single button press.

This information enables the developer to more easily detect the contact bouncing issue.

If the developer has not yet deduced the root cause of the bug, they can step through the code similar to remote debugger.
However, this time, stepping through the code is fast as debugging happens locally without incurring in network communication.
Moreover, EDWARD allows debugging the program backwards.
This means that during debugging when the LED does not turn on, the developer can step back to the previous step to diagnose what exactly went wrong during the execution.
There is no need to restart the program and try to guess what the right conditions for the bug were.

## Code

```ts:line-numbers
import {digitalRead,
        digitalWrite,
        InterruptMode,
        interruptOn} from "as-warduino";

const LED: u32 = 25;
const BUTTON: u32 = 26;

function buttonPressed(): void {
  digitalWrite(LED, !digitalRead(LED));
}

export function main() : void {
  interruptOn(BUTTON, InterruptMode.FALLING, buttonPressed);
  while(true);
}
```

