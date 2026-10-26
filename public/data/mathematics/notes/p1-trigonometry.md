# Trigonometry
> Examiners want exact values known, the two core identities used fluently, and equations solved fully within the stated interval (no solutions missed, none extra).

## Key ideas

### Graphs of sine, cosine and tangent
- $y=\sin x$ and $y=\cos x$: period $360^\circ$ ($2\pi$), range $-1\le y\le1$. $\sin$ passes through the origin; $\cos$ starts at $1$. $\cos x$ is symmetric about the $y$-axis, $\sin x$ has rotational symmetry about the origin.
- $y=\tan x$: period $180^\circ$ ($\pi$), range all real numbers, asymptotes at $x=90^\circ,270^\circ,\dots$ (that is, $\pm\dfrac\pi2,\dots$), passes through the origin.

Know the sign pattern (ASTC / CAST): in the four quadrants, all, sin, tan, cos are positive respectively.

### Exact values
$$\begin{array}{c|ccc}&30^\circ&45^\circ&60^\circ\\\hline\sin&\tfrac12&\tfrac{\sqrt2}2&\tfrac{\sqrt3}2\\\cos&\tfrac{\sqrt3}2&\tfrac{\sqrt2}2&\tfrac12\\\tan&\tfrac1{\sqrt3}&1&\sqrt3\end{array}$$
Derive them from the half-equilateral triangle (sides $1,2,\sqrt3$) and the isosceles right triangle (sides $1,1,\sqrt2$).

### Identities
$$\tan\theta=\frac{\sin\theta}{\cos\theta},\qquad\sin^2\theta+\cos^2\theta=1.$$
Use them to convert an equation into a single trig function, or to prove other identities. Rearranged forms: $\sin^2\theta=1-\cos^2\theta$ and $\cos^2\theta=1-\sin^2\theta$.

### Solving equations in a given interval
1. Rearrange to $\sin(\text{angle})=k$ (or $\cos$, $\tan$).
2. Find the principal value with the calculator.
3. Find the other solutions using symmetry: $\sin\theta=\sin(180^\circ-\theta)$; $\cos\theta=\cos(-\theta)=\cos(360^\circ-\theta)$; $\tan$ repeats every $180^\circ$.
4. Add multiples of the period.
5. If the argument is $nx$ or $x+\alpha$, adjust the interval first, solve, then rearrange for $x$.

### Equations needing an identity or a quadratic
Replace $\sin^2$ with $1-\cos^2$ (or the reverse) so only one trig function remains, then solve the resulting quadratic. For $\sin\theta=k\cos\theta$, divide to get $\tan\theta=k$. Reject any value outside $[-1,1]$ for $\sin$ and $\cos$.

### Transformations of trig graphs
Use the function transformation rules: $y=a\sin x$ has amplitude $a$; $y=\sin(bx)$ has period $\dfrac{360^\circ}b$; $y=\sin(x+c)$ shifts left by $c$; $y=\sin x+d$ shifts up by $d$.

### Counting solutions from a graph
Sketch the left-hand side and right-hand side (or just $y=\sin x$ and a horizontal line $y=k$) over the interval. The number of intersections is the number of solutions. Be careful with endpoints.

## Formulae
- **In MF19:** $\tan\theta=\dfrac{\sin\theta}{\cos\theta}$ and $\sin^2\theta+\cos^2\theta=1$.
- **Memorise** (not in MF19): exact values for $30^\circ,45^\circ,60^\circ$.
- **Memorise:** $360^\circ=2\pi$; period of $\tan$ is $\pi$.
- The sine rule, cosine rule and $\tfrac12ab\sin C$ are not in MF19 either; memorise them if you use them.

## Worked example
**Question.** Solve, for $0^\circ\le x\le360^\circ$: (a) $2\sin^2x+\cos x=1$; (b) $\tan2x=1$ for $0\le x\le\pi$ (radians).

**Solution.**
(a) Replace $\sin^2x=1-\cos^2x$:
$$\begin{aligned}2(1-\cos^2x)+\cos x&=1\\2\cos^2x-\cos x-1&=0\\(2\cos x+1)(\cos x-1)&=0.\end{aligned}$$
So $\cos x=-\tfrac12$ or $\cos x=1$.
- $\cos x=-\tfrac12$: $x=120^\circ,240^\circ$.
- $\cos x=1$: $x=0^\circ,360^\circ$.

Check $x=120^\circ$: $2\left(\tfrac34\right)-\tfrac12=1$. Solutions: $0^\circ,120^\circ,240^\circ,360^\circ$.

(b) Let $u=2x$, then $0\le u\le2\pi$. $\tan u=1$ gives $u=\dfrac\pi4,\ \dfrac{5\pi}4$. So
$$x=\frac\pi8,\ \frac{5\pi}8.$$

## Common mistakes
- Giving only the calculator's principal value.
- Dividing both sides by $\cos x$ in a quadratic-type equation and losing solutions (for example when $\cos x=0$ could be a root).
- Not changing the interval when solving for $2x$ or $x+30^\circ$.
- Using the wrong period for $\tan$ ($180^\circ$, not $360^\circ$).
- Forgetting to reject $\sin x=2$ or similar.
- Calculator in the wrong mode.

## Exam tips
- Write the interval for the new argument, for example "$0\le2x\le720^\circ$", before solving.
- Give degree answers to 1 d.p. unless told otherwise, and radian answers to 3 s.f.
- Use a quick sketch of the graph to be sure you have every solution.
- "Hence" means use the previous part's result, usually as a substitution.
