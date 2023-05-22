---
title: Latch
sidebarDepth: 0
---
# <span style="font-variant: small-caps;">Latch</span>

**<span style="font-variant: small-caps;">latch</span> (Large-scale Automated Testing on Constraint Hardware)** is a novel testing framework for running large scale unit and integration tests in constraint environments. The framework introduces a unique scripting approach that utilizes debugger-like operations to write testing scenarios.

## Why is it Challenging?

Testing is an essential part of the software development cycle.
Unfortunately, testing software on constraint devices poses the following three challenges:

1. The limited memory of constraint devices severely restricts the size of the test suites.
2. The limited processing power can greatly slow down test suites, preventing a fast feedback loop.
3. When the constraint device becomes unresponsive, it is impossible to distinguish between the test failing, or taking very long, forcing the developer to work with timeouts.
In addition, these timeouts can cause tests to become flaky, where they have unpredictable outcomes for the same code.

## The Core Idea

The core idea of <span style="font-variant: small-caps;">latch</span> is to enable programmers to script tests on a desktop machine which are *remotely* executed on the constraint device.
The main advantage is that the constraint device does not maintain the whole test suite in memory but is step-wise instructed to execute each test.

<span style="font-variant: small-caps;">Latch</span> further allows developers to mark tests as depending on other tests.
This way, <span style="font-variant: small-caps;">latch</span> can skip tests that depend on previously failing tests resulting in a fast feedback loop.

Finally, <span style="font-variant: small-caps;">latch</span> addresses the issue of timeouts and flaky tests, by including an analysis mode that provides feedback on timeouts and the flakiness of tests.

## Using <span style="font-variant: small-caps;">Latch</span> with WARDuino
