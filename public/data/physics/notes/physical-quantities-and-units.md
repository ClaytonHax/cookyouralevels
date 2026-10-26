# Physical quantities and units
> Examiners want correct SI units, clean uncertainty arithmetic, and clear handling of vectors and errors.

## Key ideas

### SI base quantities and derived units
Every physical quantity is a number times a unit. The six base quantities used at AS are mass (kg), length (m), time (s), electric current (A), thermodynamic temperature (K) and amount of substance (mol). All other units are derived from these by multiplication and division.

Useful derived units in base units:
- newton: $\text{N} = \text{kg m s}^{-2}$
- joule: $\text{J} = \text{kg m}^2\text{ s}^{-2}$
- watt: $\text{W} = \text{kg m}^2\text{ s}^{-3}$
- pascal: $\text{Pa} = \text{kg m}^{-1}\text{ s}^{-2}$
- coulomb: $\text{C} = \text{A s}$
- volt: $\text{V} = \text{kg m}^2\text{ s}^{-3}\text{ A}^{-1}$
- ohm: $\Omega = \text{kg m}^2\text{ s}^{-3}\text{ A}^{-2}$

To derive a unit, substitute the defining equation, for example pressure = force / area gives $\text{kg m s}^{-2} / \text{m}^2$.

### Prefixes and conversions
Prefixes: pico p ($10^{-12}$), nano n ($10^{-9}$), micro $\mu$ ($10^{-6}$), milli m ($10^{-3}$), centi c ($10^{-2}$), deci d ($10^{-1}$), kilo k ($10^3$), mega M ($10^6$), giga G ($10^9$), tera T ($10^{12}$). Convert areas and volumes carefully: $1\text{ cm}^2 = 10^{-4}\text{ m}^2$ and $1\text{ cm}^3 = 10^{-6}\text{ m}^3$, not $10^{-2}$ or $10^{-3}$.

### Homogeneity
An equation is homogeneous if every term has the same base units. A non-homogeneous equation must be wrong. Homogeneity cannot prove an equation correct, because dimensionless constants (such as $\tfrac12$) are invisible to the test. To check, reduce each side to base units, for example $v^2 = u^2 + 2as$: $\text{m}^2\text{ s}^{-2}$ on every term.

### Errors: random, systematic, precision, accuracy
- A random error scatters readings unpredictably about the true value. It can be reduced by repeating and averaging, and it affects precision.
- A systematic error shifts all readings the same way (for example zero error). Repeating does not remove it; it must be corrected or the method changed. It affects accuracy.
- Precision (repeatability) is how close repeated readings are to each other. Accuracy is how close a result is to the true value.

### Uncertainties
Absolute uncertainty $\Delta x$ has the units of $x$. Fractional uncertainty is $\Delta x / x$; percentage uncertainty is that times 100%. For a single reading the uncertainty is at least half the smallest scale division (or one division if the reading is judged to be harder), and for repeated readings it can be half the range.

Combining uncertainties:
- sums and differences: add absolute uncertainties
- products and quotients: add percentage (or fractional) uncertainties
- powers: $x^n$ has percentage uncertainty $n$ times that of $x$

### Scalars and vectors
A scalar has magnitude only (mass, speed, energy, time). A vector has magnitude and direction (displacement, velocity, force, momentum). Vectors add by the triangle or parallelogram rule (head-to-tail); subtraction is addition of the reversed vector. A vector of magnitude $F$ at angle $\theta$ to the $x$-axis has components $F\cos\theta$ and $F\sin\theta$. The resultant of perpendicular vectors has magnitude $\sqrt{a^2+b^2}$.

## Definitions to learn
| Term | Definition |
|---|---|
| Random error | An error that causes readings to scatter unpredictably about the true value |
| Systematic error | An error that causes all readings to differ from the true value by a consistent amount in the same direction |
| Precision | How close repeated measurements are to each other |
| Accuracy | How close a measurement is to the true value |
| Scalar | A quantity with magnitude only |
| Vector | A quantity with both magnitude and direction |
| Homogeneous equation | An equation in which all terms have the same base units |

## Equations
| Equation | Symbols and units | On formulae sheet? |
|---|---|---|
| $\%\text{ uncertainty} = \dfrac{\Delta x}{x}\times 100\%$ | $\Delta x$ absolute uncertainty, same unit as $x$ | No |
| $x^n$: $\dfrac{\Delta y}{y} = n\dfrac{\Delta x}{x}$ | $n$ power, no unit | No |
| $F_x = F\cos\theta,\ F_y = F\sin\theta$ | $F$ in N, $\theta$ in degrees or radians | No |
| $R = \sqrt{a^2 + b^2}$ | perpendicular vectors, same unit | No |

## Worked example
A resistance is found from $V = 4.50 \pm 0.05\ \text{V}$ and $I = 0.250 \pm 0.005\ \text{A}$.

$$\begin{aligned}
R &= \frac{V}{I} = \frac{4.50}{0.250} = 18.0\ \Omega \\
\frac{\Delta R}{R} &= \frac{0.05}{4.50} + \frac{0.005}{0.250} = 0.0111 + 0.0200 = 0.0311 \\
\Delta R &= 0.0311 \times 18.0 = 0.56\ \Omega
\end{aligned}$$

So $R = 18.0 \pm 0.6\ \Omega$ (uncertainty to 1 s.f., value to the same decimal place).

Resolve a 50 N force acting at $30^\circ$ above the horizontal:

$$\begin{aligned}
F_x &= 50\cos 30^\circ = 43.3\ \text{N} \\
F_y &= 50\sin 30^\circ = 25.0\ \text{N}
\end{aligned}$$

## Common mistakes
- Adding percentage uncertainties for sums, or absolute ones for products.
- Forgetting to multiply the percentage uncertainty by the power (a radius squared has double the percentage uncertainty).
- Saying "repeating readings removes systematic error".
- Mixing up accuracy and precision.
- Converting $\text{cm}^3$ to $\text{m}^3$ with $10^{-3}$ instead of $10^{-6}$.
- Giving the uncertainty to more significant figures than the value justifies.
- Calling an equation correct because it is homogeneous.

## Exam tips
- When asked to "show that" a unit is, write the substitution step by step in base units.
- Quote final uncertainties to 1 significant figure (2 at most) and match the decimal places of the value.
- For a graph question, the best-fit and worst-fit line gradients give the uncertainty in the gradient.
- State the direction of a vector answer: an angle with a named reference line.
- In evaluation questions, name the error type and say how a specific change in method would reduce it.
