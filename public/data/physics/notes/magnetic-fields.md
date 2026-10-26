# Magnetic fields
> Examiners want you to apply the left-hand rule consistently, resolve components with $\sin\theta$, and explain induction with Faraday's and Lenz's laws in words as well as numbers.

## Key ideas

### Magnetic fields from currents and magnets
A magnetic field is a region where a magnet or moving charge experiences a force. Field lines point from north to south outside a magnet. A long straight wire produces concentric circles around it (direction by the right-hand grip rule: thumb along conventional current). A flat coil gives a field like a bar magnet, and a long solenoid has a strong, almost uniform field inside and a weak field outside, with the same pattern as a bar magnet. Reversing the current reverses the field; more turns per metre or more current strengthens it.

### Force on a current-carrying conductor
A wire of length $L$ carrying current $I$ at angle $\theta$ to a field of flux density $B$ experiences
$$F = BIL\sin\theta.$$
The force is greatest when the wire is perpendicular to the field and zero when parallel. Direction is given by Fleming's left-hand rule (thumb = force, first finger = field, second finger = conventional current). The tesla is defined from this: one tesla is the flux density that gives a force of 1 N on a 1 m wire carrying 1 A perpendicular to the field.

### Force on a moving charge
For a charge $q$ moving at speed $v$ at angle $\theta$ to the field,
$$F = Bqv\sin\theta.$$
The force is perpendicular to both $v$ and $B$, so it does no work and the speed stays constant. A charge moving perpendicular to a uniform field follows a circle, and setting $Bqv = mv^2/r$ gives $r = mv/(Bq)$. A velocity selector uses crossed electric and magnetic fields so that only particles with $qE = Bqv$, that is $v = E/B$, pass straight through, independent of charge and mass. Remember negative charges feel force opposite to the left-hand-rule direction.

### The Hall effect
When a current flows in a slab of conductor or semiconductor in a perpendicular field, charge carriers are deflected sideways, building up a transverse p.d. (the Hall voltage) until the electric force on the carriers balances the magnetic force. In equilibrium
$$V_H = \frac{BI}{ntq}$$
where $n$ is the carrier density, $t$ the thickness in the field direction and $q$ the carrier charge. A Hall probe is a thin semiconductor slice (small $n$ gives a large $V_H$), calibrated so the reading is proportional to $B$; it must be held perpendicular to the field.

### Flux and flux linkage
Magnetic flux through an area perpendicular to a uniform field is $\Phi = BA$ (unit: weber, Wb; 1 Wb = 1 T m$^2$). If the field makes an angle $\theta$ with the normal use $\Phi = BA\cos\theta$. Flux linkage for a coil of $N$ turns is $N\Phi$.

### Faraday's and Lenz's laws
Faraday's law: the induced e.m.f. is proportional to the rate of change of flux linkage:
$$\mathcal{E} = -\frac{\Delta(N\Phi)}{\Delta t}.$$
Lenz's law: the direction of the induced e.m.f. (or current) is such that it opposes the change that produces it. The minus sign expresses this, and it follows from conservation of energy. Induced e.m.f. needs a change: a flux that is large but constant induces nothing.

### Moving conductors, generators and transformers
A conductor of length $L$ moving at speed $v$ perpendicular to a field cuts flux at rate $BLv$, giving $\mathcal{E} = BLv$. A generator rotates a coil in a field, giving a sinusoidal e.m.f. whose peak is $BAN\omega$. A transformer has primary and secondary coils on a soft-iron core: alternating current in the primary creates changing flux in the core, linking the secondary, so $V_s/V_p = N_s/N_p$. Losses: resistance of the coils (heating), eddy currents in the core (reduced by lamination), hysteresis and incomplete flux linkage. Transmitting at high voltage reduces current and so $I^2R$ losses in cables.

## Definitions to learn

| Term | Definition |
|---|---|
| Magnetic flux density | The force per unit length per unit current on a wire carrying current perpendicular to the field. |
| Tesla | The flux density producing a force of 1 N on a 1 m conductor carrying 1 A perpendicular to the field. |
| Magnetic flux | The product of flux density and the area perpendicular to the field, $\Phi = BA$. |
| Flux linkage | The product of the number of turns and the flux through each, $N\Phi$. |
| Faraday's law | The induced e.m.f. is proportional to the rate of change of flux linkage. |
| Lenz's law | The induced e.m.f. acts in a direction to oppose the change causing it. |

## Equations

| Equation | Symbols and units | Data sheet? |
|---|---|---|
| $F = BIL\sin\theta$ | N, T, A, m | Learn |
| $F = Bqv\sin\theta$ | q in C | Learn |
| $r = mv/(Bq)$ | Circular path radius, m | Derive |
| $V_H = BI/(ntq)$ | $n$ in m$^{-3}$, $t$ in m | Given |
| $\Phi = BA$ | Wb | Learn |
| $\mathcal{E} = -\Delta(N\Phi)/\Delta t$ | V | Learn |

## Worked example

A proton ($m = 1.67\times10^{-27}$ kg, $q = 1.60\times10^{-19}$ C) moves at $2.0\times10^{6}$ m s$^{-1}$ perpendicular to a 0.50 T field.

$$\begin{aligned}
F &= Bqv = 0.50 \times 1.60\times10^{-19} \times 2.0\times10^{6} = 1.6\times10^{-13}\ \text{N} \\
r &= \frac{mv}{Bq} = \frac{(1.67\times10^{-27})(2.0\times10^{6})}{0.50 \times 1.60\times10^{-19}} = 4.2\times10^{-2}\ \text{m}
\end{aligned}$$

A 200-turn coil of area $5.0\times10^{-3}$ m$^2$ has a perpendicular field raised from 0 to 0.40 T in 0.050 s:

$$\mathcal{E} = \frac{N\Delta\Phi}{\Delta t} = \frac{200 \times 0.40 \times 5.0\times10^{-3}}{0.050} = 8.0\ \text{V}$$

## Common mistakes
- Using the right hand instead of the left for the force on a current or charge, or forgetting that electron flow is opposite to conventional current.
- Using $\sin\theta$ with $\theta$ measured to the normal instead of the field, or the reverse for flux.
- Saying that Lenz's law makes the induced field "oppose the field"; it opposes the *change* in flux.
- Forgetting $N$ in the e.m.f. of a coil.
- Claiming transformers work with direct current.

## Exam tips
- In Lenz's law answers, name the change, say what the induced current does to oppose it, then give direction.
- For circular motion in a field, always begin with $Bqv = mv^2/r$.
- Explain a transformer in a chain: alternating current, changing flux in core, flux linkage in secondary, induced e.m.f.
- For Hall effect, quote both balanced forces: $Bqv = qV_H/d$.
