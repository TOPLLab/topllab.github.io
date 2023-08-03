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



## Additional Information

WARDuino also supports out-of-place debugging through the EDWARD debugger. A similar overview of the debug messages for EDWARD can be found in [this reference sheet](/reference/edward/protocol).

