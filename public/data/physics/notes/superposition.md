# Superposition
> Examiners want clear explanations of how waves combine, with correct conditions for interference and reliable use of the double-slit and grating equations.

## Key ideas

### Principle of superposition and stationary waves
When two or more waves meet at a point, the resultant displacement is the vector sum of the displacements of the individual waves at that point. A stationary (standing) wave forms when two progressive waves of the same frequency and similar amplitude travelling in opposite directions overlap, usually an incident wave and its reflection. Nodes are points of permanently zero amplitude (destructive superposition); antinodes are points of maximum amplitude. The distance between adjacent nodes (or antinodes) is $\lambda/2$. Unlike a progressive wave, a stationary wave transfers no net energy; the phase is the same for all points between adjacent nodes and alternates by $\pi$ across a node.

### Stationary waves on strings and in air columns
- String fixed at both ends: nodes at the ends. The fundamental has $L = \lambda/2$, so $f_1 = v/2L$; harmonics are $f_n = n f_1$ for $n = 1, 2, 3, \dots$.
- Pipe closed at one end: node at the closed end, antinode at the open end. $L = \lambda/4$ for the fundamental, $f_1 = v/4L$, only odd harmonics ($f_1, 3f_1, 5f_1, \dots$).
- Pipe open at both ends: antinodes at both ends; $f_1 = v/2L$, all harmonics present.
In practice the antinode extends slightly beyond an open end (end correction). To find the speed of sound, use a resonance tube with a tuning fork of known frequency: successive resonance lengths differ by $\lambda/2$, so $v = f\lambda$ without needing the end correction. On a string, wavelength is found from node spacing.

### Diffraction
Diffraction is the spreading of a wave as it passes through a gap or around an obstacle. It is most pronounced when the slit width is comparable to the wavelength. A narrower slit or a longer wavelength gives greater spreading. In single-slit diffraction with monochromatic light the pattern has a wide, bright central maximum with weaker, narrower maxima either side; the first minimum is at $\sin\theta \approx \lambda/b$ for slit width $b$. White light gives a white centre with coloured edges.

### Interference and coherence
Interference is the superposition of waves from coherent sources giving a stable pattern of maxima and minima. Sources are coherent if they have a constant phase difference (and so the same frequency). Constructive interference occurs where the path difference is $n\lambda$ (waves in phase); destructive where it is $(n+\tfrac12)\lambda$ (waves in antiphase). For observable interference the waves should also have similar amplitudes and, for light, be unpolarised in the same way or share a polarisation plane.

Young's double-slit experiment: light from a single narrow slit (or a laser) illuminates two close slits, which act as coherent sources. Bright and dark fringes form on a distant screen with fringe separation

$$x = \frac{\lambda D}{a}$$

where $a$ is the slit separation, $D$ the slit-to-screen distance, and $x$ the distance between adjacent bright fringes. Measuring across several fringes and dividing improves precision.

### Diffraction grating
A grating has many equally spaced slits, giving sharp, bright maxima at angles where

$$d\sin\theta = n\lambda$$

$d$ is the slit spacing (for $N$ lines per metre, $d = 1/N$), $n$ is the order. The largest possible order is limited by $\sin\theta \le 1$, so $n < d/\lambda$. More slits make the maxima sharper and narrower.

## Definitions to learn
| Term | Definition |
|---|---|
| Principle of superposition | When two or more waves meet at a point, the resultant displacement is the vector sum of the individual displacements |
| Node | A point on a stationary wave with zero amplitude |
| Antinode | A point on a stationary wave with maximum amplitude |
| Diffraction | The spreading of a wave when it passes through a gap or around an obstacle |
| Coherent sources | Sources that emit waves with a constant phase difference |
| Path difference | The difference in distance travelled by two waves from their sources to a point |
| Interference | The formation of a pattern of maxima and minima where coherent waves overlap |

## Equations
| Equation | Symbols and units | On formulae sheet? |
|---|---|---|
| $\lambda = \dfrac{ax}{D}$ | m | No |
| $d\sin\theta = n\lambda$ | $d$ in m, $n$ integer | No |
| $f_1 = \dfrac{v}{2L}$ (string, open pipe) | Hz | No |
| $f_1 = \dfrac{v}{4L}$ (closed pipe) | Hz | No |

## Worked example
Sodium light ($589\ \text{nm}$) passes through double slits $0.50\ \text{mm}$ apart onto a screen $2.0\ \text{m}$ away:

$$x = \frac{\lambda D}{a} = \frac{589\times10^{-9} \times 2.0}{0.50\times10^{-3}} = 2.4\times10^{-3}\ \text{m}$$

A grating has $600$ lines per mm, illuminated by $500\ \text{nm}$ light:

$$\begin{aligned}
d &= \frac{1}{600\times10^{3}} = 1.67\times10^{-6}\ \text{m} \\
n = 1:\ \sin\theta &= \frac{500\times10^{-9}}{1.67\times10^{-6}} = 0.300,\ \theta = 17.5^\circ \\
n_{\max} &< \frac{d}{\lambda} = 3.33 \ \Rightarrow\ n_{\max} = 3\ (\theta = 64.2^\circ)
\end{aligned}$$

So 7 maxima appear in total ($n = 0, \pm1, \pm2, \pm3$).

A string of length $0.60\ \text{m}$ with wave speed $240\ \text{m s}^{-1}$ has $f_1 = 240/(2 \times 0.60) = 200\ \text{Hz}$. A closed pipe of length $0.30\ \text{m}$ with $v = 330\ \text{m s}^{-1}$ has $f_1 = 330/(4 \times 0.30) = 275\ \text{Hz}$.

## Common mistakes
- Describing nodes as places with "no energy" rather than zero amplitude.
- Using $x$ as the distance from the centre to a fringe; in $\lambda = ax/D$ it is the spacing between adjacent fringes.
- Forgetting to convert lines per mm to a spacing in metres.
- Using "same amplitude" or "same wavelength" as the only condition for coherence; a constant phase difference is essential.
- Counting only positive orders when asked for the total number of maxima.
- Drawing a closed-pipe fundamental as half a wavelength rather than a quarter.

## Exam tips
- To explain a bright fringe: state path difference equals a whole number of wavelengths, so waves arrive in phase.
- Describe measuring $x$ across many fringes to reduce percentage uncertainty.
- Sketch the displacement pattern with labelled N and A points for stationary-wave questions.
- For grating questions, check the highest order using $\sin\theta \le 1$.
- Link effects to wavelength: red light diffracts more than blue.
