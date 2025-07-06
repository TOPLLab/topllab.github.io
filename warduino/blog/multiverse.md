<script setup>
    import { data } from '../.vitepress/config.data.ts'
    import citation from '../.vitepress/components/citation.vue'
</script>

# Applications for the MIO Debugger

_Multiverse debugging was first proposed back in 2019, but now we are finally seeing real world applications.
Diverse categories of embedded software for microcontrollers can be debugged using the MIO multiverse debugger._

<span style="font-size: var(--vp-custom-block-font-size);">
<b>Tom Lauwaerts and Maarten Steevens · <a href="https://github.com/tolauwae">@tolauwae</a> <a href="https://github.com/MaartenS11">@MaartenS11</a></b><br>
November 14, 2024 | _Last updated_ 5 July, 2025 | 4 min read
</span>

***

In this blog post, we discuss the wide applicability of the [MIO multiverse debugger](/reference/mio/) in WARDuino.

## Binary Counter with LEDs

The binary counter is a simple program that uses 4 LEDs and two buttons. One button counts up and one button counts down. The LEDs show the state of 4 bit counter. The example shows how static output like LEDs are easily reversible.

The program is written in AssemblyScript using the WARDuino library, and only its digital I/O actions for manipulating digital pins. The documentation can be found [here](/reference/actions/).

## Lego Mindstorms Color Dial

The color dial is an application that uses a color sensor to make a needle on a dial point towards the color it sees. To achieve this it makes use of a Lego Mindstorms color sensor and servo motor.

## Related posts

***

