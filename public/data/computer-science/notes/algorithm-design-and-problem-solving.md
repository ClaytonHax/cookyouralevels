# Algorithm Design and Problem-solving
> Examiners want you to show you can plan before coding: decompose, abstract, then express a clear algorithm in any of three forms and convert between them.

## Key ideas

### Abstraction
- Abstraction removes unnecessary detail so that only the features relevant to the problem are kept. An abstract model of a system (e.g. a tube map showing only stations and links) is simpler to design, analyse and program.
- Example: modelling a school timetable needs periods, rooms and teachers, but not teachers' hair colour.

### Decomposition
- Breaking a large problem into smaller sub-problems (modules), each solved separately and then combined.
- Benefits: easier to understand and test, different programmers can work in parallel, modules are reusable, maintenance is simpler.

### Algorithms and identifier tables
- An algorithm is an ordered set of steps that solves a problem and terminates.
- Identifier table: lists each variable, constant or array with its data type and a description of its purpose, planned before writing the code.

| Identifier | Data type | Description |
|---|---|---|
| Total | REAL | Running sum of marks |
| Count | INTEGER | Number of marks entered |
| Marks | ARRAY[1:30] OF INTEGER | Student marks |

### Sequence, selection, iteration
- Sequence: statements run in order. Selection: IF/CASE chooses a path based on a condition. Iteration: repeating steps (FOR, WHILE, REPEAT).
- Every program stage follows input, process, output.

```pseudocode
DECLARE Total, Mark, Average : REAL
DECLARE Count : INTEGER
Total <- 0
FOR Count <- 1 TO 30
   OUTPUT "Enter mark"
   INPUT Mark
   Total <- Total + Mark
NEXT Count
Average <- Total / 30
OUTPUT "Average = ", Average
```

### Structured English, flowcharts and pseudocode
- Structured English: plain English with keywords like IF, THEN, REPEAT, UNTIL, kept brief and unambiguous.
- Flowchart symbols: oval (start/stop), parallelogram (input/output), rectangle (process), diamond (decision with Yes/No branches), arrows for flow, rectangle with double sides for a subroutine call.
- Pseudocode: structured, language-neutral code (CIE style).
- Converting: each decision diamond becomes IF/WHILE; a loop-back arrow becomes iteration; each parallelogram becomes INPUT/OUTPUT.

### Stepwise refinement and logic statements
- Stepwise refinement: start with a general top-level outline and repeatedly break each step into more detail until each step can be coded.
- Logic statements (combined with AND/OR/NOT) define conditions, e.g. `IF (Age >= 18) AND (HasLicence = TRUE) THEN`.
- Use brackets to avoid ambiguity, and De Morgan's laws ($\neg(A \land B) = \neg A \lor \neg B$) to simplify conditions.

## Key terms
| Term | Meaning |
|---|---|
| Abstraction | Removing unnecessary detail to focus on what is essential. |
| Decomposition | Breaking a problem into smaller, manageable parts. |
| Algorithm | Step-by-step set of instructions solving a problem in finite time. |
| Identifier table | List of identifiers with data types and purposes. |
| Pseudocode | Informal, structured, language-independent code notation. |
| Stepwise refinement | Repeatedly breaking steps into finer detail. |
| Module | Self-contained part of a program that does one task. |

## Worked example
**Question:** Describe, using structured English, an algorithm that reads numbers until -1 is entered and outputs how many were positive. [4]

**Model answer:**
```
SET count TO 0
INPUT number
WHILE number is not -1
    IF number > 0 THEN add 1 to count
    INPUT number
ENDWHILE
OUTPUT count
```
- Initialise counter (1); read before loop (1); loop with correct termination test (1); selection and update inside, output after (1).

## Common mistakes
- Treating abstraction as "hiding code" rather than removing irrelevant detail.
- Missing the initial value of counters or totals.
- Putting INPUT only before the loop and forgetting the next input inside it.
- Using the wrong flowchart symbols or leaving decision outputs unlabelled.
- Writing an algorithm in a programming language syntax when pseudocode was asked for.

## Exam tips
- Use meaningful identifier names and declare their types.
- Indent all loops and selections; mark schemes often assess structure.
- When asked to "explain how decomposition helps", name two concrete benefits.
- Trace your algorithm with a small sample input before moving on.
