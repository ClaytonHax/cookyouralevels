# Electricity
> Examiners want exact definitions of current, p.d., e.m.f. and resistance, and confident use of $I = nAvq$, $R = \rho L/A$ and the power equations.

## Key ideas

### Current and charge
Electric current is the rate of flow of charge, $I = \Delta Q/\Delta t$, so $Q = It$. The coulomb is the charge transferred by a current of 1 A in 1 s. In metals the charge carriers are free (delocalised) electrons; charge is quantised in units of the elementary charge $e = 1.60\times10^{-19}\ \text{C}$, so the charge on any object is a whole-number multiple of $e$. Conventional current is taken to flow from positive to negative, opposite to the electron flow.

### Potential difference and e.m.f.
Potential difference (p.d.) between two points is the energy transferred per unit charge from electrical to other forms as charge moves between them, $V = W/Q$. The volt is one joule per coulomb. Electromotive force (e.m.f.) is the energy transferred per unit charge from other forms (chemical, mechanical, ...) to electrical energy in a source as charge passes through it. Both are measured in volts, but p.d. refers to energy leaving the electrical form and e.m.f. to energy entering it.

### Drift velocity: I = nAvq
For a conductor of cross-sectional area $A$ containing $n$ charge carriers per unit volume, each of charge $q$ moving with mean drift velocity $v$:

$$I = nAvq$$

Derivation: in time $t$ the carriers within length $vt$ pass a point, a volume $Avt$ containing $nAvt$ carriers, so charge $Q = nAvtq$ and $I = Q/t$. Conductors have large $n$ (about $10^{28}$ to $10^{29}\ \text{m}^{-3}$) so the drift velocity is tiny, often fractions of a millimetre per second. Semiconductors have a much smaller $n$, so their drift velocity is larger for the same current. Insulators have almost no free carriers.

### Resistance and resistivity
Resistance is the ratio of the potential difference across a component to the current in it, $R = V/I$. The ohm is one volt per ampere. Ohm's law: for a metallic conductor at constant temperature, current is proportional to p.d. For a uniform wire,

$$R = \frac{\rho L}{A}$$

where $\rho$ is the resistivity of the material (unit $\Omega\ \text{m}$), a property of the material rather than the shape.

### I-V characteristics
- Fixed resistor (and metal wire at constant temperature): straight line through the origin; resistance constant.
- Filament lamp: the line curves toward the V-axis; as current rises the filament heats, lattice ions vibrate more and collide with electrons more often, so resistance increases.
- Semiconductor diode: negligible current in reverse bias and below about $0.6\ \text{V}$ forward; then current rises steeply. Very high resistance in reverse.
- NTC thermistor: resistance falls as temperature rises (more charge carriers released), so the I-V line curves toward the I-axis as current heats it.
The resistance at a point is $V/I$ at that point, not the gradient of the tangent.

### Electrical power and energy
Power is the rate of energy transfer:

$$P = VI = I^2R = \frac{V^2}{R}$$

Energy transferred is $W = VIt$. The kilowatt-hour is $3.6\times10^{6}\ \text{J}$.

## Definitions to learn
| Term | Definition |
|---|---|
| Electric current | The rate of flow of charge |
| Coulomb | The charge passing a point when a current of one ampere flows for one second |
| Potential difference | The energy transferred from electrical to other forms per unit charge passing between two points |
| Electromotive force | The energy transferred from other forms to electrical energy per unit charge passing through a source |
| Volt | One joule per coulomb |
| Resistance | The ratio of the potential difference across a component to the current in it |
| Ohm | The resistance of a component through which a current of 1 A flows when the potential difference across it is 1 V |
| Resistivity | The resistance of a sample of unit length and unit cross-sectional area (the quantity $\rho$ in $R = \rho L/A$) |

## Equations
| Equation | Symbols and units | On formulae sheet? |
|---|---|---|
| $Q = It$ | C, A, s | No |
| $V = W/Q$ | V, J, C | No |
| $I = nAvq$ | $n$ in $\text{m}^{-3}$, $A$ in $\text{m}^2$, $v$ in $\text{m s}^{-1}$, $q$ in C | Yes |
| $V = IR$ | V, A, $\Omega$ | No |
| $R = \rho L/A$ | $\Omega$, $\Omega\ \text{m}$, m, $\text{m}^2$ | No |
| $P = VI = I^2R = V^2/R$ | W | No |

## Worked example
A nichrome wire ($\rho = 1.1\times10^{-6}\ \Omega\ \text{m}$) has length $2.0\ \text{m}$ and diameter $0.30\ \text{mm}$. Connected to a $12\ \text{V}$ supply:

$$\begin{aligned}
A &= \pi\left(0.15\times10^{-3}\right)^2 = 7.07\times10^{-8}\ \text{m}^2 \\
R &= \frac{\rho L}{A} = \frac{1.1\times10^{-6} \times 2.0}{7.07\times10^{-8}} = 31\ \Omega \\
P &= \frac{V^2}{R} = \frac{12^2}{31.1} = 4.6\ \text{W}
\end{aligned}$$

Drift velocity of a copper wire carrying $3.0\ \text{A}$ with $n = 8.5\times10^{28}\ \text{m}^{-3}$ and $A = 1.0\ \text{mm}^2$:

$$v = \frac{I}{nAq} = \frac{3.0}{(8.5\times10^{28})(1.0\times10^{-6})(1.60\times10^{-19})} = 2.2\times10^{-4}\ \text{m s}^{-1}$$

A current of $2.5\ \text{A}$ for $4.0$ minutes transfers $Q = 2.5 \times 240 = 600\ \text{C}$, which is $600 / 1.60\times10^{-19} = 3.8\times10^{21}$ electrons.

## Common mistakes
- Using $e.m.f.$ and $p.d.$ interchangeably.
- Reading resistance from the gradient of a curved I-V graph instead of $V/I$.
- Forgetting to halve the diameter or convert mm$^2$ to m$^2$.
- Saying resistance of a lamp rises "because voltage rises" without the temperature/ion-vibration explanation.
- Using minutes instead of seconds in $Q = It$.
- Saying electrons travel at near light speed along the wire.

## Exam tips
- Choose the power formula that uses the two quantities you know.
- For I-V sketches, label axes and indicate the origin symmetry (a diode is not symmetrical).
- In explanations of NTC thermistors, mention more charge carriers, not just "lower resistance".
- Keep $\rho$ unit $\Omega\ \text{m}$, not $\Omega\ \text{m}^{-1}$.
- If a wire is stretched to twice its length at constant volume, $A$ halves and $R$ becomes four times larger.
