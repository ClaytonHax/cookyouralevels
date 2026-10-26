# Programming
> Paper 2 is mostly pseudocode: examiners want correct CIE syntax, sensible constructs and subroutines with clean interfaces, not language-specific quirks.

## Key ideas

### Basics: constants, variables, assignment and I/O
```pseudocode
CONSTANT VATRate <- 0.15
DECLARE Price, Total : REAL
DECLARE Name : STRING
INPUT Price
Total <- Price * (1 + VATRate)
OUTPUT "Total is ", Total
```
- Assignment uses `<-`. Constants hold fixed values; variables change. Use meaningful names and declare types. Operators: `+ - * / ^`, `DIV`, `MOD`, `&` for concatenation; comparison `= <> < > <= >=`; logic `AND OR NOT`.

### Built-in functions and library routines
- String: `LENGTH(s)`, `LEFT(s, n)`, `RIGHT(s, n)`, `MID(s, start, length)`, `UCASE(s)`, `LCASE(s)`. Conversion: `INT(x)`, `NUM_TO_STR(x)`, `STR_TO_NUM(s)`, `ASC(c)`, `CHR(n)`, `RAND()`.
- Library routines are pre-written, tested code (e.g. maths, random numbers) that save time and reduce errors.

### Selection
```pseudocode
IF Score >= 70 THEN
   Grade <- "A"
ELSE
   IF Score >= 50 THEN Grade <- "B" ELSE Grade <- "C" ENDIF
ENDIF

CASE OF Choice
   1 : CALL Add()
   2 : CALL Remove()
   OTHERWISE OUTPUT "Invalid"
ENDCASE
```
- Use CASE for one variable compared against many values; use IF for ranges and compound conditions.

### Iteration
| Loop | Use when | Checks condition |
|---|---|---|
| FOR ... NEXT | Number of repeats known | Count |
| WHILE ... ENDWHILE | Repeat while true, possibly zero times | Before |
| REPEAT ... UNTIL | Must run at least once | After |
```pseudocode
FOR i <- 1 TO 10 STEP 2
   OUTPUT i
NEXT i
WHILE Total < 100
   INPUT n
   Total <- Total + n
ENDWHILE
REPEAT
   INPUT Pin
UNTIL Pin = 1234
```

### Procedures and functions
- A procedure carries out a task and may take parameters but does not return a value; called with `CALL`. A function returns exactly one value and is used within an expression.
- Use subroutines to avoid repetition, allow reuse, ease testing and team work.
```pseudocode
PROCEDURE Greet(Name : STRING)
   OUTPUT "Hello ", Name
ENDPROCEDURE

FUNCTION Area(Length : REAL, Width : REAL) RETURNS REAL
   RETURN Length * Width
ENDFUNCTION

CALL Greet("Amy")
X <- Area(3, 4)
```
- Use a function when one value is needed; use a procedure for tasks such as displaying output or modifying several values.

### Parameters
- Parameter: the variable in the subroutine definition. Argument: the actual value passed at the call.
- By value: a copy is passed; changes inside do not affect the original. By reference: the address is passed; changes affect the caller's variable.
```pseudocode
PROCEDURE Swap(BYREF A : INTEGER, BYREF B : INTEGER)
   DECLARE T : INTEGER
   T <- A
   A <- B
   B <- T
ENDPROCEDURE
```
- Local variables exist only within a subroutine; global variables are visible everywhere (use sparingly).

### Efficient pseudocode
- Avoid repeated calculation inside loops, stop loops early once an answer is found, use appropriate loops and structures, use meaningful identifiers, remove redundant variables, and avoid unnecessary nested loops.

## Key terms
| Term | Meaning |
|---|---|
| Constant | Named value that cannot change during execution. |
| Variable | Named memory location whose value can change. |
| Procedure | Named subroutine that performs a task without returning a value. |
| Function | Named subroutine that returns a single value. |
| Parameter | Identifier in a subroutine header receiving a value. |
| By value | Parameter passing in which a copy of the value is supplied. |
| By reference | Parameter passing in which the variable's address is supplied. |
| Local variable | Variable accessible only within the subroutine in which it is declared. |

## Worked example
**Question:** Write a function `CountVowels` that takes a string and returns the number of vowels (upper or lower case). [5]

**Model answer:**
```pseudocode
FUNCTION CountVowels(S : STRING) RETURNS INTEGER
   DECLARE Count, i : INTEGER
   DECLARE Ch : CHAR
   Count <- 0
   FOR i <- 1 TO LENGTH(S)
      Ch <- UCASE(MID(S, i, 1))
      IF Ch = 'A' OR Ch = 'E' OR Ch = 'I' OR Ch = 'O' OR Ch = 'U' THEN
         Count <- Count + 1
      ENDIF
   NEXT i
   RETURN Count
ENDFUNCTION
```
- Correct header with parameter and RETURNS type (1); counter initialised (1); loop through characters using LENGTH/MID (1); case handled and vowel test (1); increment and return (1).

## Common mistakes
- Using `=` for assignment or `<-` for comparison.
- Forgetting ENDIF/ENDWHILE/NEXT, or mismatched names after NEXT.
- Calling a function as a statement instead of using its return value.
- Using a FOR loop where the number of repeats is unknown.
- Confusing parameter (definition) with argument (call).

## Exam tips
- Copy the identifiers and subroutine names given in the question exactly.
- Indent consistently; comments help but code must stand alone.
- Justify loop choice: known count (FOR), pre-condition (WHILE), post-condition (REPEAT).
- Test your answer with one normal and one boundary input before leaving it.
