# Linear combinations of random variables
> Examiners want the correct rules for means and variances (variances add, and coefficients are squared), the independence assumption stated, and the combination defined as one new normal variable before any probability is found.

## Key ideas

### Expectation and variance of $aX+b$
For any random variable $X$ and constants $a$, $b$:
$$E(aX+b)=aE(X)+b,\qquad \mathrm{Var}(aX+b)=a^2\mathrm{Var}(X)$$
Adding a constant $b$ shifts the mean but does not change the spread. Multiplying by $a$ scales the mean by $a$ and the variance by $a^2$ (the standard deviation by $|a|$). A negative multiplier does not make variance negative.

### Expectation and variance of $aX+bY$
For any $X$ and $Y$: $E(aX+bY)=aE(X)+bE(Y)$.
For **independent** $X$ and $Y$:
$$\mathrm{Var}(aX+bY)=a^2\mathrm{Var}(X)+b^2\mathrm{Var}(Y)$$
Note that variances **add** even for a difference: $\mathrm{Var}(X-Y)=\mathrm{Var}(X)+\mathrm{Var}(Y)$, since $(-1)^2=1$. This is the most tested idea in the topic.

Two kinds of problem are easy to confuse. $X_1+X_2$ means two independent observations of the *same* variable, with variance $2\mathrm{Var}(X)$. By contrast $2X$ means one observation doubled, with variance $4\mathrm{Var}(X)$.

### Linear combinations of independent normals
If $X\sim N(\mu_1,\sigma_1^2)$ and $Y\sim N(\mu_2,\sigma_2^2)$ are independent, then
$$aX+bY\sim N\big(a\mu_1+b\mu_2,\ a^2\sigma_1^2+b^2\sigma_2^2\big).$$
This is a normal distribution because linear combinations of independent normals are normal. For $n$ independent observations of one normal variable, the sum is $N(n\mu,n\sigma^2)$.

### Sums and differences of normal variables
Method:
1. Define the new variable $W$ (for example $W=Y-X$).
2. Find its mean using the combination of means.
3. Find its variance by adding the (squared-coefficient) variances.
4. State $W\sim N(\ldots)$ and standardise.
5. Interpret the event as a statement about $W$ (for example "$Y>X$" is "$W>0$").

Typical contexts: total mass of several items, comparing two machines, the difference between lengths, a journey in several independent legs, or whether a combined object fits a space.

## Formulae
- $E(aX+b)=aE(X)+b$; $\mathrm{Var}(aX+b)=a^2\mathrm{Var}(X)$.
- $E(aX+bY)=aE(X)+bE(Y)$.
- Independent: $\mathrm{Var}(aX\pm bY)=a^2\mathrm{Var}(X)+b^2\mathrm{Var}(Y)$.
- The formula booklet does not list these; learn them.
- Independent normals: any linear combination is normal with the mean and variance above.

## Worked example
**Question 1.** $X$ and $Y$ are independent with $E(X)=5$, $\mathrm{Var}(X)=4$, $E(Y)=3$, $\mathrm{Var}(Y)=9$. Find $E(3X-2Y)$ and $\mathrm{Var}(3X-2Y)$.

$$\begin{aligned}E(3X-2Y)&=3(5)-2(3)=9\\\mathrm{Var}(3X-2Y)&=3^2(4)+(-2)^2(9)=36+36=72\end{aligned}$$

**Question 2.** The lengths of two independent components are $X\sim N(10,4)$ and $Y\sim N(12,9)$ (in cm). Find the probability that a randomly chosen $Y$ is longer than a randomly chosen $X$.

Let $W=Y-X$.
$$\begin{aligned}E(W)&=12-10=2\\\mathrm{Var}(W)&=9+4=13\\W&\sim N(2,13)\\P(W>0)&=P\!\left(Z>\frac{0-2}{\sqrt{13}}\right)=P(Z>-0.5547)\\&=\Phi(0.5547)=0.7105\approx0.711\end{aligned}$$

## Common mistakes
- Subtracting variances for a difference.
- Forgetting to square the coefficient ($\mathrm{Var}(3X)=9\mathrm{Var}(X)$, not $3\mathrm{Var}(X)$).
- Confusing $X_1+X_2$ (two observations) with $2X$ (double one observation).
- Using standard deviations in $N(\mu,\sigma^2)$ without squaring.
- Not stating independence as an assumption.
- Standardising $Y-X$ with the SD of $X$ or $Y$ alone instead of the SD of the combination.

## Exam tips
- Write down "Let $W=\ldots$" on its own line every time; it earns the first mark.
- Compute the mean and variance on separate lines to make marks easy to give.
- Convert "total weight exceeds the limit" and "one is greater than the other" into inequalities on one normal variable.
- Variance of a constant times a variable: square the constant. Constants added alone leave variance unchanged.
- Check that your final variance is positive.
