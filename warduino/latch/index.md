---
title: Latch
sidebarDepth: 0
---
# <span style="font-variant: small-caps;">Latch</span>

**<span style="font-variant: small-caps;">Latch</span> (Large-scale Automated Testing on Constrained Hardware)** is a novel testing framework for running large scale unit and integration tests in constrained environments. The framework introduces a unique scripting approach that utilizes debugger-like operations to write testing scenarios.

## Why is it Challenging?

Testing is an essential part of the software development cycle.
Unfortunately, testing software on constrained devices poses the following three challenges:

1. The limited memory of constrained devices severely restricts the size of the test suites.
2. The limited processing power can greatly slow down test suites, preventing a fast feedback loop.
3. When the constrained device becomes unresponsive, it is impossible to distinguish between the test failing, or taking very long, forcing the developer to work with timeouts.
In addition, these timeouts can cause tests to become flaky, where they have unpredictable outcomes for the same code.

## How to Solve it?

The core idea of <span style="font-variant: small-caps;">latch</span> is to enable programmers to script tests on a desktop machine which are *remotely* executed on the constrained device.
The main advantage is that the constrained device does not maintain the whole test suite in memory but is step-wise instructed to execute each test.

<span style="font-variant: small-caps;">Latch</span> further allows developers to mark tests as depending on other tests.
This way, <span style="font-variant: small-caps;">latch</span> can skip tests that depend on previously failing tests resulting in a fast feedback loop.

Finally, <span style="font-variant: small-caps;">latch</span> addresses the issue of timeouts and flaky tests, by including an analysis mode that provides feedback on timeouts and the flakiness of tests.

## Testing WARDuino

We started designing the <span style="font-variant: small-caps;">latch</span> framework because there were no testing frameworks that met the requirements we needed to fully test WARDuino. Specifically, there was no testing framework that could help us execute large test suites such as the [official WebAssembly specification tests](https://github.com/WebAssembly/testsuite) on microcontrollers. Neither was there a framework that could easily test the debugger functionality.

During developement, we found that the framework implements a few novel testing concepts, and solves some interesting problems that have not been previously explored. They are:


1. Remote testing that allows for arbitrarily large test suites to be run in constrained environments.
2. Debugging-like scripting of test scenarios.

We use the framework to test three core aspects of WARDuino:

1. The virtual machine folllows the WebAssembly specication.
2. The debugger implements the [API](/reference/debugger)  correctly.
3. The [built-in modules](/reference/primitives) work correctly.

The test suites written in <span style="font-variant: small-caps;">latch</span> can be found in the [GitHub repository](https://github.com/TOPLLab/WARDuino/tree/main/tests/latch).

