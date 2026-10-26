# Algebra
> Examiners want modulus equations solved with every case checked, polynomial division done cleanly, and the factor and remainder theorems used to find roots and unknown coefficients.

## Key ideas

### The modulus function
$|x|$ is the distance of $x$ from zero: $|x|=x$ if $x\ge0$ and $|x|=-x$ if $x<0$. The graph of $y=|f(x)|$ is the graph of $y=f(x)$ with any part below the $x$-axis reflected above it. The graph of $y=f(|x|)$ is the right-hand part of $f$ mirrored in the $y$-axis.

### Solving modulus equations and inequalities
**Equations.**
1. If the equation is $|f(x)|=k$ with $k\ge0$, solve $f(x)=k$ and $f(x)=-k$.
2. If both sides involve a modulus, such as $|f(x)|=|g(x)|$, **square** both sides (or consider $f=g$ and $f=-g$).
3. If it is $|f(x)|=g(x)$, solve $f(x)=\pm g(x)$ then **check** each answer, because $g(x)$ must be non-negative.

**Inequalities.** A good method is to sketch both graphs, find the intersections, and read off regions. Squaring both sides also works when both sides are non-negative.

### Inequalities such as $|x-a|<b$
$|x-a|<b$ means "the distance of $x$ from $a$ is less than $b$":
$$|x-a|<b\iff a-b<x<a+b,\qquad |x-a|>b\iff x<a-b\ \text{or}\ x>a+b.$$
Check the interval on the number line. If $b\le0$ there is no solution for "$<$".

### Polynomial division and the factor theorem
Divide a polynomial by a linear or quadratic factor using long division or by inspection:
1. Divide the leading terms, write the quotient term, multiply back and subtract.
2. Repeat until the remainder has lower degree than the divisor.

**Factor theorem.** $(x-a)$ is a factor of $f(x)$ if and only if $f(a)=0$. For $(px-q)$ test $f\!\left(\tfrac qp\right)=0$.

### The remainder theorem
When $f(x)$ is divided by $(x-a)$, the remainder is $f(a)$. When divided by $(px-q)$ the remainder is $f\!\left(\tfrac qp\right)$. Use this to find unknown coefficients by forming simultaneous equations from the given remainders or factors.

### Factorising and solving polynomial equations
1. Try small integer values ($\pm1,\pm2,\dots$) to find one root with the factor theorem.
2. Divide to get a quadratic.
3. Factorise or use the formula for the remaining roots.

State all real roots. Cubics have at most three real roots; a quadratic factor with $\Delta<0$ gives none.

## Formulae
- **Memorise** (not in MF19): the factor theorem and remainder theorem.
- **Memorise** (not in MF19): $|x-a|<b\iff a-b<x<a+b$.
- **In MF19:** the quadratic formula. **Memorise** (not in MF19): the discriminant $b^2-4ac$.

## Worked example
**Question 1.** Solve $|2x-3|<5$ and $|x-1|=2|x+4|$.

**Solution.**
First: $-5<2x-3<5$, so $-2<2x<8$ and $-1<x<4$.

Second: squaring both sides,
$$(x-1)^2=4(x+4)^2\;\Rightarrow\;x^2-2x+1=4x^2+32x+64\;\Rightarrow\;3x^2+34x+63=0.$$
Discriminant $34^2-4(3)(63)=1156-756=400$, so
$$x=\frac{-34\pm20}{6}\;\Rightarrow\;x=-\tfrac73\text{ or }x=-9.$$
Check $x=-9$: $|-10|=10$ and $2|-5|=10$. Check $x=-\tfrac73$: $\tfrac{10}3=2\times\tfrac53$. Both valid.

**Question 2.** The polynomial $f(x)=2x^3+ax^2-7x+b$ has factor $(x-2)$ and leaves remainder $6$ on division by $(x+1)$. Find $a$ and $b$, then solve $f(x)=0$.

**Solution.**
$f(2)=0$: $16+4a-14+b=0\Rightarrow4a+b=-2$.
$f(-1)=6$: $-2+a+7+b=6\Rightarrow a+b=1$.
Subtract: $3a=-3$, so $a=-1$ and $b=2$. Thus $f(x)=2x^3-x^2-7x+2$.

Divide by $(x-2)$:
$$2x^3-x^2-7x+2=(x-2)(2x^2+3x-1).$$
Check by expanding: $2x^3+3x^2-x-4x^2-6x+2$. Matches.

Solve $2x^2+3x-1=0$: $x=\dfrac{-3\pm\sqrt{9+8}}4=\dfrac{-3\pm\sqrt{17}}4$.
Roots: $x=2$, $x=\dfrac{-3+\sqrt{17}}4$, $x=\dfrac{-3-\sqrt{17}}4$.

## Common mistakes
- Solving $|f(x)|=g(x)$ and not rejecting answers where $g(x)<0$.
- Writing $|x-a|<b$ as $x<a+b$ only (missing the lower bound).
- Squaring only one side, or making sign slips when expanding after squaring a two-modulus equation.
- Using $f(-a)$ instead of $f(a)$ for the factor $(x-a)$.
- Dividing without writing zero coefficients for missing powers.
- Stopping after finding one factor and not solving the quadratic.

## Exam tips
- Sketch modulus graphs. It shows how many solutions to expect.
- For a quick root hunt, try factors of the constant term divided by factors of the leading coefficient.
- Check a division by multiplying out, or by testing a value of $x$.
- P3 extends this with modulus graphs of more complex functions and partial fractions.
