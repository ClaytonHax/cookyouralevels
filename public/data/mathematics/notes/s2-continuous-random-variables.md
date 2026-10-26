# Continuous random variables
> Examiners want integration done cleanly with limits, the total-area condition used to find constants, and a clear distinction between the pdf $f(x)$ and the cumulative distribution function $F(x)$.

## Key ideas

### Probability density functions
A continuous random variable $X$ is described by a probability density function $f(x)$ with
$$f(x)\ge0,\qquad \int_{-\infty}^{\infty}f(x)\,\mathrm{d}x=1.$$
$f$ is usually defined piecewise, and equals 0 outside the stated range. To find an unknown constant such as $k$, integrate $f$ over its range, set equal to 1 and solve. A value of $f(x)$ is a density, not a probability, and can exceed 1.

### Probabilities as areas
$$P(a<X<b)=\int_a^bf(x)\,\mathrm{d}x$$
Since $P(X=a)=0$, it makes no difference whether inequalities are strict. For a piecewise pdf, split the integral at the break points. A sketch of $f$ helps you check the answer is sensible.

### Mean and variance by integration
$$E(X)=\int x f(x)\,\mathrm{d}x,\qquad E(X^2)=\int x^2f(x)\,\mathrm{d}x,\qquad \mathrm{Var}(X)=E(X^2)-[E(X)]^2$$
all integrated over the full range of $X$. Look for symmetry: if $f$ is symmetrical about $c$, then $E(X)=c$ and also the median is $c$. More generally $E(g(X))=\int g(x)f(x)\,\mathrm{d}x$.

### Median and quartiles
The median $m$ satisfies $\int_{-\infty}^mf(x)\,\mathrm{d}x=\tfrac12$. Quartiles satisfy $F=\tfrac14$ and $F=\tfrac34$. Method:
1. Write $F(x)$ for the relevant range (or integrate from the lower limit to $m$).
2. Set it equal to $0.5$ (or $0.25$, $0.75$, or any percentile).
3. Solve for $m$, check it lies in the range of $X$, and reject any root that does not.

### The mode
The mode is the value of $x$ at which $f(x)$ is greatest. On a smooth interior maximum, set $f'(x)=0$ and confirm it is a maximum. If $f$ is increasing across the whole range (like $f(x)=x/8$ on $0\le x\le4$) the mode is at the end of the interval. Sketching $f$ settles it.

### Working between the pdf and the CDF
The cumulative distribution function is
$$F(x)=P(X\le x)=\int_{-\infty}^xf(t)\,\mathrm{d}t$$
Conversely $f(x)=F'(x)$ where it is differentiable. Properties: $F$ is non-decreasing, $F=0$ below the range and $F=1$ above it. Write $F$ in pieces. Then $P(a<X<b)=F(b)-F(a)$.

## Formulae
- **In MF19:** $E(X)=\int xf$; $\mathrm{Var}(X)=\int x^2f-[E(X)]^2$.
- **Memorise** (not in MF19): $\int f=1$; $P(a<X<b)=\int_a^bf$; $F(x)=\int f$; $f=F'$; median $F(m)=\tfrac12$.
- Integration rules from P1/P3 are what you need for the rest.

## Worked example
**Question 1.** A random variable $X$ has pdf $f(x)=kx(4-x)$ for $0\le x\le4$, and $0$ otherwise. Find $k$, $E(X)$, $\mathrm{Var}(X)$, the mode, and $P(X<1)$.

$$\begin{aligned}\int_0^4k(4x-x^2)\,\mathrm{d}x&=k\Big[2x^2-\tfrac{x^3}{3}\Big]_0^4=k\Big(32-\tfrac{64}{3}\Big)=\tfrac{32k}{3}=1\\k&=\tfrac{3}{32}\end{aligned}$$
By symmetry about $x=2$: $E(X)=2$ and the mode is $2$ (the maximum of the parabola).
$$\begin{aligned}E(X^2)&=\tfrac3{32}\int_0^4(4x^3-x^4)\,\mathrm{d}x=\tfrac3{32}\Big[x^4-\tfrac{x^5}{5}\Big]_0^4=\tfrac3{32}\Big(256-\tfrac{1024}{5}\Big)=4.8\\\mathrm{Var}(X)&=4.8-2^2=0.8\\P(X<1)&=\tfrac3{32}\Big[2x^2-\tfrac{x^3}{3}\Big]_0^1=\tfrac3{32}\times\tfrac53=\tfrac5{32}\end{aligned}$$

**Question 2.** $f(x)=\dfrac x8$ for $0\le x\le4$. Find $F(x)$, the median and the lower quartile.

$$\begin{aligned}\int_0^4\tfrac x8\,\mathrm{d}x&=\Big[\tfrac{x^2}{16}\Big]_0^4=1\ \checkmark\\F(x)&=\tfrac{x^2}{16}\quad(0\le x\le4)\\F(m)=\tfrac12&\Rightarrow m^2=8\Rightarrow m=2\sqrt2=2.83\\F(q_1)=\tfrac14&\Rightarrow q_1^2=4\Rightarrow q_1=2\end{aligned}$$

## Common mistakes
- Forgetting the limits, or integrating over the wrong piece of a piecewise function.
- Leaving out the factor $x$ (or $x^2$) in $E(X)$ and $E(X^2)$.
- Using $\int x^2f$ as the variance without subtracting the mean squared.
- Treating $f(x)$ itself as a probability.
- Not checking the median root lies in the range.
- Writing $F(x)$ only for one piece and omitting $0$ and $1$ outside.

## Exam tips
- Sketch $f(x)$: it reveals the mode, symmetry and whether your constant is plausible.
- Keep fractions exact until the final line.
- Show the integral with limits and the antiderivative in square brackets for method marks.
- For quartile equations that become cubic, a calculator solve is acceptable once the equation is shown.
- Check $F(\text{upper limit})=1$ as a final sanity check.
