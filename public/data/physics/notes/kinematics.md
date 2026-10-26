# Kinematics
> Examiners want the right equation chosen from the data given, signs handled consistently, and graph gradients and areas interpreted correctly.

## Key ideas

### Displacement, speed, velocity, acceleration
Displacement is a vector: straight-line distance from the start in a stated direction. Distance is the scalar path length. Speed is the rate of change of distance; velocity is the rate of change of displacement, so it is a vector. Acceleration is the rate of change of velocity; a body moving in a circle at constant speed is accelerating because its velocity direction changes. Choose a positive direction first and treat opposite directions as negative.

### Motion graphs
- Displacement-time: gradient is velocity. A curve means changing velocity; the gradient of a tangent gives instantaneous velocity.
- Velocity-time: gradient is acceleration; area under the graph is displacement (areas below the axis count as negative displacement).
- Acceleration-time: area under the graph is change in velocity.
A straight line on a velocity-time graph means constant acceleration; a horizontal line means constant velocity.

### Constant-acceleration equations
These apply only when acceleration is constant, along a straight line:

$$v = u + at,\qquad s = ut + \tfrac12 at^2,\qquad v^2 = u^2 + 2as,\qquad s = \tfrac12(u+v)t$$

Derivation outline: acceleration is the gradient of the $v$-$t$ graph, so $a = (v-u)/t$ gives the first. The area under the graph (a trapezium) is $s = \tfrac12(u+v)t$; substituting $v = u+at$ gives the second, and eliminating $t$ gives the third. List $s, u, v, a, t$, write the three known values, and choose the equation that links the unknown.

### Free fall and measuring g
Near the Earth's surface, with air resistance negligible, every object falls with the same acceleration $g = 9.81\ \text{m s}^{-2}$ downward. Experimental determination: drop a small dense ball through a measured height $h$ and time the fall $t$ electronically (electromagnet release and trapdoor switch, or light gates). Since $h = \tfrac12 g t^2$, plotting $h$ against $t^2$ gives a straight line through the origin with gradient $g/2$. Using a dense ball and a large height keeps air resistance and timing error small.

### Projectile motion
Resolve the initial velocity into horizontal and vertical components. The two motions are independent:
- horizontal: no acceleration (ignoring air resistance), $s_x = u_x t$ with $u_x = u\cos\theta$
- vertical: constant acceleration $g$ downward, with $u_y = u\sin\theta$

The time of flight is shared. At the top of the path, vertical velocity is zero while horizontal velocity is unchanged. With air resistance the range and maximum height are reduced and the path becomes asymmetrical.

## Definitions to learn
| Term | Definition |
|---|---|
| Displacement | Distance in a specified direction (from a reference point) |
| Speed | Rate of change of distance |
| Velocity | Rate of change of displacement |
| Acceleration | Rate of change of velocity |
| Acceleration of free fall | The acceleration of a body moving under gravity alone, $9.81\ \text{m s}^{-2}$ near the Earth's surface |

## Equations
| Equation | Symbols and units | On formulae sheet? |
|---|---|---|
| $v = u + at$ | $u,v$ in $\text{m s}^{-1}$; $a$ in $\text{m s}^{-2}$; $t$ in s | No |
| $s = ut + \tfrac12 at^2$ | $s$ in m | Yes |
| $v^2 = u^2 + 2as$ | as above | Yes |
| $s = \tfrac12(u+v)t$ | as above | No |

## Worked example
A projectile is launched from level ground at $20\ \text{m s}^{-1}$ at $30^\circ$ above the horizontal. Take $g = 9.81\ \text{m s}^{-2}$.

$$\begin{aligned}
u_x &= 20\cos 30^\circ = 17.3\ \text{m s}^{-1}, \qquad u_y = 20\sin 30^\circ = 10.0\ \text{m s}^{-1} \\
\text{Return to the ground: } 0 &= u_y t - \tfrac12 g t^2 \;\Rightarrow\; t = \frac{2u_y}{g} = \frac{2(10.0)}{9.81} = 2.04\ \text{s} \\
\text{Range} &= u_x t = 17.3 \times 2.04 = 35.3\ \text{m} \\
\text{Max height: } 0 &= u_y^2 - 2gh \;\Rightarrow\; h = \frac{10.0^2}{2(9.81)} = 5.10\ \text{m}
\end{aligned}$$

A car moving at $12\ \text{m s}^{-1}$ accelerates at $2.5\ \text{m s}^{-2}$ for $6.0\ \text{s}$:

$$\begin{aligned}
v &= 12 + 2.5(6.0) = 27\ \text{m s}^{-1} \\
s &= 12(6.0) + \tfrac12(2.5)(6.0)^2 = 72 + 45 = 117\ \text{m}
\end{aligned}$$

## Common mistakes
- Using the constant-acceleration equations when acceleration is not constant.
- Forgetting that velocity and displacement can be negative; sign errors with $g$.
- Treating the gradient of a $d$-$t$ graph as acceleration.
- Using the total area under a $v$-$t$ graph when part lies below the axis and the question asks for displacement (or distance, which needs absolute areas).
- Saying velocity is zero at the top of a projectile path; only the vertical component is zero.
- Using the angle to the wrong axis when resolving.

## Exam tips
- Write "take upward as positive" and keep $a = -9.81$.
- Draw tangents with a large triangle and show the read-offs.
- In "show that" parts, quote the answer to one more significant figure than the target.
- For graphs of $s$ against $t^2$, rearrange the equation into $y = mx + c$ form before reading the gradient.
- Explain a curved $v$-$t$ graph by changing acceleration (for example drag increasing with speed).
