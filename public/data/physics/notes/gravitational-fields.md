# Gravitational fields
> Examiners want you to move confidently between force, field strength, potential and potential energy, and to build orbit questions from "gravity provides the centripetal force".

## Key ideas

### Gravitational field and field strength
A gravitational field is a region of space in which a mass experiences a force because of other masses. Gravitational field strength $g$ at a point is the force per unit mass on a small test mass placed there, $g = F/m$, in N kg$^{-1}$. It is a vector pointing towards the mass creating the field. Field lines show its direction, and closer lines mean a stronger field.

### Newton's law of gravitation
Two point masses attract each other with equal and opposite forces of magnitude
$$F = \frac{GMm}{r^2}$$
where $r$ is the separation of their centres. Spherical bodies act as if all their mass were at the centre, which is why $r$ is measured from the centre of the Earth, not its surface.

### Field of a point mass
Combining $g = F/m$ with Newton's law gives $g = GM/r^2$: an inverse-square field. Near the Earth's surface, over heights tiny compared with the radius, $g$ barely changes, so the field is effectively uniform with $g \approx 9.81\ \text{N kg}^{-1}$ and the field lines are parallel and equally spaced.

### Gravitational potential and potential energy
Gravitational potential $\phi$ at a point is the work done per unit mass in bringing a small mass from infinity to that point. Because gravity is attractive, work is done by the field, so potential is negative:
$$\phi = -\frac{GM}{r}.$$
Potential is zero at infinity and becomes more negative as you approach the mass. A mass $m$ at that point has potential energy $E_p = m\phi = -GMm/r$. Changing position gives $\Delta E_p = m\,\Delta\phi$.

### Circular orbits and Kepler's third law
In a circular orbit gravity supplies the centripetal force:
$$\frac{GMm}{r^2} = m r\omega^2 = m r\left(\frac{2\pi}{T}\right)^2 \quad\Rightarrow\quad T^2 = \frac{4\pi^2}{GM}\,r^3.$$
So $T^2 \propto r^3$ (Kepler's third law). The orbital speed $v = \sqrt{GM/r}$ does not depend on the satellite's mass. A geostationary satellite stays above one point on the equator: it orbits in the equatorial plane, in the same direction as the Earth's spin, with a period of 24 hours, which fixes its orbital radius and height.

### Escape and the area under a graph
On a graph of $g$ against $r$, the area under the curve between two radii equals the change in potential $\Delta\phi$ (work done per unit mass). The area from the surface out to infinity gives $|\phi_{surface}| = GM/R$. For a mass to just escape, its kinetic energy must equal this energy: $\tfrac12 mv^2 = GMm/R$, so $v_{esc} = \sqrt{2GM/R}$.

## Definitions to learn

| Term | Definition |
|---|---|
| Gravitational field | A region in which a mass experiences a force due to other masses. |
| Gravitational field strength | Force per unit mass acting on a small test mass at that point. |
| Gravitational potential | Work done per unit mass in moving a small mass from infinity to that point. |
| Geostationary orbit | An equatorial orbit with a period of 24 h in the same sense as Earth's rotation, so the satellite stays above a fixed point. |
| Escape speed | The minimum launch speed for a body to reach infinity (with no further propulsion). |

## Equations

| Equation | Symbols and units | Data sheet? |
|---|---|---|
| $F = GMm/r^2$ | $G$ in N m$^2$ kg$^{-2}$, masses in kg, $r$ in m | Learn |
| $g = GM/r^2$ | N kg$^{-1}$ | Learn |
| $\phi = -GM/r$ | J kg$^{-1}$ | Given |
| $T^2 = 4\pi^2r^3/(GM)$ | Derive from the force balance | Derive |
| $\Delta\phi = $ area under $g$-$r$ graph | J kg$^{-1}$ | Learn |

## Worked example

Find the orbital radius and height of a geostationary satellite. Use $G = 6.67\times10^{-11}$ N m$^2$ kg$^{-2}$, $M_E = 5.97\times10^{24}$ kg, $R_E = 6.37\times10^{6}$ m and $T = 24\ \text{h} = 8.64\times10^4$ s.

$$\begin{aligned}
r^3 &= \frac{GMT^2}{4\pi^2} = \frac{(3.98\times10^{14})(8.64\times10^{4})^2}{4\pi^2} \\
&= \frac{2.97\times10^{24}}{39.48} = 7.53\times10^{22}\ \text{m}^3 \\
r &= 4.22\times10^{7}\ \text{m} \\
h &= r - R_E = 4.22\times10^{7} - 0.637\times10^{7} = 3.58\times10^{7}\ \text{m}
\end{aligned}$$

Escape speed from the Earth's surface:

$$v = \sqrt{\frac{2GM}{R_E}} = \sqrt{\frac{2(3.98\times10^{14})}{6.37\times10^{6}}} = 1.12\times10^{4}\ \text{m s}^{-1}$$

## Common mistakes
- Measuring $r$ from the surface instead of the centre.
- Dropping the minus sign in $\phi$, or saying potential at infinity is "infinite".
- Treating $g$ as constant for orbit problems.
- Thinking a heavier satellite orbits faster; its mass cancels.
- Saying a satellite in orbit is "weightless because there is no gravity"; gravity is what keeps it in orbit.

## Exam tips
- Start orbit questions with $GMm/r^2 = mv^2/r$ (or $mr\omega^2$) and show the cancelled $m$.
- For potential energy changes use $m\Delta\phi$, and watch the sign: moving away from a mass increases potential (less negative).
- A geostationary satellite needs three conditions; list them all for full marks.
- When using the area under a $g$-$r$ graph, count squares and state what one square represents.
