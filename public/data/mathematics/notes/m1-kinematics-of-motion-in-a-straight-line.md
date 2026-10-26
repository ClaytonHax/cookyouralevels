# Kinematics of motion in a straight line
> Examiners want you to pick the right tool (graph, suvat or calculus), define a positive direction, and distinguish displacement from distance.

## Key ideas

### Displacement-time and velocity-time graphs
On a **displacement-time** graph the gradient is velocity; a horizontal section means the object is at rest, and a straight line means constant velocity. On a **velocity-time** graph the gradient is acceleration; a horizontal line is constant velocity; a line crossing the $t$-axis means the object has turned round. When sketching, label axes with units, mark key times and values, and make every straight or curved section match what the question says.

### Area and gradient on a velocity-time graph
1. Gradient of the $v$-$t$ graph at a time gives acceleration at that time.
2. The **signed area** between the graph and the $t$-axis gives displacement; areas below the axis count negative.
3. For **distance travelled**, add the magnitudes of all areas.
4. Split the area into rectangles, triangles and trapezia. For a trapezium, area $=\tfrac12(a+b)h$ with parallel sides the two velocities.

### Constant acceleration (suvat)
These apply only when acceleration is constant in a straight line:
$$v=u+at,\qquad s=ut+\tfrac12at^2,\qquad v^2=u^2+2as,\qquad s=\tfrac12(u+v)t$$
Method:
1. List $s,u,v,a,t$ with signs, writing down the three you know and the one you want.
2. Pick the equation that contains exactly those four.
3. Solve, remembering a quadratic in $t$ may give two roots; reject any that are physically impossible.

### Vertical motion under gravity
Treat gravity as constant acceleration $g=10\ \mathrm{m\,s^{-2}}$ downwards. Choose up as positive so $a=-10$. At the highest point $v=0$. A particle thrown up and returning to its starting height has the same speed it was thrown with, and the time up equals the time down. If the particle lands below the starting point, $s$ is negative.

### Variable acceleration using calculus
When acceleration is not constant, $v$ and $a$ are functions of $t$:
$$v=\frac{\mathrm{d}s}{\mathrm{d}t},\qquad a=\frac{\mathrm{d}v}{\mathrm{d}t}=\frac{\mathrm{d}^2s}{\mathrm{d}t^2}$$
Going the other way, integrate: $v=\int a\,\mathrm{d}t$, $s=\int v\,\mathrm{d}t$. Find the constant of integration from the given condition (often $s=0$ and $v=0$ at $t=0$). For maximum speed, set $a=0$. For when a particle is instantaneously at rest, set $v=0$. To get *distance* when the particle changes direction, split the integral at each time $v=0$ and add the absolute values.

### Problems with several stages
Break the motion at each change of acceleration. The final velocity of one stage is the initial velocity of the next. Sketch a $v$-$t$ graph first: total distance is total area, and total time is the sum of stage times. Write the stages down as separate suvat calculations, and link them through shared quantities (time, speed, distance).

## Formulae
- **In MF19** (Mechanics, uniformly accelerated motion): $v=u+at$, $s=\tfrac12(u+v)t$, $s=ut+\tfrac12at^2$, $v^2=u^2+2as$.
- **Memorise** (not in MF19): $s=vt-\tfrac12at^2$, and the calculus links $v=\mathrm{d}s/\mathrm{d}t$, $a=\mathrm{d}v/\mathrm{d}t$ with the reverse by integration.
- Use $g=10\ \mathrm{m\,s^{-2}}$ throughout.
- **Memorise** the area of a trapezium $=\tfrac12(a+b)h$ (not in MF19).

## Worked example
**Question 1.** A ball is thrown vertically upwards at $20\ \mathrm{m\,s^{-1}}$ from a point $25\ \mathrm{m}$ above the ground. Find the time taken to reach the ground and the greatest height above the ground.

Take up as positive: $u=20$, $a=-10$, and on reaching the ground $s=-25$.
$$\begin{aligned}-25&=20t-5t^2\\5t^2-20t-25&=0\\t^2-4t-5&=0\\(t-5)(t+1)&=0\end{aligned}$$
Reject $t=-1$, so $t=5\ \mathrm{s}$.

At greatest height $v=0$:
$$\begin{aligned}0&=20^2-2\times10\times s\\s&=20\ \mathrm{m}\end{aligned}$$
Greatest height above the ground $=25+20=45\ \mathrm{m}$.

**Question 2.** A particle moves in a straight line with velocity $v=12t-3t^2\ \mathrm{m\,s^{-1}}$ for $t\ge0$. Find its maximum velocity and its displacement from the start when it next comes to rest.

Acceleration $a=12-6t$. Maximum velocity when $a=0$, so $t=2$:
$$v=12(2)-3(2)^2=12\ \mathrm{m\,s^{-1}}$$
At rest: $12t-3t^2=0$ gives $t=4$ (the next time after $t=0$). Displacement:
$$s=\int_0^4(12t-3t^2)\,\mathrm{d}t=\Big[6t^2-t^3\Big]_0^4=96-64=32\ \mathrm{m}$$

## Common mistakes
- Using suvat when acceleration is a function of $t$.
- Mixing signs: taking up as positive for $u$ but then using $+10$ for $a$.
- Giving displacement when the question asks for distance (or vice versa) after the particle turns round.
- Forgetting a constant of integration, or not applying the initial condition.
- Reading the gradient of a $v$-$t$ graph as velocity (it is acceleration).
- Not rejecting the negative root for time.

## Exam tips
- Write "take upwards as positive" as your first line on vertical motion.
- Sketch the $v$-$t$ graph for multi-stage questions, then use areas rather than solving many equations.
- For "show that" with calculus, display each differentiation or integration step.
- Check that answers are plausible: speeds of hundreds of m s$^{-1}$ from a ball thrown by hand are a warning sign.
- Quote results to 3 significant figures unless an exact value is requested.
