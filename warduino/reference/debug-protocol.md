---
next: EDWARD
---
# Debug Protocol Reference Sheet

When the debugger is enabled, debug messages can be sent to a WARDuino VM  that either runs remotely on a MCU or locally as an emulator. Each debug message will be handled by the debugger present in the VM.

Each debug message should be *converted* to a *hexa string* and consists of
1. A *debug instruction* which tells the debugger which debug operation to apply.
2. A *payload* needed by the debugger to correctly apply the debug instruction. Depending on the debug instruction the payload may not be needed.
3. A newline `\n`

| Debug Instruction     | Code | Payload                      | Response      | Example            |
|-----------------------|:----:|------------------------------|---------------|--------------------|
| Run                   |  01  | -                            | GO!           | `01`               |
| Halt                  |  02  | -                            | -             | `02`               |
| Pause                 |  03  | -                            | PAUSE!        | `03`               |
| Step (into)           |  04  | -                            | STEP!         | `04`               |
| Add breakpoint        |  06  | Breakpoint address as Big Endian 32 | BP [address]! | `0606561F105F0AFC` |
| Remove breakpoint     |  07  | Breakpoint address as Big Endian 32 | BP [address]! | `0706561F105F0AFC` |
| [Inspect](#custom-dump-formats) specific state components |  09  | Number of components + their IDs | json          | `0900020104`               |
| Dump VM state         |  10  | -                            | json          | `10`               |
| Dump local variables  |  11  | -                            | json          | `11`               |
| Dump state and locals |  12  | -                            | json          | `12`               |

The following debug messages can be sent by the remote debugger at anytime when a specific event occurs.

| Event            | Notification    | Example              |
|------------------|-----------------|----------------------|
| Hit a breakpoint | AT [address]!   | `AT 345!` when a breakpoint is reached at wasm address 345. |

## Simple Dump Formats

The WARDuino debugger provides a variety of debug messages for inspecting different aspects of the VM's state.
These debug messages return *dumps* of information in json format.

The VM's state includes both Wasm state (e.g., variables, memory pages) and debugger-specific state (e.g., breakpoints).

## Custom Dump Formats

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

The *response* will be a string printing *DUMP!* followed by the JSON containing the requested state:
```
DUMP!
{"pc":7174,
 "globals":[
    {"idx":0,"type":"i32","value":0},
    {"idx":1,"type":"i32","value":1}
    ]
 }
```

## Additional Information

WARDuino also supports out-of-place debugging through the EDWARD debugger. A similar overview of the debug messages for EDWARD can be found in [this reference sheet](/reference/edward/protocol).

