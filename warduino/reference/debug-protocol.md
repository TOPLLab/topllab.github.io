---
next: EDWARD
---
<script setup>
    import { data } from '../.vitepress/config.data.ts'

    const url = "https://github.com/TOPLLab/WARDuino/releases/tag/v" + data.vm.version;
</script>
# Debug Protocol Reference Sheet

::: tip Debug protocol {{ data.vm.version }}

This page describes the debug protocol of WARDuino <a :href="url" target="_blank">version {{ data.vm.version }}</a>.

:::

The WARDuino debugger is operated through debug messages that can be sent over various channels.
Messages are resolved in order, and the debug message queue is checked before any instruction is executed in the virtual machine.

## Overview

The table below gives the full list of debug messages that can be sent to a remote WARDuino debugger.
Debug messages start with a unique code identifying the instruction, followed by an optional payload.
Messages are always ended by a newline.

| Debug Instruction                             | Code | Payload                          | Response              |      Example |
|-----------------------------------------------|:----:|----------------------------------|-----------------------|-------------:|
| Run                                           |  01  | -                                | GO!                   |         `01` |
| Halt                                          |  02  | -                                | -                     |         `02` |
| Pause                                         |  03  | -                                | PAUSE!                |         `03` |
| Step (into)                                   |  04  | -                                | STEP!                 |         `04` |
| Step (over)                                   |  05  | -                                | STEP! / AT [address]! |         `05` |
| Add [breakpoint](#breakpoints)                |  06  | Breakpoint address               | BP [address]!         |     `06d902` |
| Remove [breakpoint](#breakpoints)             |  07  | Breakpoint address               | BP [address]!         |     `07d902` |
| Continue for                                  |  08  | Instruction count (i32)          |                       |       `0801` |
| [Inspect](#inspect) specific state components |  09  | Number of components + their IDs | [json](#example)      | `0900020104` |
| Dump VM state                                 |  10  | -                                | [json](#dumps)        |         `10` |
| Dump local variables                          |  11  | -                                | [json](#dumps)        |         `11` |
| Dump state and locals                         |  12  | -                                | [json](#dumps)        |         `12` |
| Reset                                         |  13  | -                                | -                     |         `13` |

The following debug messages can be sent by the remote debugger at anytime when a specific event occurs.

| Event                             | Notification    | Example   |                                         |
|-----------------------------------|-----------------|-----------|-----------------------------------------|
| Hit a [breakpoint](#breakpoints)  | AT [address]!   | `AT 345!` | Address of next-to-execute instruction. |

##  Simple Dump Formats {#dumps}

The WARDuino debugger provides a variety of debug messages for inspecting different aspects of the VM's state.
These debug messages return *dumps* of information in JSON format.

The VM's state includes both Wasm state (e.g., variables, memory pages) and debugger-specific state (e.g., breakpoints).

## Custom Dump Formats {#inspect}

Custom dump formats can be generated with the `inspect (09)` debug message.
This is useful for minimizing data transfer sizes, by only requesting specific parts of the VM's state.


The following table lists the different components of the VM's state that can be requested separately:

| Component       | ID (hex) | Description                                |
|-----------------|:--------:|--------------------------------------------|
| Program counter |    01    | The program counter.                       |
| Breakpoints     |    02    | The active breakpoints.                    |
| Callstack       |    03    | The Wasm instruction stack.                |
| Globals         |    04    | The global variables.                      | 
| Table           |    05    | The table.                                 | 
| Memory pages    |    06    | The Wasm memory pages.                     |
| Branching Table |    07    | The table used for branching instructions. | 
| Stack           |    08    | The Wasm operand stack.                    |
| Callbacks       |    09    | The registered WARDuino callbacks.         |
| Events          |    0a    | The WARDuino event queue.                  | 

The payload of an inspect debug message starts with the number of requested components, followed immediately by the IDs of those components in no particular order.

### Example

Requesting the *program counter* and *global variables* can be done with the following debug message:

```
0900020104\n
```

This debug message consists of the following parts:
- `09`: the inspect debug operation code which tells the debugger what kind of debug message it received.
- `0002`: the number of states that the tool client wants to request. This number is a hexadecimal number encoded as Big Endian 16.
- `0104`: the IDs of the requested components.
    - `01`: ID for the program counter.
    - `04`: ID for the global variables.
- The newline `\n` that marks the end of the debug message.

The response will be "DUMP!" followed by the JSON containing the requested state, starting on the next line:
```
DUMP!
{"pc":7174,
 "globals":[
    {"idx":0,"type":"i32","value":0},
    {"idx":1,"type":"i32","value":1}
    ]
 }
```

## Stepping Behaviour

There are different methods for stepping through Wasm code:

- **step into.** Step over a single Wasm instruction and respond with `STEP!`.
- **step over.** Step over any direct of indirect call and respond with the current address `AT [address]!`, otherwise step over a single instruction and respond with `STEP!`.

## Breakpoints {#breakpoints}

Breakpoints are identified by the address of their Wasm instruction.
The addresses are LEB128 encoded when passed as arguments to debug messages; `add breakpoint (06)` and `remove breakpoint (07)`.

The address included in the *breakpoint-hit* notification, is not LEB128 encoded, but returned as a positive decimal integer.

Whenever a breakpoint is encountered the execution is paused, even when currently stepping over a call with the `step over (05)` debug message.

## Additional Information

The `Halt (02)` debug message stops the virtual machine, while the `Reset (13)` debug message reloads the current program.

## Out-of-place Debugging

WARDuino also supports out-of-place debugging through the EDWARD debugger. A similar overview of the debug messages for EDWARD can be found in [this reference sheet](/reference/edward/protocol).

