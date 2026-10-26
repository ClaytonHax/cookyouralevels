# Integration
> Examiners want standard integrals recalled, identities used to make awkward trig integrals easy, and areas evaluated exactly with correct limits.

## Key ideas

### Integrating $e^{kx}$ and $\dfrac1x$
$$\int e^{kx}\,dx=\frac1ke^{kx}+c,\qquad\int\frac1x\,dx=\ln|x|+c.$$
More generally, $\int\dfrac1{ax+b}\,dx=\dfrac1a\ln|ax+b|+c$. For integrands such as $\dfrac{k}{ax+b}$ pull out the constant $k$. This is why $\int x^{-1}\,dx$ is not given by the usual power rule.

### Integrating trig functions of $kx+c$ (radians)
$$\int\sin(kx+c)\,dx=-\frac1k\cos(kx+c)+C,\qquad\int\cos(kx+c)\,dx=\frac1k\sin(kx+c)+C,$$
$$\int\sec^2(kx+c)\,dx=\frac1k\tan(kx+c)+C.$$
Always divide by $k$ and watch the minus sign for $\sin$.

### Using identities
To integrate $\sin^2x$, $\cos^2x$ or $\sin x\cos x$, rewrite using double angle formulae:
$$\sin^2x=\frac{1-\cos2x}2,\qquad\cos^2x=\frac{1+\cos2x}2,\qquad\sin x\cos x=\tfrac12\sin2x.$$
Also $\tan^2x=\sec^2x-1$, which integrates to $\tan x-x+c$. Then integrate term by term.

### Integration by recognition of $f(ax+b)$
If you know $\int f(x)\,dx=F(x)+c$, then
$$\int f(ax+b)\,dx=\frac1aF(ax+b)+c.$$
This covers $(ax+b)^n$, $e^{ax+b}$, $\sin(ax+b)$ and so on. Check by differentiating. (P3 extends this with substitution, parts, and partial fractions.)

### Areas
Area under $y=f(x)$ between $x=a$ and $x=b$ is $\int_a^b f(x)\,dx$, provided the curve is above the axis. Use exact values such as $\ln2$, $e^2$ and $\pi$, and the standard values $\sin\frac\pi2=1$ and so on. When regions lie below the axis, take the positive value of that part. For a region between curves, integrate (top $-$ bottom).

## Formulae
- **In MF19:** $\int e^x\,dx$, $\int\dfrac1x\,dx=\ln|x|$, $\int\sin x$, $\int\cos x$, $\int\sec^2x$, the parts formula, $\int\dfrac{f'(x)}{f(x)}dx=\ln|f(x)|$, and the double angle formulae ($\cos2x=2\cos^2x-1=1-2\sin^2x$).
- **Memorise** (not in MF19): the $\div k$ forms $\int e^{kx}$, $\int\sin kx$, $\int\cos kx$, $\int\sec^2kx$ and $\int\dfrac1{ax+b}\,dx$.
- **Memorise** (not in MF19): log laws, e.g. $\ln a+\ln b=\ln ab$.

## Worked example
**Question 1.** Find $\int\sin^2x\,dx$.

**Solution.**
$$\int\sin^2x\,dx=\int\frac{1-\cos2x}2\,dx=\frac x2-\frac{\sin2x}4+c.$$

**Question 2.** Evaluate $\int_0^{\ln3}e^{2x}\,dx$ and $\int_1^3\dfrac6{3x-1}\,dx$.

**Solution.**
$$\int_0^{\ln3}e^{2x}\,dx=\left[\tfrac12e^{2x}\right]_0^{\ln3}=\tfrac12\left(e^{2\ln3}-1\right)=\tfrac12(9-1)=4.$$
$$\int_1^3\frac6{3x-1}\,dx=\Big[2\ln(3x-1)\Big]_1^3=2\ln8-2\ln2=2\ln4=4\ln2.$$

**Question 3.** Find the area under $y=4\cos^2x$ from $x=0$ to $x=\dfrac\pi2$.

**Solution.** $4\cos^2x=2+2\cos2x$, so
$$\int_0^{\pi/2}(2+2\cos2x)\,dx=\Big[2x+\sin2x\Big]_0^{\pi/2}=\pi+0-0=\pi.$$

**Question 4.** Find $\displaystyle\int\left(5e^{-2x}+\frac3{2x+1}+\sec^2\tfrac x2\right)dx$.

**Solution.** Integrate each term using the $f(ax+b)$ rule:
$$\int5e^{-2x}\,dx=-\tfrac52e^{-2x},\quad\int\frac3{2x+1}\,dx=\tfrac32\ln|2x+1|,\quad\int\sec^2\tfrac x2\,dx=2\tan\tfrac x2.$$
Total:
$$-\tfrac52e^{-2x}+\tfrac32\ln|2x+1|+2\tan\tfrac x2+c.$$

## Common mistakes
- Forgetting the $\dfrac1k$ when integrating $e^{kx}$ or trig of $kx$.
- Missing the minus sign in $\int\sin kx\,dx=-\dfrac1k\cos kx$.
- Using degrees: all calculus with trig must be in radians.
- Integrating $\sin^2x$ as $\dfrac{\sin^3x}3$.
- Forgetting the modulus in $\ln|x|$ (acceptable to omit it in definite integrals over positive ranges).
- Not simplifying $e^{\ln a}=a$ when evaluating limits.

## Exam tips
- Differentiate your answer to check an integral.
- Leave exact answers when the question says "exact".
- Sketch the region if the sign of the integrand is unclear.
- Rewrite unusual-looking trig integrands using identities first.
