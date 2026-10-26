# Algebra
> Examiners want clean, justified algebra: correct case-handling for modulus, exact partial fractions, and binomial expansions with the validity condition stated.

## Key ideas

### Modulus equations and inequalities
$|a|$ is the distance of $a$ from zero, so $|f(x)|$ is never negative. Three reliable methods:

1. **Graphical:** sketch both sides (a modulus graph reflects any part below the $x$-axis upwards), find the intersections, then read off where one graph is above or below the other.
2. **Squaring:** if both sides are moduli (or one side is known to be non-negative), square both sides, because $|a|^2=a^2$. Then solve the resulting quadratic inequality.
3. **Cases:** split at the point where the expression inside the modulus is zero and solve each branch, then check each solution satisfies the condition of its branch.

For $|f(x)|=k$ with $k>0$ you get $f(x)=k$ or $f(x)=-k$. For $|f(x)|<k$ you get $-k<f(x)<k$.

### Polynomial division, factor and remainder theorems
1. Divide $p(x)$ by $(ax-b)$ by long division or by inspection, matching coefficients: $p(x)=(ax-b)q(x)+r$.
2. **Remainder theorem:** the remainder when $p(x)$ is divided by $(ax-b)$ is $p\left(\tfrac{b}{a}\right)$.
3. **Factor theorem:** $(ax-b)$ is a factor if and only if $p\left(\tfrac{b}{a}\right)=0$.

Unknown coefficients are found by forming simultaneous equations from given factors or remainders.

### Partial fractions with linear factors
For a proper fraction (numerator degree below denominator degree) with distinct linear factors:
$$\frac{px+q}{(x-a)(x-b)}\equiv\frac{A}{x-a}+\frac{B}{x-b}$$
1. Write the identity and multiply through by the denominator.
2. Substitute $x=a$ and $x=b$ to get $A$ and $B$ directly (the cover-up method).
3. Check with one other value of $x$.

If the fraction is improper, divide first to get a polynomial plus a proper fraction.

### Repeated and quadratic factors
- A repeated factor needs one term for each power: $\dfrac{A}{x-a}+\dfrac{B}{(x-a)^2}$.
- An irreducible quadratic needs a linear numerator: $\dfrac{Cx+D}{x^2+k}$.

Find the easy constants by substitution, then compare coefficients of $x^2$ or $x^0$ for the rest.

### Binomial expansion for rational $n$
For any rational $n$ (negative or fraction), with $|x|<1$:
$$(1+x)^n=1+nx+\frac{n(n-1)}{2!}x^2+\frac{n(n-1)(n-2)}{3!}x^3+\cdots$$
The series is infinite unless $n$ is a non-negative integer. **Validity:** $|x|<1$. For $(1+bx)^n$ the condition is $|bx|<1$.

To expand $(a+bx)^n$, factorise first: $(a+bx)^n=a^n\left(1+\tfrac{b}{a}x\right)^n$, with validity $\left|\tfrac{b}{a}x\right|<1$, i.e. $|x|<\left|\tfrac{a}{b}\right|$.

### Approximations and coefficients
- Approximate a value by choosing a small $x$: for $\sqrt{1.02}$ use $(1+0.02)^{1/2}$ and the first few terms.
- For a product such as $(2-x)(1+3x)^{-2}$, expand the binomial and multiply out, collecting only the powers you need.
- If a fraction was split into partial fractions, expand each part separately, then add.

## Formulae
- **In MF19:** the binomial series $(1+x)^n=1+nx+\dfrac{n(n-1)}{2!}x^2+\cdots$ for rational $n$ with $|x|<1$ (and the positive-integer $(a+b)^n$ form).
- **Memorise** (not in MF19): the factor and remainder theorem statements, the partial fraction forms above, and how to rewrite $(a+bx)^n$ as $a^n\left(1+\dfrac bax\right)^n$, which gives the validity condition $\left|\dfrac bax\right|<1$.

## Worked example
**Q1.** Solve $|2x-1|<|x+3|$.

Both sides are non-negative, so square:
$$\begin{aligned}(2x-1)^2&<(x+3)^2\\4x^2-4x+1&<x^2+6x+9\\3x^2-10x-8&<0\\(3x+2)(x-4)&<0\end{aligned}$$
Hence $-\tfrac{2}{3}<x<4$.

**Q2.** Express $\dfrac{3x+33}{(x-1)(x+2)^2}$ in partial fractions, then expand $(4-x)^{-1/2}$ up to $x^2$.

Write $\dfrac{3x+33}{(x-1)(x+2)^2}\equiv\dfrac{A}{x-1}+\dfrac{B}{x+2}+\dfrac{C}{(x+2)^2}$, so
$$3x+33\equiv A(x+2)^2+B(x-1)(x+2)+C(x-1)$$
- $x=1$: $36=9A$, so $A=4$.
- $x=-2$: $27=-3C$, so $C=-9$.
- $x^2$ coefficients: $0=A+B$, so $B=-4$.

$$\frac{3x+33}{(x-1)(x+2)^2}\equiv\frac{4}{x-1}-\frac{4}{x+2}-\frac{9}{(x+2)^2}$$

For the expansion:
$$\begin{aligned}(4-x)^{-1/2}&=4^{-1/2}\left(1-\tfrac{x}{4}\right)^{-1/2}=\tfrac12\left(1-\tfrac{x}{4}\right)^{-1/2}\\&=\tfrac12\left[1+\left(-\tfrac12\right)\left(-\tfrac{x}{4}\right)+\frac{\left(-\frac12\right)\left(-\frac32\right)}{2}\left(-\tfrac{x}{4}\right)^2+\cdots\right]\\&=\tfrac12\left[1+\tfrac{x}{8}+\tfrac{3x^2}{128}+\cdots\right]\\&=\tfrac12+\tfrac{x}{16}+\tfrac{3x^2}{256}+\cdots\end{aligned}$$
Valid for $\left|\tfrac{x}{4}\right|<1$, i.e. $|x|<4$.

## Common mistakes
- Forgetting that squaring an inequality is only safe when both sides are non-negative.
- Giving a modulus answer without checking each case against its own condition.
- Using the binomial series on $(a+bx)^n$ without taking out $a^n$ first.
- Writing the validity as $|x|<1$ when it is $|bx|<1$ (or $|x|<a/b$ after factorising).
- Applying partial fractions to an improper fraction without dividing first.
- Sign errors with $\left(-\tfrac{x}{4}\right)^2$ and with negative $n$.

## Exam tips
- For a modulus question, a quick sketch earns method marks and shows how many solutions to expect.
- Check partial fractions by substituting a spare value of $x$ (such as $x=0$).
- In "hence" parts, expand each partial fraction rather than the original fraction.
- Always state the validity range when the question says "state the set of values of $x$".
