# Hypothesis tests
> Examiners want hypotheses stated in terms of a parameter, a clear comparison of a probability (or critical value) with the significance level, and a conclusion in context that is cautious ("there is sufficient evidence to...") rather than absolute.

## Key ideas

### Null and alternative hypotheses
The **null hypothesis** $H_0$ states the parameter takes a specific value (for example $H_0:p=0.1$). The **alternative** $H_1$ states how it differs:
- **One-tailed**: $H_1:p>0.1$ or $H_1:p<0.1$, used when the question suggests a direction ("increased", "reduced").
- **Two-tailed**: $H_1:p\ne0.1$, used when it asks whether something "has changed".

Hypotheses are always about the **parameter** ($p$, $\lambda$, $\mu$), never about the sample. The significance level (for example 5%) is the probability threshold for rejecting $H_0$. For a two-tailed test, split it equally: 2.5% in each tail.

### General method
1. State $H_0$ and $H_1$ with the parameter and the significance level.
2. State the distribution of the test statistic **assuming $H_0$ is true**.
3. Calculate the probability of a result as extreme as, or more extreme than, the observed value (the $p$-value), or find the critical region.
4. Compare with the significance level (halve it for a two-tailed test).
5. Conclude: reject or do not reject $H_0$, and write a sentence in context.

### Test for a binomial proportion
Under $H_0$, $X\sim B(n,p_0)$. If $H_1:p>p_0$ and the observed value is $x$, calculate $P(X\ge x)$ and compare with the significance level. If $H_1:p<p_0$, calculate $P(X\le x)$. For a two-tailed test, compare the relevant tail with half the significance level.

### Test for a Poisson mean
Under $H_0$, $X\sim\mathrm{Po}(\lambda_0)$, scaled to the sample interval. Proceed as for the binomial, using the Poisson tail probability. If the interval changes (for example data for 3 days against a daily rate), scale $\lambda$.

### Test for a normal mean using the sample mean
With a normal population (or large $n$ by the CLT), known variance $\sigma^2$, and sample mean $\bar x$, under $H_0:\mu=\mu_0$ we have $\bar X\sim N(\mu_0,\sigma^2/n)$. Standardise:
$$z=\frac{\bar x-\mu_0}{\sigma/\sqrt n}$$
and compare with the critical value, or compare $p$-value with significance (halved if two-tailed). Critical $z$ for a 5% level: $1.645$ (one-tailed), $1.960$ (two-tailed).

### Type I and Type II errors
- **Type I error**: rejecting $H_0$ when it is actually true.
- **Type II error**: failing to reject $H_0$ when it is actually false.

Their meaning must be given in context ("concluding that the coin is biased when it is fair").

### Calculating the probability of each error
- $P(\text{Type I})=P(\text{observed value falls in the critical region}\mid H_0\text{ true})$. For a discrete test this is at most the significance level, and equals the actual significance.
- $P(\text{Type II})=P(\text{value falls outside the critical region}\mid\text{the true parameter takes a stated alternative value})$.

Always find the critical region first.

### Interpreting results in context
If $p$-value $<$ significance level, reject $H_0$: "there is sufficient evidence at the 5% level to suggest that ...". Otherwise: "there is insufficient evidence to suggest that ...". Never say "we have proved". Mention the decision rule used.

## Formulae
- Binomial test: $X\sim B(n,p_0)$; Poisson test: $X\sim\mathrm{Po}(\lambda_0)$ — memorise the set-up.
- Normal test: $z=\dfrac{\bar x-\mu_0}{\sigma/\sqrt n}$ — memorise; MF19 gives only the Central Limit Theorem result $\bar X\sim N(\mu,\sigma^2/n)$ it comes from.
- **In MF19:** the critical values table: $1.645$ (5% one-tail), $1.960$ (5% two-tail), $2.326$ (1% one-tail), $2.576$ (1% two-tail).
- Cumulative binomial and Poisson probabilities are computed on the calculator, since tables are not supplied.

## Worked example
**Question 1.** A manufacturer claims 10% of items are defective. A sample of 20 contains 5 defective items. Test at the 5% level whether the proportion is higher. Then find the probability of a Type II error if the true proportion is $0.3$.

$$H_0:p=0.1,\qquad H_1:p>0.1,\qquad X\sim B(20,0.1)\text{ under }H_0$$
$$P(X\ge5)=1-P(X\le4)=1-0.9568=0.0432$$
Since $0.0432<0.05$, reject $H_0$: there is sufficient evidence at the 5% level that the proportion of defective items is higher than $10\%$.

Critical region: $P(X\ge5)=0.0432<0.05$ but $P(X\ge4)=0.133>0.05$, so the critical region is $X\ge5$. If $p=0.3$:
$$P(\text{Type II})=P(X\le4\mid p=0.3)=0.2375$$

**Question 2.** The mean of a normal population is claimed to be $50$ with $\sigma=5$. A sample of 25 has mean $52.3$. Test at the 5% level whether the mean has changed.

$$H_0:\mu=50,\qquad H_1:\mu\ne50,\qquad \bar X\sim N(50,1)$$
$$z=\frac{52.3-50}{5/\sqrt{25}}=2.3>1.960$$
Reject $H_0$ (the two-tailed $p$-value is $2\times0.0107=0.0214<0.05$): there is sufficient evidence that the mean has changed.

## Common mistakes
- Writing hypotheses about the sample mean or the observed number rather than the parameter.
- Using $P(X=x)$ rather than $P(X\ge x)$ as the $p$-value.
- Using $P(X\ge x)$ when the alternative is $p<p_0$ (wrong tail).
- Not halving the significance level for a two-tailed test.
- Giving a conclusion that is not in context, or one that says "accept $H_0$" as if proven.
- Mixing up the Type I and Type II definitions.

## Exam tips
- Set out the five steps every time; each carries a mark.
- State the distribution assumed under $H_0$ on its own line.
- For Type II probabilities, always compute the critical region first, then use the alternative parameter value.
- Use "sufficient evidence" or "insufficient evidence" wording consistently.
- Match the tail to $H_1$: right tail for $>$, left tail for $<$, both for $\ne$.
