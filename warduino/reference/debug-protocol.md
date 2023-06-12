---
next: EDWARD
---
# Debug Protocol Referencesheet

The debug instructions can be sent to a remote WARDuino debugger.
Debug messages are separated by newlines.

| Debug Instruction     | Code | Payload                      | Response      | Example            |
|-----------------------|:----:|------------------------------|---------------|--------------------|
| Run                   |  01  | -                            | GO!           | `01`               |
| Halt                  |  02  | -                            | -             | `02`               |
| Pause                 |  03  | -                            | PAUSE!        | `03`               |
| Step                  |  04  | -                            | STEP!         | `04`               |
| Add breakpoint        |  06  | Breakpoint address as LEB128 | BP [address]! | `0606561F105F0AFC` |
| Remove breakpoint     |  07  | Breakpoint address as LEB128 | BP [address]! | `0706561F105F0AFC` |
| Dump VM state         |  10  | -                            | json          | `10`               |
| Dump local variables  |  11  | -                            | json          | `11`               |
| Dump state and locals |  12  | -                            | json          | `12`               |

The following debug messages can be sent by the remote debugger at anytime when a specific event occurs.

| Event            | Notification    | Example              |
|------------------|-----------------|----------------------|
| Hit a breakpoint | AT [address]!   | `AT 0x561f105f0afc!` |
