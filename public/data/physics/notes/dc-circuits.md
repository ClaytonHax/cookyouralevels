# D.C. circuits
> Examiners want Kirchhoff's laws applied correctly, internal resistance understood as lost volts, and potential dividers analysed by ratio.

## Key ideas

### Circuit diagrams and symbols
Know the standard symbols: cell, battery, switch, fixed resistor, variable resistor, filament lamp, fuse, ammeter, voltmeter, thermistor, light-dependent resistor (LDR), diode, potentiometer and junction. An ammeter is placed in series and should have very low resistance; a voltmeter is placed in parallel across a component and should have very high resistance, so that neither alters the circuit noticeably.

### Kirchhoff's laws
- First law: the sum of the currents entering any junction equals the sum of the currents leaving it. This is conservation of charge.
- Second law: around any closed loop, the sum of the e.m.f.s equals the sum of the potential differences. This is conservation of energy.
When applying the second law, choose a loop direction; an e.m.f. is positive when traversed from negative to positive terminal, and a p.d. across a resistor is positive if you go along the current direction (when going against it, p.d. enters with the opposite sign).

### Resistors in series and parallel
Series (same current, p.d. shared): $R = R_1 + R_2 + \dots$ Parallel (same p.d., current shared):

$$\frac{1}{R} = \frac{1}{R_1} + \frac{1}{R_2} + \dots$$

The combined resistance of resistors in parallel is always less than the smallest individual one. For two resistors, $R = R_1R_2/(R_1+R_2)$. Adding a resistor in parallel reduces total resistance and so increases the total current drawn from the source.

### Internal resistance
A real source has internal resistance $r$. The terminal p.d. is lower than the e.m.f. when current flows, because energy is transferred as thermal energy inside the source:

$$E = I(R + r) = V + Ir$$

where $V$ is the terminal p.d. and $Ir$ is the "lost volts". A graph of $V$ against $I$ has intercept $E$ and gradient $-r$. Maximum current occurs in a short circuit, $I = E/r$. A source with large internal resistance cannot supply a large current without a big drop in terminal p.d.

### Potential dividers
Two resistors in series across a supply share the p.d. in proportion to their resistances:

$$V_{out} = \frac{R_2}{R_1 + R_2} V_{in}$$

where $V_{out}$ is across $R_2$. Replacing a resistor with an NTC thermistor gives an output that changes with temperature; with an LDR it changes with light level. Placing the sensor across the output resistor determines whether $V_{out}$ rises or falls: if the thermistor is $R_2$, then as temperature rises its resistance falls and $V_{out}$ falls. A variable resistor in a divider lets the output be varied from zero to the full supply voltage (a potentiometer arrangement), whereas a variable resistor in series cannot reach zero.

### Potentiometer circuits
A potentiometer is a uniform resistance wire connected to a driver cell. Moving a sliding contact along the wire until a galvanometer reads zero finds the null (balance) point where the p.d. along the wire equals the unknown p.d. At balance no current flows through the source under test, so internal resistance has no effect and the measurement is of its e.m.f. Comparing balance lengths $l_1$ and $l_2$ for two sources gives $E_1/E_2 = l_1/l_2$. Advantages over a voltmeter: no current drawn at balance, and a precision limited by the wire and scale.

## Definitions to learn
| Term | Definition |
|---|---|
| Kirchhoff's first law | The sum of the currents into a junction equals the sum of the currents out of it (conservation of charge) |
| Kirchhoff's second law | In a closed loop the sum of the e.m.f.s equals the sum of the potential differences (conservation of energy) |
| Internal resistance | The resistance of the source itself, causing a drop in terminal p.d. when current flows |
| Terminal p.d. | The p.d. across the terminals of a source when current is flowing |
| Lost volts | The potential difference across the internal resistance, $Ir$ |
| Potential divider | A circuit in which two or more resistors in series share the supply p.d. to give a chosen fraction as output |

## Equations
| Equation | Symbols and units | On formulae sheet? |
|---|---|---|
| $R = R_1 + R_2 + \dots$ | $\Omega$ | Yes |
| $\dfrac{1}{R} = \dfrac{1}{R_1} + \dfrac{1}{R_2} + \dots$ | $\Omega$ | Yes |
| $E = V + Ir$ | V, A, $\Omega$ | No |
| $V_{out} = \dfrac{R_2}{R_1+R_2}V_{in}$ | V | No |

## Worked example
A cell of e.m.f. $6.0\ \text{V}$ and internal resistance $0.50\ \Omega$ drives a $2.5\ \Omega$ resistor.

$$\begin{aligned}
I &= \frac{E}{R + r} = \frac{6.0}{2.5 + 0.50} = 2.0\ \text{A} \\
V &= IR = 2.0 \times 2.5 = 5.0\ \text{V} \\
\text{lost volts} &= Ir = 2.0 \times 0.50 = 1.0\ \text{V}
\end{aligned}$$

A $9.0\ \text{V}$ supply feeds a $4.0\ \text{k}\Omega$ resistor in series with a thermistor of resistance $2.0\ \text{k}\Omega$ at room temperature; the output is taken across the thermistor.

$$V_{out} = \frac{2.0}{4.0 + 2.0} \times 9.0 = 3.0\ \text{V}$$

When heated so its resistance is $1.0\ \text{k}\Omega$: $V_{out} = \dfrac{1.0}{5.0} \times 9.0 = 1.8\ \text{V}$. Parallel check: $6.0\ \Omega$ and $3.0\ \Omega$ in parallel give $18/9.0 = 2.0\ \Omega$.

## Common mistakes
- Forgetting to take the reciprocal at the end of a parallel calculation.
- Adding internal resistance in parallel instead of series with the load.
- Assuming the terminal p.d. equals the e.m.f. when current flows.
- Placing a voltmeter in series or an ammeter in parallel.
- Ignoring the loading effect of the next circuit on a potential divider.
- Mixing signs when applying Kirchhoff's second law.

## Exam tips
- Label currents at every junction with arrows before writing equations.
- Name the conservation law behind each Kirchhoff statement, as marks are given for it.
- For a divider with a sensor, argue in two steps: sensor resistance changes, so p.d. shares change.
- On a $V$-$I$ plot, read $E$ from the vertical intercept and $r$ from the gradient magnitude.
- Give resistances in $\text{k}\Omega$ consistently; do not mix $\Omega$ and $\text{k}\Omega$ inside a ratio.
