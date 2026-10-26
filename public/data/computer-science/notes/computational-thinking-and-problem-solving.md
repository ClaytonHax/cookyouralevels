# Computational thinking and Problem-solving
> This is the heart of Paper 3 and 4: write correct algorithms on standard structures in CIE pseudocode, trace them, and justify choices using time and space complexity.

## Key ideas

### Searching
- **Linear search**: check each item in turn until found or the end is reached. Works on unsorted data. Worst case $O(n)$.
- **Binary search**: only on **sorted** data. Compare with the middle item; discard the half that cannot contain the target; repeat. Worst case $O(\log n)$. Needs random access (an array), not efficient on a linked list.

```pseudocode
FUNCTION BinarySearch(Arr : ARRAY OF INTEGER, Target : INTEGER, N : INTEGER) RETURNS INTEGER
   DECLARE Low, High, Mid : INTEGER
   Low <- 1
   High <- N
   WHILE Low <= High
      Mid <- (Low + High) DIV 2
      IF Arr[Mid] = Target THEN
         RETURN Mid
      ELSE
         IF Arr[Mid] < Target THEN
            Low <- Mid + 1
         ELSE
            High <- Mid - 1
         ENDIF
      ENDIF
   ENDWHILE
   RETURN -1
ENDFUNCTION
```

### Sorting
- **Bubble sort**: repeatedly pass through the list swapping adjacent items that are out of order; after each pass the largest unsorted item has reached its place. Use a flag to stop when a pass makes no swaps. Worst $O(n^2)$, best $O(n)$ with the flag (already sorted).
- **Insertion sort**: take each item in turn and insert it into the correct position in the sorted part on its left, shifting larger items right. Worst $O(n^2)$, best $O(n)$; efficient for small or nearly sorted data.
- Performance is affected by the number of items, how ordered the data already is, and the number of comparisons and swaps.

```pseudocode
FOR i <- 2 TO N
   Value <- Arr[i]
   j <- i - 1
   WHILE j >= 1 AND Arr[j] > Value
      Arr[j + 1] <- Arr[j]
      j <- j - 1
   ENDWHILE
   Arr[j + 1] <- Value
NEXT i
```

### Abstract data types
- An **ADT** is a collection of data and the operations allowed on it, independent of implementation.
- **Stack** (LIFO): `push`, `pop`, with a top pointer. Check for overflow (full) and underflow (empty). Uses: undo, recursion, expression evaluation.
- **Queue** (FIFO): `enqueue` at the rear, `dequeue` from the front. A circular array reuses freed space.
- **Linked list**: nodes hold data and a pointer to the next node, with a start pointer and a free-list. Insert/delete by changing pointers, no shifting.
- **Binary tree**: each node has a left and right pointer; left subtree holds smaller values, right larger. Insert/find: compare, go left or right until null. In-order traversal outputs sorted data.

```pseudocode
PROCEDURE Push(Item : INTEGER)
   IF TopPtr = MaxSize THEN
      OUTPUT "Stack full"
   ELSE
      TopPtr <- TopPtr + 1
      Stack[TopPtr] <- Item
   ENDIF
ENDPROCEDURE
```

- **Graph**: nodes and edges, stored as an adjacency matrix (fast edge lookup, wastes space if sparse) or adjacency list (compact for sparse graphs).
- **Dictionary**: key-value pairs with fast lookup by key, often built on a hash table, or on arrays of keys and values.
- ADTs can be built from other types: a stack or queue from an array or linked list; a dictionary from arrays.

### Big O and complexity
- **Big O** describes how time or memory grows with input size $n$ in the worst case, ignoring constants.

| Notation | Name | Example |
|---|---|---|
| $O(1)$ | Constant | Array access by index |
| $O(\log n)$ | Logarithmic | Binary search |
| $O(n)$ | Linear | Linear search |
| $O(n^2)$ | Polynomial | Bubble/insertion sort |
| $O(2^n)$ | Exponential | Trying every subset |

### Recursion
- A **recursive** subroutine calls itself. It needs a **base case** (stops the recursion) and a **general case** that moves towards the base case.
- The compiler uses the **call stack**: each call pushes a stack frame holding parameters, local variables and the return address; on return the frame is popped.
- Benefits: short, natural for trees and divide-and-conquer. Drawbacks: memory use per call, risk of stack overflow, often slower than iteration. Prefer it when the problem is naturally recursive and depth is limited.

```pseudocode
FUNCTION Factorial(N : INTEGER) RETURNS INTEGER
   IF N = 0 THEN
      RETURN 1
   ELSE
      RETURN N * Factorial(N - 1)
   ENDIF
ENDFUNCTION
```

## Key terms
| Term | Meaning |
|---|---|
| Binary search | Repeatedly halves a sorted list |
| LIFO / FIFO | Last/first in, first out |
| Pointer | Reference to the next node or location |
| Base case | Condition that ends recursion |
| Stack frame | Saved call data for one recursive call |
| Big O | Upper bound on growth rate of time or space |

## Worked example
**Question:** The sorted array holds 3, 8, 12, 15, 21, 27, 30 (indices 1 to 7). Trace a binary search for 27 and state the complexity. [5]

**Answer:**
- Low=1, High=7: Mid=4, value 15 < 27, so Low=5. (1)
- Low=5, High=7: Mid=6, value 27 = target. (1)
- Found at index 6 after two comparisons. (1)
- Each step halves the search area, so worst case $O(\log n)$. (1)
- Data must already be sorted; linear search would need six comparisons. (1)

## Common mistakes
- Using binary search on unsorted data.
- Off-by-one errors with `Mid` and `Low`/`High` (forgetting the +1 or -1, causing infinite loops).
- Not checking for stack overflow/underflow or empty queue before removing.
- Recursion with no base case, or one never reached.
- Saying Big O is the exact running time rather than the growth rate.

## Exam tips
- Trace with a table showing variables at each step.
- Use CIE pseudocode keywords exactly (`<-`, `ENDWHILE`, `DIV`).
- Handle the "empty" and "full" cases in every ADT algorithm.
- When comparing algorithms state both time and space and the case (best, worst).
