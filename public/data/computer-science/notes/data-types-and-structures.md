# Data Types and Structures
> This topic produces long pseudocode questions: choosing the right data type, handling arrays and files, and maintaining stacks, queues and linked lists without breaking pointers.

## Key ideas

### Data types and records
- Basic types: INTEGER, REAL, CHAR, STRING, BOOLEAN, DATE. Choose by values and operations: ages are INTEGER, prices REAL, a yes/no flag BOOLEAN, a phone number STRING (leading zeros, no arithmetic).
- A record groups fields of different types under one name.
```pseudocode
TYPE TStudent
   DECLARE StudentID : INTEGER
   DECLARE Name : STRING
   DECLARE Mark : REAL
ENDTYPE
DECLARE Pupil : TStudent
Pupil.Name <- "Amy"
```

### Arrays
- An array stores items of the same type under one identifier, accessed by index.
```pseudocode
DECLARE Marks : ARRAY[1:30] OF INTEGER
DECLARE Grid : ARRAY[1:3, 1:4] OF CHAR
Marks[5] <- 72
Grid[2, 3] <- 'X'
```
- Lower and upper bounds define the valid indexes; going outside them causes an error. A 2D array has rows and columns; nested loops traverse it.

**Linear search**
```pseudocode
Found <- FALSE
Index <- 1
WHILE Index <= 30 AND Found = FALSE
   IF Marks[Index] = Target THEN
      Found <- TRUE
   ELSE
      Index <- Index + 1
   ENDIF
ENDWHILE
```

**Bubble sort (ascending)**
```pseudocode
FOR Pass <- 1 TO 29
   FOR J <- 1 TO 30 - Pass
      IF Marks[J] > Marks[J + 1] THEN
         Temp <- Marks[J]
         Marks[J] <- Marks[J + 1]
         Marks[J + 1] <- Temp
      ENDIF
   NEXT J
NEXT Pass
```
A flag can end early if a pass makes no swaps.

### Text files
- Files are needed to keep data after the program ends (RAM is volatile) and to share data between programs.
```pseudocode
OPEN "scores.txt" FOR WRITE
WRITEFILE "scores.txt", "Amy,72"
CLOSEFILE "scores.txt"

OPEN "scores.txt" FOR READ
WHILE NOT EOF("scores.txt")
   READFILE "scores.txt", Line
   OUTPUT Line
ENDWHILE
CLOSEFILE "scores.txt"
```
- Modes: READ, WRITE (replaces content), APPEND (adds at the end). Always close files.

### Abstract data types
- An ADT is a collection of data with defined operations, independent of how it is implemented.
- Stack: LIFO; operations push (add to top) and pop (remove from top); uses include undo, function call return addresses, expression evaluation.
- Queue: FIFO; enqueue at the rear, dequeue from the front; uses include print queues and buffers.
- Linked list: nodes holding data and a pointer to the next node; dynamic size, easy insert/delete without shifting; but no direct access by index.

### Operations
- Stack push: if TopPointer < max then TopPointer + 1 and store; else report full. Pop: if TopPointer > 0, read item and decrement; else empty.
- Queue enqueue: if not full, store at rear and move pointer (wrap around in a circular queue); dequeue: take from front and advance pointer.
- Linked list insert: store the new node in a free position, set its pointer to the next node, update the previous node's pointer. Delete: change the previous node's pointer to skip the removed node and return the node to the free list.

### Implementation using arrays
- Stack: array plus TopPointer.
- Queue: array plus FrontPointer, RearPointer and item count (circular).
- Linked list: two parallel arrays (or an array of records) for data and next-pointer, plus a StartPointer and a FreeListPointer.
```pseudocode
DECLARE Data : ARRAY[1:10] OF STRING
DECLARE Next : ARRAY[1:10] OF INTEGER
DECLARE StartPointer, FreePointer : INTEGER
```
A pointer value of 0 (or -1) marks the end of the list.

## Key terms
| Term | Meaning |
|---|---|
| Record | Data structure holding related fields of possibly different types. |
| Array | Fixed set of same-type items accessed by index. |
| Bound | Lowest or highest valid index of an array. |
| ADT | Data collection and operations defined independently of implementation. |
| Stack | LIFO structure with push and pop. |
| Queue | FIFO structure with enqueue and dequeue. |
| Pointer | Value giving the position of another item. |
| EOF | Condition showing no more data in a file. |

## Worked example
**Question:** A stack in array `Stack[1:5]` with `TopPointer = 3` holds 8, 2, 9. Write pseudocode for a pop and state the results of pop then push 4. [5]

**Model answer:**
```pseudocode
IF TopPointer = 0 THEN
   OUTPUT "Stack empty"
ELSE
   Item <- Stack[TopPointer]
   TopPointer <- TopPointer - 1
ENDIF
```
- Empty test (1), read item at top (1), decrement pointer (1).
- Pop returns 9, TopPointer = 2 (1).
- Push 4: TopPointer = 3, Stack[3] = 4 (1).

## Common mistakes
- Forgetting to test for full/empty before push/pop.
- Using `Marks[0]` when bounds start at 1.
- Updating the wrong pointer first when inserting into a linked list, losing the rest of the list.
- Opening a file for WRITE when APPEND was meant, erasing its content.
- Off-by-one in bubble sort inner loop limits.

## Exam tips
- State array bounds and data types in declarations.
- Draw a quick diagram of pointers before writing linked-list code.
- Describe a stack/queue by order (LIFO/FIFO) and give one real use.
- Trace sort/search code with a small array, writing the array after each pass.
