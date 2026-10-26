# Functions
> Examiners want correct notation, exact domains and ranges, inverses found properly (with their domains), and graph transformations described in precise language.

## Key ideas

### Function notation, domain and range
A function $f$ assigns exactly one output to each input. The **domain** is the set of allowed inputs ($x$ values); the **range** is the set of outputs ($f(x)$ values). Describe them with inequalities, for example $f(x)\ge 3$ for the range. Domain restrictions arise from square roots (non-negative inside), denominators (not zero) and stated restrictions. To find a range, sketch the graph and read the $y$ values over the domain.

### One-one functions
$f$ is **one-one** if each output comes from exactly one input. Graphically it passes the horizontal line test. Only one-one functions have inverses. For example $x^2$ on $\mathbb R$ is many-one, but $x^2$ on $x\ge0$ is one-one.

### Composite functions
$fg(x)$ means "apply $g$ first, then $f$": $fg(x)=f(g(x))$. In general $fg\ne gf$. For $fg$ to exist, the range of $g$ must lie inside the domain of $f$. To solve $fg(x)=\dots$, substitute the formula of $g$ into $f$ and simplify.

### Finding the inverse
1. Write $y=f(x)$.
2. Rearrange to make $x$ the subject.
3. Swap: replace $y$ by $x$ to give $f^{-1}(x)$.
4. State the domain of $f^{-1}$ = the range of $f$, and the range of $f^{-1}$ = the domain of $f$.

The graph of $y=f^{-1}(x)$ is the reflection of $y=f(x)$ in the line $y=x$. Any intersection of $f$ and $f^{-1}$ lying on $y=x$ can be found by solving $f(x)=x$.

### Restricting a domain
If $f$ is not one-one, restrict its domain to a part where it is, usually one side of a turning point. For $f(x)=(x-2)^2+3$, the turning point is at $x=2$, so $x\ge2$ (or $x\le2$) gives a one-one function. When asked for the "largest possible domain", end at the turning point and include it.

### Transformations of graphs
- $y=f(x)+a$: translation $\begin{pmatrix}0\\a\end{pmatrix}$.
- $y=f(x+a)$: translation $\begin{pmatrix}-a\\0\end{pmatrix}$.
- $y=-f(x)$: reflection in the $x$-axis.
- $y=f(-x)$: reflection in the $y$-axis.
- $y=af(x)$: stretch parallel to the $y$-axis, scale factor $a$.
- $y=f(ax)$: stretch parallel to the $x$-axis, scale factor $\dfrac1a$.

### Writing the equation of the transformed graph
Replace $x$ or $y$ in the original equation as required, then simplify. A change inside the brackets affects $x$ and works "backwards". When two transformations are combined, the order matters: apply them in the order stated, one at a time.

## Formulae
- $fg(x)=f(g(x))$ — memorise.
- $f^{-1}(f(x))=x$ and $ff^{-1}(x)=x$ — memorise.
- Reflection of $y=f(x)$ in $y=x$ gives $y=f^{-1}(x)$ — memorise.
- Transformation rules above — memorise; none are in MF19.

## Worked example
**Question.** The function $f$ is defined by $f(x)=x^2-4x+7$ for $x\ge2$. (a) Find the range of $f$. (b) Find $f^{-1}(x)$ and state its domain. (c) The function $g$ is $g(x)=2x+1$. Find $fg(x)$ in its simplest form. (d) The graph of $y=x^2-3x$ is translated by $\begin{pmatrix}2\\1\end{pmatrix}$. Find its new equation.

**Solution.**
(a) Complete the square:
$$f(x)=(x-2)^2+3.$$
The minimum is $3$ at $x=2$, and $f$ increases for $x\ge2$, so the range is $f(x)\ge3$.

(b) Let $y=(x-2)^2+3$. Then $(x-2)^2=y-3$, and since $x\ge2$ we take the positive root:
$$x=2+\sqrt{y-3}.$$
So $f^{-1}(x)=2+\sqrt{x-3}$, with domain $x\ge3$.

(c)
$$\begin{aligned}fg(x)&=(2x+1)^2-4(2x+1)+7\\&=4x^2+4x+1-8x-4+7\\&=4x^2-4x+4.\end{aligned}$$

(d) A translation by $\begin{pmatrix}2\\1\end{pmatrix}$ replaces $x$ by $x-2$ and adds $1$:
$$\begin{aligned}y&=(x-2)^2-3(x-2)+1\\&=x^2-4x+4-3x+6+1\\&=x^2-7x+11.\end{aligned}$$

## Common mistakes
- Evaluating $fg$ in the wrong order. Work from the inside out: $g$ first.
- Giving the domain of $f^{-1}$ as the domain of $f$. It is the **range** of $f$.
- Forgetting to choose the correct sign of the root when finding an inverse of a restricted quadratic.
- Describing $y=f(x+2)$ as a shift to the right. It is a shift **left** by 2.
- Using "stretch factor $2$" for $y=f(2x)$. It is scale factor $\tfrac12$ parallel to the $x$-axis.
- Writing the range in terms of $x$ instead of $f(x)$ or $y$.

## Exam tips
- For "describe fully", give the type of transformation, the direction or axis, and the amount (vector or scale factor).
- A sketch of the restricted graph makes the range and the inverse's domain obvious.
- Check an inverse with a quick number: if $f(3)=k$, then $f^{-1}(k)$ must equal $3$.
- If asked for the largest value of $a$ such that $f$ is one-one on $x\ge a$ or $x\le a$, the answer is the $x$-coordinate of the turning point.
