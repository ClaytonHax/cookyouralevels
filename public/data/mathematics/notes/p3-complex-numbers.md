# Complex numbers
> Examiners want exact algebra in Cartesian and polar form, careful treatment of arguments in the correct quadrant, and loci sketched with clear geometric reasoning.

## Key ideas

### Arithmetic in Cartesian form
$i^2=-1$. For $z=x+iy$: add and subtract real and imaginary parts separately; multiply by expanding and replacing $i^2$ by $-1$.

**Division:** multiply top and bottom by the conjugate of the denominator.
$$\frac{a+bi}{c+di}=\frac{(a+bi)(c-di)}{c^2+d^2}$$
Two complex numbers are equal if and only if their real parts and imaginary parts are equal, which gives simultaneous equations (for example when finding $\sqrt{a+bi}$ by setting $(x+iy)^2=a+bi$).

### Real part, imaginary part, conjugate, modulus, argument
- $\text{Re}(z)=x$, $\text{Im}(z)=y$ (a real number).
- Conjugate: $z^*=x-iy$. Then $zz^*=x^2+y^2$.
- Modulus: $|z|=\sqrt{x^2+y^2}$.
- Argument: $\arg z=\theta$ with $\tan\theta=\dfrac yx$, taken in the correct quadrant, with $-\pi<\theta\le\pi$.

Always sketch the point before finding $\theta$. For $-1+i$: the point is in the second quadrant, so $\theta=\pi-\tfrac\pi4=\tfrac{3\pi}4$ (not $-\tfrac\pi4$).

### Argand diagram
$z=x+iy$ is plotted at $(x,y)$. Addition is vector addition; $z^*$ is the reflection in the real axis; $|z|$ is the distance from the origin; $|z_1-z_2|$ is the distance between the two points.

### Modulus-argument form
$$z=r(\cos\theta+i\sin\theta),\quad r=|z|,\ \theta=\arg z$$
Rules: $|z_1z_2|=|z_1||z_2|$, $\arg(z_1z_2)=\arg z_1+\arg z_2$, $\left|\dfrac{z_1}{z_2}\right|=\dfrac{|z_1|}{|z_2|}$, $\arg\dfrac{z_1}{z_2}=\arg z_1-\arg z_2$ (adjust by $2\pi$ to stay in range). Multiplying by $i$ rotates by $\tfrac\pi2$.

### Quadratic equations with complex roots
For $az^2+bz+c=0$ with $b^2-4ac<0$:
$$z=\frac{-b\pm i\sqrt{4ac-b^2}}{2a}$$
The roots are a conjugate pair. For $z^2-4z+13=0$: $z=2\pm3i$.

### Conjugate roots of polynomials
If a polynomial has **real** coefficients and $z=p+qi$ is a root, so is $p-qi$. Together they give the real quadratic factor $z^2-2pz+(p^2+q^2)$. Use it to divide and find the remaining factors.

### Loci
- $|z-a|=r$: circle, centre $a$, radius $r$. $|z-a|<r$ is the inside.
- $|z-a|=|z-b|$: the perpendicular bisector of the line joining $a$ and $b$.
- $\arg(z-a)=\theta$: a **half-line** from $a$ (not including $a$) at angle $\theta$ to the positive real direction.
- Inequalities give regions; use dashed lines for strict inequalities.

### Using loci and regions
Read off greatest/least $|z|$ or $\arg z$ from geometry: for a circle, the greatest $|z|$ is the distance from the origin to the centre plus the radius. Shade regions satisfying all conditions, and find intersections using geometry or algebra.

## Formulae
- **In MF19:** only the quadratic formula; nothing specific to complex numbers.
- **Memorise** (not in MF19): all definitions above, the product and quotient rules for modulus and argument, and the three locus types.

## Worked example
**Q1.** Express $z=\dfrac{3+2i}{1-i}$ in the form $x+iy$, and find $|z|$ and $\arg z$.

$$z=\frac{(3+2i)(1+i)}{(1-i)(1+i)}=\frac{3+3i+2i-2}{2}=\frac{1+5i}{2}=\tfrac12+\tfrac52i$$
$$|z|=\sqrt{\tfrac14+\tfrac{25}4}=\frac{\sqrt{26}}2,\qquad\arg z=\arctan5=1.37\text{ rad}$$
(first quadrant, so no adjustment).

**Q2.** The polynomial $p(z)=z^3-z^2+3z+5$ has a root $1+2i$. Find the other roots.

Real coefficients, so $1-2i$ is also a root. The quadratic factor is
$$(z-1-2i)(z-1+2i)=(z-1)^2+4=z^2-2z+5$$
Divide: $z^3-z^2+3z+5=(z^2-2z+5)(z+1)$. Roots: $1+2i$, $1-2i$, $-1$.

**Q3.** The locus of $z$ satisfies $|z-3-i|\le2$. Find the greatest value of $|z|$.

The region is a disc with centre $3+i$ and radius $2$. The distance from the origin to the centre is $\sqrt{9+1}=\sqrt{10}$. The greatest $|z|$ is $\sqrt{10}+2$.

## Common mistakes
- Finding $\arg z$ with $\arctan\frac yx$ and forgetting the quadrant.
- Dividing without multiplying by the conjugate.
- Writing $|z|^2=z^2$ rather than $zz^*$.
- Drawing a full line for $\arg(z-a)=\theta$, or including the point $a$.
- Mixing up $|z-a|=|z-b|$ (bisector) with a circle.
- Stating only $p+qi$ as a root of a real polynomial without its conjugate.
- Measuring $\arg$ outside $-\pi<\theta\le\pi$ when the principal argument is asked.

## Exam tips
- Sketch an Argand diagram for every argument or loci question.
- Check a division by multiplying back.
- For loci, state the centre and radius (or the bisected points) before sketching.
- Give arguments in radians unless told otherwise, exactly where possible (like $\tfrac{3\pi}4$).
