# Discrete random variables
> Examiners want probability tables that sum to 1, expectation and variance calculated from the table, and binomial or geometric models justified by their conditions and used with the right inequality.

## Key ideas

### Probability distribution tables
A discrete random variable $X$ takes separate values $x$ with probabilities $P(X=x)$. A valid distribution has every probability between $0$ and $1$ and
$$\sum P(X=x)=1.$$
Use this to find an unknown constant: add the probabilities, set equal to 1, solve, then check no probability is negative.

### Expectation
$$E(X)=\sum xP(X=x)$$
This is the long-run mean, not necessarily a possible value of $X$. For a function, $E(g(X))=\sum g(x)P(X=x)$, so $E(X^2)=\sum x^2P(X=x)$.

### Variance
$$\mathrm{Var}(X)=E(X^2)-[E(X)]^2$$
It measures spread; the standard deviation is its square root. Always compute $E(X^2)$ separately in the table. Variance can never be negative; if you get a negative value, there is an error.

### The binomial distribution $B(n,p)$ and its conditions
$X\sim B(n,p)$ models the number of successes in $n$ trials when:
1. There are a **fixed number $n$** of trials.
2. Each trial has exactly **two outcomes** (success/failure).
3. The trials are **independent**.
4. The probability of success $p$ is **constant**.

State these in context when asked to justify the model, using the situation's wording.

### Binomial probabilities, mean and variance
$$P(X=r)=\binom nr p^r(1-p)^{n-r},\qquad E(X)=np,\qquad \mathrm{Var}(X)=np(1-p)$$
For "at least" and "more than" use the complement, for example $P(X\ge2)=1-P(X\le1)$. Be careful with inequalities: $P(X<4)=P(X\le3)$. Many questions ask for the smallest $n$ with $P(\ldots)>$ a value, which you solve with logs or trial.

### The geometric distribution
Consider repeating independent trials each with probability $p$ of success until the first success. If $X$ is the trial number of the first success, then $X\sim\mathrm{Geo}(p)$:
$$P(X=r)=(1-p)^{r-1}p,\qquad E(X)=\frac1p$$
Useful: $P(X>r)=(1-p)^r$ (the first $r$ trials all fail), so $P(X\le r)=1-(1-p)^r$. Conditions are as for binomial but with no fixed number of trials.

## Formulae
- $\sum p=1$ — memorise (not in MF19).
- **In MF19:** $E(X)=\sum xp$; $\mathrm{Var}(X)=\sum x^2p-[E(X)]^2$.
- **In MF19:** Binomial $P(X=r)=\binom nr p^r q^{n-r}$ with $q=1-p$; mean $np$; variance $npq$.
- **In MF19:** Geometric $P(X=r)=pq^{r-1}$; mean $1/p$.
- Know how to use each; the geometric variance and the conditions for each model are not given.

## Worked example
**Question 1.** The random variable $X$ has distribution $P(X=x)=kx$ for $x=1,2,3,4$. Find $k$, $E(X)$ and $\mathrm{Var}(X)$.

$$\begin{aligned}k+2k+3k+4k&=1\Rightarrow k=0.1\\E(X)&=1(0.1)+2(0.2)+3(0.3)+4(0.4)=3\\E(X^2)&=1(0.1)+4(0.2)+9(0.3)+16(0.4)=10\\\mathrm{Var}(X)&=10-3^2=1\end{aligned}$$

**Question 2.** $X\sim B(10,0.3)$. Find $P(X=3)$ and $P(X\ge2)$, and the mean and variance. Also, a trial succeeds with probability $0.2$; find the probability the first success is on the 4th trial and the expected number of trials.

$$\begin{aligned}P(X=3)&=\binom{10}3(0.3)^3(0.7)^7=0.2668\\P(X\ge2)&=1-P(0)-P(1)=1-0.0282-0.1211=0.851\\E(X)&=3,\qquad\mathrm{Var}(X)=10(0.3)(0.7)=2.1\end{aligned}$$
Geometric:
$$\begin{aligned}P(X=4)&=0.8^3\times0.2=0.1024\\E(X)&=\frac{1}{0.2}=5\end{aligned}$$

## Common mistakes
- Not checking that probabilities sum to 1, or leaving out a value of $X$.
- Using $E(X)^2$ in place of $E(X^2)$, or forgetting to subtract $[E(X)]^2$.
- Using $P(X\ge2)=1-P(X=1)$ instead of $1-P(X\le1)$.
- Applying binomial when trials are not independent (sampling without replacement from a small population).
- For the geometric, using $(1-p)^r$ instead of $(1-p)^{r-1}$ for $P(X=r)$.
- Stating a condition without context ("independent trials" instead of "whether each seed grows is independent").

## Exam tips
- Draw the distribution table first; add rows for $x^2p$ if you need the variance.
- Write the binomial model clearly: "$X\sim B(10,0.3)$".
- Convert every inequality to $\le$ form before using the cumulative route.
- Use the calculator's binomial functions only after writing the setup; show the formula once.
- Give probabilities to 3 significant figures (or 4 decimal places if small).
