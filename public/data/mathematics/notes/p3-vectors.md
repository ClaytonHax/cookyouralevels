# Vectors
> Examiners want correct vector notation, the scalar product used for angles, and a systematic treatment of lines: equations, relationships between lines, intersections and perpendicular distances.

## Key ideas

### Position vectors and notation
In 3D, $\mathbf r=x\mathbf i+y\mathbf j+z\mathbf k=\begin{pmatrix}x\\y\\z\end{pmatrix}$. The position vector of $A$ is $\overrightarrow{OA}=\mathbf a$. The vector from $A$ to $B$ is
$$\overrightarrow{AB}=\mathbf b-\mathbf a\quad(\text{"end minus start"})$$
The midpoint of $AB$ has position vector $\tfrac12(\mathbf a+\mathbf b)$. A point dividing $AB$ in the ratio $m:n$ is $\dfrac{n\mathbf a+m\mathbf b}{m+n}$.

### Addition, scaling and magnitude
Add, subtract and scale component by component. The magnitude is
$$|\mathbf a|=\sqrt{x^2+y^2+z^2}$$
A unit vector is $\dfrac{\mathbf a}{|\mathbf a|}$. Parallel vectors are scalar multiples of each other.

### Scalar (dot) product
$$\mathbf a\cdot\mathbf b=a_1b_1+a_2b_2+a_3b_3=|\mathbf a||\mathbf b|\cos\theta$$
To find the angle between two vectors:
1. Compute $\mathbf a\cdot\mathbf b$.
2. Compute both magnitudes.
3. $\cos\theta=\dfrac{\mathbf a\cdot\mathbf b}{|\mathbf a||\mathbf b|}$.

If $\mathbf a\cdot\mathbf b=0$ (and neither is zero) the vectors are perpendicular. A negative dot product means the angle is obtuse. For the angle in a triangle at $B$, use $\overrightarrow{BA}\cdot\overrightarrow{BC}$, with both vectors pointing **away** from $B$.

### Vector equation of a line
$$\mathbf r=\mathbf a+\lambda\mathbf d$$
where $\mathbf a$ is the position vector of a point on the line and $\mathbf d$ a direction vector. Through points $A$ and $B$ use $\mathbf d=\mathbf b-\mathbf a$. Different parameters on the same line differ only in the point and the scale of $\mathbf d$.

### Parallel, intersecting or skew
Given $\mathbf r=\mathbf a_1+\lambda\mathbf d_1$ and $\mathbf r=\mathbf a_2+\mu\mathbf d_2$:
1. If $\mathbf d_1=k\mathbf d_2$, the lines are parallel (identical if they also share a point).
2. Otherwise, equate the $\mathbf i$, $\mathbf j$, $\mathbf k$ components to get three equations in $\lambda,\mu$.
3. Solve two of them, then test in the third. If it holds, the lines **intersect**; if not, they are **skew** (not parallel and never meet, only possible in 3D).

### Point of intersection
Using the solved $\lambda$ (or $\mu$), substitute into the corresponding line to get the position vector. Check it using the other line.

### Angle between lines and distance from a point to a line
- **Angle between lines:** the acute angle between the direction vectors: $\cos\theta=\dfrac{|\mathbf d_1\cdot\mathbf d_2|}{|\mathbf d_1||\mathbf d_2|}$. Use the modulus for the acute angle.
- **Distance from point $P$ to a line:**
  1. Write a general point $F$ on the line in terms of $\lambda$.
  2. Form $\overrightarrow{PF}$.
  3. Set $\overrightarrow{PF}\cdot\mathbf d=0$ to find $\lambda$ (the foot of the perpendicular).
  4. The distance is $|\overrightarrow{PF}|$ at that $\lambda$.

## Formulae
- **In MF19:** only the dot product $\mathbf a\cdot\mathbf b=a_1b_1+a_2b_2+a_3b_3=|\mathbf a||\mathbf b|\cos\theta$.
- **Memorise** (not in MF19): the line equation, the angle formula (rearranged from the dot product), and the perpendicular-foot method.

## Worked example
Line $l_1$: $\mathbf r=\begin{pmatrix}1\\2\\3\end{pmatrix}+\lambda\begin{pmatrix}2\\-1\\1\end{pmatrix}$. Line $l_2$: $\mathbf r=\begin{pmatrix}2\\0\\3\end{pmatrix}+\mu\begin{pmatrix}1\\1\\1\end{pmatrix}$.

**(a) Show that the lines intersect and find the point.**

Equate components:
$$\begin{aligned}1+2\lambda&=2+\mu&&(1)\\2-\lambda&=\mu&&(2)\\3+\lambda&=3+\mu&&(3)\end{aligned}$$
From (2), $\mu=2-\lambda$. In (1): $1+2\lambda=4-\lambda$, so $\lambda=1$, $\mu=1$. Check (3): $4=4$. Correct, so the lines intersect. The point is $(3,1,4)$.

**(b) Find the acute angle between the lines.**

$$\cos\theta=\frac{|2-1+1|}{\sqrt6\sqrt3}=\frac{2}{\sqrt{18}}=\frac{\sqrt2}{3}\ \Rightarrow\ \theta=61.9^\circ$$

**(c) Find the distance from $P(4,2,3)$ to $l_1$.**

A general point is $F=(1+2\lambda,\,2-\lambda,\,3+\lambda)$, so $\overrightarrow{PF}=\begin{pmatrix}2\lambda-3\\-\lambda\\\lambda\end{pmatrix}$.
$$\begin{aligned}\overrightarrow{PF}\cdot\begin{pmatrix}2\\-1\\1\end{pmatrix}&=4\lambda-6+\lambda+\lambda=6\lambda-6=0\\\lambda&=1\end{aligned}$$
Then $\overrightarrow{PF}=\begin{pmatrix}-1\\-1\\1\end{pmatrix}$ and the distance is $\sqrt3$.

## Common mistakes
- Using $\overrightarrow{AB}=\mathbf a-\mathbf b$.
- Using the position vectors, rather than the direction vectors, for the angle between lines.
- Reporting an obtuse angle when the acute angle is asked for.
- Claiming lines intersect without checking the third equation.
- Using $\lambda$ for both lines instead of different parameters.
- Mixing up the dot product (scalar answer) with a vector answer.

## Exam tips
- Label points and directions clearly before computing.
- When two lines are given, use different letters ($\lambda,\mu$) for parameters.
- Check intersection points in both line equations.
- For distance, confirm $\overrightarrow{PF}\cdot\mathbf d=0$ at the end.
