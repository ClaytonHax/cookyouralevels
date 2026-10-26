# Probability
> Examiners want probabilities set up with the correct rule, a clear diagram, and independence tested by comparing $P(A\cap B)$ with $P(A)P(B)$ rather than asserted.

## Key ideas

### Equally likely outcomes
If every outcome is equally likely,
$$P(A)=\frac{\text{number of outcomes in }A}{\text{total number of outcomes}}$$
A probability lies between $0$ and $1$, and $P(A')=1-P(A)$. Lists, sample-space tables (for two dice) or counting methods give the numerator and denominator.

### Addition rule
$$P(A\cup B)=P(A)+P(B)-P(A\cap B)$$
For **mutually exclusive** events $P(A\cap B)=0$, so $P(A\cup B)=P(A)+P(B)$. Subtracting the overlap avoids counting it twice. "At least one" is often easiest as $1-P(\text{none})$.

### Multiplication rule and independence
For **independent** events (one does not affect the other):
$$P(A\cap B)=P(A)\times P(B)$$
In general:
$$P(A\cap B)=P(A)\times P(B\mid A)$$
Sampling "with replacement" gives independence; "without replacement" does not.

### Conditional probability
$$P(A\mid B)=\frac{P(A\cap B)}{P(B)}$$
"Given that" tells you to restrict the sample space to $B$. Method:
1. Identify the condition $B$ (the denominator).
2. Find $P(A\cap B)$ from the diagram.
3. Divide.

### Tree diagrams, Venn diagrams and tables
- **Tree diagram**: multiply along branches for "and"; add the relevant paths for "or". Branches from one node sum to 1. Use for sequential events.
- **Venn diagram**: put the intersection in first, then fill the rest by subtraction; the outside region is $P((A\cup B)')$.
- **Two-way table**: good for data with two categories; rows and columns give conditional probabilities.

### Independent versus mutually exclusive
- Independent: $P(A\cap B)=P(A)P(B)$, test with numbers.
- Mutually exclusive: $P(A\cap B)=0$.
- If $P(A),P(B)>0$, events cannot be both. Mutually exclusive events are in fact *dependent*, because if $A$ occurs then $B$ certainly cannot.
- Equivalent independence test: $P(A\mid B)=P(A)$.

## Formulae
- $P(A\cup B)=P(A)+P(B)-P(A\cap B)$.
- $P(A\cap B)=P(A)P(B\mid A)$; independent: $P(A)P(B)$.
- $P(A\mid B)=P(A\cap B)/P(B)$.
- The MF19 list does not give these. Memorise them.

## Worked example
**Question 1.** For events $A$ and $B$, $P(A)=0.5$, $P(B)=0.4$ and $P(A\cap B)=0.2$. Find $P(A\cup B)$ and $P(A\mid B)$, and decide whether $A$ and $B$ are independent.

$$\begin{aligned}P(A\cup B)&=0.5+0.4-0.2=0.7\\P(A\mid B)&=\frac{0.2}{0.4}=0.5\\P(A)P(B)&=0.5\times0.4=0.2=P(A\cap B)\end{aligned}$$
Since $P(A\cap B)=P(A)P(B)$, the events are independent (equivalently $P(A\mid B)=P(A)$). They are not mutually exclusive since $P(A\cap B)\ne0$.

**Question 2.** A bag contains 5 red and 3 blue counters. Two are drawn without replacement. Find the probability that both are the same colour, and the probability the first was red given that both are the same colour.

$$\begin{aligned}P(RR)&=\frac58\times\frac47=\frac{20}{56}\\P(BB)&=\frac38\times\frac27=\frac{6}{56}\\P(\text{same})&=\frac{26}{56}=\frac{13}{28}\\P(\text{first red}\mid\text{same})&=\frac{20/56}{26/56}=\frac{10}{13}\end{aligned}$$

## Common mistakes
- Using $P(A)P(B)$ when events are not independent, for example drawing without replacement.
- Adding probabilities of overlapping events without subtracting the intersection.
- Taking the wrong denominator in a conditional probability.
- Claiming independence or exclusivity without a numerical check.
- Branches on a tree diagram that do not sum to 1, or probabilities not updated after the first draw.
- Confusing $P(A\cap B)$ with $P(A\mid B)$.

## Exam tips
- Read "given that", "if", "of those who" as signals for conditional probability.
- Fill in Venn diagrams starting from the intersection, working outwards.
- Show the full calculation of $P(A)P(B)$ when testing independence and write a conclusion.
- Use the complement for "at least one".
- Give exact fractions when natural, or 3 significant figures for decimals.
