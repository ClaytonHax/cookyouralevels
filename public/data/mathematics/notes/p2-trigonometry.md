# Trigonometry
> Examiners want reciprocal functions, compound and double angle formulae used accurately, and the $R$-form applied to solve equations and find greatest and least values.

## Key ideas

### Reciprocal functions $\sec$, $\csc$, $\cot$
$$\sec\theta=\frac1{\cos\theta},\qquad\csc\theta=\frac1{\sin\theta},\qquad\cot\theta=\frac1{\tan\theta}=\frac{\cos\theta}{\sin\theta}.$$
Graphs: $\sec$ and $\csc$ have vertical asymptotes where $\cos$ or $\sin$ is $0$, and never take values between $-1$ and $1$. $\cot$ has period $180^\circ$ and asymptotes where $\sin\theta=0$. Sketch the original function lightly first.

### Extra Pythagorean identities
$$1+\tan^2\theta=\sec^2\theta,\qquad1+\cot^2\theta=\csc^2\theta.$$
These come from dividing $\sin^2\theta+\cos^2\theta=1$ by $\cos^2\theta$ or $\sin^2\theta$. Use them to turn an equation into a quadratic in one function.

### Compound angle formulae
$$\sin(A\pm B)=\sin A\cos B\pm\cos A\sin B,$$
$$\cos(A\pm B)=\cos A\cos B\mp\sin A\sin B,$$
$$\tan(A\pm B)=\frac{\tan A\pm\tan B}{1\mp\tan A\tan B}.$$
Note the sign change in the $\cos$ formula. Use them for exact values (for example $75^\circ=45^\circ+30^\circ$) and for proofs.

### Double angle formulae
Put $B=A$:
$$\sin2A=2\sin A\cos A,$$
$$\cos2A=\cos^2A-\sin^2A=2\cos^2A-1=1-2\sin^2A,$$
$$\tan2A=\frac{2\tan A}{1-\tan^2A}.$$
Choose the form of $\cos2A$ that leaves a single trig function.

### The $R$-form
To write $a\sin\theta+b\cos\theta$ (with $a,b>0$) as $R\sin(\theta+\alpha)$:
1. $R=\sqrt{a^2+b^2}$.
2. Expand $R\sin(\theta+\alpha)=R\cos\alpha\sin\theta+R\sin\alpha\cos\theta$.
3. Match: $R\cos\alpha=a$, $R\sin\alpha=b$, so $\tan\alpha=\dfrac ba$ with $0<\alpha<90^\circ$.

For $R\cos(\theta\pm\alpha)$ or $a\sin\theta-b\cos\theta$ use the same matching with the appropriate expansion.

### Using the $R$-form
- **Solving**: rewrite as $\sin(\theta+\alpha)=\dfrac kR$, solve for $\theta+\alpha$ in the shifted interval, then subtract $\alpha$.
- **Max and min**: $R\sin(\theta+\alpha)$ has maximum $R$ when $\theta+\alpha=90^\circ$, minimum $-R$. For $c+R\sin(\theta+\alpha)$ the range is $c-R$ to $c+R$.

## Formulae
**In MF19:** $\tan\theta=\dfrac{\sin\theta}{\cos\theta}$, $\sin^2+\cos^2=1$, $1+\tan^2\theta=\sec^2\theta$, $\cot^2\theta+1=\operatorname{cosec}^2\theta$, the compound angle formulae, and the double angle formulae (all three forms of $\cos2A$ and $\tan 2A$). **Memorise** (not in MF19):
- $\sec$, $\csc$, $\cot$ definitions.
- $R=\sqrt{a^2+b^2}$ and $\tan\alpha=\dfrac ba$ (after matching).

## Worked example
**Question 1.** (a) Express $3\sin\theta+4\cos\theta$ in the form $R\sin(\theta+\alpha)$. (b) Solve $3\sin\theta+4\cos\theta=2$ for $0^\circ\le\theta\le360^\circ$. (c) State the greatest value of the expression and the smallest positive $\theta$ at which it occurs.

**Solution.**
(a) $R=\sqrt{9+16}=5$, $\tan\alpha=\dfrac43$, $\alpha=53.13^\circ$. So $5\sin(\theta+53.13^\circ)$.

(b) $\sin(\theta+53.13^\circ)=0.4$. Here $53.13^\circ\le\theta+53.13^\circ\le413.13^\circ$. Principal value $23.58^\circ$ is out of range; the solutions are $180^\circ-23.58^\circ=156.42^\circ$ and $360^\circ+23.58^\circ=383.58^\circ$.
$$\theta=103.29^\circ\text{ or }330.45^\circ\ \text{(2 d.p.)}.$$
Quick check at $103.29^\circ$: $3(0.9728)+4(-0.2316)\approx1.99$.

(c) Greatest value $5$, when $\theta+53.13^\circ=90^\circ$, so $\theta=36.87^\circ$.

**Question 2.** Solve $\cos2x+3\sin x=2$ for $0^\circ\le x\le360^\circ$.

**Solution.** Use $\cos2x=1-2\sin^2x$:
$$1-2\sin^2x+3\sin x=2\;\Rightarrow\;2\sin^2x-3\sin x+1=0\;\Rightarrow\;(2\sin x-1)(\sin x-1)=0.$$
$\sin x=\tfrac12$: $x=30^\circ,150^\circ$; $\sin x=1$: $x=90^\circ$. Solutions: $30^\circ,90^\circ,150^\circ$.

## Common mistakes
- Getting the sign wrong in $\cos(A\pm B)$.
- Writing $\sin2A=2\sin A$.
- Using $\tan\alpha=\dfrac ab$ instead of $\dfrac ba$ in $R\sin(\theta+\alpha)$.
- Forgetting to shift the interval before solving $R$-form equations.
- Stating the maximum of $\dfrac1{c+R\sin(\cdot)}$ incorrectly: the max of a reciprocal comes from the **minimum** of the denominator.

## Exam tips
- Keep exact values (surds) when the question says "exact".
- Give $\alpha$ to at least 2 d.p. (or 4 s.f. in radians) before using it.
- For "show that" identities, work on one side only and finish with the given result.
- P3 extends this with more demanding identity proofs and integration using these identities.
