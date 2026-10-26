# The Poisson distribution
> Examiners want the Poisson model justified by its conditions in context, the mean scaled to the interval asked about, and the right approximation (binomial to Poisson, or Poisson to normal) chosen with the correct continuity correction.

## Key ideas

### When a Poisson model is suitable
$X\sim\mathrm{Po}(\lambda)$ counts the number of events in a fixed interval of time, length, area or volume when events:
1. occur **singly** (not in clusters),
2. occur **independently** of one another,
3. occur at a **constant average rate** (so the mean is proportional to the interval size).

Always state conditions in context ("calls to the helpline arrive independently, at a constant average rate"). A model fails if events cluster (rush hours), or if one event makes another more likely.

### Poisson probabilities, mean and variance
$$P(X=r)=e^{-\lambda}\frac{\lambda^r}{r!},\quad r=0,1,2,\ldots,\qquad E(X)=\mathrm{Var}(X)=\lambda$$
If a rate is given for one interval and the question uses another, **scale the mean** first: a rate of $2$ per hour becomes $\lambda=5$ for 2.5 hours. For "at least" probabilities use the complement, $P(X\ge1)=1-e^{-\lambda}$. A mean that is approximately equal to the variance in data suggests a Poisson model.

### Sums of independent Poisson variables
If $X\sim\mathrm{Po}(\lambda)$ and $Y\sim\mathrm{Po}(\mu)$ are independent, then
$$X+Y\sim\mathrm{Po}(\lambda+\mu).$$
This is the same idea as scaling the interval. Note that $X-Y$ is **not** Poisson. Two different kinds of event counted over one interval (cars and vans, for example) can be combined this way if independent.

### Poisson approximation to the binomial
If $X\sim B(n,p)$ with $n$ large ($n>50$) and $p$ small ($np<5$), then approximately
$$X\sim\mathrm{Po}(np).$$
Use it when tables for such $n$ are not available and calculations are heavy. State the conditions, name the new distribution and its parameter.

### Normal approximation to the Poisson
If $X\sim\mathrm{Po}(\lambda)$ with $\lambda$ large ($\lambda>15$), then approximately
$$X\sim N(\lambda,\lambda).$$
Apply a continuity correction as for the binomial: $P(X>k)\to P(Y>k+0.5)$, $P(X\ge k)\to P(Y>k-0.5)$, $P(X\le k)\to P(Y<k+0.5)$, $P(X<k)\to P(Y<k-0.5)$.

## Formulae
- **In MF19:** $P(X=r)=e^{-\lambda}\lambda^r/r!$; $E=\mathrm{Var}=\lambda$.
- **Memorise** (not in MF19): Sum: $\mathrm{Po}(\lambda)+\mathrm{Po}(\mu)=\mathrm{Po}(\lambda+\mu)$.
- **Memorise:** binomial to Poisson: $\lambda=np$ ($n>50$, $np<5$).
- **Memorise:** Poisson to normal: $N(\lambda,\lambda)$, $\lambda>15$.
- Cumulative Poisson tables are not provided in the exam; use your calculator.

## Worked example
**Question 1.** Emails arrive at an average rate of $3$ per hour, independently and at random. Find the probability that in a given hour (a) exactly 2 arrive, (b) at least 1 arrives.

$X\sim\mathrm{Po}(3)$.
$$\begin{aligned}P(X=2)&=e^{-3}\frac{3^2}{2!}=4.5e^{-3}=0.2240\\P(X\ge1)&=1-P(X=0)=1-e^{-3}=0.9502\end{aligned}$$

**Question 2.** A machine produces 200 items with each defective independently with probability $0.015$. Use a Poisson approximation to estimate the probability that exactly 2 are defective. Then, for $X\sim\mathrm{Po}(40)$, use a normal approximation to find $P(X>45)$.

$X\sim B(200,0.015)\approx\mathrm{Po}(3)$ since $n$ is large and $np=3<5$; $P(X=2)\approx0.2240$.

For the second part, $\lambda=40>15$, so $Y\sim N(40,40)$:
$$\begin{aligned}P(X>45)&\to P(Y>45.5)\\z&=\frac{45.5-40}{\sqrt{40}}=0.8696\\P&=1-\Phi(0.8696)=0.192\end{aligned}$$

## Common mistakes
- Using the rate for an hour when the question asks about 30 minutes.
- Saying "events happen at a constant rate" but omitting singly and independently.
- Using $P(X>k)=1-P(X\le k-1)$ (should be $1-P(X\le k)$).
- Treating the difference of two Poisson variables as Poisson.
- Using a normal approximation with variance $\sqrt\lambda$ or forgetting the continuity correction.
- Applying the binomial approximation with $p$ large.

## Exam tips
- Write down the Poisson parameter on a separate line after scaling.
- Remember that the variance equals the mean; in "variance" questions that is a quick win.
- For inequalities write the target as $P(X\le k)$ or its complement first.
- Always state the conditions that justify an approximation, with actual numbers ($n=200>50$, $np=3<5$).
- Give answers to 3 significant figures.
