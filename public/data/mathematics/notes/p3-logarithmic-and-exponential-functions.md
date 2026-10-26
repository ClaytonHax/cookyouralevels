# Logarithmic and exponential functions
> Examiners want exact use of log laws to solve equations, correct linearisation of non-linear data, and models interpreted in context with sensible units.

## Key ideas

### Solving with logarithms and exponentials
Key facts: $y=e^x$ and $y=\ln x$ are inverses, so $\ln e^x=x$ and $e^{\ln x}=x$.

Method for $a^{f(x)}=b^{g(x)}$:
1. Take $\ln$ (or $\lg$) of both sides.
2. Bring the powers down: $f(x)\ln a=g(x)\ln b$.
3. Collect the $x$ terms, factorise, and divide.

Equations that are secretly quadratics, like $e^{2x}-5e^x+6=0$, use the substitution $u=e^x$. Remember $u>0$, so reject any negative value of $u$.

**Inequalities:** taking logs keeps the direction if the base is greater than 1, but dividing by a negative number such as $\ln\tfrac12$ reverses it. For example, $0.8^n<0.01$ gives $n\ln0.8<\ln0.01$, so $n>\dfrac{\ln0.01}{\ln0.8}$ because $\ln0.8<0$.

### Linearising non-linear data
Turn the relationship into $Y=mX+c$ and read off $m$ and $c$ from the graph.

| Relationship | Plot | Gradient | Intercept |
|---|---|---|---|
| $y=Ax^n$ | $\ln y$ against $\ln x$ | $n$ | $\ln A$ |
| $y=Ab^x$ | $\ln y$ against $x$ | $\ln b$ | $\ln A$ |
| $y=Ae^{kx}$ | $\ln y$ against $x$ | $k$ | $\ln A$ |

Steps:
1. Take logs of both sides and apply log laws.
2. Match to $Y=mX+c$.
3. Use two accurate points (or a given gradient and intercept) to get $m$ and $c$.
4. Undo the log to recover the constants: $A=e^{c}$.

### Exponential growth and decay
Models take the form $N=N_0e^{kt}$ (growth, $k>0$) or $N=N_0e^{-kt}$ (decay, $k>0$). Taking logs gives the time to reach a target. Doubling time is $\dfrac{\ln2}{k}$ and half-life is $\dfrac{\ln2}{k}$.

Models like $N=A+Be^{-kt}$ tend to a limit $A$ as $t\to\infty$.

### Interpreting parameters
- $N_0$ (or $A+B$) is the value at $t=0$: the starting amount.
- $k$ is the relative rate of change: $\dfrac{dN}{dt}=kN$, so the quantity changes by a fixed percentage per unit time.
- A horizontal asymptote $A$ is the long-term limit, so state it as a real-world limit.
- State units and whether a model is realistic (for example, it may fail for large $t$).

## Formulae
- **Memorise** (not in MF19): all log laws, $\ln e^x=x$, change of base $\log_ab=\dfrac{\ln b}{\ln a}$, and the linearisation tables above.
- **In MF19:** only $\dfrac d{dx}(e^x)$, $\dfrac d{dx}(\ln x)$, $\int e^x\,dx$ and $\int\dfrac1x\,dx$, so the log laws are your responsibility.

Log laws: $\ln(ab)=\ln a+\ln b$, $\ln\tfrac ab=\ln a-\ln b$, $\ln a^k=k\ln a$.

## Worked example
**Q1.** Solve $3^{2x+1}=5^x$, giving $x$ to 3 significant figures.

$$\begin{aligned}(2x+1)\ln3&=x\ln5\\2x\ln3+\ln3&=x\ln5\\\ln3&=x(\ln5-2\ln3)\\x&=\frac{\ln3}{\ln5-2\ln3}=\frac{1.0986}{-0.5878}=-1.87\end{aligned}$$

**Q2.** Experimental data satisfy $y=Ax^n$. A plot of $\ln y$ against $\ln x$ is a straight line through $(1,2)$ and $(3,8)$. Find $A$ and $n$.

$\ln y=n\ln x+\ln A$.

Gradient: $n=\dfrac{8-2}{3-1}=3$.

Intercept: using $(1,2)$, $2=3(1)+\ln A$, so $\ln A=-1$ and $A=e^{-1}\approx0.368$.

**Q3.** The mass of a radioactive sample is $N=200e^{-0.05t}$ grams after $t$ years. Find the time for $N$ to halve.

$$\begin{aligned}100&=200e^{-0.05t}\\e^{-0.05t}&=\tfrac12\\-0.05t&=-\ln2\\t&=\frac{\ln2}{0.05}=13.9\end{aligned}$$

## Common mistakes
- Writing $\ln(a+b)=\ln a+\ln b$.
- Forgetting to reject a negative value of $e^x$ in a quadratic-in-$e^x$ equation.
- Not reversing an inequality when dividing by a negative logarithm.
- Plotting $\ln y$ against $x$ for a power law, or $\ln y$ against $\ln x$ for an exponential.
- Reporting the intercept $\ln A$ as $A$.
- Giving a rounded value mid-way and losing accuracy; keep full calculator values.

## Exam tips
- State the linear form explicitly: "$\ln y=\ln A+n\ln x$".
- Use points far apart on a graph for the gradient.
- In context questions, finish with a sentence including units.
- Use exact forms ($\ln2$) when the question says "exact".
