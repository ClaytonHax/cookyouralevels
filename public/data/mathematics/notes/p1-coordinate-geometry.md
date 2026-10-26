# Coordinate geometry
> Examiners want accurate use of gradient, midpoint and circle formulae, plus clean reasoning about tangents and intersections, and confident use of straight-line linearisation.

## Key ideas

### Gradient, length and midpoint
For points $A(x_1,y_1)$ and $B(x_2,y_2)$: the gradient is the change in $y$ over the change in $x$, the length is found with Pythagoras, and the midpoint is the average of the coordinates. Gradients between the same points can be found in either order, but be consistent in numerator and denominator.

### Equation of a straight line
- Given a point $(x_1,y_1)$ and gradient $m$: $y-y_1=m(x-x_1)$.
- Given two points: find $m$ first, then use either point.

Give the final answer in the form requested, for example $ax+by+c=0$ with integer coefficients.

### Parallel and perpendicular lines
Parallel lines have equal gradients: $m_1=m_2$. Perpendicular lines satisfy $m_1m_2=-1$, so the perpendicular gradient is $-\dfrac1m$ (flip and change sign). A perpendicular bisector passes through the midpoint with the perpendicular gradient.

### Equation of a circle
A circle with centre $(a,b)$ and radius $r$ has equation $(x-a)^2+(y-b)^2=r^2$. A point is inside the circle if its distance from the centre is less than $r$.

### Centre and radius from the expanded form
Given $x^2+y^2+2gx+2fy+c=0$, complete the square in $x$ and in $y$:
1. Group the $x$ terms and the $y$ terms.
2. Complete both squares and move the constants to the right.
3. Read off the centre $(a,b)$ and $r^2$ (which must be positive).

### Circle properties
- A **tangent** is perpendicular to the radius at the point of contact.
- The **angle in a semicircle** is $90^\circ$, so a diameter $AB$ and point $P$ on the circle give $AP\perp BP$.
- The **perpendicular bisector of a chord** passes through the centre.

### Line meeting a curve or circle
Substitute the line into the curve or circle to get a quadratic. Its discriminant tells you: $\Delta>0$ two intersections, $\Delta=0$ tangent, $\Delta<0$ no intersection. Tangent equations can also be found with the radius-gradient method.

### Linearising $y=ax^n$ and $y=ab^x$
Take logarithms (base 10 or $e$).
- $y=ax^n$: $\ln y=n\ln x+\ln a$. Plot $\ln y$ against $\ln x$: gradient $n$, intercept $\ln a$.
- $y=ab^x$: $\ln y=x\ln b+\ln a$. Plot $\ln y$ against $x$: gradient $\ln b$, intercept $\ln a$.

Find the gradient and intercept from the line, then undo the logarithm to recover $a$, $b$ or $n$.

## Formulae
- Gradient $m=\dfrac{y_2-y_1}{x_2-x_1}$ — memorise.
- Distance $d=\sqrt{(x_2-x_1)^2+(y_2-y_1)^2}$ — memorise.
- Midpoint $\left(\dfrac{x_1+x_2}2,\dfrac{y_1+y_2}2\right)$ — memorise.
- $y-y_1=m(x-x_1)$ and $m_1m_2=-1$ — memorise.
- Circle $(x-a)^2+(y-b)^2=r^2$ — memorise. None of these are in MF19.

## Worked example
**Question.** A circle has equation $x^2+y^2-6x+4y-12=0$. (a) Find its centre and radius. (b) Show that $P(6,2)$ lies on the circle and find the equation of the tangent at $P$.

**Solution.**
(a)
$$\begin{aligned}x^2-6x+y^2+4y&=12\\(x-3)^2-9+(y+2)^2-4&=12\\(x-3)^2+(y+2)^2&=25.\end{aligned}$$
Centre $(3,-2)$, radius $5$.

(b) Substitute $P$: $(6-3)^2+(2+2)^2=9+16=25$, so $P$ is on the circle.

The radius from the centre to $P$ has gradient
$$\frac{2-(-2)}{6-3}=\frac43.$$
The tangent is perpendicular, so its gradient is $-\dfrac34$. Then
$$\begin{aligned}y-2&=-\tfrac34(x-6)\\4y-8&=-3x+18\\3x+4y&=26.\end{aligned}$$

**Question 2.** Variables $x$ and $y$ satisfy $y=ax^n$. A graph of $\ln y$ against $\ln x$ is a straight line through $(1,5)$ and $(3,9)$. Find $a$ and $n$.

**Solution.** $\ln y=n\ln x+\ln a$. The gradient is
$$n=\frac{9-5}{3-1}=2.$$
Using $(1,5)$: $5=2(1)+\ln a$, so $\ln a=3$ and $a=e^3$. Therefore $y=e^3x^2$.

## Common mistakes
- Using $m_1m_2=1$ for perpendicular lines, or forgetting to negate.
- Completing the square and writing the centre with the wrong signs: $(x+2)^2$ means the centre has $x$-coordinate $-2$.
- Finding the radius as $r^2$ (forgetting the square root).
- Tangent questions: using the gradient of the radius as the gradient of the tangent.
- In linearisation, reading the intercept as $a$ instead of $\ln a$.

## Exam tips
- Draw a quick diagram; many circle questions then become one right-angled triangle.
- To show a line is a tangent, either get $\Delta=0$ or show the line is perpendicular to the radius at a point on the circle.
- For "find the equation of the perpendicular bisector", the midpoint is always part of the solution.
- Keep answers exact unless told otherwise.
