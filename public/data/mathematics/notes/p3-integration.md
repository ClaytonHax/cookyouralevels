# Integration
> Examiners want the right technique chosen quickly (substitution, parts, partial fractions, identities), exact definite integrals, and volumes and trapezium estimates set up correctly.

## Key ideas

### Standard integrals
$$\int e^{kx}dx=\frac{e^{kx}}{k}+c,\quad\int\frac{1}{ax+b}dx=\frac1a\ln|ax+b|+c,\quad\int\sin kx\,dx=-\frac{\cos kx}{k}+c$$
$$\int\cos kx\,dx=\frac{\sin kx}{k}+c,\quad\int\sec^2kx\,dx=\frac{\tan kx}{k}+c,\quad\int\frac{f'(x)}{f(x)}dx=\ln|f(x)|+c$$
Also $\int a^x\,dx=\dfrac{a^x}{\ln a}+c$. Reverse-chain-rule recognition: $\int f'(x)\,[f(x)]^n\,dx$ and $\int f'(x)e^{f(x)}dx$.

### Integration by substitution
1. Choose $u=g(x)$ (often the inner function, or the thing under a root).
2. Find $\dfrac{du}{dx}$ and rewrite $dx$ in terms of $du$.
3. Replace **everything**, including $x$ terms: write $x$ in terms of $u$.
4. For definite integrals, change the limits to $u$-values and never go back to $x$.

### Integration by parts
$$\int u\,\frac{dv}{dx}dx=uv-\int v\frac{du}{dx}dx$$
Choose $u$ as the factor that simplifies on differentiation (use LIATE: Logs, Inverse trig, Algebra, Trig, Exponential). For $\int\ln x\,dx$ take $u=\ln x$, $\dfrac{dv}{dx}=1$. Some questions need parts twice.

### Partial fractions in integration
Split the fraction first, integrate each part: $\dfrac{A}{x-a}\to A\ln|x-a|$ and $\dfrac{B}{(x-a)^2}\to-\dfrac{B}{x-a}$. Combine logs using $\ln a-\ln b=\ln\tfrac ab$ for neat exact answers.

### Trig identities in integration
- $\sin^2x=\tfrac12(1-\cos2x)$, $\cos^2x=\tfrac12(1+\cos2x)$.
- $\tan^2x=\sec^2x-1$.
- $\sin A\cos B$ products via the factor formulae, or $\sin x\cos x=\tfrac12\sin2x$.

### Areas and volumes of revolution
- Area under $y=f(x)$: $\int_a^by\,dx$ (parametric: $\int y\dfrac{dx}{dt}dt$ with limits in $t$).
- About the $x$-axis: $V=\pi\int_a^by^2\,dx$. About the $y$-axis: $V=\pi\int_c^dx^2\,dy$.
- For a region between two curves, subtract areas (or subtract volumes), never square the difference.

### Trapezium rule
With $n$ strips of width $h=\dfrac{b-a}{n}$:
$$\int_a^bf(x)\,dx\approx\frac h2\left[y_0+2(y_1+\dots+y_{n-1})+y_n\right]$$
For a curve above the axis, a convex (curving upward) graph is overestimated and a concave (curving downward) graph is underestimated; sketch to decide.

## Formulae
- **In MF19:** $\int x^n$, $\int\dfrac1x$, $\int e^x$, $\int\sin x$, $\int\cos x$, $\int\sec^2x$, $\int\dfrac1{x^2+a^2}$, $\int\dfrac1{x^2-a^2}$, $\int\dfrac1{a^2-x^2}$, the parts formula $\int u\dfrac{dv}{dx}dx=uv-\int v\dfrac{du}{dx}dx$, $\int\dfrac{f'(x)}{f(x)}dx=\ln|f(x)|$, and the double-angle identities.
- **Memorise** (not in MF19): the volume formula, the trapezium rule, the procedure for each technique, and the "$\div k$" factor whenever the argument is $kx$ (the booklet lists $\sin x$, not $\sin kx$).

## Worked example
**Q1.** Find the exact value of $\displaystyle\int_0^1xe^{2x}\,dx$.

Let $u=x$, $\dfrac{dv}{dx}=e^{2x}$, so $\dfrac{du}{dx}=1$, $v=\tfrac12e^{2x}$.
$$\begin{aligned}\int_0^1xe^{2x}dx&=\left[\tfrac12xe^{2x}\right]_0^1-\int_0^1\tfrac12e^{2x}dx\\&=\tfrac12e^2-\left[\tfrac14e^{2x}\right]_0^1\\&=\tfrac12e^2-\tfrac14(e^2-1)\\&=\frac{e^2+1}{4}\end{aligned}$$

**Q2.** Use $u=x+1$ to find $\displaystyle\int_0^3\frac{x}{\sqrt{x+1}}dx$.

$du=dx$ and $x=u-1$. Limits: $x=0\to u=1$, $x=3\to u=4$.
$$\begin{aligned}\int_1^4\frac{u-1}{\sqrt u}du&=\int_1^4\left(u^{1/2}-u^{-1/2}\right)du\\&=\left[\tfrac23u^{3/2}-2u^{1/2}\right]_1^4\\&=\left(\tfrac{16}3-4\right)-\left(\tfrac23-2\right)\\&=\tfrac43+\tfrac43=\tfrac83\end{aligned}$$

**Q3.** The region under $y=e^{x/2}$ for $0\le x\le2$ is rotated about the $x$-axis. Find the volume.

$$V=\pi\int_0^2e^{x}dx=\pi\left[e^x\right]_0^2=\pi(e^2-1)$$

**Q4.** Find the exact value of $\displaystyle\int_2^6\frac{5}{(x-1)(x+4)}dx$.

$\dfrac{5}{(x-1)(x+4)}\equiv\dfrac1{x-1}-\dfrac1{x+4}$. Then
$$\begin{aligned}\int_2^6&=\Big[\ln(x-1)-\ln(x+4)\Big]_2^6\\&=(\ln5-\ln10)-(\ln1-\ln6)\\&=\ln\tfrac12+\ln6=\ln3\end{aligned}$$

**Q5.** Find $\displaystyle\int_0^{\pi/2}\sin^2x\,dx$.

$$\int_0^{\pi/2}\tfrac12(1-\cos2x)\,dx=\left[\tfrac x2-\tfrac{\sin2x}4\right]_0^{\pi/2}=\frac\pi4$$

## Common mistakes
- Not changing limits (or the integrand's $x$) after a substitution.
- Forgetting $\pi$ in a volume, or squaring $y$ after integrating.
- Leaving off the $\tfrac1a$ factor in $\int\frac{1}{ax+b}dx$.
- Wrong sign choosing parts: $uv-\int v\,du$, not plus.
- Choosing $u=e^x$ in parts such that integrals never simplify.
- Dropping the modulus in logs, or omitting $+c$ in indefinite integrals.
- Trapezium: using $n$ points instead of $n$ strips, or wrong $h$.

## Exam tips
- When told to use a substitution, rewrite the whole integral in $u$ before doing anything.
- Check a parts answer by differentiating it.
- Keep exact values (surds, logs, $e$) unless a decimal is requested.
- Sketch the curve to decide whether the trapezium rule over- or underestimates.
