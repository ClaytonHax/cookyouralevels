# Differentiation
> Examiners want the standard derivatives recalled instantly and the product, quotient and chain rules combined accurately, including parametric and implicit forms.

## Key ideas

### Exponentials and logarithms
$$\frac d{dx}(e^{kx})=ke^{kx},\qquad\frac d{dx}(\ln x)=\frac1x.$$
By the chain rule, $\dfrac d{dx}\ln(ax+b)=\dfrac a{ax+b}$. Use log laws to simplify before differentiating: $\ln(x^3)=3\ln x$, and $\ln\!\big[(2x+1)(x-3)\big]$ can be split into two terms.

### Trigonometric functions of $kx$ (radians)
$$\frac d{dx}\sin kx=k\cos kx,\qquad\frac d{dx}\cos kx=-k\sin kx,\qquad\frac d{dx}\tan kx=k\sec^2kx.$$
These work only in radians. If the angle is in degrees, convert first.

### Product rule
For $y=uv$:
$$\frac{dy}{dx}=u\frac{dv}{dx}+v\frac{du}{dx}.$$
Write down $u$, $v$, $u'$, $v'$ in a table first. Factorise the result.

### Quotient rule
For $y=\dfrac uv$:
$$\frac{dy}{dx}=\frac{v\dfrac{du}{dx}-u\dfrac{dv}{dx}}{v^2}.$$
The order in the numerator matters ($v u'-u v'$).

### Composite functions
Combine the chain rule with the standard derivatives: the derivative of $f(g(x))$ is $f'(g(x))\,g'(x)$. For example $\dfrac d{dx}e^{x^2}=2xe^{x^2}$ and $\dfrac d{dx}\sin^2x=2\sin x\cos x$. Peel the function from the outside in.

### Parametric differentiation
If $x=f(t)$ and $y=g(t)$,
$$\frac{dy}{dx}=\frac{dy/dt}{dx/dt}.$$
Substitute the parameter value to find the gradient and the coordinates of the point.

### Implicit differentiation
Differentiate each term with respect to $x$. A term in $y$ gets an extra $\dfrac{dy}{dx}$ (chain rule): $\dfrac d{dx}(y^2)=2y\dfrac{dy}{dx}$, and a product like $xy$ uses the product rule giving $y+x\dfrac{dy}{dx}$. Then collect all $\dfrac{dy}{dx}$ terms on one side and factorise.

## Formulae
- **In MF19:** the derivatives of $\ln x$, $e^x$, $\sin x$, $\cos x$, $\tan x$ (and $\sec x$ for P3), the product rule, the quotient rule and the parametric rule $\dfrac{dy}{dx}=\dfrac{dy/dt}{dx/dt}$.
- **Memorise** (not in MF19): the chain rule, and so the $k$-forms $\dfrac d{dx}(e^{kx})=ke^{kx}$, $\dfrac d{dx}(\sin kx)=k\cos kx$ etc.
- $\dfrac d{dx}(\sec x)=\sec x\tan x$ is P3 content.

## Worked example
**Question 1.** Differentiate (a) $y=x^2e^{3x}$; (b) $y=\dfrac{\ln x}{x^2}$ and find where $y$ is stationary.

**Solution.**
(a) $u=x^2$, $v=e^{3x}$, $u'=2x$, $v'=3e^{3x}$:
$$\frac{dy}{dx}=x^2(3e^{3x})+e^{3x}(2x)=xe^{3x}(3x+2).$$
(b) $u=\ln x$, $v=x^2$:
$$\frac{dy}{dx}=\frac{x^2\cdot\frac1x-\ln x\cdot2x}{x^4}=\frac{x-2x\ln x}{x^4}=\frac{1-2\ln x}{x^3}.$$
Stationary when $1-2\ln x=0$, so $\ln x=\tfrac12$ and $x=\sqrt e$.

**Question 2.** A curve has parametric equations $x=t^2+1$, $y=t^3$. Find the tangent at $t=2$.

**Solution.**
$$\frac{dy}{dx}=\frac{3t^2}{2t}=\frac{3t}2.$$
At $t=2$: gradient $3$; point $(5,8)$. Tangent: $y-8=3(x-5)$, i.e. $y=3x-7$.

**Question 3.** Find $\dfrac{dy}{dx}$ for $x^2+3xy+y^2=5$ at $(1,1)$.

**Solution.** Differentiate:
$$2x+3y+3x\frac{dy}{dx}+2y\frac{dy}{dx}=0\;\Rightarrow\;\frac{dy}{dx}=-\frac{2x+3y}{3x+2y}.$$
At $(1,1)$ (which lies on the curve: $1+3+1=5$): $\dfrac{dy}{dx}=-\dfrac55=-1$.

**Question 4.** Differentiate $y=\ln(\sin 2x)$ and $y=e^{\cos x}$.

**Solution.** Using the chain rule:
$$\frac{d}{dx}\ln(\sin2x)=\frac{2\cos2x}{\sin2x}=2\cot2x,\qquad\frac d{dx}e^{\cos x}=-\sin x\,e^{\cos x}.$$

## Common mistakes
- Forgetting the factor $k$ when differentiating $\sin kx$ or $e^{kx}$.
- Sign errors: $\dfrac d{dx}\cos x=-\sin x$.
- Reversing the quotient rule numerator.
- Treating $y$ as a constant when differentiating implicitly.
- Using degrees with the calculus formulae.
- Differentiating $\ln(ax+b)$ without the chain factor.

## Exam tips
- Simplify and factorise the derivative before setting it to zero.
- Check by substituting a value: compare with a numerical estimate if time allows.
- In parametric questions give final equations in terms of $x$ and $y$, not $t$.
- P3 extends this with $\sec$, $\csc$ and $\cot$ derivatives and more complex implicit/parametric work.
