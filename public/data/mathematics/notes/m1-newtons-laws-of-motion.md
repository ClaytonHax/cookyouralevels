# Newton's laws of motion
> Examiners want a separate equation of motion for each particle (or the system) with every force shown, signs consistent with the direction of acceleration, and the modelling assumptions used.

## Key ideas

### Newton's second law
The resultant force on a particle equals mass times acceleration:
$$F=ma$$
where $F$ is the **net** force in the direction of the acceleration. Method:
1. Draw a force diagram and mark the direction of acceleration.
2. Resolve forces along that direction (and perpendicular to it if friction is involved).
3. Write "resultant force $=ma$", with forces in the direction of motion positive.
4. Perpendicular to the motion the net force is zero, which gives $R$.

### Newton's third law
When body $A$ exerts a force on body $B$, $B$ exerts an equal and opposite force on $A$. This is why the tension in a connecting string pulls equally on both ends, and why the contact force between two touching bodies is the same size on each. These pairs act on *different* bodies, so they never cancel in a single particle's equation.

### Connected particles and pulleys
Standard modelling assumptions: the string is **light** (negligible mass, so the tension is the same throughout), **inextensible** (both particles have the same speed and acceleration magnitude), and the pulley is **smooth** (tension unchanged over it). Method:
1. Draw a diagram for each particle with its own forces and the same string tension $T$.
2. Write $F=ma$ for each particle in the direction it accelerates (down for the heavier hanging mass, along the string for the other).
3. Solve the two equations simultaneously for $a$ and $T$; adding the equations eliminates $T$.

### Horizontal and inclined surfaces, with and without friction
For a particle on a slope inclined at $\alpha$, resolve along the slope: weight contributes $mg\sin\alpha$ and the normal reaction is $R=mg\cos\alpha$ (plus any perpendicular components of applied forces). If sliding, friction is $\mu R$ opposing the motion. For a rough surface, remember the friction direction depends on which way the body is moving, not which way the net force points. If a connected system includes a slope, write equations for each particle separately.

### Lifts and towing
- **Lift**: a person or load on the floor of a lift has reaction $R$ from the floor. For upward acceleration $a$: $R-mg=ma$. Cable tension acts on the lift as a whole, so include the lift's own mass.
- **Towing**: a car pulls a trailer via a light rigid tow-bar or rope. Treat the whole system for total acceleration, then the trailer alone for the tension. Resistance forces act separately on each part.

### Combining dynamics with kinematics
Newton's second law gives acceleration; suvat gives speeds and times. A typical chain: find $a$ from forces, then use $v^2=u^2+2as$ or $s=ut+\tfrac12at^2$. If a string goes slack (a particle hits the ground or a string breaks), acceleration changes, so start a new stage with a new $F=ma$ for each remaining particle.

## Formulae
- $F=ma$ (not in MF19; memorise).
- Weight $mg$ with $g=10\ \mathrm{m\,s^{-2}}$ (memorise).
- Friction $F\le\mu R$, limiting/sliding $F=\mu R$ (memorise).
- Slope components: $mg\sin\alpha$ along, $mg\cos\alpha$ perpendicular (memorise).
- **In MF19:** only the four suvat equations, as in kinematics.

## Worked example
**Question 1.** A particle $A$ of mass $3\ \mathrm{kg}$ lies on a smooth horizontal table. It is attached by a light inextensible string passing over a smooth pulley at the table edge to particle $B$ of mass $2\ \mathrm{kg}$ hanging freely. The system is released from rest. Find the acceleration and the tension.

For $B$ (taking down as positive):
$$2\times10-T=2a$$
For $A$ (towards the pulley):
$$T=3a$$
Substituting:
$$\begin{aligned}20-3a&=2a\\a&=4\ \mathrm{m\,s^{-2}}\\T&=3\times4=12\ \mathrm{N}\end{aligned}$$
Check on $B$: $20-12=8=2\times4$.

**Question 2.** A lift of mass $500\ \mathrm{kg}$ is raised by a vertical cable with acceleration $1.2\ \mathrm{m\,s^{-2}}$. Find the tension in the cable.

$$\begin{aligned}T-500\times10&=500\times1.2\\T&=5000+600=5600\ \mathrm{N}\end{aligned}$$

## Common mistakes
- Adding the weight of the hanging particle to the other particle's equation.
- Using different tensions for the same light string over a smooth pulley.
- Using $F=ma$ with $F$ equal to a single force instead of the resultant.
- Leaving friction out when the surface is described as rough, or including it when the surface is smooth.
- Forgetting that the total system equation has no internal tension in it.
- Using $R=mg$ on a slope instead of $R=mg\cos\alpha$.

## Exam tips
- Write one equation per particle and label each ("For $A$:", "For $B$:").
- When two particles are connected, adding the equations is a quick way to find $a$.
- State the assumptions you use: "light inextensible string, so same $T$ and same $a$".
- After a string slackens, the earlier particle moves under gravity (or friction) alone, so rework its acceleration.
- Use $g=10$ and give 3 s.f. answers.
