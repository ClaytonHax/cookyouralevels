# Numerical solution of equations
> Examiners want a justified sign-change argument, a valid rearrangement, iteration carried out to the stated accuracy, and a reasoned statement about convergence.

## Key ideas

### Locating roots by sign change
If $f$ is **continuous** on $[a,b]$ and $f(a)$, $f(b)$ have opposite signs, there is at least one root in the interval.

1. Calculate $f(a)$ and $f(b)$ accurately.
2. State that they have opposite signs (give the values).
3. State that $f$ is continuous, and conclude there is a root in $(a,b)$.

Caution: a sign change can hide a vertical asymptote (like $\tan x$ or $\frac1x$), which is not a root. No sign change does not prove there is no root, because there may be two roots (or an even number). To show a root is correct to $n$ decimal places, test the values $\alpha\pm0.5\times10^{-n}$ and show a sign change.

### Rearranging into $x=g(x)$
Rearrange $f(x)=0$ to isolate $x$ on one side. Many rearrangements are possible, and not all converge. For $x^3-x-3=0$:
$$x=\sqrt[3]{x+3}\qquad\text{or}\qquad x=\frac{3}{x^2-1}$$
You may be told the rearrangement, or asked to "show that" the equation can be written in the form. Work backwards from the target, or from the equation, keeping every step visible.

### Using the iteration
$$x_{n+1}=g(x_n)$$
1. Start from the given $x_0$ (usually within the sign-change interval).
2. Enter $x_0$, then repeatedly apply $g$ using the calculator's answer key.
3. Record values to more figures than needed (at least 5 or 6 s.f.) in working.
4. Stop when two successive values agree to the required accuracy, and check by sign change.

### Convergence
Iteration converges to a root $\alpha$ if the start is close enough and
$$|g'(\alpha)|<1$$
- $0<g'(\alpha)<1$: monotonic convergence (staircase).
- $-1<g'(\alpha)<0$: oscillating convergence (cobweb spiral in).
- $|g'(\alpha)|>1$: diverges, even if the start is very close.

The smaller $|g'(\alpha)|$, the faster the convergence.

### Cobweb and staircase diagrams
1. Sketch $y=x$ and $y=g(x)$.
2. From $x_0$ on the $x$-axis go vertically to the curve, then horizontally to $y=x$, then vertically to the curve again, and repeat.
3. The path goes toward the intersection (root) for convergence and away for divergence. A staircase has all steps on one side; a cobweb spirals.
Label $x_0,x_1,x_2$ on the axis.

## Formulae
- **In MF19:** nothing for this topic.
- **Memorise:** the sign-change statement, the iteration form $x_{n+1}=g(x_n)$, and the convergence condition $|g'(\alpha)|<1$.

## Worked example
**Q1.** (a) Show that $x^3-x-3=0$ has a root between $1$ and $2$. (b) Use $x_{n+1}=\sqrt[3]{x_n+3}$ with $x_0=1.5$ to find the root to 3 decimal places.

(a) Let $f(x)=x^3-x-3$. $f(1)=-3<0$ and $f(2)=3>0$. $f$ is continuous, so there is a root in $(1,2)$.

(b) 
$$\begin{aligned}x_1&=1.6510\\x_2&=1.6692\\x_3&=1.6714\\x_4&=1.6717\\x_5&=1.6717\end{aligned}$$
Root $\approx1.672$ (3 d.p.).

Check: $f(1.6715)<0$ and $f(1.6725)>0$, so the root lies in $(1.6715,1.6725)$, which confirms $1.672$.

**Q2.** Explain why $x_{n+1}=\sqrt[3]{x_n+3}$ converges near the root.

$g(x)=(x+3)^{1/3}$, so $g'(x)=\dfrac{1}{3(x+3)^{2/3}}$. At $x\approx1.67$, $g'\approx\dfrac1{3(4.67)^{2/3}}\approx0.12$, which is between $0$ and $1$. So the iteration converges, monotonically.

## Common mistakes
- Omitting "continuous" in the sign-change conclusion.
- Using only one value as evidence, or giving no values.
- Rounding in the middle of the iteration, so later values drift.
- Calculator in degrees for trig-based iterations (use radians).
- Claiming convergence because the first two values are close.
- Confusing $g'(\alpha)$ with $f'(\alpha)$.

## Exam tips
- Show at least the first couple of iterates with their full values.
- For "correct to $n$ d.p." questions, always do the interval check.
- Write down $g(x)$ and $g'(x)$ clearly in convergence explanations.
- In a diagram, draw both curves and label the root.
