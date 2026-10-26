# Hardware and Virtual Machines
> Expect a mix of descriptive comparisons (RISC/CISC, parallel architectures, virtual machines) and precise logic work (truth tables, adders, flip-flops, simplification) where method must be shown.

## Key ideas

### RISC and CISC
| Feature | RISC | CISC |
|---|---|---|
| Instruction set | Small, simple | Large, complex |
| Instruction length | Fixed | Variable |
| Cycles | Usually one per instruction | Often several |
| Addressing modes | Few | Many |
| Registers | Many | Fewer |
| Code size | Larger programs | Smaller programs |
| Pipelining | Easy, as instructions are uniform | Harder |
| Control unit | Hard-wired, simple | Often microcoded |

- **Pipelining** overlaps the stages of consecutive instructions (fetch, decode, execute, write back) so one instruction completes each cycle once the pipeline is full. Throughput rises, though each instruction's latency does not fall.
- **Hazards**: a branch or jump means the instructions already fetched may be wrong and must be flushed; data dependencies between instructions can force a stall.
- **Interrupts in a pipeline**: when an interrupt arrives, the pipeline's contents must be handled so they are not lost. Typically the current instruction completes (or is discarded), the pipeline is flushed, register state is saved, the ISR runs, then state is restored and the interrupted instruction restarts.

### Parallel processing
| Class | Instruction streams | Data streams | Example |
|---|---|---|---|
| SISD | Single | Single | Traditional single-core processor |
| SIMD | Single | Multiple | GPU, array processor applying one operation to many values |
| MISD | Multiple | Single | Rare; fault-tolerant systems |
| MIMD | Multiple | Multiple | Multi-core CPUs, clusters |

- **Massively parallel computers** link very large numbers of processors, each with its own memory, working on parts of a problem at once (e.g. weather modelling). They suit tasks that split into independent parts; gains are limited by sequential portions and communication overhead.

### Virtual machines
- A **virtual machine (VM)** is software that emulates a computer, so one physical host can run several guest operating systems.
- Benefits: guests are isolated (safer testing, malware containment), old software can run on emulated old hardware, easy to copy or restore, better use of one powerful machine, and programs run on any platform with the VM (e.g. Java bytecode).
- Limits: slower than native running because of the extra layer; the host's resources are shared and a host failure takes down all guests; licensing and set-up cost.

### Logic circuits and adders
- A **half adder** adds two bits: $S = A \oplus B$, $C = A \cdot B$.
- A **full adder** adds two bits and a carry-in:

| A | B | Cin | S | Cout |
|---|---|---|---|---|
| 0 | 0 | 0 | 0 | 0 |
| 0 | 0 | 1 | 1 | 0 |
| 0 | 1 | 0 | 1 | 0 |
| 0 | 1 | 1 | 0 | 1 |
| 1 | 0 | 0 | 1 | 0 |
| 1 | 0 | 1 | 0 | 1 |
| 1 | 1 | 0 | 0 | 1 |
| 1 | 1 | 1 | 1 | 1 |

$S = A \oplus B \oplus C_{in}$, $C_{out} = A\cdot B + C_{in}\cdot(A \oplus B)$. A full adder is two half adders plus an OR gate; chaining full adders gives a multi-bit adder.

### Flip-flops
- A **flip-flop** is a circuit with two stable states that stores one bit; it is the basis of registers and static RAM.
- **SR flip-flop** (two cross-coupled NOR or NAND gates): S=1,R=0 sets Q to 1; S=0,R=1 resets Q to 0; S=R=0 holds the value; S=R=1 is invalid (undefined result).
- **JK flip-flop** removes the invalid state, adds a clock: J=1,K=0 sets; J=0,K=1 resets; J=K=0 holds; J=K=1 toggles Q.

### Boolean algebra and Karnaugh maps
- Key laws: $A+0=A$, $A\cdot1=A$, $A+\bar A=1$, $A\cdot\bar A=0$, $A+AB=A$, distributive, commutative and associative laws.
- **De Morgan:** $\overline{A\cdot B}=\bar A+\bar B$ and $\overline{A+B}=\bar A\cdot\bar B$.
- **Karnaugh map**: arrange the truth table in a grid with Gray-code order (only one variable changes between adjacent cells). Group 1s in rectangles of size 1, 2, 4, 8 or 16 (powers of 2), as large as possible, grids wrap around the edges, groups may overlap. Each group gives one product term containing only the variables that stay constant in the group.

## Key terms
| Term | Meaning |
|---|---|
| Pipelining | Overlapping fetch-decode-execute of successive instructions |
| SIMD | One instruction applied to many data items simultaneously |
| Virtual machine | Software emulation of a complete computer |
| Half adder | Adds two bits, giving sum and carry |
| Flip-flop | Bistable circuit storing one bit |
| Gray code | Sequence where adjacent values differ by one bit |

## Worked example
**Question:** A circuit has output $X = 1$ for inputs ABC = 001, 011, 101, 110, 111. Use a Karnaugh map to find a simplified expression. [4]

**Answer:** Map (rows A, columns BC in Gray order):

| A \ BC | 00 | 01 | 11 | 10 |
|---|---|---|---|---|
| 0 | 0 | 1 | 1 | 0 |
| 1 | 0 | 1 | 1 | 1 |

- Group of four in columns 01 and 11 (all rows): C is always 1. Term: $C$. (1)
- Group of two in row A=1, columns 11 and 10: A=1 and B=1 constant. Term: $A\cdot B$. (1)
- Both groups are as large as possible. (1)
- $X = C + A\cdot B$. (1)

## Common mistakes
- Writing Karnaugh map columns in binary order (00, 01, 10, 11) instead of Gray order.
- Using groups of 3 or 6, or failing to use wrap-around groups.
- Calling pipelining "running instructions at the same time" without saying different stages of different instructions.
- Treating S=R=1 on an SR flip-flop as valid.
- Applying De Morgan but forgetting to change AND to OR.

## Exam tips
- Complete the truth table before any simplification; carry-in and carry-out columns are easy marks.
- When asked to compare RISC and CISC, write a pair for each feature ("RISC fixed length, CISC variable").
- Name the architecture class and give an example for SIMD and MIMD questions.
- For VMs always give both a benefit and a limit if the question says "evaluate" or "discuss".
