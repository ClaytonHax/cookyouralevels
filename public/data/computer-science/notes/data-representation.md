# Data Representation
> A2 questions test whether you can choose the right structure or file method and justify it, then do careful floating-point arithmetic; examiners reward every shown step.

## Key ideas

### User-defined data types
- Built-in types (INTEGER, REAL, STRING, BOOLEAN, CHAR) cannot always model a problem. A **user-defined type** lets the programmer describe data in the problem's own terms, which makes code easier to read, validate and maintain.
- **Non-composite** types are not built from other types:
  - **Enumerated**: a fixed list of named values, e.g. `TYPE TDay = (Mon, Tue, Wed, Thu, Fri)`. Values are ordered, so comparisons work, and invalid values are rejected.
  - **Pointer**: holds the memory address of another value, e.g. `TYPE TIntPtr = ^INTEGER`. `P^` dereferences it. Pointers underpin linked lists and trees.
- **Composite** types combine other types:
  - **Record**: named fields of different types, e.g. a student with name, age and mark.
  - **Set**: an unordered collection of distinct values of one type, with operations such as union and membership.
  - **Class**: a record that also holds methods (covered in Further Programming).

```pseudocode
TYPE TStudent
   DECLARE Name : STRING
   DECLARE Age : INTEGER
   DECLARE Mark : REAL
ENDTYPE
DECLARE Pupil : TStudent
Pupil.Name <- "Amara"
```

### File organisation and access
| Organisation | How records are stored | Access method | Typical use |
|---|---|---|---|
| Serial | In order of arrival, no sorting | Read from the start until found | Temporary or transaction logs |
| Sequential | Sorted on a key field | Read in order; can stop early once the key is passed | Master files, batch payroll |
| Random | Position decided by a hash of the key | Direct access to the calculated address | Large files needing fast lookup, e.g. bank accounts |

- Serial and sequential files are efficient for processing every record; random files are efficient for finding one.
- Adding to a sequential file means rewriting it (to keep order) or appending to a separate transaction file and merging later.

### Hashing
- A **hashing algorithm** turns a key into an address, e.g. `address = key MOD N` where N is the number of slots (often a prime).
- **Collision**: two keys give the same address. Common handling: store in the next free slot (linear probing), or use an overflow area / chaining.
- Finding a record: hash the key, read that address, and if it holds a different key follow the same collision rule until the key or an empty slot is found.
- A good hash spreads keys evenly and is quick to compute.

### Floating-point format
- A real number is stored as a **mantissa** (the significant digits, a fixed-point fraction in two's complement) and an **exponent** (a two's complement integer power of 2):

$$value = mantissa \times 2^{exponent}$$

- More **mantissa bits** give greater **precision** (smaller gaps between representable numbers). More **exponent bits** give greater **range**. With a fixed total size, one is traded for the other.
- A number is **normalised** when the mantissa starts `0.1` (positive) or `1.0` (negative), i.e. the first two bits differ. This maximises precision and gives each value a single representation.

### Conversions and normalising
- Binary to denary: read the mantissa as a fraction with the binary point after the sign bit, then multiply by $2^{exponent}$.
- Denary to binary: convert to fixed-point binary, then shift the point so the mantissa is `0.1...`, adjusting the exponent (point moves left, exponent rises).
- Negative values: write the positive mantissa, then take the two's complement.
- To normalise, shift the mantissa left until the first two bits differ and subtract the number of shifts from the exponent.

### Errors in representation
- **Approximation**: many decimals (such as 0.1) have no exact finite binary form, so they are stored approximately.
- **Rounding error**: the mantissa has limited bits, so extra digits are lost; errors can accumulate over many operations.
- **Overflow**: result too large for the exponent to represent. **Underflow**: result too small (closer to zero than the smallest representable magnitude).
- Comparing reals for exact equality is unreliable; compare within a tolerance.

## Key terms
| Term | Meaning |
|---|---|
| Enumerated type | User-defined type listing all permitted values by name |
| Pointer | Variable storing the address of another variable |
| Record | Composite type with named fields of mixed types |
| Hash function | Calculates a storage address from a key |
| Collision | Two keys hashing to the same address |
| Mantissa | Fractional part holding the significant digits |
| Exponent | Power of 2 that scales the mantissa |
| Normalised | Mantissa begins 0.1 or 1.0 for maximum precision |
| Underflow | Value too close to zero to represent |

## Worked example
**Question:** A computer stores reals with an 8-bit mantissa and 4-bit exponent, both in two's complement. (a) Represent 5.75 normalised. (b) Represent -5.75. (c) State the effect of using 10 mantissa bits and 2 exponent bits instead. [8]

**Answer:**
- (a) $5.75 = 101.11_2$. Move the point three places left: $0.1011100 \times 2^3$. Mantissa `01011100`, exponent `0011`. (1 mark each for binary, mantissa, exponent.)
- (b) Positive mantissa `0.1011100`; invert to `1.0100011`; add 1 giving `1.0100100`. Exponent stays `0011`. Mantissa starts 1.0 so it is normalised. (2 marks)
- (c) More mantissa bits increases precision (smaller gaps between numbers); fewer exponent bits reduces the range, so large or small values may overflow or underflow. (2 marks)

Check by reading back: the sign bit has weight $-1$, so `1.0100100` is $-1 + 0.28125 = -0.71875$, and $-0.71875 \times 2^3 = -5.75$. Correct.

## Common mistakes
- Forgetting that the mantissa's first bit is the sign and has negative weight in two's complement.
- Normalising a negative number so it starts `1.1` (not normalised); it must start `1.0`.
- Moving the binary point the wrong way: shifting the point left means exponent increases.
- Saying more exponent bits gives more precision (it gives range).
- Calling a hash collision an error in the file; it is expected and must be handled.

## Exam tips
- Show every step of a conversion; a wrong final bit pattern still earns method marks.
- Always check a normalised answer by converting back.
- For file questions, name the organisation and the access method, and justify with the scenario (volume, speed of single lookup, batch processing).
- Use the exact terms "precision" and "range" when comparing mantissa and exponent sizes.
