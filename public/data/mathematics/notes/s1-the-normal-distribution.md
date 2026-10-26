# The normal distribution
> Examiners want a sketch, standardisation shown explicitly with $z=(x-\mu)/\sigma$, tables used correctly (including for the negative side), and a continuity correction whenever a discrete variable is approximated.

## Key ideas

### Shape and properties
A normal variable $X\sim N(\mu,\sigma^2)$ has a symmetrical bell-shaped curve centred on $\mu$, with the mean, median and mode equal. Spread is controlled by the **variance** $\sigma^2$, so $N(50,36)$ has standard deviation $6$. Total area under the curve is 1, and roughly 68% of values lie within 1 SD of the mean, 95% within 2 SD. The curve never touches the horizontal axis. A normal variable is continuous, so $P(X=a)=0$ and $<$ is the same as $\le$.

### Standardising and the tables
$$Z=\frac{X-\mu}{\sigma}\sim N(0,1)$$
The table gives $\Phi(z)=P(Z<z)$ for $z\ge0$. For negative $z$, use symmetry: $\Phi(-z)=1-\Phi(z)$. Also $P(Z>z)=1-\Phi(z)$.

### Calculating probabilities
1. Sketch the curve and shade the required region.
2. Standardise each boundary to a $z$ value.
3. Convert to $\Phi$ using the shaded area: for a right tail use $1-\Phi$; for an interval $a<X<b$ use $\Phi(z_b)-\Phi(z_a)$.
4. Read the table (interpolating is rarely needed) and give 3 significant figures.

### Finding an unknown value or parameter
**Unknown value $a$**: from $P(X<a)=p$ find $z=\Phi^{-1}(p)$ from the table in reverse, then $a=\mu+z\sigma$. If $p<0.5$, $z$ is negative.

**Unknown $\mu$ or $\sigma$**: form the equation $\dfrac{a-\mu}{\sigma}=z$ from each given probability. With two conditions, you get two simultaneous equations in $\mu$ and $\sigma$; subtract to eliminate $\mu$ and find $\sigma$ first. Common $z$ values to recognise (from the percentage-points table): $\Phi^{-1}(0.9)=1.282$, $\Phi^{-1}(0.95)=1.645$, $\Phi^{-1}(0.975)=1.960$.

### Normal approximation to the binomial
If $X\sim B(n,p)$ with $np>5$ and $nq>5$, then approximately
$$X\sim N(np,\,npq).$$
Because $X$ is discrete, apply a **continuity correction** by moving half a unit to the boundary:
- $P(X\ge k)\to P(Y>k-0.5)$
- $P(X>k)\to P(Y>k+0.5)$
- $P(X\le k)\to P(Y<k+0.5)$
- $P(X<k)\to P(Y<k-0.5)$
- $P(X=k)\to P(k-0.5<Y<k+0.5)$

### Modelling problems
Define the variable and its distribution in words ("let $X$ be the mass of a loaf in grams, $X\sim N(\ldots)$"). Typical problems ask how many items in a batch exceed a limit: find the probability, then multiply by the batch size, or treat counting as a binomial. Comment on validity: the normal model is reasonable because the data are symmetrical, continuous and unimodal.

## Formulae
- **In MF19:** the normal distribution function table $\Phi(z)$, the rule $\Phi(-z)=1-\Phi(z)$, and the critical values table (e.g. $\Phi^{-1}(0.95)=1.645$).
- **Memorise** (not in MF19): standardisation $z=(x-\mu)/\sigma$.
- **Memorise** (not in MF19): binomial approximation, mean $np$, variance $npq$, and the continuity correction.

## Worked example
**Question 1.** $X\sim N(50,6^2)$. Find (a) $P(47<X<59)$ and (b) the value $a$ such that $P(X<a)=0.9$.

(a)
$$\begin{aligned}z_1&=\frac{47-50}{6}=-0.5,\qquad z_2=\frac{59-50}{6}=1.5\\P&=\Phi(1.5)-\Phi(-0.5)\\&=0.9332-(1-0.6915)\\&=0.6247\approx0.625\end{aligned}$$
(b) $\Phi^{-1}(0.9)=1.282$, so
$$a=50+1.282\times6=57.7$$

**Question 2.** $X\sim B(80,0.4)$. Use a normal approximation to find $P(X\ge35)$.

$$\begin{aligned}np&=32,\quad npq=19.2\\Y&\sim N(32,19.2)\\P(X\ge35)&\to P(Y>34.5)\\z&=\frac{34.5-32}{\sqrt{19.2}}=0.5705\\P&=1-\Phi(0.5705)=1-0.7158=0.284\end{aligned}$$

## Common mistakes
- Using standard deviation where variance is given (or the reverse) when $N(\mu,\sigma^2)$ is quoted.
- Misusing symmetry for negative $z$: $\Phi(-0.5)=1-\Phi(0.5)=0.3085$, not $0.6915$.
- Omitting the continuity correction, or applying it the wrong way.
- Using the approximation without checking $np$ and $nq$.
- Giving $z$ the wrong sign when $p<0.5$.
- Forgetting to sketch, then shading the wrong tail.

## Exam tips
- Always draw a small sketch with $\mu$ marked and the area shaded.
- Show $z$ explicitly to at least 2 decimal places before reading the table.
- In "find $\mu$ and $\sigma$" questions, write both equations clearly and solve them simultaneously.
- Write the approximating distribution explicitly, $Y\sim N(np,\ npq)$.
- Use the continuity correction on the boundary only, never on the mean or variance.
