# Further Programming
> Paper 4 rewards working code in the paradigm asked for, using the correct terminology; learn the standard patterns for classes, files, exceptions and Prolog-style rules.

## Key ideas

### Programming paradigms
- A **paradigm** is a style or approach to programming, with its own concepts and structure.
  - **Imperative (procedural)**: sequences of statements that change state, organised in procedures and functions.
  - **Object-oriented**: programs built from objects that combine data and methods.
  - **Declarative**: state facts and rules and let the system find answers (logic programming).
  - **Low-level**: assembly language, instructions tied to a particular processor.

### Low-level programming
- Assembly instructions operate on registers and memory using **addressing modes**:
  - **Immediate**: the operand is the value itself, e.g. `LDM #5`.
  - **Direct**: the operand is the address of the value, e.g. `LDD 100`.
  - **Indirect**: the operand's address holds the address of the value, e.g. `LDI 100`.
  - **Indexed**: effective address = operand + contents of the index register, e.g. `LDX 100`, useful for arrays.
  - **Relative**: address is an offset from the current instruction (used in jumps).
- Procedures in imperative code use parameters (by value or by reference), local variables and return values.

### Object-oriented programming
- A **class** is a blueprint defining attributes and methods; an **object** is an instance. A **constructor** initialises an object.
- **Encapsulation**: attributes are `PRIVATE` and accessed through public methods (getters/setters), protecting data integrity.
- **Inheritance**: a subclass takes the attributes and methods of a superclass and may add or override them, promoting reuse.
- **Polymorphism**: the same method name behaves differently depending on the object's class (overriding); a call through a superclass type runs the subclass version.

```pseudocode
CLASS Animal
   PRIVATE Name : STRING
   PUBLIC PROCEDURE NEW(N : STRING)
      Name <- N
   ENDPROCEDURE
   PUBLIC FUNCTION Speak() RETURNS STRING
      RETURN "..."
   ENDFUNCTION
ENDCLASS

CLASS Dog INHERITS Animal
   PUBLIC FUNCTION Speak() RETURNS STRING
      RETURN "Woof"
   ENDFUNCTION
ENDCLASS
```

Python: `class Dog(Animal):` with `def speak(self):`; Java: `class Dog extends Animal` with `@Override`.

### Declarative programming
- Logic programs hold **facts** and **rules**; a **query (goal)** is answered by matching and backtracking.

```prolog
parent(tendai, rudo).
parent(rudo, tafara).
grandparent(X, Z) :- parent(X, Y), parent(Y, Z).
?- grandparent(tendai, W).
```

- `:-` reads "if", a comma means "and". The engine unifies variables (capital letters) with values and searches all facts; result here is `W = tafara`.

### File processing
| File type | Operations |
|---|---|
| Serial / sequential (text) | `OPENFILE f FOR WRITE/READ/APPEND`, `WRITEFILE`, `READFILE`, `EOF`, `CLOSEFILE` |
| Random | `OPENFILE f FOR RANDOM`, `SEEK f, address`, `GETRECORD`, `PUTRECORD` |

```pseudocode
OPENFILE "marks.dat" FOR READ
WHILE NOT EOF("marks.dat")
   READFILE "marks.dat", Line
   OUTPUT Line
ENDWHILE
CLOSEFILE "marks.dat"
```

- Always close files. For random files, `SEEK` moves to the record position (often calculated by hashing the key), then `GETRECORD` or `PUTRECORD` reads or writes a whole record. Sequential files are read in order from the start; appending writes at the end.

### Exception handling
- An **exception** is an unexpected event at run time (file missing, divide by zero, invalid input) that would otherwise crash the program.
- Handling code catches it and responds gracefully, e.g. reports a message or retries.

```pseudocode
TRY
   OPENFILE "data.txt" FOR READ
   READFILE "data.txt", Line
EXCEPT
   OUTPUT "File could not be read"
FINALLY
   CLOSEFILE "data.txt"
ENDTRY
```

Python: `try: ... except FileNotFoundError: ... finally: ...`. Java: `try { } catch (IOException e) { } finally { }`.

## Key terms
| Term | Meaning |
|---|---|
| Paradigm | A style of programming |
| Encapsulation | Hiding data inside a class behind methods |
| Inheritance | Subclass reuses a superclass's members |
| Polymorphism | Same method name, different behaviour by class |
| Fact / rule | Statement known true / conditional relation in logic programming |
| Exception | Run-time error that can be caught and handled |
| Indexed addressing | Operand plus index register gives the address |

## Worked example
**Question:** A `Vehicle` class has private `Speed`. A `Car` class inherits from it. (a) Explain encapsulation using this class. (b) State what inheritance gives `Car`. (c) A program reads a file and the file may be missing; explain how to handle this. [6]

**Answer:**
- (a) `Speed` is declared private so code outside cannot change it directly (1); it is accessed only through public methods such as `SetSpeed` which can validate the value (1).
- (b) `Car` gets the attributes and methods of `Vehicle` without rewriting them (1) and can add its own or override methods (1).
- (c) Place the file open and read inside a `TRY` block (1); in the `EXCEPT` block output an error message instead of crashing (1).

## Common mistakes
- Confusing a class (blueprint) with an object (instance).
- Defining polymorphism as "many classes"; it is one method name with different behaviour.
- Forgetting `EOF` checks or not closing files.
- In Prolog, using lower-case for variables or forgetting the full stop.
- Mixing up direct and indirect addressing.

## Exam tips
- Use the Cambridge pseudocode OOP keywords (`CLASS`, `INHERITS`, `PRIVATE`, `PUBLIC`, `NEW`) when asked for pseudocode.
- For addressing modes, describe where the value is, with a short worked example.
- Give a reason for every use of exception handling (what could go wrong).
- Practise writing each program in your chosen language, as Paper 4 is practical.
