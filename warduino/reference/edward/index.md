<script setup>
import citation from '../../components/citation.vue'
</script>

# EDWARD

The EDWARD debugger implements a novel debugging approach called **event-based out-of-place debugging** that allows developers to capture a remotely running program and debug it locally on their own (more powerful) machine.

<citation file="/edward.bib" url="https://doi.org/10.1145/3546918.3546920"/>

## Motivation


Debugging IoT applications is challenging due to the hardware constraints of IoT devices, making advanced techniques like recordreplay debugging impractical.
As a result, programmers often rely on manual resets or inefficient and time-consuming debugging techniques such as printf.
Although simulators can help in that regard, their applicability is limited because they fall short of accurately simulating and reproducing the runtime conditions where bugs appear.
Therefore, EDWARD aims to enable advanced debugging features that can be used with the real hardware.

