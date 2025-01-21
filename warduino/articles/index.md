<script setup>
import citation from '../.vitepress/components/citation.vue'
</script>

# Published Articles

## Latch (2024)

<citation file="/latch.bib" url= "https://doi.org/10.1016/j.scico.2024.103157" />

A test framework, Latch, for large-scale automated testing on constrained hardware, built on a test specification language utilizing the WARDuino debug operations.

[-> technical reference](/guide/latch.html)

## WARDuino 2.0 (2024)

<citation file="/cola.bib" url= "https://doi.org/10.1016/j.cola.2024.101268" />

The updated WARDuino virtual machine, has an extended debugger API, support for asynchronous callbacks, networking primitives, improved testing, and wider platform support. This paper represent the research side of the new version, and gives the first comprehensive overview of the virtual machine.

[-> technical reference](/reference/architecture.html)

## EDWARD (2022)

<citation file="/edward.bib" url="https://doi.org/10.1145/3546918.3546920"/>

EDWARD is the novel <i>out-of-place</i> debugger for WARDuino, developed to simplify debugging concurrent programs. The EDWARD debugger allows developers to debug programs largely on their own laptop—thereby enabling more advanced debugging techniques—while using a remote microcontroller as a zombie that can still provide realtime peripheral data. Asynchronous events on the remote zombie are captured by the local debugger, and a new set of debugging instructions give developers control over the timings of the events. 

[-> technical reference](/reference/edward/)

<a href="https://tolauwae.github.io/mplr22/" target="_blank">-&gt; conference slides <span class="icon material-symbols-rounded">open_in_new</span></a>

## WARDuino (2019)

<citation file="/warduino.bib" url="https://doi.org/10.1145/3357390.3361029" />

WARDuino was the first WebAssembly virtual machine to target microcontrollers, such as the ESP32s, and included a remote debugger and support for partial over-the-air reprogramming of the devices.

[-> technical reference](/reference/architecture.html)

<style>
@import "https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200";

span.icon {
    font-size: inherit;
    font-weight: inherit;
    vertical-align: text-top;
}
</style>
