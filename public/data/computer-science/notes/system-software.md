# System Software
> Examiners want you to say what the operating system actually manages, what each utility is for, and to compare translators with clear advantages rather than "one is better".

## Key ideas

### Why an operating system is needed
- Hardware cannot be used directly by ordinary users or applications; the OS provides a platform and hides hardware complexity.
- Memory management: allocates and protects memory for each program, uses virtual memory/paging when RAM is full.
- File management: names, organises, stores, retrieves and controls access to files and folders.
- Security management: user accounts, passwords, access rights, firewalls and updates.
- Hardware management: device drivers and I/O handling, interrupts and buffering.
- Process management: schedules which process uses the CPU and for how long (multitasking), switches between processes and prevents them interfering.
- It also provides a user interface (command line, GUI, touch).

### Utility programs
- Disk formatter: prepares a disk with a file system. Disk defragmenter: rearranges fragmented files into contiguous blocks (mainly for magnetic disks) to speed access.
- Disk content analysis/repair: checks for bad sectors and errors.
- Virus checker/anti-malware: scans files and monitors for malware.
- Backup software: copies data to another location, often incrementally and on a schedule.
- File compression: reduces file size for storage or transfer.
- Disk cleanup and uninstallers: remove unneeded files and software.

### Program libraries and DLLs
- A library is a collection of pre-written, tested routines that programs can reuse (maths, graphics, networking). This saves development time and reduces errors.
- A dynamic link library (DLL) is loaded and linked at run time rather than copied into the executable. Benefits: smaller programs, many programs share one copy in memory, the library can be updated without recompiling, and only needed code is loaded. Drawback: the program fails if the DLL is missing or incompatible.

### Language translators
- Assembler: translates assembly into machine code.
- Compiler: translates the whole high-level program into object code before running. Interpreter: translates and executes one statement at a time.
- Compiler advantages: fast execution, translated code can be distributed without source, errors reported for the whole program. Disadvantages: must recompile after every change, long compile time before first test.
- Interpreter advantages: good for development (run partially, immediate feedback, easy debugging), platform independent source. Disadvantages: slower execution, translation repeated each run, source code must be shared, stops at the first error.
- Some systems compile to intermediate bytecode that is interpreted by a virtual machine.

### IDE features
- Coding: syntax highlighting, auto-completion, code templates, pretty printing/indentation, line numbers, collapsing blocks.
- Error detection: real-time syntax checking, underlining errors, diagnostics messages.
- Presentation: colour coding, formatted layout, collapsing sections.
- Debugging: single stepping, breakpoints, watch windows/variable inspection, report/trace of variable values, run-to-cursor.

## Key terms
| Term | Meaning |
|---|---|
| Operating system | Software that manages hardware and resources and provides an interface for users and applications. |
| Device driver | Software enabling the OS to communicate with a particular hardware device. |
| Utility program | Software that performs a maintenance or housekeeping task for the computer. |
| Defragmentation | Rearranging file parts so each file is stored contiguously. |
| Library | Collection of reusable pre-compiled routines. |
| DLL | Library loaded and linked when the program runs, shareable between programs. |
| Compiler | Translates the whole source program to object code before execution. |
| Interpreter | Translates and executes source code line by line. |
| Breakpoint | Marker where the debugger pauses execution. |

## Worked example
**Question:** A student is writing a program for the first time and a company is about to release finished software. Which translator would each use and why? [4]

**Model answer:**
- Student uses an interpreter (1) because the program can be run and tested a line or section at a time, with errors reported straight away (1).
- Company uses a compiler (1) because the executable runs faster without translation each time and the source code is not given to customers (1).

## Common mistakes
- Describing the OS only as "the thing that runs programs"; mark schemes need specific functions.
- Saying defragmentation speeds up SSDs.
- Saying a compiler "runs" the program line by line.
- Treating an assembler as translating high-level languages.
- Giving "easier to use" as an IDE feature without naming a feature.

## Exam tips
- For "describe the purpose of" a utility, name what it does and the benefit.
- For compiler vs interpreter, use the scenario (development vs distribution) in your reasoning.
- List OS roles using the five management areas in the syllabus and give a brief example each.
- Debugging features: name the tool (breakpoint, stepping) and say what it lets the programmer see.
