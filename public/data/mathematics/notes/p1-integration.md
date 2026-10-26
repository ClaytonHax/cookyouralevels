# Integration
> Examiners want correct reverse-differentiation, constants of integration used, and areas and volumes set up with the right limits and squared functions.

## Key ideas

### Integration as reverse differentiation
If $\dfrac{dy}{dx}=f(x)$ then $y=\int f(x)\,dx$. Integrating undoes differentiating, so differentiate your answer to check. Always add $+c$ for an indefinite integral.

### Integrating powers
$$\int ax^n\,dx=\frac{ax^{n+1}}{n+1}+c\qquad(n\ne-1).$$
Rewrite roots and reciprocals as powers first. For linear brackets,
$$\int(ax+b)^n\,dx=\frac{(ax+b)^{n+1}}{a(n+1)}+c\qquad(n\ne-1),$$
dividing by the coefficient of $x$ inside.

### Finding the constant
Given $\dfrac{dy}{dx}$ and a point on the curve, integrate to get $y$ with $+c$, then substitute the point to find $c$. The question will state the point.

### Definite integrals
$$\int_a^bf(x)\,dx=F(b)-F(a).$$
No $+c$ is needed. Show the substitution of both limits.

### Area under a curve and between curves
- Area between a curve and the $x$-axis from $x=a$ to $x=b$ is $\int_a^by\,dx$ (if the curve is above the axis).
- Area where a curve is below the axis comes out negative; take the positive value, and split at roots if it crosses the axis.
- Area between a curve and a line (or two curves): $\int_a^b(y_{\text{top}}-y_{\text{bottom}})\,dx$, with $a,b$ the intersection $x$-values.
- For regions bounded by a line and curve, the area under the line can also be found as a trapezium or triangle.

### Volumes of revolution
Rotating the region about the $x$-axis through $360^\circ$:
$$V=\pi\int_a^by^2\,dx.$$
Rotating about the $y$-axis:
$$V=\pi\int_{c}^{d}x^2\,dy,$$
where $x^2$ must first be written in terms of $y$. Square the **whole** function before integrating.

### Combining with other topics
Typical combinations: integrate the gradient to find the curve, then find where it meets a line; or find a tangent, then the area enclosed with the curve. Plan the steps and keep exact values.

## Formulae
- **In MF19:** $\int x^n\,dx=\dfrac{x^{n+1}}{n+1}$ ($n\ne-1$; the booklet omits $+c$, you must not).
- **Memorise** (not in MF19): $\int(ax+b)^n\,dx=\dfrac{(ax+b)^{n+1}}{a(n+1)}+c$.
- **Memorise** (not in MF19): area $=\int y\,dx$; volume $V=\pi\int y^2\,dx$ and $\pi\int x^2\,dy$.

## Worked example
**Question 1.** A curve has $\dfrac{dy}{dx}=3x^2-2x$ and passes through $(1,5)$. Find its equation.

**Solution.**
$$y=x^3-x^2+c.$$
At $(1,5)$: $1-1+c=5$, so $c=5$. Hence $y=x^3-x^2+5$.

**Question 2.** The curve $y=4x-x^2$ and the line $y=x$ meet at $O$ and $A$. Find the area enclosed.

**Solution.** Equate: $4x-x^2=x\Rightarrow x(3-x)=0$, so $x=0$ or $x=3$. The curve is above the line between them:
$$\begin{aligned}\text{Area}&=\int_0^3(3x-x^2)\,dx=\left[\frac{3x^2}2-\frac{x^3}3\right]_0^3\\&=\frac{27}2-9=\frac92.\end{aligned}$$

**Question 3.** The region under $y=x^2+1$ between $x=0$ and $x=1$ is rotated through $360^\circ$ about the $x$-axis. Find the volume.

**Solution.**
$$\begin{aligned}V&=\pi\int_0^1(x^2+1)^2\,dx=\pi\int_0^1(x^4+2x^2+1)\,dx\\&=\pi\left[\frac{x^5}5+\frac{2x^3}3+x\right]_0^1=\pi\left(\frac15+\frac23+1\right)=\frac{28\pi}{15}.\end{aligned}$$

## Common mistakes
- Forgetting $+c$ in indefinite integrals.
- Not dividing by the coefficient of $x$ for $(ax+b)^n$.
- Volume: squaring only the first term, or forgetting $\pi$.
- Area: subtracting the wrong way, or integrating a curve that crosses the axis in one go.
- Using $n=-1$ in the power rule (that gives a logarithm; see P2).

## Exam tips
- Sketch the region before choosing limits and top/bottom curves.
- Use exact fractions; convert to decimals only for the final answer when asked.
- Differentiate your integral to check it.
- For "find the curve from its gradient", the point is the signal that you need $c$.
