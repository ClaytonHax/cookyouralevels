# Motion in a circle
> Examiners want you to identify what provides the centripetal force in each situation, and to use the right form of the equation without mixing up $v$ and $\omega$.

## Key ideas

### Radians and degrees
One radian is the angle subtended at the centre of a circle by an arc whose length equals the radius. Because arc length $s = r\theta$ when $\theta$ is in radians, a full circle is $2\pi$ rad, so $180^\circ = \pi$ rad. To convert, multiply degrees by $\pi/180$ (degrees to radians) or radians by $180/\pi$. Always check that your calculator is in the correct mode.

### Angular velocity
Angular velocity $\omega$ is the angle swept out per unit time, in rad s$^{-1}$. For one complete revolution the angle is $2\pi$ and the time is the period $T$, so $\omega = 2\pi/T = 2\pi f$. The linear speed along the circle is tangential and related by $v = r\omega$. Points further from the axis move faster, but all points on a rigid rotating body share the same $\omega$.

### Why a centripetal force is needed
Velocity is a vector, so a body moving at constant speed in a circle is still accelerating because its direction keeps changing. By Newton's first and second laws there must be a resultant force, and it must point towards the centre, perpendicular to the velocity. It does no work, so the speed stays constant. "Centripetal force" is not a new type of force: it is the name for the resultant of real forces (tension, friction, gravity, normal reaction, electric or magnetic force) that points to the centre. Never draw it as an extra force on a free-body diagram.

### Centripetal acceleration and force
The acceleration towards the centre is
$$a = \frac{v^2}{r} = r\omega^2$$
and the resultant force is
$$F = \frac{mv^2}{r} = mr\omega^2.$$
Use $v^2/r$ when you know the speed, and $r\omega^2$ when you know the period or frequency. At the top and bottom of a vertical circle the centripetal force is the *difference* (or sum) of the weight and the tension or normal reaction, so write the resultant towards the centre first, then equate it to $mv^2/r$.

## Definitions to learn

| Term | Definition |
|---|---|
| Radian | The angle subtended at the centre of a circle by an arc equal in length to the radius. |
| Angular velocity | The rate of change of angular displacement; the angle swept per unit time. |
| Period | The time taken for one complete revolution. |
| Centripetal force | The resultant force directed towards the centre of the circle that keeps a body moving on a circular path. |

## Equations

| Equation | Symbols and units | Data sheet? |
|---|---|---|
| $\omega = 2\pi/T = 2\pi f$ | $\omega$ in rad s$^{-1}$, $T$ in s, $f$ in Hz | Learn |
| $v = r\omega$ | $v$ in m s$^{-1}$, $r$ in m | Learn |
| $a = v^2/r = r\omega^2$ | $a$ in m s$^{-2}$ | Learn |
| $F = mv^2/r = mr\omega^2$ | $F$ in N, $m$ in kg | Learn |

None of these are on the formulae sheet, so know all four forms.

## Worked example

A car of mass 1200 kg travels at 15 m s$^{-1}$ round a level bend of radius 50 m. Find the friction force needed.

$$\begin{aligned}
F &= \frac{mv^2}{r} \\
&= \frac{1200 \times 15^2}{50} \\
&= \frac{270\,000}{50} = 5400\ \text{N}
\end{aligned}$$

Now a 0.25 kg mass on a string whirls in a horizontal circle of radius 0.80 m with period 0.40 s. Find the tension.

$$\begin{aligned}
\omega &= \frac{2\pi}{T} = \frac{2\pi}{0.40} = 15.7\ \text{rad s}^{-1} \\
F &= mr\omega^2 = 0.25 \times 0.80 \times (15.71)^2 \\
&= 0.20 \times 246.7 = 49\ \text{N}
\end{aligned}$$

## Common mistakes
- Adding a "centripetal force" arrow to a free-body diagram as well as the real forces.
- Using $F = mv^2/r$ with $\omega$ in place of $v$ (or the reverse).
- Forgetting to convert revolutions per minute: $1\ \text{rpm} = 2\pi/60\ \text{rad s}^{-1}$.
- Saying the force acts "outwards" (centrifugal) in an inertial-frame explanation.
- Using $T$ as tension and period in the same answer without labelling.

## Exam tips
- State what provides the centripetal force (for example "friction between tyres and road") before calculating.
- For "explain why" questions: velocity changes direction, so there is acceleration, so there must be a resultant force towards the centre, perpendicular to the velocity so no work is done and speed stays constant.
- In vertical circles, draw all forces and take towards the centre as positive.
- Keep $\pi$ unrounded until the final answer and give 2 or 3 significant figures.
