# Differential equations
> Examiners want the situation translated into a correct differential equation, separation of variables carried out cleanly with a constant, and the solution interpreted in context.

## Key ideas

### Forming a differential equation
Translate words to symbols:
- "rate of change of $x$ with respect to $t$" is $\dfrac{dx}{dt}$.
- "proportional to $y$" means $=ky$, with an unknown constant $k$.
- "decreasing" or "loses" gives a negative sign: $\dfrac{dN}{dt}=-kN$ (take $k>0$).
- "proportional to the difference from the surroundings" gives $\dfrac{d\theta}{dt}=-k(\theta-\theta_0)$.
- Rates combine: for a tank with inflow and outflow, $\dfrac{dV}{dt}=\text{in}-\text{out}$. Use the chain rule to link variables, such as $\dfrac{dV}{dt}=\dfrac{dV}{dh}\dfrac{dh}{dt}$.

### Separating the variables
For $\dfrac{dy}{dx}=f(x)g(y)$:
1. Rearrange: $\displaystyle\int\frac{1}{g(y)}dy=\int f(x)\,dx$.
2. Integrate both sides, with a **single** constant $c$ on one side.
3. Rearrange for $y$ if possible.

Often a natural log arrives. A neat way is to write the constant as $\ln A$, then combine: $\ln y=kx+\ln A\Rightarrow y=Ae^{kx}$. For $\int\frac1{y}dy$ you may need partial fractions or a substitution, such as for $\dfrac{dy}{dx}=y(1-y)$.

### Particular solutions
Substitute the given condition (for example $y=2$ when $x=0$) to find $c$, and state the particular solution. If there are two unknown constants (such as $k$ and $c$), use two conditions in sequence, finding $c$ first.

### Interpreting in context
- Check the domain: time is positive; population is non-negative.
- Long-term behaviour: let $t\to\infty$ and state the limit in context.
- Quantities of the form $A+Be^{-kt}$ approach $A$.
- Include units and round sensibly (for example whole organisms).

## Formulae
- **In MF19:** the standard integrals (including $\int\dfrac1x\,dx=\ln|x|$ and $\int\dfrac{f'(x)}{f(x)}dx$) only, so integrate carefully.
- **Memorise** (not in MF19): the separation procedure and the standard families:
  - $\dfrac{dy}{dt}=ky\Rightarrow y=Ae^{kt}$
  - $\dfrac{d\theta}{dt}=-k(\theta-\theta_0)\Rightarrow\theta=\theta_0+Ae^{-kt}$

## Worked example
**Q1.** Solve $\dfrac{dy}{dx}=xy$, given $y=2$ when $x=0$.

$$\begin{aligned}\int\frac1y\,dy&=\int x\,dx\\\ln y&=\tfrac12x^2+c\end{aligned}$$
At $(0,2)$: $\ln2=c$. So $\ln y=\tfrac12x^2+\ln2$, giving
$$y=2e^{x^2/2}$$

**Q2.** A cup of tea at $80^\circ\mathrm C$ cools in a $20^\circ\mathrm C$ room. Its temperature $\theta$ satisfies $\dfrac{d\theta}{dt}=-k(\theta-20)$ with $k>0$, $t$ in minutes. After 10 minutes, $\theta=50$. (a) Find $\theta$ in terms of $t$. (b) When does the tea reach $25^\circ\mathrm C$?

(a) 
$$\begin{aligned}\int\frac{1}{\theta-20}d\theta&=\int-k\,dt\\\ln(\theta-20)&=-kt+c\\\theta-20&=Ae^{-kt}\end{aligned}$$
At $t=0$: $60=A$. At $t=10$: $30=60e^{-10k}$, so $e^{-10k}=\tfrac12$ and $k=\dfrac{\ln2}{10}$.
$$\theta=20+60e^{-(\ln2/10)t}$$

(b) $5=60e^{-kt}\Rightarrow e^{kt}=12\Rightarrow t=\dfrac{\ln12}{k}=\dfrac{10\ln12}{\ln2}=35.8$ minutes.

As $t\to\infty$, $\theta\to20$, the room temperature, as expected.

**Q3.** Solve $\dfrac{dy}{dx}=e^{x-y}$ given $y=\ln2$ when $x=0$.

Write $e^{x-y}=e^xe^{-y}$, so separate:
$$\begin{aligned}\int e^y\,dy&=\int e^x\,dx\\e^y&=e^x+c\end{aligned}$$
At $(0,\ln2)$: $2=1+c$, so $c=1$. Hence $e^y=e^x+1$ and $y=\ln(e^x+1)$.

**Q4.** Water leaks from a tank so that its volume $V$ decreases at a rate proportional to $\sqrt V$. Form the differential equation and solve it.

$\dfrac{dV}{dt}=-k\sqrt V$ with $k>0$.
$$\begin{aligned}\int V^{-1/2}dV&=-\int k\,dt\\2\sqrt V&=-kt+c\end{aligned}$$
With $V=V_0$ at $t=0$: $c=2\sqrt{V_0}$, so $\sqrt V=\sqrt{V_0}-\tfrac k2t$. The tank is empty when $t=\dfrac{2\sqrt{V_0}}{k}$, so the model gives a finite emptying time, unlike exponential decay.

## Common mistakes
- Putting a constant on both sides, or adding it after rearranging (this changes the meaning of $A$).
- Writing $\ln y=\ldots+c$ then $y=e^{\ldots}+c$.
- Losing the modulus in $\ln|\ \cdot\ |$ without justification.
- Wrong sign for decay, or forgetting the proportionality constant.
- Using the condition before the constant is introduced.
- Failing to interpret: leaving $e^{-kt}$ as just a formula.

## Exam tips
- State "let $k$ be a positive constant" before writing the equation.
- Separate variables on one line so the marker sees it.
- Use the initial condition first, then the second condition.
- Always answer the actual question: a time, a population, a limit.
