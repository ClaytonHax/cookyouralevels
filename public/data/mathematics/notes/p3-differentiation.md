# Differentiation
> Examiners want fluent use of the product, quotient and chain rules together, correct implicit and parametric differentiation, and tangent, normal and optimisation problems finished with the right answer to the right question.

## Key ideas

### Product, quotient and chain rules together
- **Chain:** $\dfrac{dy}{dx}=\dfrac{dy}{du}\cdot\dfrac{du}{dx}$.
- **Product:** $\dfrac{d}{dx}(uv)=u\dfrac{dv}{dx}+v\dfrac{du}{dx}$.
- **Quotient:** $\dfrac{d}{dx}\left(\dfrac uv\right)=\dfrac{v\,u'-u\,v'}{v^2}$.

For example $\dfrac{d}{dx}\left[x^2e^{3x}\right]=2xe^{3x}+3x^2e^{3x}=xe^{3x}(2+3x)$. Factorise the result: it is usually needed to find stationary points.

### Standard derivatives
$$\frac{d}{dx}e^{kx}=ke^{kx},\quad\frac{d}{dx}\ln(ax+b)=\frac{a}{ax+b},\quad\frac{d}{dx}a^x=a^x\ln a$$
$$\frac{d}{dx}\sin kx=k\cos kx,\quad\frac{d}{dx}\cos kx=-k\sin kx,\quad\frac{d}{dx}\tan x=\sec^2x$$
Also $\dfrac{d}{dx}\sec x=\sec x\tan x$, $\dfrac{d}{dx}\csc x=-\csc x\cot x$, $\dfrac{d}{dx}\cot x=-\csc^2x$. Trig differentiation requires radians.

### Parametric curves
For $x=f(t)$, $y=g(t)$:
$$\frac{dy}{dx}=\frac{dy/dt}{dx/dt}$$
Simplify and cancel common factors before substituting.

### Implicit differentiation
1. Differentiate every term with respect to $x$; a term in $y$ gets a factor $\dfrac{dy}{dx}$ (e.g. $\dfrac d{dx}y^2=2y\dfrac{dy}{dx}$).
2. Use the product rule for terms like $xy$: $\dfrac{d}{dx}(xy)=y+x\dfrac{dy}{dx}$.
3. Collect the $\dfrac{dy}{dx}$ terms, factorise, and solve.

### Tangents, normals and stationary points
1. Find $\dfrac{dy}{dx}$ (parametric or implicit).
2. Substitute the point to get the gradient $m$.
3. Tangent: $y-y_1=m(x-x_1)$. Normal gradient: $-\dfrac1m$.
4. Stationary points: set $\dfrac{dy}{dx}=0$ (numerator zero for a parametric or implicit quotient) and use the original equation for the other coordinate. Determine nature using the sign of $\dfrac{dy}{dx}$ either side or $\dfrac{d^2y}{dx^2}$.

### Rates of change and optimisation
- Related rates: chain rule, $\dfrac{dV}{dt}=\dfrac{dV}{dr}\times\dfrac{dr}{dt}$.
- Optimisation: write a single-variable function using the constraint, differentiate, set to zero, justify max/min, and answer the question asked.

### Inverse trig derivatives
$$\frac{d}{dx}\arcsin x=\frac1{\sqrt{1-x^2}},\quad\frac{d}{dx}\arccos x=-\frac1{\sqrt{1-x^2}},\quad\frac{d}{dx}\arctan x=\frac1{1+x^2}$$
For $\arctan(kx)$ use the chain rule: $\dfrac{k}{1+k^2x^2}$.

## Formulae
- **In MF19:** derivatives of $x^n$, $\ln x$, $e^x$, $\sin x$, $\cos x$, $\tan x$, $\sec x$, $\operatorname{cosec}x$, $\cot x$ and $\tan^{-1}x$, plus the product rule, quotient rule and parametric rule $\dfrac{dy}{dx}=\dfrac{dy/dt}{dx/dt}$.
- **Memorise** (not in MF19): the chain rule, the derivative of $a^x$, the implicit differentiation method, and the $k$-forms such as $\dfrac d{dx}(e^{kx})$.
- Derivatives of $\sin^{-1}x$ and $\cos^{-1}x$ are not needed for 9709 (only $\tan^{-1}x$ is listed).

## Worked example
**Q1.** A curve has parametric equations $x=t^2+2t$, $y=t^3-3t$. Find the stationary point and the equation of the tangent at $t=2$.

$$\frac{dy}{dx}=\frac{3t^2-3}{2t+2}=\frac{3(t-1)(t+1)}{2(t+1)}=\frac{3(t-1)}2\quad(t\ne-1)$$
Stationary when $t=1$: $x=3$, $y=-2$, so the point is $(3,-2)$.

At $t=2$: $x=8$, $y=2$, gradient $\tfrac32$.
$$y-2=\tfrac32(x-8)\ \Rightarrow\ 3x-2y-20=0$$

**Q2.** Curve: $x^2+xy+y^2=3$. Find the gradient at $(1,1)$ and the normal there.

$$2x+y+x\frac{dy}{dx}+2y\frac{dy}{dx}=0\ \Rightarrow\ \frac{dy}{dx}=-\frac{2x+y}{x+2y}$$
At $(1,1)$: $-\tfrac33=-1$. Check the point lies on the curve: $1+1+1=3$. The normal has gradient $1$, so $y-1=x-1$, i.e. $y=x$.

**Q3.** Differentiate $y=\dfrac{e^{2x}}{1+x}$ and find its stationary point.

$$\frac{dy}{dx}=\frac{2e^{2x}(1+x)-e^{2x}}{(1+x)^2}=\frac{e^{2x}(2x+1)}{(1+x)^2}$$
Since $e^{2x}>0$, $\dfrac{dy}{dx}=0$ when $x=-\tfrac12$, giving $y=\dfrac{e^{-1}}{1/2}=2e^{-1}$. The gradient changes from negative to positive through $x=-\tfrac12$, so this is a minimum.

**Q4.** A sphere's volume increases at $12\ \mathrm{cm^3\,s^{-1}}$. Find the rate at which the radius increases when $r=3$ cm.

$V=\tfrac43\pi r^3$, so $\dfrac{dV}{dr}=4\pi r^2=36\pi$ at $r=3$.
$$\frac{dr}{dt}=\frac{dV/dt}{dV/dr}=\frac{12}{36\pi}=\frac1{3\pi}\approx0.106\ \mathrm{cm\,s^{-1}}$$

## Common mistakes
- Forgetting the $\dfrac{dy}{dx}$ factor in implicit differentiation.
- Missing the product rule on $xy$.
- Differentiating $a^x$ as $xa^{x-1}$.
- Mixing up the quotient-rule order (numerator is $vu'-uv'$).
- Using degrees with trig derivatives.
- Forgetting to cancel a common factor in $\dfrac{dy/dt}{dx/dt}$ and missing or inventing a stationary point.
- Leaving the answer as a parameter value when coordinates were requested.

## Exam tips
- Factorise before setting a derivative to zero.
- For optimisation, prove max/min and give units.
- Check implicit answers by confirming the given point satisfies the curve equation.
- Use $\dfrac{dy}{dx}=\dfrac{1}{dx/dy}$ when it is easier to find $\dfrac{dx}{dy}$.
