# Hardware
> Examiners want you to explain how a device works step by step, compare memory types with reasons, and draw or evaluate logic circuits with correct truth tables.

## Key ideas

### Input, output, storage and buffers
- Input devices turn real-world data into digital form; output devices turn processed data into a human-usable form.
- Primary storage (RAM, ROM, cache) is directly accessible by the CPU and fast; secondary storage (HDD, SSD, optical) is non-volatile, larger and slower, and holds programs and data when power is off.
- A buffer is a temporary area of memory holding data while it moves between two parts running at different speeds (e.g. print data waiting for the printer), so the processor is free to do other work.

### Embedded systems
- A computer system built into a larger device to perform a dedicated function (washing machine, car engine controller, thermostat).
- Advantages: cheap, small, low power, reliable, designed for one task. Disadvantages: hard to upgrade or reprogram, limited interface/processing, difficult to repair, may be hard to debug.

### How devices work
- Laser printer: laser draws an image on a charged drum; toner sticks to charged areas; transferred to paper and fused by heat. Inkjet: droplets fired from nozzles by heating or piezoelectric crystals.
- 3D printer: builds an object layer by layer from a digital model.
- Microphone: sound waves move a diaphragm, producing a varying electrical signal, then converted by an ADC. Speaker: DAC converts digital to analogue; the signal drives a coil and magnet that moves a cone to make sound waves.
- Magnetic disk: platters coated in magnetic material, read/write heads detect or set magnetic polarity.
- Flash/SSD: floating-gate transistors trap charge to store bits; no moving parts, fast and durable.
- Optical drive: laser reflects off pits and lands on the disc surface; the reflection pattern gives the binary data.
- Capacitive touchscreen: a finger changes the electric field at that point; resistive uses pressure to connect two layers; infrared uses a grid of beams broken by touch.
- VR headset: screens in front of each eye, lenses, motion sensors track head movement and update the image; controllers provide input.

### Memory types
| | RAM | ROM |
|---|---|---|
| Volatile? | Yes | No |
| Use | Current programs/data | Bootstrap/firmware |
| Writable | Read/write | Read only |

- DRAM: capacitors needing constant refresh; cheap, dense; used for main memory. SRAM: flip-flops, no refresh; faster, more expensive; used for cache.
- PROM: programmed once after manufacture. EPROM: erased with UV light and reprogrammed. EEPROM: erased electrically in place and reprogrammed.

### Monitoring and control
- Monitoring systems only collect and display data (e.g. patient heart rate); they do not change the process.
- Control systems use data to change the process: sensors measure (temperature, light, pressure), an ADC converts signals, the processor compares readings with stored values, and actuators (motors, heaters, valves) respond.
- Feedback: output of the system affects the input so conditions stay stable, e.g. heater switches off when target temperature reached.

### Logic gates
| Gate | Output is 1 when |
|---|---|
| NOT | input is 0 |
| AND | both inputs 1 |
| OR | at least one input 1 |
| NAND | not (both 1) |
| NOR | both inputs 0 |
| XOR | inputs differ |

Truth table for A, B (00, 01, 10, 11): AND = 0001, OR = 0111, NAND = 1110, NOR = 1000, XOR = 0110.

### Circuits, expressions and truth tables
- Convert a statement to an expression, then draw: "alarm sounds if the door is open AND (it is night OR the system is armed)" gives $X = D \cdot (N + A)$.
- To derive a table from a circuit, label intermediate points and evaluate each gate for all $2^n$ input combinations.
- To go from a truth table to an expression, write an AND term for each row with output 1 and OR them (sum of products).

## Key terms
| Term | Meaning |
|---|---|
| Buffer | Temporary storage compensating for speed differences between devices. |
| Volatile | Contents are lost when power is removed. |
| Embedded system | Computer built into a device for a specific task. |
| Sensor | Device measuring a physical quantity and giving a signal. |
| Actuator | Device that causes physical action in response to a control signal. |
| Feedback | Output used to adjust the input to maintain a desired state. |
| Truth table | Table of all input combinations and the resulting output. |

## Worked example
**Question:** A greenhouse system opens a vent (V = 1) when the temperature is high (T = 1) and the window sensor shows the vent is closed (C = 1), or when manual override (M = 1) is pressed. Write the expression and complete a truth table row for T = 1, C = 0, M = 1. [4]

**Model answer:**
- $V = (T \text{ AND } C) \text{ OR } M$ (2: AND part, OR with M).
- For T = 1, C = 0, M = 1: T AND C = 0; 0 OR 1 = 1, so V = 1 (1).
- The temperature sensor sends data via an ADC, the processor compares, and the actuator (motor) opens the vent; as temperature falls the sensor feedback stops it (1).

## Common mistakes
- Saying ROM is "read only memory so it can't ever change" (PROM/EEPROM can be programmed).
- Confusing DRAM and SRAM: SRAM is the faster one used for cache.
- Saying a control system "monitors" only; it also acts.
- Reversing NAND and NOR outputs, or treating XOR as OR.
- Leaving out inversion bubbles or mislabelling inputs on circuit diagrams.

## Exam tips
- Always list inputs in binary counting order in truth tables to avoid missing rows.
- For "describe how X works", give 4-5 ordered steps using key words from the mark scheme (laser, charge, diaphragm).
- Check that expressions use the correct operator for each gate and brackets are consistent.
- For embedded systems, answers must refer to a specific dedicated purpose.
