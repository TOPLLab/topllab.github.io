# Debugging Hardware

A [2021 study](https://doi.org/10.1109/ICSE43902.2021.00051) on 5,565 bugs in 91 IoT projects showed that the most frequent types of bugs are related to software development and device issues.
It is therefore very important to be able to debug on hardware.

Remote debuggers allow developers to already debug in a limited way on hardware.
However, they have severe limitations.
They are limited by constraints of the hardware, they can suffer from high latency between actions, and increase the *probe effect*.

The out-of-place EDWARD debugger, improves upon remote debuggers, by overcoming these limitations.
Furthermore, debugging on a more powerful local machine allows for more advanced debugging views and operations to help debugging.
We will go over an example of a common hardware issue to illustrate the benefits of EDWARD over classic remote debuggers.

## The Application

The code below uses hardware interrupts to program a button to toggle an LED on and off at each press.

```ts
import {digitalRead,
        digitalWrite,
        FALLING,
        interruptOn} from "as-warduino";

const LED: u32 = 25;
const BUTTON: u32 = 26;

function buttonPressed(): void {
  digitalWrite(LED, !digitalRead(LED));
}

export function main() : void {
  interruptOn(BUTTON, FALLING, buttonPressed);
  while(true);
}
```

## The Bug

Many device issues are related to handling interrupts.
The example application listens for a hardware interrupts triggered on the falling edge of the button pin.

```ts
interruptOn(BUTTON, FALLING, buttonPressed);
```

Upon receiving an interrupt, the `buttonPressed` function is called, which toggles the LED.

```
digitalWrite(LED, !digitalRead(LED));
```

While the code does not contain errors, the hardware can cause bugs in it.
Consider the following scenario: when testing the application with a real button, the LED sometimes does not change despite the button being pressed.

## Debugging with a Remote Debugging

With a regular remote debugger, developers could start their diagnosis by adding a breakpoint in the `buttonPressed` callback function triggered when pressing the button.
Note that in this simple example, there is only one single callback function,
but in more complex IoT applications developers may need to place breakpoints in many callback functions as it is difficult to rule out which ones are not causing to the faulty behavior.

Stepping through code with asynchronous callbacks is generally not easy with current state of the art remote debuggers.
Keeping track of all the asynchronous callbacks increases the number of times a developer needs to manually step through the application before discovering the error, complicating debugging.
Moreover, stepping through the code is relatively slow, as the network latency between the developer's machine and the remote device slows down the debug session.
Finally, most applications will not feature a busy loop as in our example, but the main thread runs concurrently with the asynchronous invocations, making it harder to notice errors.

Once the developer has stepped through all the asynchronous code letting the callbacks execute, the de developer might notice that the `buttonPressed` callback is strangely invoked multiple times.
The reason is that a single button press can trigger multiple hardware interrupts due to a common problem of physical buttons called *contact bouncing*.
Contact bouncing happens when the voltage of a mechanical switch pulses rapidly, instead of performing a clean transition from high to low.
In that case, the pin can register a falling edge multiple times in a row.
Subsequently, the `buttonPressed` function is triggered multiple times for a single press.
If contact bouncing causes the function to be triggered an even number of times, the state of the LED seems to remain the same, making the developer believe the code does nothing.
It is not trivial to deduce the underlying contact bouncing problem by only stepping through the program.

## Debugging with EDWARD

Let us now revisit the scenario using out-of-place debugging with EDWARD.
With EDWARD, developers can pull an out-of-place debug session from the remote device, and begin debugging locally at their machine.
EDWARD provides the developer with a dedicated view on the event queue with all asynchronous events that happen at the remote device, and the ability to choose when the next event happens.
When the developer pushes the physical button once during debugging, they will immediately notice that EDWARD's events view suddenly contains multiple identical events for a single button press.

This information enables the developer to more easily detect the contact bouncing issue.

If the developer has not yet deduced the root cause of the bug, they could use stepping through the code in a similar way than when using the remote debugger.
However, this time, stepping through the code is fast as debugging happens locally without incurring in network communication.
Moreover, EDWARD allows debugging the program backwards.
This means that during debugging when the LED does not turn on, the developer can step back to the previous step to diagnose what exactly went wrong during the execution.
There is no need to restart the program and try to guess what the right conditions for the bug were.

