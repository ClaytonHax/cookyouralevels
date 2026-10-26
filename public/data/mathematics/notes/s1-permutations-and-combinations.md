# Permutations and combinations
> Examiners want you to decide first whether order matters, justify each counting step, and handle restrictions by complement or by treating groups as a single object.

## Key ideas

### Arrangements and factorials
The number of ways of arranging $n$ different objects in a line is
$$n!=n(n-1)(n-2)\cdots 2\cdot1,\qquad 0!=1.$$
The multiplication principle: if a task has stages with $a$, $b$, $c$ choices, the total is $a\times b\times c$. A good habit is drawing blank slots and writing the number of options in each.

### Permutations ${}^nP_r$
The number of ordered selections of $r$ objects from $n$ different objects is
$${}^nP_r=\frac{n!}{(n-r)!}=n(n-1)\cdots(n-r+1)$$
Use it when position matters, for example president, secretary and treasurer chosen from a club, or the first three places in a race.

### Combinations ${}^nC_r$
The number of ways of choosing $r$ from $n$ with no regard to order is
$${}^nC_r=\binom nr=\frac{n!}{r!(n-r)!}$$
Properties: ${}^nC_r={}^nC_{n-r}$, and ${}^nP_r=r!\times{}^nC_r$. Use when a group or committee is formed, a hand dealt or a team chosen.

For selections from several groups, multiply the choices from each group, then add the totals for each valid case.

### Restrictions: together and apart
1. **Items together**: glue them into a single object, arrange the objects, then multiply by the arrangements inside the glued block.
2. **Items apart**: total arrangements minus arrangements with them together (complement), or place the others first and slot the separated items into the gaps.
3. **Fixed positions**: place the restricted item first, then arrange the rest.
4. **"At least" selections**: use the complement (total minus the unwanted cases) when it is shorter.
5. Always check whether each case is mutually exclusive before adding.

### Arrangements with repeated items
For $n$ objects where one type repeats $a$ times and another $b$ times:
$$\frac{n!}{a!\,b!}$$
Dividing removes the indistinguishable rearrangements of the identical objects.

### Counting in probability questions
When all outcomes are equally likely,
$$P(\text{event})=\frac{\text{number of favourable selections}}{\text{total number of selections}}$$
Count both numerator and denominator with the *same* method (both combinations, or both ordered). For example, the probability that a hand of 3 chosen from 10 has a specific property uses ${}^{10}C_3$ as the denominator.

## Formulae
- **In MF19:** ${}^nC_r=\dbinom nr=\dfrac{n!}{r!(n-r)!}$.
- **Memorise** (not in MF19): $n!$; ${}^nP_r=\dfrac{n!}{(n-r)!}$; repeats $\dfrac{n!}{a!\,b!\cdots}$.
- The calculator buttons $\mathrm{nPr}$ and $\mathrm{nCr}$ are for checking.
- Circular arrangements are not in the 9709 syllabus.

## Worked example
**Question 1.** How many different arrangements are there of the letters of STATISTICS?

There are 10 letters: S appears 3 times, T 3 times, I twice, A once, C once.
$$\frac{10!}{3!\,3!\,2!}=\frac{3628800}{6\times6\times2}=50400$$

**Question 2.** A committee of 4 is chosen from 7 men and 5 women. Find the number of committees with at least 2 women.

Total committees: ${}^{12}C_4=495$. Exclude 0 women and 1 woman:
$$\begin{aligned}0\text{ women: }&{}^7C_4=35\\1\text{ woman: }&{}^5C_1\times{}^7C_3=5\times35=175\\\text{Answer}&=495-35-175=285\end{aligned}$$
Check by cases: $2$ women $=10\times21=210$, $3$ women $=10\times7=70$, $4$ women $=5$; total $285$.

## Common mistakes
- Using a permutation when order does not matter (or the reverse).
- Forgetting to multiply by the internal arrangements of a block of items that are together.
- Double counting cases in an "at least" problem.
- Adding instead of multiplying across independent stages.
- Dividing for repeats when all objects are distinct.
- Treating ${}^nC_r$ and ${}^nP_r$ as interchangeable on the calculator.

## Exam tips
- Ask "does swapping two chosen items make a new outcome?" before choosing P or C.
- For "not together", use total minus together.
- Write a brief justification of each factor, since method marks require it.
- If a probability question mentions "at random", count equally likely selections.
- Check that your final count is a whole number and sensible in size.
