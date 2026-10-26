# System Software
> Examiners look for precise operating-system vocabulary (states, scheduling, paging) and the ability to apply BNF and Reverse Polish Notation step by step.

## Key ideas

### Purposes of an operating system
- **Maximising resource use**: the OS shares the processor, memory and I/O devices between many processes so the hardware is rarely idle (multitasking, memory allocation, disk and device management).
- **Hiding complexity**: it gives users and programs a simple interface (files, windows, system calls) so they need not know about disk sectors or device registers. Device drivers translate general requests into device-specific commands.
- Other roles: security and user accounts, file management, error handling, providing a platform for application software.

### Processes, scheduling and interrupts
- A **process** is a program in execution. States: **ready** (waiting for the CPU), **running** (using the CPU), **blocked/waiting** (waiting for I/O or an event).
  - Ready to running: scheduler dispatches it. Running to ready: time slice ends or a higher-priority process arrives. Running to blocked: needs I/O. Blocked to ready: the event happens.
- Information about a process is kept in its **process control block (PCB)**: ID, state, priority, program counter, register values and memory details.
- **Scheduling routines**:
  - **Round robin**: each ready process gets a fixed time slice in turn; fair, good for interactive use.
  - **First come first served**: run in order of arrival, no pre-emption; simple but long jobs delay others.
  - **Shortest job first**: run the shortest estimated job; minimises average waiting but may starve long jobs.
  - **Shortest remaining time first**: pre-emptive form of the above.
  - **Priority scheduling**: highest-priority process runs; low priorities may starve unless priority rises with waiting time.
- **Interrupt handling**: the CPU finishes the current instruction, checks for interrupts, saves the state (registers, program counter) of the running process, the kernel identifies the source and runs the interrupt service routine (ISR), then restores the state. An interrupt is acted on only if its priority exceeds that of the current task.

### Memory management
- **Virtual memory** treats part of secondary storage as an extension of RAM so programs larger than physical memory can run.
- **Paging**: memory is divided into fixed-size **frames** and programs into equal-size **pages**. A page table maps page numbers to frames. Only needed pages are loaded; a missing page causes a **page fault** and is fetched from disk.
- **Segmentation**: memory is split into variable-size logical units (code, data, stack), each with a base and length in a segment table. Matches the program's structure but can cause external fragmentation; paging avoids this.
- **Page replacement** when no frame is free: **FIFO** (evict the oldest page), **least recently used** (evict the page unused longest), **optimal** (evict the page needed furthest ahead, a theoretical benchmark).
- **Thrashing**: when too many processes compete for memory, the system spends most of its time swapping pages rather than executing, so performance collapses. Fix: fewer processes, more RAM, better replacement policy.

### Translation
- **Interpreter**: translates and executes one statement at a time, no object code produced; errors appear as reached, development and debugging is quick, but running is slower.
- **Compiler** stages:
  1. **Lexical analysis**: removes comments and white space, turns the source into tokens, builds the symbol table.
  2. **Syntax analysis**: checks tokens against the grammar, producing a parse tree or reporting syntax errors.
  3. **Code generation**: produces object code (often via an intermediate form).
  4. **Optimisation**: improves speed or size (remove redundant code, simplify expressions).
- A **linker** combines object code and libraries; a **loader** places it in memory.

### BNF and syntax diagrams
- **Backus-Naur Form** defines syntax with rules `<symbol> ::= definition`; `|` means or; recursion lets rules repeat.

```
<digit> ::= 0|1|2|3|4|5|6|7|8|9
<integer> ::= <digit> | <integer><digit>
```

- A **syntax diagram** shows the same grammar as paths: rectangles for non-terminals, rounded shapes for terminals, loops for repetition and branches for choice.

### Reverse Polish Notation (RPN)
- Postfix: the operator follows its operands, so no brackets are needed. $(3+4)\times 2$ becomes `3 4 + 2 *`.
- **Evaluate** with a stack: push operands; on an operator pop two (the first popped is the right operand), apply it, push the result.
- **Convert** infix to postfix by using the order of operations (the shunting-yard method uses an operator stack, popping operators of higher or equal precedence).

## Key terms
| Term | Meaning |
|---|---|
| Kernel | Core of the OS controlling hardware and processes |
| Process control block | Record of a process's state and registers |
| Pre-emption | OS stops a running process before it finishes |
| Page fault | Needed page not in memory |
| Thrashing | Excessive paging that stalls useful work |
| Token | Smallest meaningful unit found by lexical analysis |
| Backus-Naur Form | Notation for defining syntax rules |

## Worked example
**Question:** (a) Define `<identifier>` in BNF as a letter followed by any number of letters or digits. (b) Evaluate the RPN expression `5 2 3 + *`. [5]

**Answer:**
- (a) `<letter> ::= a|b|...|z` and `<digit> ::= 0|...|9` (1); `<identifier> ::= <letter> | <identifier><letter> | <identifier><digit>` (2: base case and recursion).
- (b) Push 5, push 2, push 3 (stack 5,2,3). `+` pops 3 and 2, pushes 5 (stack 5,5). `*` pops 5 and 5, pushes 25. Result **25**. (2)

## Common mistakes
- Naming blocked state as "waiting for the CPU" (that is ready).
- Writing BNF with no recursion, so it can describe only one length.
- Reversing operand order for `-` and `/` when evaluating RPN.
- Saying a compiler "executes" the code; it translates it first.
- Confusing paging (fixed size, physical) with segmentation (variable size, logical).

## Exam tips
- Draw the three-state diagram with labelled transitions when asked about process states.
- In RPN questions show the stack after each token.
- Link every purpose of an OS to a resource or complexity it handles.
- For thrashing give cause and effect, not just the definition.
