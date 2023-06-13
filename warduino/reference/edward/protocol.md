# EDWARD Protocol Reference Sheet

The EDWARD debugger adds the following debug messages to the existing remote debugger of WARDuino.

| Debug Instruction     | Code | Payload                         | Response      | Example            |
|-----------------------|:----:|---------------------------------|---------------|--------------------|
| Snapshot              |  60  | -                               | json          | `60`               |
| Load snapshot         |  62  | Response from message `60`      | done!         | `62`               |
| Proxify               |  65  | Wi-Fi SSID `\0` Wi-Fi pass `\0` | -             | `65`               |

## Additional Information

See also the core [debug protocol reference sheet](/reference/debug-protocol) for a similar overview of the other debug messages supported by WARDuino.

