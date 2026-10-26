# Energy, work and power
> Examiners want you to choose between energy methods and $F=ma$ sensibly, account for every force that does work (especially friction and resistances), and use $P=Fv$ correctly.

## Key ideas

### Work done by a force
The work done by a constant force $F$ moving its point of application a distance $d$ in the direction of the force is $F d$. If the force makes angle $\theta$ with the displacement, work $=Fd\cos\theta$. Work is measured in joules (J). A force perpendicular to the motion (such as the normal reaction) does no work. Work against friction is $\mu R\times d$, and work done *against* a force is positive energy lost to it.

### Gravitational potential energy and kinetic energy
$$\text{GPE}=mgh,\qquad \text{KE}=\tfrac12mv^2$$
GPE depends only on vertical height $h$ above the chosen reference level. On a slope of length $d$ at angle $\alpha$, the vertical rise is $h=d\sin\alpha$. Gains in GPE and KE are positive; losses are negative.

### The work-energy principle
Work done by driving forces minus work done against resistances equals the change in KE:
$$\text{WD by driving forces}-\text{WD against resistance}=\Delta\text{KE}+\Delta\text{PE}$$
Method:
1. List all the forces and decide which do work (not $R$ on a horizontal path, not tension if it acts perpendicular to the motion).
2. Find the work done by each force over the distance.
3. Write initial energy plus work done by driving forces minus work done against friction $=$ final energy.
4. Solve for the unknown speed, distance or force.

With friction present, mechanical energy is *not* conserved. The energy lost equals the work done against friction.

### Conservation of mechanical energy
If only gravity (and other conservative forces such as a smooth surface's reaction, which does no work) acts on the particle, then
$$\text{KE}+\text{PE}=\text{constant}.$$
Use this for smooth slopes, free fall, and objects sliding down smooth curves. It saves resolving forces and avoids needing the acceleration at all.

### Power
Power is the rate of doing work, measured in watts (W). For a force $F$ driving at speed $v$:
$$P=Fv$$
- **Constant speed**: acceleration is zero, so driving force equals total resistance (plus weight component up a slope).
- **Varying speed**: $F=P/v$ changes as $v$ changes, and Newton's second law gives $F-R_{\text{total}}=ma$.
- **Maximum speed**: acceleration is zero, so $F=$ resistances.

### Vehicles on slopes, with resistances
For a vehicle of mass $m$ on a slope of angle $\alpha$, with resistance $R$ to its motion, driving force $F$ and speed $v$:
- Going **up**: $F-R-mg\sin\alpha=ma$.
- Going **down**: $F+mg\sin\alpha-R=ma$.
Steady speed has $a=0$. If power is given as a rate (kW), convert to watts ($1\ \mathrm{kW}=1000\ \mathrm{W}$). Resistance is sometimes quoted as a constant, sometimes as a fraction of weight.

## Formulae
- Work: $W=Fd$ (or $Fd\cos\theta$).
- $\text{KE}=\tfrac12mv^2$; $\text{GPE}=mgh$ with $g=10\ \mathrm{m\,s^{-2}}$.
- $P=Fv$; also $P=\text{work}/\text{time}$.
- **In MF19:** nothing for this topic (the booklet's only mechanics formulae are the four suvat equations).
- **Memorise:** every formula above.

## Worked example
**Question 1.** A car of mass $1200\ \mathrm{kg}$ has engine power $30\ \mathrm{kW}$ and moves along a straight level road against a constant resistance of $600\ \mathrm{N}$. Find (a) its maximum speed, (b) its acceleration when travelling at $20\ \mathrm{m\,s^{-1}}$.

(a) At maximum speed, driving force equals resistance:
$$v=\frac{P}{F}=\frac{30000}{600}=50\ \mathrm{m\,s^{-1}}$$
(b) Driving force at $20\ \mathrm{m\,s^{-1}}$:
$$F=\frac{30000}{20}=1500\ \mathrm{N}$$
$$\begin{aligned}1500-600&=1200a\\a&=0.75\ \mathrm{m\,s^{-2}}\end{aligned}$$

**Question 2.** A block of mass $2\ \mathrm{kg}$ is released from rest at the top of a rough slope inclined at $30^\circ$. The coefficient of friction is $0.2$ and the slope is $5\ \mathrm{m}$ long. Find its speed at the bottom.

$$\begin{aligned}\text{Loss of PE}&=2\times10\times5\sin30^\circ=50\ \mathrm{J}\\R&=2\times10\cos30^\circ=17.32\ \mathrm{N}\\\text{Work against friction}&=0.2\times17.32\times5=17.32\ \mathrm{J}\\\tfrac12(2)v^2&=50-17.32\\v^2&=32.68\\v&=5.72\ \mathrm{m\,s^{-1}}\end{aligned}$$

## Common mistakes
- Using $P=Fv$ with $P$ in kW and $F$ in N without converting.
- Forgetting the weight component when a vehicle climbs or descends a slope.
- Using conservation of energy when friction acts.
- Using the slope length as the height gained.
- Counting the work done by the normal reaction.
- Using $F=ma$ with $F$ equal to the driving force only, not the net force.

## Exam tips
- Write an energy equation in words first ("PE loss $-$ WD against friction $=$ KE gain") then substitute.
- Use energy methods when you are asked for speed after a distance and no time or acceleration is needed.
- For power problems, always find $F=P/v$ first.
- Treat "maximum speed" as an equilibrium condition and "constant speed" likewise.
- Keep a sign for each term: gains and losses must match the direction of change.
