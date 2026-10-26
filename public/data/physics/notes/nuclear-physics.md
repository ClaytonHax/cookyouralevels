# Nuclear physics
> Examiners want you to use mass-energy conversion carefully, apply exponential decay to activity and number of nuclei, and justify the properties of radiations.

## Key ideas

### Mass defect and binding energy
The mass of a nucleus is less than the total mass of its separate nucleons. The difference is the mass defect $\Delta m$. The energy equivalent is the binding energy, the energy needed to separate the nucleus completely into free nucleons:
$$E = \Delta m\,c^2.$$
With masses in atomic mass units, $1\ \text{u}$ corresponds to $931.5$ MeV ($1\ \text{u} = 1.66\times10^{-27}$ kg). A larger binding energy per nucleon means a more stable nucleus.

### Binding energy per nucleon curve
Binding energy per nucleon rises steeply for light nuclei, peaks near iron-56 (about 8.8 MeV), then falls slowly for heavy nuclei. Fusion of light nuclei (such as hydrogen isotopes) moves up the curve, so the products have more binding energy per nucleon and the difference is released as energy. Fission of heavy nuclei such as uranium-235 into medium-sized fragments also moves toward the peak and releases energy. Both release energy only because the product is more tightly bound. Fusion needs very high temperatures and pressures to overcome electrostatic repulsion between nuclei.

### Random and spontaneous decay
Radioactive decay is spontaneous (not affected by external conditions such as temperature or chemical state) and random (the instant at which a given nucleus decays cannot be predicted, only the probability). Evidence is the irregular fluctuations in count rate in a Geiger counter. The decay constant $\lambda$ is the probability of decay of a nucleus per unit time. Activity $A$ is the number of decays per second, in becquerels (Bq).

### Decay laws
Activity is proportional to the number of undecayed nuclei:
$$A = \lambda N.$$
Both $N$ and $A$ (and count rate corrected for background) decay exponentially:
$$x = x_0e^{-\lambda t}$$
where $x$ may be $N$, $A$ or corrected count rate. A graph of $\ln x$ against $t$ has gradient $-\lambda$.

### Half-life
Half-life $t_{1/2}$ is the time for the number of undecayed nuclei (or activity) to fall to half. Setting $x = x_0/2$ gives
$$\lambda = \frac{\ln 2}{t_{1/2}}.$$
After $n$ half-lives a fraction $(1/2)^n$ remains. On a decay graph, the time to halve is the same wherever you start, which is a good check.

### Alpha, beta and gamma radiation
Alpha particles (helium nuclei) are strongly ionising, stopped by paper or a few cm of air; beta particles (fast electrons, $\beta^-$) are moderately ionising and stopped by a few mm of aluminium; gamma rays (high-energy photons) are weakly ionising and only reduced by thick lead or concrete. Ionisation and penetration are inversely related: heavily ionising radiation loses its energy quickly. Alpha particles have discrete energies; beta particles have a continuous energy range because a neutrino shares the energy. Alpha and beta are deflected in magnetic fields in opposite senses; gamma is not.

## Definitions to learn

| Term | Definition |
|---|---|
| Mass defect | The difference between the total mass of the separate nucleons and the mass of the nucleus. |
| Binding energy | The energy needed to separate a nucleus into its individual nucleons. |
| Activity | The number of nuclei disintegrating per unit time. |
| Decay constant | The probability of decay of a nucleus per unit time. |
| Half-life | The time taken for the number of undecayed nuclei (or activity) to halve. |

## Equations

| Equation | Symbols and units | Data sheet? |
|---|---|---|
| $E = mc^2$ | J, kg, $c = 3.00\times10^{8}$ m s$^{-1}$ | Learn |
| $A = \lambda N$ | Bq, s$^{-1}$ | Learn |
| $x = x_0e^{-\lambda t}$ | Same units for $x$ and $x_0$ | Given |
| $\lambda = \ln 2/t_{1/2}$ | s$^{-1}$ | Given |

## Worked example

Helium-4 nucleus: mass 4.0015 u. Each proton has mass 1.00728 u and each neutron 1.00867 u.

$$\begin{aligned}
\Delta m &= 2(1.00728) + 2(1.00867) - 4.0015 = 4.03190 - 4.0015 = 0.0304\ \text{u} \\
E &= 0.0304 \times 931.5 = 28.3\ \text{MeV} \\
\text{per nucleon} &= \frac{28.3}{4} = 7.08\ \text{MeV}
\end{aligned}$$

A sample has half-life 8.0 days and initial activity $6.4\times10^{5}$ Bq. After 32 days (4 half-lives): $A = 6.4\times10^{5}/16 = 4.0\times10^{4}$ Bq. The number of nuclei initially:

$$\begin{aligned}
\lambda &= \frac{\ln 2}{8.0 \times 86400} = 1.00\times10^{-6}\ \text{s}^{-1} \\
N_0 &= \frac{A_0}{\lambda} = \frac{6.4\times10^{5}}{1.00\times10^{-6}} = 6.4\times10^{11}
\end{aligned}$$

## Common mistakes
- Using the mass of the atom rather than the nucleus without noticing the electrons.
- Saying fusion releases energy "because the mass is lower" without linking to binding energy per nucleon.
- Using days with $\lambda$ in s$^{-1}$ (be consistent).
- Forgetting to subtract background count rate before using exponential decay.
- Saying radioactive decay is "affected by temperature" or "predictable for individual nuclei".

## Exam tips
- Binding energy is the energy needed to *separate*, so it is positive; mass defect is positive too.
- For the curve, label the peak at iron and mark fusion and fission regions with arrows.
- For half-life questions, count half-lives when the numbers are neat; otherwise use $e^{-\lambda t}$.
- For comparing radiations, cover ionising power, range in air and materials, and deflection in fields.
