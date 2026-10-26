# Quadratics
> Examiners want fluent algebra: the right method chosen quickly, the discriminant used as a tool, and clear sketches with every key point labelled.

## Key ideas

### Solving quadratic equations
Get the equation into $ax^2+bx+c=0$ first. Then choose a method.
1. **Factorise** if it factorises quickly: $x^2-5x+6=(x-2)(x-3)$.
2. **Complete the square** when you also need the vertex, or when exact surd answers are wanted.
3. **Use the formula** otherwise. Never divide by a variable to "simplify" an equation, because you lose a root.

### Completing the square and the vertex
For $ax^2+bx+c$, take out $a$ from the $x$ terms, then halve the coefficient of $x$:
$$ax^2+bx+c=a\left(x+\frac{b}{2a}\right)^2+c-\frac{b^2}{4a}.$$
Written as $a(x+p)^2+q$, the vertex is $(-p,\,q)$ and the line of symmetry is $x=-p$. If $a>0$ the vertex is a minimum, if $a<0$ a maximum.

### Sketching quadratic graphs
Mark: the $y$-intercept $(0,c)$; the $x$-intercepts (if any) from solving $y=0$; and the vertex. The curve is a $\cup$ shape if $a>0$ and a $\cap$ shape if $a<0$. Label coordinates, not just letters.

### The discriminant
For $ax^2+bx+c=0$, the discriminant is $\Delta=b^2-4ac$.
- $\Delta>0$: two distinct real roots.
- $\Delta=0$: one repeated root (the curve touches the $x$-axis).
- $\Delta<0$: no real roots.

"Real roots" means $\Delta\ge 0$. "Distinct" means $\Delta>0$.

### Quadratic inequalities
1. Rearrange so one side is $0$ and find the critical values (roots).
2. Sketch the graph.
3. Read off the region: for a $\cup$ graph, $>0$ means *outside* the roots, $<0$ means *between* them.

Write the answer as $x<\alpha$ or $x>\beta$ for "outside", and $\alpha<x<\beta$ for "between". Never write "$x<\alpha$ or ..." as one chained inequality.

### Simultaneous equations (one linear, one quadratic)
1. Make $y$ (or $x$) the subject of the linear equation.
2. Substitute into the quadratic to get a quadratic in one variable.
3. Solve, then substitute back into the **linear** equation to find the partner values. Give answers as coordinate pairs.

### Equations that reduce to quadratics
Spot a hidden quadratic by substitution.
- $x^4-5x^2+4=0$: let $u=x^2$, so $u^2-5u+4=0$, giving $u=1$ or $4$, so $x=\pm1,\pm2$.
- Equations with $\sqrt x$: let $u=\sqrt x$, so $x=u^2$. Reject any $u<0$ because $\sqrt x\ge 0$.

Always convert back to the original variable and reject invalid values.

### Line meeting a curve: conditions on a parameter
Substitute the line into the curve, rearrange to $ax^2+bx+c=0$ and use $\Delta$.
- $\Delta>0$: line **crosses** the curve at two points.
- $\Delta=0$: line is a **tangent** (touches).
- $\Delta<0$: line **misses** the curve.

The same idea finds the range of a parameter $k$ for which an expression is always positive: need $a>0$ and $\Delta<0$.

## Formulae
- **In MF19:** the quadratic formula $x=\dfrac{-b\pm\sqrt{b^2-4ac}}{2a}$.
- **Memorise** (not in MF19): discriminant $\Delta=b^2-4ac$ and what its sign means.
- **Memorise** (not in MF19): sum and product of roots $\alpha+\beta=-\dfrac ba$, $\alpha\beta=\dfrac ca$.
- **Memorise** (not in MF19): completed square form $a(x+p)^2+q$, vertex $(-p,q)$.

## Worked example
**Question.** The line $y=2x+k$ and the curve $y=x^2-4x+7$ are given. (a) Find the values of $k$ for which the line is a tangent to the curve, and the point of contact. (b) State the range of $k$ for which the line meets the curve at two points.

**Solution.** Equate the expressions:
$$x^2-4x+7=2x+k \;\Rightarrow\; x^2-6x+(7-k)=0.$$
The discriminant is
$$\Delta=(-6)^2-4(1)(7-k)=36-28+4k=8+4k.$$
(a) Tangent when $\Delta=0$:
$$8+4k=0\;\Rightarrow\;k=-2.$$
Then $x^2-6x+9=0$, so $(x-3)^2=0$ and $x=3$. Using the line, $y=2(3)-2=4$. Check on the curve: $9-12+7=4$. Point of contact $(3,4)$.

(b) Two points when $\Delta>0$:
$$8+4k>0\;\Rightarrow\;k>-2.$$

**Question 2.** Solve $2x^2-5x-3\ge 0$.

**Solution.**
$$2x^2-5x-3=(2x+1)(x-3).$$
The roots are $x=-\tfrac12$ and $x=3$. The graph is a $\cup$ shape, so it is $\ge0$ outside the roots:
$$x\le -\tfrac12\quad\text{or}\quad x\ge 3.$$

## Common mistakes
- Dividing both sides by $x$ and losing the root $x=0$.
- Completing the square with $a\ne1$ and forgetting to multiply the bracket's constant back: $2(x+2)^2$ contributes $+8$ inside, so subtract $8$.
- Giving a quadratic inequality "between" the roots when the answer should be "outside" (check with the graph shape).
- Using $\Delta\ge0$ when the question says "two distinct roots".
- Substituting back into the quadratic instead of the linear equation and getting extra, false pairs.
- Forgetting to reject $\sqrt x=u<0$ in substitution questions.

## Exam tips
- Always sketch for inequalities. It takes ten seconds and prevents sign errors.
- "Show that" discriminant questions: state the discriminant, simplify, and conclude in words (for example "$\Delta<0$, so no real roots").
- For a tangent, a repeated root gives $x$ immediately: $x=-\dfrac{b}{2a}$.
- Check your final pair of coordinates in the original curve; it is a free accuracy mark.
