# Software Development
> Questions test your ability to name stages and models with reasons for a given project, choose test data, and recognise error types and maintenance categories.

## Key ideas

### Development life cycle
- Stages: analysis (investigate the problem, define requirements), design (structure, algorithms, interfaces, test plan), coding (implementation), testing (find faults), and maintenance. Documentation and evaluation run throughout.

### Models
| Model | Description | Suits |
|---|---|---|
| Waterfall | Stages in a strict sequence; each finishes before the next starts | Clear, stable requirements |
| Iterative | Build, test and refine in repeated cycles; each cycle produces an improved version | Requirements likely to change; large projects |
| RAD | Rapid application development; prototypes built quickly with heavy user involvement, reusing components | Fast delivery, user feedback |
- Waterfall: easy to manage and document, but changes are costly and the user sees the product late. Iterative: early feedback, risk reduced, but can overrun and needs planning. RAD: quick, close user involvement; may give a less polished design and needs available users.

### Design tools
- Structure chart: hierarchical diagram showing modules, their relationships (parent calls child) and the parameters passed; shows selection and iteration in module calls.
- State-transition diagram: shows states (circles), transitions (arrows) with the input or event that triggers them, and sometimes outputs; useful for systems like a vending machine or a login.
- Also top-down flowcharts and pseudocode.

### Errors
- Syntax error: breaks the language rules, so the program will not translate (e.g. missing ENDIF). Found by the translator.
- Logic error: program runs but gives incorrect results (e.g. `<` instead of `>`). Found by testing and trace tables.
- Run-time error: occurs while running and crashes the program (division by zero, array index out of bounds, file not found).
- Correct errors using trace tables, dry runs, breakpoints, stepping, watches and test data.

### Testing
- Stages include white-box testing (tests internal logic and every path), black-box testing (tests inputs and outputs without code), alpha testing (by developers), beta testing (by selected users), acceptance testing (client confirms it meets requirements), and integration testing (modules combined). Unit testing checks individual modules.
- Test data: normal (valid, expected), abnormal (invalid, should be rejected), boundary (at the limits of valid and invalid values). For a range 1-100: normal 50; abnormal -5 or "abc"; boundary 0, 1, 100, 101.
- Test plan: lists each test, purpose, test data, expected result, actual result and any action taken. Planned in advance so that results can be compared fairly.

### Maintenance
- Corrective: fixing faults found after release. Adaptive: changing the software for new conditions (new OS, new law, new hardware). Perfective: improving performance or adding features to meet new user wishes.

### Amending an existing program
- Read the code and comments, trace it to see what it does, identify where the new functionality goes, change as little as possible, keep style and naming, then retest the old and new functions (regression testing).

## Key terms
| Term | Meaning |
|---|---|
| Waterfall model | Sequential life cycle model where each stage is completed before the next. |
| RAD | Development approach using rapid prototyping and user feedback. |
| Structure chart | Diagram showing the module hierarchy and data passed between modules. |
| Syntax error | Violation of the language's rules. |
| Logic error | Fault that causes wrong output without stopping the program. |
| Boundary data | Test data at the edge of the accepted range. |
| Test plan | Document of tests, data and expected results. |
| Adaptive maintenance | Modifying software to suit a changed environment. |

## Worked example
**Question:** A program accepts exam marks from 0 to 100. Give test data (with type) and expected results. State the maintenance type if the school later adds a new grading scheme. [6]

**Model answer:**
- 65: normal; accepted (1).
- 0 and 100: boundary; accepted (1).
- -1 and 101: boundary (just outside); rejected (1).
- "abc": abnormal; rejected with an error message (1).
- Each test has expected result stated before running (1).
- New grading scheme: perfective (adds features/improves) or adaptive if due to changed regulations (1).

## Common mistakes
- Treating syntax and logic errors as the same.
- Giving boundary data as only the valid limits; include the invalid values next to them.
- Saying waterfall is "better" without conditions.
- Listing test data without expected results.
- Mixing up corrective (fix faults), adaptive (new environment) and perfective (improve).

## Exam tips
- Use scenario facts when comparing life cycle models.
- For testing, always state three things: data, type, expected outcome.
- Name the stage exactly: analysis, design, coding, testing, maintenance.
- In state-transition diagrams, label every arrow with its trigger.
