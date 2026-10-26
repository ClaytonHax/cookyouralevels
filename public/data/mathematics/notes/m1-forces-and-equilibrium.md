# Forces and equilibrium
> Examiners want a clear force diagram, correct resolving in two perpendicular directions, and a justified use of $F \le \mu R$ (only $F=\mu R$ when friction is limiting).

## Key ideas

### Identifying forces and drawing diagrams
Every force on a body is one of a small set: **weight** $W=mg$ (always vertically down), **normal reaction** $R$ (perpendicular to the contact surface), **tension** $T$ (along a string or rod, pulling the body), **friction** $F$ (along the surface, opposing motion or tendency to move), and applied forces such as a push $P$ or a driving force. Draw the body as a dot or box, draw only the forces acting *on that body*, label every arrow, and mark any angles. A missing force on the diagram is the commonest source of lost marks.

### Resolving forces into components
A force $X$ at angle $\theta$ to a line has component $X\cos\theta$ along that line and $X\sin\theta$ perpendicular to it. The skill is picking the angle that is *adjacent* to the direction you are resolving along.
1. Choose two perpendicular directions (horizontal and vertical, or along and perpendicular to a slope).
2. For each force, write its component in each direction.
3. Add components using a sign convention (say, right and up positive).

### Resultant of concurrent forces
Forces acting at a single point combine into one resultant.
1. Resolve every force into $x$ and $y$ components and sum each: $X$ and $Y$.
2. Magnitude $=\sqrt{X^2+Y^2}$.
3. Direction: $\tan\alpha=\dfrac{|Y|}{|X|}$, then state the angle relative to a named direction, using the signs of $X$ and $Y$ to choose the correct quadrant.

### Equilibrium of a particle
If a particle is in equilibrium (at rest or moving at constant velocity) the resultant force is zero, so the components sum to zero in **each** of two perpendicular directions. Method:
1. Draw the diagram and resolve in two perpendicular directions.
2. Write $\sum$(forces in direction 1) $=0$ and $\sum$(forces in direction 2) $=0$.
3. Solve the pair of equations, usually finding $R$ from the perpendicular equation first.

For three forces in equilibrium you can also use a closed triangle of forces or Lami-style trig, but resolving always works.

### Friction and the limiting model
Friction opposes relative motion and satisfies $F \le \mu R$, where $\mu$ is the coefficient of friction.
- If the body is **at rest and not about to move**, $F$ is whatever is needed for equilibrium and $F<\mu R$.
- In **limiting equilibrium** (on the point of slipping), $F=\mu R$.
- If the body is **sliding**, $F=\mu R$ and it acts opposite to the direction of motion.
- A **smooth** surface has $F=0$.

### Inclined planes and several surfaces
On a plane inclined at $\alpha$ to the horizontal, resolve parallel and perpendicular to the slope. The weight has component $mg\sin\alpha$ down the slope and $mg\cos\alpha$ into the slope. Then $R=mg\cos\alpha$ when there are no other perpendicular forces. A push or pull at an angle to the slope changes $R$, so always include its perpendicular component. For problems with several surfaces (for example a particle between two planes, or on surfaces of different roughness), treat each contact separately: each has its own $R$ and its own friction limit.

## Formulae
- Weight: $W=mg$, with $g=10\ \mathrm{m\,s^{-2}}$ for CIE 9709 unless told otherwise.
- Friction: $F\le\mu R$; limiting $F=\mu R$.
- Components: $X\cos\theta$, $X\sin\theta$; resultant $\sqrt{X^2+Y^2}$.
- **In MF19:** nothing for this topic (its only mechanics formulae are the four suvat equations). **Memorise** all of the above.
- Angle of friction idea: a body on a rough slope is in limiting equilibrium when $\tan\alpha=\mu$.

## Worked example
**Question 1.** A particle of mass $5\ \mathrm{kg}$ is pulled up a rough plane inclined at $30^\circ$ to the horizontal by a force $P$ N acting up the plane parallel to a line of greatest slope. The coefficient of friction is $0.4$. Find $P$ if the particle moves at constant speed.

Constant speed means equilibrium. Perpendicular to the plane:
$$R=5\times10\times\cos30^\circ=43.30\ \mathrm{N}$$
Moving, so friction is limiting and acts down the slope:
$$F=\mu R=0.4\times43.30=17.32\ \mathrm{N}$$
Parallel to the plane:
$$\begin{aligned}P&=5\times10\times\sin30^\circ+F\\&=25+17.32\\&=42.3\ \mathrm{N}\ (3\text{ s.f.})\end{aligned}$$

**Question 2.** Forces of $6\ \mathrm{N}$ due east and $8\ \mathrm{N}$ due north act on a particle. Find the magnitude and direction of the resultant.

$$\begin{aligned}\text{Magnitude}&=\sqrt{6^2+8^2}=10\ \mathrm{N}\\\tan\alpha&=\frac{8}{6}\ \Rightarrow\ \alpha=53.1^\circ\end{aligned}$$
The resultant is $10\ \mathrm{N}$ at $53.1^\circ$ north of east.

## Common mistakes
- Using $\cos$ for the along-slope component of weight. The along-slope component is $mg\sin\alpha$ when $\alpha$ is the slope angle.
- Writing $F=\mu R$ when the body is only in equilibrium and not about to slip.
- Forgetting that a pull with an upward component reduces $R$, and a downward push increases it.
- Drawing friction in the wrong direction. It opposes the motion (or the tendency to move).
- Giving a direction with no reference line, for example "$53.1^\circ$" with no stated axis.
- Rounding $\cos30^\circ$ or $\sin30^\circ$ early and losing the third significant figure.

## Exam tips
- Always draw a fresh, large force diagram even if the question provides one.
- Resolve perpendicular to the surface first: it gives $R$, which you need for friction.
- Keep exact trig values ($\sin30^\circ=\tfrac12$, $\cos30^\circ=\tfrac{\sqrt3}{2}$) until the final line.
- For "show that" questions, write the key equation clearly before substituting numbers.
- Give answers to 3 significant figures, and state angles with a reference direction.
