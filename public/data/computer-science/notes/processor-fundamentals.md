# Processor Fundamentals
> This topic is about what the CPU actually does; examiners want register names, exact data movements and correct assembly traces, not vague phrases like "the CPU processes it".

## Key ideas

### Von Neumann model
- Program instructions and data are stored together in main memory (the immediate access store, IAS) as binary: the stored-program concept. Instructions are fetched and executed one after another.
- ALU: arithmetic and logic operations. Control unit (CU): decodes instructions and sends control signals. Clock: sends regular pulses synchronising operations; clock speed sets cycles per second.
- Registers (fast storage inside the CPU):
  - PC: address of the next instruction.
  - MAR: address being read from or written to.
  - MDR: data just read or about to be written.
  - CIR: instruction currently being decoded/executed.
  - ACC: holds results of ALU operations.
  - IX: index register for indexed addressing.
  - Status register: flags for results (e.g. overflow, zero) and interrupts.

### Buses and ports
- Address bus: carries addresses from CPU to memory/IO (one-way). Data bus: carries data and instructions both ways. Control bus: carries commands and signals (read, write, clock, interrupt).
- Ports (e.g. USB, HDMI) connect peripherals to the system, converting between device and computer signals.

### Performance factors
- More cores allow parallel execution, but software must use them.
- Wider data bus transfers more bits per cycle; wider address bus addresses more memory.
- Higher clock speed gives more cycles per second (but more heat).
- Larger cache keeps frequently used data close to the CPU, reducing slow main-memory accesses.

### Fetch-execute cycle (register transfer notation)
```
MAR <- [PC]
PC  <- [PC] + 1
MDR <- [MAR]
CIR <- [MDR]
```
Then the instruction in CIR is decoded and executed. For a jump, PC is overwritten with the operand address.

### Interrupts
- A signal from hardware or software telling the CPU something needs attention (key press, printer ready, error, timer).
- At the end of each fetch-execute cycle the CPU checks for interrupts. If one with sufficient priority exists, the current register contents are saved (on a stack), the interrupt service routine (ISR) runs, then registers are restored and the original program resumes.

### Assembly language and assemblers
- Assembly uses mnemonics (e.g. `LDD`, `ADD`) and labels instead of binary; one assembly instruction usually maps to one machine-code instruction. An assembler translates it to machine code.
- Two-pass assembler: pass 1 builds a symbol table of labels and addresses (reads forward references); pass 2 replaces opcodes and symbols with binary and produces the object code.

### Instruction set and addressing modes
- Groups: data movement (LDM, LDD, LDI, LDX, LDR, MOV, STO), arithmetic (ADD, SUB, INC, DEC), compare (CMP, CMI), jump (JMP, JPE, JPN), I/O (IN, OUT), logic (AND, OR, XOR), shifts (LSL, LSR), and END.
- Immediate: operand is the value (`LDM #5`). Direct: operand is the address of the value (`LDD 200`). Indirect: operand is the address holding the address of the value (`LDI 200`). Indexed: address = operand + IX (`LDX 200`). Relative: address relative to the current instruction.

### Bit manipulation
- Logical shift left by $n$ multiplies an unsigned value by $2^n$; right shift divides (bits lost).
- AND with a mask tests or clears bits: `AND #&0F` keeps the low nibble.
- OR with a mask sets bits. XOR with a mask toggles bits.
- Test bit 3: AND with `00001000` then compare with zero.

## Key terms
| Term | Meaning |
|---|---|
| Program counter | Register holding the address of the next instruction to fetch. |
| MAR | Register holding the address currently being accessed in memory. |
| Interrupt | Signal causing the CPU to suspend its current task to handle an event. |
| ISR | Routine executed in response to an interrupt. |
| Opcode | Part of an instruction specifying the operation. |
| Operand | Part of an instruction giving the data or address. |
| Symbol table | Table mapping labels to memory addresses, built by the assembler. |
| Mask | Bit pattern used with AND/OR/XOR to select or change bits. |

## Worked example
**Question:** Memory address 100 holds 6 and address 101 holds 9. Trace the program and state the final contents of ACC and address 102. [4]

```pseudocode
LDD 100
ADD 101
STO 102
END
```

**Model answer:**
- `LDD 100`: ACC = 6 (1).
- `ADD 101`: ACC = 6 + 9 = 15 (1).
- `STO 102`: address 102 now holds 15 (1).
- Final ACC = 15, address 102 = 15 (1).

## Common mistakes
- Writing "the CPU fetches the instruction" without naming the registers or buses.
- Incrementing PC before copying it to MAR in the wrong order.
- Mixing up immediate (`LDM #5`) and direct (`LDD 5`) addressing.
- Saying the interrupt is checked "all the time"; it is checked at the end of the cycle.
- Forgetting that a logical right shift loses the lowest bit.

## Exam tips
- For RTN questions, write each transfer on its own line with the arrow and square brackets for "contents of".
- In traces, rewrite the register/memory values after every instruction.
- "Explain" performance questions need a reason: more cache, so fewer main-memory accesses, so faster.
- State the mask value in binary or hex when asked to set, clear or test bits.
