# Logarithmic and exponential functions
> Examiners want the log laws applied precisely, exponential equations solved using logs, and data linearised so constants can be read off a straight-line graph.

## Key ideas

### Exponentials and logarithms as inverses
$y=a^x$ (with $a>0$, $a\ne1$) and $y=\log_ax$ are inverse functions: $a^x=y\iff x=\log_ay$. Their graphs are reflections of each other in $y=x$.
- $y=a^x$ (for $a>1$): passes through $(0,1)$, always positive, increasing, has the $x$-axis as an asymptote.
- $y=\log_ax$: passes through $(1,0)$, defined only for $x>0$, increasing, has the $y$-axis as an asymptote.

Useful facts: $\log_a1=0$, $\log_aa=1$, $a^{\log_ax}=x$.

### Laws of logarithms
$$\log_ax+\log_ay=\log_a(xy),\qquad\log_ax-\log_ay=\log_a\frac xy,\qquad\log_ax^k=k\log_ax.$$
Use them to condense or expand. To solve a log equation: combine into a single log, convert to exponential form, solve, then **reject** any answer that makes a logarithm's argument $\le0$.

### Solving $a^x=b$
1. Take logs of both sides (base 10 or $e$).
2. Bring down the power: $x\log a=\log b$.
3. Divide: $x=\dfrac{\log b}{\log a}$.

For equations like $2^{2x}-5(2^x)+4=0$, substitute $u=2^x$ and solve the quadratic, rejecting $u\le0$.

### The functions $e^x$ and $\ln x$
$e\approx2.718$ is the base for which the gradient of $y=e^x$ equals $y$ at every point. $\ln x=\log_ex$ is the inverse of $e^x$, so $e^{\ln x}=x$ and $\ln e^x=x$. The graph of $y=e^x$ has asymptote $y=0$ and passes through $(0,1)$; $y=\ln x$ has asymptote $x=0$ and passes through $(1,0)$.

### Linear form
Take logs to turn a curve into a straight line $Y=mX+c$.
- $y=ax^n$: $\ln y=n\ln x+\ln a$. Axes: $\ln y$ against $\ln x$, gradient $n$, intercept $\ln a$.
- $y=ab^x$ (or $y=ae^{kx}$): $\ln y=x\ln b+\ln a$. Axes: $\ln y$ against $x$, gradient $\ln b$ (or $k$), intercept $\ln a$.

Read the gradient and the intercept from the line, then un-log to get the constants.

### Growth and decay
Model: $N=Ae^{kt}$. If $k>0$ it is growth; if $k<0$ it is decay. Use a given data point to find $A$ and $k$, then solve for time using $\ln$. "Half-life" means the time for the quantity to halve; "doubling time" the time to double.

## Formulae
- **In MF19:** only $\dfrac d{dx}(e^x)$, $\dfrac d{dx}(\ln x)$, $\int e^x\,dx$ and $\int\dfrac1x\,dx$.
- **Memorise** (not in MF19): the log laws.
- **Memorise** (not in MF19): change of base $\log_ab=\dfrac{\ln b}{\ln a}$.
- **Memorise:** $e^{\ln x}=x$, $\ln e^x=x$.
- **Memorise:** the linearisation forms above.

## Worked example
**Question 1.** Solve (a) $3^{2x-1}=7$, giving $x$ to 3 s.f.; (b) $\log_2(x+3)+\log_2(x-3)=4$.

**Solution.**
(a)
$$(2x-1)\lg3=\lg7\;\Rightarrow\;2x-1=\frac{\lg7}{\lg3}=\frac{0.84510}{0.47712}=1.7712.$$
$$x=\frac{2.7712}2=1.39\ (3\text{ s.f.}).$$
(b)
$$\log_2\big[(x+3)(x-3)\big]=4\;\Rightarrow\;x^2-9=2^4=16\;\Rightarrow\;x^2=25.$$
So $x=5$ or $x=-5$. For $x=-5$, $\log_2(-2)$ is undefined, so reject. $x=5$. Check: $\log_28+\log_22=3+1=4$.

**Question 2.** A radioactive sample has mass $M=80e^{-kt}$ grams after $t$ years. After 5 years the mass is $50$ g. Find $k$.

**Solution.**
$$50=80e^{-5k}\;\Rightarrow\;e^{-5k}=0.625\;\Rightarrow\;-5k=\ln0.625=-0.4700.$$
$$k=0.0940.$$

## Common mistakes
- Writing $\log(x+y)=\log x+\log y$. The laws are for products and quotients, not sums.
- Forgetting to reject arguments $\le0$.
- Dividing logs incorrectly: $\dfrac{\ln a}{\ln b}\ne\ln\dfrac ab$.
- Taking logs of a sum such as $2^x+3=7$ term by term. Isolate the power first.
- In linear form, quoting the intercept as $a$ instead of $\ln a$.

## Exam tips
- Write down the substitution ($u=2^x$) and the condition ($u>0$).
- When logarithms need to be to a given base use $\log_ab=\dfrac{\ln b}{\ln a}$; any base in a calculation is fine.
- Keep full calculator accuracy and round at the end.
- P3 extends this with more complex growth models and differential equations.
