# Representation of data
> Examiners want accurate, correctly labelled diagrams, careful use of frequency density, and comparisons that mention both a measure of location and a measure of spread, in context.

## Key ideas

### Choosing a display
- **Stem-and-leaf**: small to medium sets of discrete or rounded data; keeps the actual values; back-to-back versions compare two sets.
- **Box-and-whisker**: summarises median, quartiles and extremes; good for comparing groups.
- **Histogram**: continuous grouped data; **area** represents frequency.
- **Cumulative frequency graph**: estimating medians, quartiles, percentiles and counts above or below a value.
- Pie charts and bar charts suit categorical data.

### Stem-and-leaf diagrams and box-and-whisker plots
For a stem-and-leaf diagram, order the leaves in each row, align them in columns, and give a **key** such as "$3\mid4$ means $34$". For a box plot, mark the minimum, lower quartile $Q_1$, median $Q_2$, upper quartile $Q_3$ and maximum on a scale: box from $Q_1$ to $Q_3$, line at the median, whiskers to the extremes. Outliers, if you are told a rule, are plotted separately.

### Histograms with equal or unequal class widths
For unequal widths, the vertical axis is **frequency density**:
$$\text{frequency density}=\frac{\text{frequency}}{\text{class width}}$$
1. Use continuous class boundaries (for example $10\le x<30$ has width $20$).
2. Draw bars with no gaps, the height equal to frequency density.
3. Label the axis "frequency density", not "frequency".
4. To read frequency from a bar, multiply height by width.

### Cumulative frequency graphs
Plot cumulative frequency against the **upper class boundary**, join with a smooth curve (or straight lines if told), starting at the lowest boundary with cumulative frequency $0$. To estimate the median read across from $\tfrac12n$; $Q_1$ from $\tfrac14n$; $Q_3$ from $\tfrac34n$; the $k$th percentile from $\tfrac{k}{100}n$. The number of values below a given $x$ is read directly from the curve.

### Median, quartiles, percentiles and IQR
For ungrouped data in order, the median is the middle value (or the mean of the middle two). The lower quartile is the median of the lower half and the upper quartile is the median of the upper half. The interquartile range is $\text{IQR}=Q_3-Q_1$. For grouped data find these from the cumulative frequency graph.

### Mean, mode and median, including grouped data
$$\bar x=\frac{\sum x}{n}\quad\text{or}\quad\bar x=\frac{\sum fx}{\sum f}$$
For grouped data use class **midpoints**, so the mean is an estimate. The **modal class** is the one with the highest frequency (or frequency density in a histogram). The mean uses every value but is pulled by outliers; the median is resistant to outliers.

### Variance and standard deviation
$$\text{Var}=\frac{\sum x^2}{n}-\bar x^2,\qquad \sigma=\sqrt{\text{Var}}$$
For frequencies use $\sum fx^2/\sum f-\bar x^2$. For coded data $y=ax+b$: $\bar y=a\bar x+b$ and $\sigma_y=|a|\sigma_x$.

### Comparing data sets
State a measure of location (mean or median) **and** a spread (SD or IQR), both in context. Example: "On average the Year 12 sample took longer (median 42 min against 35 min) and were more varied (IQR 14 against 9)." Choose median and IQR if there are outliers or skew.

## Formulae
- **In MF19:** $\bar x=\sum x/n$ and standard deviation $\sqrt{\sum(x-\bar x)^2/n}=\sqrt{\sum x^2/n-\bar x^2}$, with grouped versions (divide by $\sum f$). Variance is the square of these.
- **Memorise** (not in MF19): frequency density $=$ frequency $\div$ class width.
- **Memorise:** $\text{IQR}=Q_3-Q_1$.
- **Memorise:** position for percentile $k$ is $\tfrac{k}{100}n$ on the cumulative frequency axis.

## Worked example
**Question 1.** Find the median, quartiles and IQR of $4,\ 7,\ 8,\ 10,\ 11,\ 13,\ 15,\ 20$ and the mean and standard deviation, given $\sum x=88$ and $\sum x^2=1144$.

Median $=\frac{10+11}{2}=10.5$. Lower half $4,7,8,10$ so $Q_1=\frac{7+8}{2}=7.5$. Upper half $11,13,15,20$ so $Q_3=\frac{13+15}{2}=14$.
$$\begin{aligned}\text{IQR}&=14-7.5=6.5\\\bar x&=\frac{88}{8}=11\\\text{Var}&=\frac{1144}{8}-11^2=143-121=22\\\sigma&=\sqrt{22}=4.69\end{aligned}$$

**Question 2.** The times $t$ minutes of 40 journeys are: $0\le t<10$: 6; $10\le t<30$: 20; $30\le t<50$: 14. Find the frequency densities and estimate the mean and standard deviation.

Frequency densities: $\frac{6}{10}=0.6$, $\frac{20}{20}=1$, $\frac{14}{20}=0.7$. Midpoints $5, 20, 40$:
$$\begin{aligned}\sum fx&=30+400+560=990\\\bar x&=\frac{990}{40}=24.75\\\sum fx^2&=150+8000+22400=30550\\\text{Var}&=\frac{30550}{40}-24.75^2=151.19\\\sigma&=12.3\end{aligned}$$

## Common mistakes
- Plotting frequency instead of frequency density for unequal widths.
- Plotting cumulative frequency at class midpoints instead of upper boundaries.
- Leaving out a key on a stem-and-leaf diagram or leaving leaves unordered.
- Comparing sets using only an average, or without context.
- Confusing variance with standard deviation (forgetting the square root).
- Using class limits like "19" instead of boundaries like "19.5" for continuous grouped data.

## Exam tips
- Set up a table with columns $x$, $f$, $fx$, $fx^2$ to avoid arithmetic slips.
- Draw construction lines on the cumulative frequency graph so the method marks are visible.
- Label axes with a quantity and units.
- When a question says "estimate", say that class midpoints were used.
- A comparison needs location + spread + context: three things in one sentence.
