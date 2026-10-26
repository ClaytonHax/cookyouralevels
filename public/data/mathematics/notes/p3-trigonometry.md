# Trigonometry
> Examiners want exact identity manipulation, correct handling of ranges and inverse functions, and the $R$-form used to solve equations and find maxima and minima.

## Key ideas

### Inverse trigonometric functions
| Function | Domain | Range (radians) |
|---|---|---|
| $\arcsin x$ | $-1\le x\le1$ | $-\tfrac\pi2\le y\le\tfrac\pi2$ |
| $\arccos x$ | $-1\le x\le1$ | $0\le y\le\pi$ |
| $\arctan x$ | all real $x$ | $-\tfrac\pi2<y<\tfrac\pi2$ |

Each graph is the reflection of the restricted original in $y=x$. A calculator always returns the **principal value**; other solutions of an equation come from symmetry.

### Compound and double angle identities
$$\sin(A\pm B)=\sin A\cos B\pm\cos A\sin B,\qquad\cos(A\pm B)=\cos A\cos B\mp\sin A\sin B$$
$$\tan(A\pm B)=\frac{\tan A\pm\tan B}{1\mp\tan A\tan B}$$
Setting $B=A$ gives the double angles:
$$\sin2A=2\sin A\cos A,\quad\cos2A=\cos^2A-\sin^2A=2\cos^2A-1=1-2\sin^2A,\quad\tan2A=\frac{2\tan A}{1-\tan^2A}$$
To **prove** an identity, work on one side only (usually the more complicated), rewrite using $\sin,\cos$, apply the identities, and simplify until it matches the other side. Also useful: $\sec^2\theta=1+\tan^2\theta$, $\csc^2\theta=1+\cot^2\theta$.

### The $R$-form
Write $a\sin\theta\pm b\cos\theta=R\sin(\theta\pm\alpha)$ or $a\cos\theta\pm b\sin\theta=R\cos(\theta\mp\alpha)$ with $R>0$ and $0<\alpha<90^\circ$.

1. Expand $R\sin(\theta+\alpha)=R\sin\theta\cos\alpha+R\cos\theta\sin\alpha$.
2. Match coefficients: $R\cos\alpha=a$, $R\sin\alpha=b$.
3. $R=\sqrt{a^2+b^2}$ and $\tan\alpha=\dfrac{b}{a}$.

Uses:
- **Equations:** divide by $R$, use inverse sine, and list all angles in the shifted interval.
- **Extreme values:** the maximum of $R\sin(\theta+\alpha)$ is $R$ and the minimum is $-R$. For $\dfrac{k}{a\sin\theta+b\cos\theta+c}$, the extremes occur where the denominator is extreme.

### Demanding trig equations
1. Reduce to one function and one angle (use $\cos2\theta=1-2\sin^2\theta$, $\sin2\theta=2\sin\theta\cos\theta$, $\sec^2=1+\tan^2$).
2. Collect into a quadratic, or factorise, avoiding dividing by a trig function (you would lose solutions).
3. Solve for the trig function and reject values outside $[-1,1]$.
4. Convert the interval for the **angle** you solve, for example $0\le2\theta\le720^\circ$ if $0\le\theta\le360^\circ$.
5. List every solution from symmetry.

### Factor formulae
$$\sin P+\sin Q=2\sin\tfrac{P+Q}{2}\cos\tfrac{P-Q}{2},\qquad\sin P-\sin Q=2\cos\tfrac{P+Q}{2}\sin\tfrac{P-Q}{2}$$
$$\cos P+\cos Q=2\cos\tfrac{P+Q}{2}\cos\tfrac{P-Q}{2},\qquad\cos P-\cos Q=-2\sin\tfrac{P+Q}{2}\sin\tfrac{P-Q}{2}$$
They turn a sum into a product (useful for equations like $\sin5x+\sin x=0$ giving $2\sin3x\cos2x=0$), and the reverse gives product-to-sum for integration. They follow from adding or subtracting the compound formulae.

## Formulae
- **In MF19:** $\tan\theta=\dfrac{\sin\theta}{\cos\theta}$, $\sin^2+\cos^2=1$, $1+\tan^2=\sec^2$, $\cot^2+1=\operatorname{cosec}^2$, the compound angle formulae, the double angle formulae (all three forms of $\cos2A$, and $\tan2A$), and the principal values of $\sin^{-1}$, $\cos^{-1}$, $\tan^{-1}$.
- **Memorise** (not in MF19): the reciprocal definitions of $\sec$, $\operatorname{cosec}$, $\cot$, the factor formulae (derivable from the compound formulae if you forget), and the $R\sin(\theta\pm\alpha)$, $R\cos(\theta\pm\alpha)$ forms.

## Worked example
**Q1.** (a) Express $3\sin\theta+4\cos\theta$ in the form $R\sin(\theta+\alpha)$. (b) Solve $3\sin\theta+4\cos\theta=2.5$ for $0^\circ\le\theta\le360^\circ$. (c) State the maximum value and the smallest positive $\theta$ at which it occurs.

(a) $R\cos\alpha=3$, $R\sin\alpha=4$, so $R=\sqrt{9+16}=5$ and $\tan\alpha=\tfrac43$, $\alpha=53.13^\circ$. So $5\sin(\theta+53.13^\circ)$.

(b) $\sin(\theta+53.13^\circ)=0.5$, and $53.13^\circ\le\theta+53.13^\circ\le413.13^\circ$.
$$\theta+53.13^\circ=30^\circ\ (\text{out of range}),\ 150^\circ,\ 390^\circ$$
$$\theta=96.9^\circ,\ 336.9^\circ$$

(c) Maximum is $5$, when $\theta+53.13^\circ=90^\circ$, i.e. $\theta=36.9^\circ$.

**Q2.** Solve $\cos2\theta+3\sin\theta=2$ for $0^\circ\le\theta\le360^\circ$.

$$\begin{aligned}1-2\sin^2\theta+3\sin\theta&=2\\2\sin^2\theta-3\sin\theta+1&=0\\(2\sin\theta-1)(\sin\theta-1)&=0\end{aligned}$$
So $\sin\theta=\tfrac12$ giving $\theta=30^\circ,150^\circ$, or $\sin\theta=1$ giving $\theta=90^\circ$.

Check $\theta=90^\circ$: $\cos180^\circ+3=2$. Correct.

**Q3.** Prove that $\dfrac{\sin2\theta}{1+\cos2\theta}\equiv\tan\theta$.

$$\frac{\sin2\theta}{1+\cos2\theta}=\frac{2\sin\theta\cos\theta}{1+(2\cos^2\theta-1)}=\frac{2\sin\theta\cos\theta}{2\cos^2\theta}=\frac{\sin\theta}{\cos\theta}=\tan\theta$$

**Q4.** Evaluate $\arccos\left(-\tfrac12\right)$ and $\arcsin\left(\sin\tfrac{5\pi}{6}\right)$.

$\arccos\left(-\tfrac12\right)=\tfrac{2\pi}3$ (in $[0,\pi]$). Since $\sin\tfrac{5\pi}6=\tfrac12$, $\arcsin\tfrac12=\tfrac\pi6$, not $\tfrac{5\pi}6$, because the range of $\arcsin$ is $\left[-\tfrac\pi2,\tfrac\pi2\right]$.

## Common mistakes
- Forgetting the shifted interval for the $R$-form or multiple-angle equations, and losing solutions.
- Dividing by $\sin\theta$ or $\cos\theta$ and so discarding roots.
- Taking $\alpha$ from $\tan\alpha=a/b$ instead of $b/a$ (check the coefficient matching).
- Using degrees mode when the question is in radians.
- Writing $\sin(A+B)=\sin A+\sin B$.
- Quoting arccos ranges of $-\tfrac\pi2$ to $\tfrac\pi2$ (that is arcsin).

## Exam tips
- Always write $R\cos\alpha=\dots$ and $R\sin\alpha=\dots$ before $R$ and $\alpha$.
- In a "show that" proof, finish with the exact target expression.
- Check solutions by substituting one back.
- Give $\alpha$ to at least 4 s.f. in working to protect accuracy.
