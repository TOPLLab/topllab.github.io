---
next: EDWARD
---
# Debug Protocol Reference Sheet

The debug instructions can be sent to a remote WARDuino debugger.
Debug messages are separated by newlines.

| Debug Instruction     | Code | Payload                      | Response      | Example            |
|-----------------------|:----:|------------------------------|---------------|--------------------|
| Run                   |  01  | -                            | GO!           | `01`               |
| Halt                  |  02  | -                            | -             | `02`               |
| Pause                 |  03  | -                            | PAUSE!        | `03`               |
| Step (into)           |  04  | -                            | STEP!         | `04`               |
| Add breakpoint        |  06  | Breakpoint address as LEB128 | BP [address]! | `0606561F105F0AFC` |
| Remove breakpoint     |  07  | Breakpoint address as LEB128 | BP [address]! | `0706561F105F0AFC` |
| Dump VM state         |  10  | -                            | json          | `10`               |
| Dump local variables  |  11  | -                            | json          | `11`               |
| Dump state and locals |  12  | -                            | json          | `12`               |

The following debug messages can be sent by the remote debugger at anytime when a specific event occurs.

| Event            | Notification    | Example              |
|------------------|-----------------|----------------------|
| Hit a breakpoint | AT [address]!   | `AT 0x561f105f0afc!` |

## Dump formats

The WARDuino debugger provides a variety of debug messages for inspecting different aspects of the VM's state.
These debug messages return *dumps* of information in json format.



## Additional Information

WARDuino also supports out-of-place debugging through the EDWARD debugger. A similar overview of the debug messages for EDWARD can be found in [this reference sheet](/reference/edward/protocol).

