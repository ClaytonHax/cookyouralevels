# Differentiation
> Examiners want derivatives found accurately (including fractional and negative powers), tangents and normals written correctly, and stationary points classified and justified.

## Key ideas

### The derivative as gradient and rate of change
$\dfrac{dy}{dx}$ is the gradient of the tangent to the curve at a point, and the rate at which $y$ changes with respect to $x$. If $y$ is distance and $x$ is time, $\dfrac{dy}{dx}$ is speed. A positive value means $y$ is increasing, negative means decreasing.

### Differentiating powers of $x$
$$\frac d{dx}(ax^n)=anx^{n-1}.$$
Rewrite before differentiating: roots as fractional powers ($\sqrt x=x^{1/2}$) and reciprocals as negative powers ($\dfrac1{x^2}=x^{-2}$). Split fractions such as $\dfrac{x^2+3}{x}$ into separate terms first. Constants differentiate to $0$.

### The chain rule
For $y=f(u)$ with $u=g(x)$:
$$\frac{dy}{dx}=\frac{dy}{du}\times\frac{du}{dx}.$$
For $(ax+b)^n$ this gives $na(ax+b)^{n-1}$. Always multiply by the derivative of the inside.

### Tangents and normals
1. Find $\dfrac{dy}{dx}$ and substitute the $x$-coordinate to get the gradient $m$.
2. Find the point $(x_1,y_1)$ on the curve.
3. Tangent: $y-y_1=m(x-x_1)$.
4. Normal: gradient $-\dfrac1m$, same point.

### Second derivatives and stationary points
Stationary points are where $\dfrac{dy}{dx}=0$.
1. Solve $\dfrac{dy}{dx}=0$ for $x$, then find $y$.
2. Find $\dfrac{d^2y}{dx^2}$ and substitute each $x$.
3. If $\dfrac{d^2y}{dx^2}>0$ it is a **minimum**; if $<0$ a **maximum**. If $=0$ the test fails; check the sign of $\dfrac{dy}{dx}$ on either side.

### Increasing and decreasing functions
$f$ is increasing where $f'(x)>0$ and decreasing where $f'(x)<0$. Solve the inequality (usually a quadratic inequality) and state the intervals.

### Optimisation and connected rates of change
**Optimisation.**
1. Write the quantity to optimise in terms of one variable, using the constraint.
2. Differentiate and set to zero.
3. Confirm max or min with the second derivative.
4. Answer in context with units.

**Connected rates.** Use the chain rule, for example $\dfrac{dV}{dt}=\dfrac{dV}{dr}\times\dfrac{dr}{dt}$.

## Formulae
- **In MF19:** $\dfrac d{dx}(x^n)=nx^{n-1}$.
- **Memorise** (not in MF19): the chain rule, and perpendicular gradients $m_1m_2=-1$.
- Tangent: $y-y_1=m(x-x_1)$ — memorise.

## Worked example
**Question 1.** Find and classify the stationary points of $y=x^3-6x^2+9x+1$.

**Solution.**
$$\frac{dy}{dx}=3x^2-12x+9=3(x-1)(x-3).$$
Stationary when $x=1$ or $x=3$.
- $x=1$: $y=1-6+9+1=5$.
- $x=3$: $y=27-54+27+1=1$.

$\dfrac{d^2y}{dx^2}=6x-12$. At $x=1$: $-6<0$, a maximum at $(1,5)$. At $x=3$: $6>0$, a minimum at $(3,1)$.

**Question 2.** Find the equation of the normal to $y=\sqrt{4x+1}$ at $x=2$.

**Solution.** $y=(4x+1)^{1/2}$, so
$$\frac{dy}{dx}=\tfrac12(4x+1)^{-1/2}\times4=\frac2{\sqrt{4x+1}}.$$
At $x=2$: $y=3$ and gradient $\tfrac23$. Normal gradient $-\tfrac32$:
$$y-3=-\tfrac32(x-2)\;\Rightarrow\;2y-6=-3x+6\;\Rightarrow\;3x+2y=12.$$

**Question 3.** An open tank with a square base of side $x$ m and height $h$ m has volume $32\text{ m}^3$. Find the least surface area.

**Solution.** $x^2h=32$, so $h=\dfrac{32}{x^2}$. Area
$$A=x^2+4xh=x^2+\frac{128}x.$$
$$\frac{dA}{dx}=2x-\frac{128}{x^2}=0\;\Rightarrow\;x^3=64,\ x=4.$$
$\dfrac{d^2A}{dx^2}=2+\dfrac{256}{x^3}=6>0$, so a minimum. $A=16+32=48\text{ m}^2$.

## Common mistakes
- Differentiating without rewriting roots or fractions as powers.
- Chain rule: forgetting the factor $a$ from the inside.
- Using the tangent gradient for the normal.
- Calling a point a maximum or minimum without justification.
- Optimisation: not showing the second derivative or not giving the final quantity asked for.

## Exam tips
- Give $y$-coordinates as well as $x$ when asked for stationary points.
- Use the nature test that is easiest; for a cubic the second derivative is usually quickest.
- Include units and context in the final answer for optimisation and rates questions.
- "Show that" derivative questions need the working visible, not just the result.
