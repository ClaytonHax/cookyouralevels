# Series
> Examiners want the binomial theorem applied accurately, correct sequence formulae chosen for arithmetic and geometric progressions, and word problems translated into equations carefully.

## Key ideas

### Binomial expansion for positive integer $n$
$$(a+b)^n=a^n+\binom n1a^{n-1}b+\binom n2a^{n-2}b^2+\dots+b^n.$$
The powers of $a$ fall from $n$ to $0$ while the powers of $b$ rise from $0$ to $n$, and each term's powers add up to $n$. When $a$ or $b$ contains a coefficient or a negative sign, put the whole term in brackets before powering it, for example $(-3x)^2=9x^2$.

### $\binom nr$ notation and specific terms
$\binom nr=\dfrac{n!}{r!(n-r)!}$ counts the ways to choose $r$ from $n$. The term in $x^r$ of $(a+bx)^n$ is $\binom nr a^{n-r}b^rx^r$. For "the coefficient of $x^k$", set up the general term, find the $r$ giving $x^k$, then compute. For a product like $(1+x)(2+x)^5$ combine the contributions from each pairing of terms.

### Arithmetic progressions (AP)
Common difference $d$, first term $a$.
- $n$th term: $u_n=a+(n-1)d$.
- Sum of first $n$ terms: $S_n=\tfrac n2\,[2a+(n-1)d]=\tfrac n2(a+l)$ where $l$ is the last term.

### Geometric progressions (GP)
Common ratio $r$, first term $a$.
- $n$th term: $u_n=ar^{n-1}$.
- Sum of first $n$ terms: $S_n=\dfrac{a(1-r^n)}{1-r}$ (or $\dfrac{a(r^n-1)}{r-1}$).

### Sum to infinity
If $|r|<1$ the terms shrink to $0$ and
$$S_\infty=\frac a{1-r}.$$
Always check $|r|<1$ (so $-1<r<1$). If $|r|\ge1$, the series does not converge.

### Applied problems
1. Decide whether the situation adds a fixed amount (AP) or multiplies by a fixed factor (GP).
2. Identify $a$, $d$ or $r$ and what $n$ counts.
3. Write an equation from the given information and solve. For "least $n$" with a GP, use logarithms and round **up**; remember to flip the inequality when dividing by a negative log.

## Formulae
**In MF19:** the binomial expansion $(a+b)^n$ with $\binom nr=\dfrac{n!}{r!(n-r)!}$, and $u_n$, $S_n$ (both forms) and $S_\infty$ ($|r|<1$) for APs and GPs. You must still be fluent in using them.
- $(a+b)^n$ with $\binom nr$.
- AP: $u_n=a+(n-1)d$; $S_n=\tfrac n2[2a+(n-1)d]=\tfrac n2(a+l)$.
- GP: $u_n=ar^{n-1}$; $S_n=\dfrac{a(1-r^n)}{1-r}$; $S_\infty=\dfrac a{1-r}$.
- **Memorise** (not in MF19): the alternative GP form $S_n=\dfrac{a(r^n-1)}{r-1}$ (a rearrangement) and the meaning of the $|r|<1$ condition.

## Worked example
**Question 1.** (a) Find the first three terms in the expansion of $(2-3x)^5$ in ascending powers of $x$. (b) Find the coefficient of $x^3$ in $(1+2x)^6$.

**Solution.**
(a)
$$\begin{aligned}(2-3x)^5&=2^5+\binom51 2^4(-3x)+\binom52 2^3(-3x)^2+\dots\\&=32+5(16)(-3x)+10(8)(9x^2)+\dots\\&=32-240x+720x^2+\dots\end{aligned}$$
(b) The $x^3$ term is $\binom63(2x)^3=20\times8x^3=160x^3$. Coefficient $160$.

**Question 2.** An AP has third term $11$ and eighth term $31$. Find the sum of the first $20$ terms.

**Solution.** Subtract: $5d=31-11=20$, so $d=4$. Then $a+2d=11$ gives $a=3$.
$$S_{20}=\tfrac{20}2[2(3)+19(4)]=10\times82=820.$$

**Question 3.** A GP has first term $20$ and second term $12$. Find $S_\infty$ and the least $n$ for which $S_n>49$.

**Solution.** $r=\dfrac{12}{20}=0.6$, so
$$S_\infty=\frac{20}{1-0.6}=50.$$
Now $S_n=50(1-0.6^n)>49$ gives $0.6^n<0.02$. Take logs:
$$n>\frac{\ln0.02}{\ln0.6}=\frac{-3.912}{-0.5108}=7.66.$$
So $n=8$. (Check: $0.6^8=0.0168<0.02$ but $0.6^7=0.0280>0.02$.)

## Common mistakes
- Forgetting brackets: $(-3x)^2$ is $9x^2$, not $-9x^2$.
- Missing the power on the numerical coefficient (for example $2^{n-r}$).
- Using $n$ instead of $n-1$ in $u_n=a+(n-1)d$.
- Using $S_\infty$ when $|r|\ge1$.
- Rounding down for "least $n$", or not reversing the inequality when dividing by a negative logarithm.

## Exam tips
- Write the general term first: it removes pattern guesswork.
- For simultaneous equations from two terms, divide (GP) or subtract (AP).
- Check small cases: $S_1$ must equal $a$.
- Show each stage in "show that" questions; the final line must match the given answer.
