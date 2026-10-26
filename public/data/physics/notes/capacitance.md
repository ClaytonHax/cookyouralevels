# Capacitance
> Examiners want you to combine capacitors correctly, find stored energy from a $Q$-$V$ graph, and handle exponential charging and discharging with the time constant.

## Key ideas

### Capacitance and combinations
Capacitance is the charge stored per unit potential difference across a capacitor:
$$C = \frac{Q}{V}.$$
Its unit is the farad (F), $1\ \text{F} = 1\ \text{C V}^{-1}$. Practical values are in $\mu$F, nF or pF. For capacitors in parallel the p.d. is shared by each and the charges add, so $C_{total} = C_1 + C_2 + \dots$. In series the charge on each is the same and the p.d.s add, giving $1/C_{total} = 1/C_1 + 1/C_2 + \dots$. Series combination gives a smaller total than the smallest capacitor; parallel gives a larger total than the largest. These are the opposite of resistors.

### Energy stored
Charging requires work, because each extra bit of charge is added against the p.d. already present. On a $Q$-$V$ graph (a straight line through the origin for a capacitor) the area under the line is the energy stored:
$$W = \tfrac12 QV = \tfrac12 CV^2 = \frac{Q^2}{2C}.$$
The factor $\tfrac12$ arises because the average p.d. during charging is $V/2$. Half of the energy supplied by the battery is stored in the capacitor, and the rest is dissipated as thermal energy in the circuit resistance.

### Charging and discharging
When a charged capacitor discharges through a resistor $R$, the current starts at its maximum $V_0/R$ and falls, because the p.d. driving it falls. Charge, current and p.d. all decay exponentially. The time constant
$$\tau = RC$$
is the time for the charge (or current, or p.d.) to fall to $1/e$ (about 37%) of its initial value. After one time constant, 37% remains; after about $0.69\tau$ half remains. A larger $R$ or $C$ means slower discharge. During charging from a cell of e.m.f. $E$, the capacitor p.d. rises as $V = V_0(1 - e^{-t/RC})$ and the current falls exponentially from $E/R$ to zero.

### Exponential relations
For discharge,
$$x = x_0 e^{-t/RC}$$
where $x$ can be $Q$, $I$ or $V$ (all the same form). Taking logs, $\ln x = \ln x_0 - t/RC$, so a graph of $\ln x$ against $t$ is a straight line with gradient $-1/RC$. This is the way to find $RC$ from data. Half-life of the discharge: $t_{1/2} = RC\ln 2$.

## Definitions to learn

| Term | Definition |
|---|---|
| Capacitance | The charge stored per unit potential difference across a capacitor, $C = Q/V$. |
| Farad | One coulomb per volt. |
| Time constant | $\tau = RC$, the time for charge (or current or p.d.) to fall to $1/e$ of its initial value on discharge. |

## Equations

| Equation | Symbols and units | Data sheet? |
|---|---|---|
| $C = Q/V$ | C, V, F | Learn |
| $W = \tfrac12 QV = \tfrac12 CV^2$ | J | Learn |
| $C = C_1 + C_2$ (parallel); $1/C = 1/C_1 + 1/C_2$ (series) | F | Given |
| $x = x_0e^{-t/RC}$ | $t$ in s, $R$ in $\Omega$, $C$ in F | Given |
| $\tau = RC$ | s | Learn |

## Worked example

A 2200 $\mu$F capacitor charged to 12 V discharges through a 10 k$\Omega$ resistor. Find the time constant, the p.d. after 30 s, the time for the p.d. to halve, and the initial stored energy.

$$\begin{aligned}
\tau &= RC = (1.0\times10^{4})(2.2\times10^{-3}) = 22\ \text{s} \\
V &= 12e^{-30/22} = 12 \times 0.256 = 3.1\ \text{V} \\
t_{1/2} &= RC\ln 2 = 22 \times 0.693 = 15\ \text{s} \\
W &= \tfrac12 CV^2 = \tfrac12 (2.2\times10^{-3})(12)^2 = 0.16\ \text{J}
\end{aligned}$$

Series combination: 4.0 $\mu$F and 12 $\mu$F give $1/C = 1/4 + 1/12 = 4/12$, so $C = 3.0\ \mu$F.

## Common mistakes
- Forgetting to convert $\mu$F to F, or k$\Omega$ to $\Omega$.
- Using $\tfrac12 QV$ and $QV$ interchangeably; the energy is half of $QV$.
- Adding series capacitors directly.
- Stating that current "stops flowing through the capacitor" as if charge crosses the gap; charge flows onto and off the plates through the circuit.
- Drawing charging and discharging curves with the wrong shape (decay curves never reach zero).

## Exam tips
- On a decay graph, check the 37% value at $t = \tau$ and use tangent at $t = 0$ crossing the axis at $t = \tau$.
- For $\ln$ graphs, give the gradient as $-1/RC$ and the intercept as $\ln x_0$.
- Remember that after time $t$ the current has the same fractional decay as the charge and p.d.
- Energy lost in resistor during charging is equal to the energy stored; mention it for "where did the rest go" questions.
