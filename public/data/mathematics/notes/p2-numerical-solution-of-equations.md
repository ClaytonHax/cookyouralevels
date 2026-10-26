# Numerical solution of equations
> Examiners want a sign-change argument stated properly, an equation rearranged into iteration form, and iterations carried out to the required accuracy with a correct conclusion.

## Key ideas

### Locating a root by sign change
To show that $f(x)=0$ has a root in $(a,b)$:
1. Evaluate $f(a)$ and $f(b)$ exactly or to enough accuracy.
2. State that $f$ changes sign (one value positive, one negative).
3. State that $f$ is **continuous** on the interval.
4. Conclude that there is a root in $(a,b)$.

To show a root is correct to $n$ decimal places, find the values of $f$ at the two half-way boundary points; for example for $1.213$ (3 d.p.) test $x=1.2125$ and $x=1.2135$. They must have opposite signs.

### When a sign change does not mean a root
A sign change does **not** guarantee a root if $f$ is not continuous on the interval, for example $f(x)=\dfrac1{x-1}$ between $x=0$ and $x=2$: $f(0)=-1$ and $f(2)=1$ but there is a vertical asymptote at $x=1$ and no root. Also, no sign change does not rule out roots: two roots in the interval cancel out (for example a parabola dipping below the axis and rising back).

### Rearranging into $x=g(x)$
Rearrange $f(x)=0$ so that $x$ appears alone on one side. There are many ways: for $x^3+x-3=0$ you could use $x=\sqrt[3]{3-x}$ or $x=3-x^3$. Different rearrangements converge at different speeds; some do not converge at all. Show the algebra step by step in "show that" questions.

### Iteration
The iteration $x_{n+1}=g(x_n)$ starts from $x_0$ and produces a sequence. If it converges, the limit $\alpha$ satisfies $\alpha=g(\alpha)$, so $\alpha$ is a root of the original equation. Use the **ANS** key on a calculator to keep full accuracy.

### Using a given formula and stating accuracy
1. Compute enough iterations until successive values agree to the required accuracy.
2. Show at least the sequence to the specified decimal places.
3. For a root "correct to $n$ d.p.", confirm with a sign change at the boundaries.
4. State the final answer clearly.

## Formulae
- **In MF19:** nothing for this topic. **Memorise** all of the following.
- Sign-change condition $f(a)f(b)<0$ with $f$ continuous.
- Iteration $x_{n+1}=g(x_n)$.
- Newton–Raphson is **not** in the syllabus.

## Worked example
**Question.** The equation $x^3+x-3=0$ has a single positive root $\alpha$. (a) Show that $\alpha$ lies between $1.2$ and $1.3$. (b) Show that the equation can be rearranged as $x=\sqrt[3]{3-x}$. (c) Use $x_{n+1}=\sqrt[3]{3-x_n}$ with $x_0=1.2$ to find $\alpha$ correct to 3 decimal places.

**Solution.**
(a) Let $f(x)=x^3+x-3$.
$$f(1.2)=1.728+1.2-3=-0.072<0,\qquad f(1.3)=2.197+1.3-3=0.497>0.$$
$f$ is continuous and changes sign, so a root lies in $(1.2,1.3)$.

(b)
$$x^3+x-3=0\;\Rightarrow\;x^3=3-x\;\Rightarrow\;x=\sqrt[3]{3-x}.$$
(c)
$$x_1=\sqrt[3]{1.8}=1.2164,\quad x_2=\sqrt[3]{1.7836}=1.2127,\quad x_3=1.2136,\quad x_4=1.2134,\quad x_5=1.2134.$$
The values settle at $1.2134$, so $\alpha\approx1.213$.

Confirm: $f(1.2125)\approx-0.0049<0$ and $f(1.2135)\approx+0.0005>0$, so $1.2125<\alpha<1.2135$ and $\alpha=1.213$ to 3 d.p.

## Common mistakes
- Omitting the word "continuous" in the sign-change argument.
- Using a very small interval but giving values with too few decimal places to show the sign.
- Rounding at every step of an iteration (use full calculator accuracy via ANS).
- Stating a root as the last iterate without justifying the accuracy.
- Rearranging incorrectly (check by rearranging back).
- Confusing the iteration function $g$ with the original function $f$.

## Exam tips
- Give $f$ values to at least 3 s.f. so the sign is clear.
- "Show that" rearrangements need every algebraic step.
- Write down the iterates to one more decimal place than the answer needs.
- P3 extends this with further iteration questions, so the same method carries over.
