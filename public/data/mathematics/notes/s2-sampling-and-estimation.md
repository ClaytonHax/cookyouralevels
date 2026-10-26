# Sampling and estimation
> Examiners want the correct standard error for the sample mean, the central limit theorem invoked only when justified, unbiased estimates calculated with $n-1$, and confidence intervals interpreted carefully in context.

## Key ideas

### Population, sample and sampling methods
The **population** is everything of interest; a **sample** is a subset taken to learn about it. A **census** surveys the whole population. Good samples are **random** (every member has an equal chance, members chosen independently) and representative. Sampling methods to recognise: simple random, systematic (every $k$th), stratified (in proportion to groups) and quota. Bias arises from a poor sampling frame or non-random choice. Sampling is preferred when testing destroys the item, or the population is large or expensive to reach.

### Distribution of the sample mean
Take a random sample of size $n$ from a population with mean $\mu$ and variance $\sigma^2$. The sample mean $\bar X$ is itself a random variable with
$$E(\bar X)=\mu,\qquad \mathrm{Var}(\bar X)=\frac{\sigma^2}{n}.$$
The standard deviation $\sigma/\sqrt n$ is the **standard error**. If the population is normal then $\bar X\sim N\!\left(\mu,\sigma^2/n\right)$ exactly, for any $n$.

### The central limit theorem
For any population distribution (with finite mean and variance), the distribution of $\bar X$ is approximately normal when $n$ is large (generally $n\ge30$):
$$\bar X\approx N\!\left(\mu,\frac{\sigma^2}{n}\right).$$
Use this when the population is not stated to be normal. Also for large $n$ the sum $\sum X\approx N(n\mu,n\sigma^2)$.

### Unbiased estimates
An estimator is unbiased if its expected value equals the parameter. From a sample $x_1,\ldots,x_n$:
$$\hat\mu=\bar x=\frac{\sum x}{n},\qquad s^2=\frac1{n-1}\left(\sum x^2-\frac{(\sum x)^2}{n}\right)=\frac{\sum x^2-n\bar x^2}{n-1}$$
Be careful: dividing by $n$ gives the sample variance, which is biased low. If you are given the sample variance $v$ (divisor $n$), then $s^2=\dfrac{n}{n-1}v$.

### Confidence interval for a population mean
For a sample mean $\bar x$ from a population with known $\sigma$ and $n$ large, a confidence interval is
$$\bar x\pm z\frac{\sigma}{\sqrt n}.$$
Common $z$: $1.645$ (90%), $1.960$ (95%), $2.576$ (99%). If $\sigma$ is not known and $n$ is large, use $s$ in place of $\sigma$. Method: find $\bar x$, find the standard error, pick $z$ for the confidence level, give the interval as (lower, upper). A wider interval comes from higher confidence, smaller $n$ or greater variability.

### Confidence interval for a population proportion
With sample proportion $\hat p=x/n$,
$$\hat p\pm z\sqrt{\frac{\hat p(1-\hat p)}{n}}.$$
This requires $n$ large enough that the normal approximation is sensible.

### Interpreting confidence intervals
A 95% confidence interval means that if the procedure were repeated many times, about 95% of such intervals would contain the true parameter. It is **not** a probability that the parameter lies in one fixed interval, and it is not a range containing 95% of the data. To decide if a claimed value is plausible, check whether it lies inside the interval. To find the sample size for a required width, solve $2z\sigma/\sqrt n\le w$.

## Formulae
- **In MF19:** Central Limit Theorem $\bar X\sim N(\mu,\sigma^2/n)$ (so $E(\bar X)=\mu$, $\mathrm{Var}(\bar X)=\sigma^2/n$).
- **In MF19:** the unbiased estimate $s^2=\dfrac{\sum(x-\bar x)^2}{n-1}=\dfrac1{n-1}\left(\sum x^2-\dfrac{(\sum x)^2}n\right)$, i.e. $\dfrac{\sum x^2-n\bar x^2}{n-1}$.
- **In MF19:** approximate distribution of a sample proportion $N\left(p,\dfrac{p(1-p)}n\right)$ and the critical values table for $z$.
- **Memorise** (not in MF19): CI for mean $\bar x\pm z\sigma/\sqrt n$; for proportion $\hat p\pm z\sqrt{\hat p(1-\hat p)/n}$.

## Worked example
**Question 1.** A population has mean $80$ and standard deviation $12$. Find the probability that the mean of a random sample of 36 exceeds $83$. Next, a sample of 10 has $\sum x=250$ and $\sum x^2=6400$: find unbiased estimates of mean and variance.

$$\begin{aligned}\bar X&\approx N\!\left(80,\tfrac{12^2}{36}\right)=N(80,4)\\P(\bar X>83)&=P\!\left(Z>\tfrac{83-80}{2}\right)=1-\Phi(1.5)=0.0668\\\hat\mu&=\tfrac{250}{10}=25\\s^2&=\tfrac{6400-10(25)^2}{9}=\tfrac{150}{9}=16.7\end{aligned}$$

**Question 2.** (a) A random sample of 100 has mean $52.4$ from a population with $\sigma=8$. Find a 95% confidence interval for $\mu$. (b) Of 200 people sampled, 60 prefer brand A. Find a 95% confidence interval for the proportion.

(a) Standard error $=8/\sqrt{100}=0.8$:
$$52.4\pm1.96(0.8)=(50.8,\ 54.0)$$
(b) $\hat p=0.3$:
$$0.3\pm1.96\sqrt{\tfrac{0.3\times0.7}{200}}=0.3\pm0.0635=(0.236,\ 0.364)$$

## Common mistakes
- Dividing by $n$ instead of $n-1$ for the unbiased variance.
- Using $\sigma$ rather than $\sigma/\sqrt n$ when standardising a sample mean.
- Interpreting a 95% confidence interval as "95% of the data".
- Applying the CLT with small $n$ when the population is not normal.
- Using the wrong $z$ value (for example $1.645$ for a 95% two-sided interval).
- Not stating the interval as an ordered pair with lower value first.

## Exam tips
- Write the sampling distribution of $\bar X$ in full before any calculation.
- State "by the central limit theorem" when $n$ is large and the population is not normal.
- Round the interval ends to 3 significant figures.
- In a context question, answer with "the claimed value lies inside/outside the interval so..."
- To avoid bias in explanations, mention random selection and independence.
