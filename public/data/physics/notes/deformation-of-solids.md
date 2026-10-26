# Deformation of solids
> Examiners want stress, strain and Young modulus defined precisely, graphs interpreted correctly, and energy found from areas.

## Key ideas

### Tensile and compressive forces
A tensile force stretches an object and increases its length; a compressive force squeezes it and decreases its length. Forces are needed in pairs (equal and opposite) to deform a body rather than accelerate it. Deformation arises because atoms are displaced from their equilibrium separation, and interatomic forces resist the change.

### Hooke's law
For a spring or wire, the extension is proportional to the applied force up to the limit of proportionality:

$$F = kx$$

where $k$ is the spring constant (force per unit extension, units $\text{N m}^{-1}$) and $x$ is the extension, not the total length. The elastic limit is the maximum force beyond which the material no longer returns to its original length when the force is removed. For many metals the limit of proportionality and the elastic limit are close together but not identical.

### Stress, strain and the Young modulus
Stress is force per unit cross-sectional area, $\sigma = F/A$, unit Pa. Strain is extension per unit original length, $\varepsilon = x/L$, which is a ratio with no unit. The Young modulus is the ratio of stress to strain in the proportional region:

$$E = \frac{\sigma}{\varepsilon} = \frac{FL}{Ax}$$

It is a property of the material, whereas $k$ depends on the sample's dimensions.

Experimental determination (metal wire): clamp a long thin wire horizontally or hang it from a support, with a reference marker and a scale to read extension. Measure the original length with a metre rule, and the diameter with a micrometer at several points along the wire and in perpendicular directions, then average, to get $A = \pi d^2/4$. Add weights in steps, recording extension each time (and unloading too). Plot stress against strain, or $F$ against $x$; the gradient of the straight section gives $E$ (or $EA/L$). A long, thin wire gives a large, measurable extension; the diameter measurement dominates the percentage uncertainty because $d$ is squared.

### Force-extension graphs and elastic energy
The area under a force-extension graph is the work done in stretching. For a linear region this is $E = \tfrac12 Fx = \tfrac12 kx^2$. Energy stored elastically is fully recoverable when the material is within its elastic limit. For loading and unloading curves of a plastically deformed or polymeric sample, the area between the curves represents energy dissipated as thermal energy.

### Elastic and plastic behaviour; material types
- Elastic deformation: the object returns to its original shape when the force is removed.
- Plastic deformation: permanent change in shape; atoms slide past each other.
- Ductile materials (such as copper) show a long plastic region on the stress-strain graph before breaking.
- Brittle materials (such as glass, ceramics) break with almost no plastic region, following a straight line to fracture.
- Polymeric materials (such as rubber) show a curved loading line, and the unloading line is different from the loading line (hysteresis); the area between them is energy transferred to thermal energy.

## Definitions to learn
| Term | Definition |
|---|---|
| Hooke's law | The extension of a material is directly proportional to the applied force, provided the limit of proportionality is not exceeded |
| Spring constant | The force per unit extension |
| Elastic limit | The maximum force or stress for which the material returns to its original length when the force is removed |
| Stress | The force applied per unit cross-sectional area |
| Strain | The extension per unit original length |
| Young modulus | The ratio of stress to strain, in the region where Hooke's law is obeyed |
| Elastic deformation | Deformation that disappears when the force is removed |
| Plastic deformation | Deformation that remains after the force is removed |
| Ultimate tensile stress | The maximum stress a material can withstand before it breaks |

## Equations
| Equation | Symbols and units | On formulae sheet? |
|---|---|---|
| $F = kx$ | N, $\text{N m}^{-1}$, m | No |
| $\sigma = F/A$ | Pa | No |
| $\varepsilon = x/L$ | no unit | No |
| $E = \sigma/\varepsilon$ | Pa | No |
| $E_{el} = \tfrac12 Fx = \tfrac12 kx^2$ | J | No |

## Worked example
A steel wire of length $2.50\ \text{m}$ and diameter $0.40\ \text{mm}$ extends by $2.0\ \text{mm}$ under a load of $20\ \text{N}$.

$$\begin{aligned}
A &= \pi\left(\frac{0.40\times10^{-3}}{2}\right)^2 = 1.26\times10^{-7}\ \text{m}^2 \\
\sigma &= \frac{20}{1.26\times10^{-7}} = 1.59\times10^{8}\ \text{Pa} \\
\varepsilon &= \frac{2.0\times10^{-3}}{2.50} = 8.0\times10^{-4} \\
E &= \frac{1.59\times10^{8}}{8.0\times10^{-4}} = 2.0\times10^{11}\ \text{Pa}
\end{aligned}$$

Energy stored: $\tfrac12 Fx = \tfrac12 (20)(2.0\times10^{-3}) = 0.020\ \text{J}$.

A spring with $k = 400\ \text{N m}^{-1}$ stretched by $5.0\ \text{cm}$ stores $\tfrac12 (400)(0.050)^2 = 0.50\ \text{J}$.

## Common mistakes
- Using the total length instead of the extension in $F = kx$.
- Forgetting to halve the diameter to get the radius.
- Writing the area under the graph as $Fx$ rather than $\tfrac12 Fx$ for a linear region.
- Mixing up Young modulus (a material property) with spring constant (an object property).
- Using the unit N for stress or leaving strain with a unit.
- Calling any permanently stretched material "brittle".

## Exam tips
- When reading a stress-strain gradient, use a large triangle on the straight part only.
- Name the instrument and the reason: micrometer for diameter (high precision), metre rule for length.
- To state energy loss in a loading-unloading cycle, refer to the area enclosed by the loop.
- Convert mm and mm$^2$ to m and m$^2$ before substitution.
- Describe a curve fully: where it is linear, where the elastic limit is, and where it fractures.
