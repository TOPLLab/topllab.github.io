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
| [Inspect state](#inspect-operation)         |  09  | The number of Wasm states requested as Big Endian 16 followed by each state requested                | json          | `0900020104`               |
| Dump VM state         |  10  | -                            | json          | `10`               |
| Dump local variables  |  11  | -                            | json          | `11`               |
| Dump state and locals |  12  | -                            | json          | `12`               |

The following debug messages can be sent by the remote debugger at anytime when a specific event occurs.

| Event            | Notification    | Example              |
|------------------|-----------------|----------------------|
| Hit a breakpoint | AT [address]!   | `AT 345!` when a breakpoint is reached at wasm address 345. |

## Dump formats

The WARDuino debugger provides a variety of debug messages for inspecting different aspects of the VM's state.
These debug messages return *dumps* of information in json format.

### Inspect operation

An operation that lets a tool client request state of interest.
The state is either Wasm state (e.g., global variables, memory pages, table elements) or debugger-specific state (e.g., breakpoints).
This debug message is useful for optimistation.
For instance, if a tool client is only interested in the global variables and table of a wasm.
The tool client can then make a request to only inspect that state and nothing more.

The following table lists all the possible states that can be requested:

| State Kind | Nr | Description |
|------------|--|---------------|
| Program counter | 01 | The program counter|
| Breakpoints | 02 | The breakpoints that have been set by tool clients |
| Callstack | 03 | The callstack |
| Globals | 04 | The global variables | 
| Table | 05 | The table | 
| Memory pages | 06 | The memory pages
| Branching Table | 07 | The table used for branching instructions | 
| Stack | 08 | The stack of values that results from wasm instructions such as `i32.const` |
| Callbacks | 09| The registered callbacks |
| Events | 10 | The events that still need to be handled by the Event handler system | 

#### Example
To *request* the *program counter* and *global variables* of a Wasm module. 
A tool client will generate the following debug message:

```
"0900020104\n"
```

This debug message consists of the following parts:
- `09`: the inspect debug operation code which tells the debugger that the tool client is interested in inspecting some state.
- `0002`: the number of states that the tool client wants to request. This number is provided as a Big Endian 16 and converted to hexa. In this example, we want to inspect the *program counter* and *globals* i.e., 2 states. Converted to Big Endian 16 we obtain `0002`.
- `0104`: the state numbers that correspond with the states of interest. These numbers are appended together and converted to hexa.
    - `01`: state number that corresponds with the program counter.
    - `04`: state number that corresponds with the global variables.
- The newline `\n` that marks the end of the debug message.

The *response* will be a string printing *DUMP!* followed by the JSON containing the requested state:
```
"DUMP!\n"
{"pc":7174,
 "globals":[
    {"idx":0,"type":"i32","value":0},
    {"idx":1,"type":"i32","value":1}
    ]
 }
```

## Additional Information

WARDuino also supports out-of-place debugging through the EDWARD debugger. A similar overview of the debug messages for EDWARD can be found in [this reference sheet](/reference/edward/protocol).

