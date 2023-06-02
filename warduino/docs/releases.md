# Release Notes

::: tip Archives
You can find the archives for each of the releases on [GitHub](https://github.com/TOPLLab/WARDuino/releases).
:::

## Version 0.3.2

### :ambulance: Hotfixes

- Add recompile option to fix [#182](https://github.com/TOPLLab/WARDuino/issues/182)

## Version 0.3.1

### :ambulance: Hotfixes

- Restore callbackmapping synchronization for [EDWARD](/docs/edward)

### :construction_worker: CI

- Use `v5.0.2` in idf compilation action

## Version 0.3.0

### :boom: Breaking Changes

+ Arduino: no longer paused by default
+ Arduino: new required `make` argument `BINARY` for wasm file
+ Deprecate and remove built-in spectests (cpp version)
+ Removed options from cli related to deprecated built-in spectests

### :rocket: New Features

+ Add debug message for updating globals
+ Add debug message for updating stack values

### :sparkles: Changes

+ Remove unnecessary files from `platforms/Arduino` folder
+ Use `bin` folder for staging of Arduino
+ Rename WOODDUMP to snapshot
+ Support `.config` file in Arduino staging and use templating

### :bug: Bug Fixes

+ Enable cpp exceptions in IDF config of examples (fixes [#156](https://github.com/TOPLLab/WARDuino/issues/156))
+ Fix deserialisation of float results in proxy call
+ Open communication channel in Proxy Supervisor
+ Add missing newline in "pushed event" notification
+ Guard blocks are returned correctly by introspection messages

### :rotating_light: Testing

+ Add [Latch](/latch/) test framework :fireworks:
+ Add test suites for: remote debugger, primitives
+ Refactor Wasm spec tests to [Latch](/latch/)

### :racehorse: Performance

+ Remove busy loop during paused state (busy loop is kept for `proxy halt` state)
+ Fix memory leaks of guard blocks

### :construction_worker: CI

+ Add VM unit tests to CI

## Version 0.2.3

### :sparkles: Changes

+ Add invoke functionality
+ Add reset instruction

### :bug: Bug Fixes

+ Improve stability of the UPDATEModule instruction
+ Run more spec tests

### :hammer:  Refactor code

+ Change formatting of FATAL messages when not debugging
+ Clean up examples

