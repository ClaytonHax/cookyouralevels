# Electric fields
> Examiners want you to treat electric fields like gravitational ones (with signs for charge), and to link field strength, potential and potential energy clearly.

## Key ideas

### Electric field and field strength
An electric field is a region in which a charge experiences a force. Electric field strength at a point is the force per unit positive charge on a small test charge placed there:
$$E = \frac{F}{q}.$$
Its unit is N C$^{-1}$ (equivalently V m$^{-1}$). It is a vector, pointing in the direction a positive charge would be pushed.

### Coulomb's law and the point charge
Two point charges $Q$ and $q$ separated by $r$ exert equal and opposite forces
$$F = \frac{Qq}{4\pi\varepsilon_0 r^2}$$
which are attractive for unlike charges and repulsive for like charges. Dividing by $q$, the field outside a point charge (or a charged sphere acting as if all charge were at the centre) is
$$E = \frac{Q}{4\pi\varepsilon_0 r^2}$$
and points radially outward for positive $Q$. It falls as $1/r^2$.

### Uniform fields
Between two parallel plates with potential difference $V$ and separation $d$, the field is uniform away from the edges:
$$E = \frac{V}{d}.$$
A charge $q$ experiences constant force $F = qE$ and constant acceleration $a = qE/m$. A charge entering perpendicular to the field follows a parabolic path (like a projectile): constant velocity parallel to the plates, uniform acceleration perpendicular to them. Resolve the motion into two independent components.

### Electric potential and potential energy
Electric potential at a point is the work done per unit positive charge in bringing a small test charge from infinity to that point. For a point charge
$$V = \frac{Q}{4\pi\varepsilon_0 r}.$$
It is positive near a positive charge, negative near a negative charge, and zero at infinity. The electric potential energy of charge $q$ at that point is $qV$, and in a field the change in energy moving through a potential difference is $q\Delta V$. Unlike gravity, potential can be positive or negative.

### Field strength and potential gradient
Field strength is the negative of the potential gradient:
$$E = -\frac{\Delta V}{\Delta r}.$$
On a $V$-$r$ graph the gradient (negated) gives $E$. On an $E$-$r$ graph the area under the curve gives the change in potential. For a uniform field $V$ is linear in distance; for a point charge $E \propto 1/r^2$ and $V \propto 1/r$.

### Field lines and equipotentials
Field lines show the direction of force on a positive charge; they start on positive charges and end on negative ones, never cross, and are closer where the field is stronger. Equipotentials are surfaces of constant potential and cross field lines at right angles. No work is done moving a charge along an equipotential. Around a point charge they are concentric spheres; in a uniform field they are parallel planes.

## Definitions to learn

| Term | Definition |
|---|---|
| Electric field strength | Force per unit positive charge acting on a small test charge at that point. |
| Electric potential | Work done per unit positive charge in bringing a small positive test charge from infinity to the point. |
| Equipotential | A line or surface along which the electric potential is constant. |
| Coulomb's law | The force between two point charges is proportional to the product of the charges and inversely proportional to the square of their separation. |

## Equations

| Equation | Symbols and units | Data sheet? |
|---|---|---|
| $E = F/q$ | N C$^{-1}$ | Learn |
| $F = Qq/(4\pi\varepsilon_0 r^2)$ | $\varepsilon_0 = 8.85\times10^{-12}$ F m$^{-1}$ | Learn |
| $E = Q/(4\pi\varepsilon_0 r^2)$ | V m$^{-1}$ | Learn |
| $E = V/d$ | Uniform field | Learn |
| $V = Q/(4\pi\varepsilon_0 r)$ | Volts | Given |

## Worked example

A 2.0 nC point charge. Find $E$ and $V$ at 0.30 m, using $1/(4\pi\varepsilon_0) = 8.99\times10^{9}$ N m$^2$ C$^{-2}$.

$$\begin{aligned}
E &= \frac{(8.99\times10^{9})(2.0\times10^{-9})}{0.30^2} = \frac{17.98}{0.090} = 2.0\times10^{2}\ \text{V m}^{-1} \\
V &= \frac{(8.99\times10^{9})(2.0\times10^{-9})}{0.30} = 60\ \text{V}
\end{aligned}$$

An electron between plates 0.040 m apart with 800 V across them:

$$\begin{aligned}
E &= \frac{V}{d} = \frac{800}{0.040} = 2.0\times10^{4}\ \text{V m}^{-1} \\
a &= \frac{eE}{m} = \frac{(1.60\times10^{-19})(2.0\times10^{4})}{9.11\times10^{-31}} = 3.5\times10^{15}\ \text{m s}^{-2}
\end{aligned}$$

## Common mistakes
- Forgetting $E$ is a vector: add fields from two charges with direction (and sign), not as scalars.
- Squaring the wrong quantity, such as using $r$ rather than $r^2$ in the field.
- Using $V = Ed$ with $d$ in cm.
- Saying equipotentials are parallel to field lines.
- Ignoring the charge sign when finding the direction of force on an electron (force is opposite to $E$).

## Exam tips
- Use a consistent sign convention for potential energy: attraction lowers energy.
- For motion between plates, write the "projectile" analogy explicitly and name the two components.
- On gradient questions, state that the field is the gradient with a minus sign and give units.
- Draw field lines with arrows, symmetric, and starting or ending on charges at right angles to conductor surfaces.
