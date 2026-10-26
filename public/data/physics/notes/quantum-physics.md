# Quantum physics
> Examiners want you to explain observations with the photon model, use $hf = \phi + E_{k,max}$ fluently, and handle eV-to-joule conversions without slips.

## Key ideas

### The photon model
Electromagnetic radiation is emitted and absorbed in discrete packets of energy called photons. A photon of frequency $f$ and wavelength $\lambda$ has energy
$$E = hf = \frac{hc}{\lambda}$$
with $h = 6.63\times10^{-34}$ J s. Intensity of a beam is the number of photons per second per unit area multiplied by the energy of each photon. The electronvolt is the energy gained by an electron accelerated through 1 V: $1\ \text{eV} = 1.60\times10^{-19}$ J.

### The photoelectric effect
When light of high enough frequency falls on a metal surface, electrons are emitted. Observations that wave theory cannot explain: no emission below a threshold frequency, however intense the light; emission is instantaneous, with no time delay; the maximum kinetic energy of the electrons depends on frequency and not intensity; and the photocurrent (rate of emission) is proportional to intensity above the threshold. These support the particle model: each electron absorbs one photon, in an all-or-nothing interaction.

### The photoelectric equation
The work function $\phi$ is the minimum energy needed to remove an electron from the metal surface. By conservation of energy,
$$hf = \phi + E_{k,max}.$$
The threshold frequency satisfies $hf_0 = \phi$. A graph of $E_{k,max}$ against $f$ is a straight line with gradient $h$, an $x$-intercept $f_0$ and a $y$-intercept $-\phi$. The maximum kinetic energy can be measured from the stopping potential: $E_{k,max} = eV_s$. Electrons released deeper lose energy, so a range of energies up to the maximum is observed.

### Wave-particle duality
Electrons passing through a thin crystal or graphite film produce a ring diffraction pattern. Diffraction is a wave property, so electrons have wave-like behaviour. de Broglie proposed that a particle of momentum $p$ has wavelength
$$\lambda = \frac{h}{p}.$$
Faster electrons (higher accelerating p.d.) have shorter wavelengths, which makes the rings smaller. Together with photoelectric effect (light behaving as particles), this shows duality.

### Line spectra and energy levels
Atoms have discrete energy levels. When an electron falls from level $E_2$ to a lower level $E_1$, a photon is emitted with
$$hf = E_2 - E_1.$$
A hot low-pressure gas gives a line emission spectrum with bright lines at specific wavelengths. A cool gas in front of a continuous source absorbs the same wavelengths, giving dark lines in the continuous spectrum. The discrete lines show that the energy levels are quantised. Levels are negative relative to an ionised electron at zero, and the ground state is the most negative.

### X-ray production and spectra
X-rays are produced when fast electrons, accelerated through a large p.d. (tens of kV), strike a metal target. The spectrum has a continuous background from the electrons decelerating (bremsstrahlung), with a sharp minimum wavelength $\lambda_{min} = hc/eV$ set by electrons converting all their energy to one photon; and sharp characteristic lines, produced when an incoming electron knocks out an inner-shell electron and an outer electron falls in to fill the vacancy. The line wavelengths depend on the target element, not on the p.d.

## Definitions to learn

| Term | Definition |
|---|---|
| Photon | A discrete quantum (packet) of electromagnetic energy, $E = hf$. |
| Work function | The minimum energy required to remove an electron from the surface of a metal. |
| Threshold frequency | The minimum frequency of radiation that causes photoelectric emission from a given metal. |
| Electronvolt | The energy gained by an electron accelerated through a potential difference of 1 V. |
| de Broglie wavelength | The wavelength associated with a moving particle, $\lambda = h/p$. |

## Equations

| Equation | Symbols and units | Data sheet? |
|---|---|---|
| $E = hf$ | J, Hz | Learn |
| $hf = \phi + E_{k,max}$ | All in J | Learn |
| $\lambda = h/p$ | m, kg m s$^{-1}$ | Learn |
| $hf = E_2 - E_1$ | J (convert eV) | Learn |
| $E_k = eV$ | J | Learn |

## Worked example

Light of wavelength 450 nm falls on a metal with work function 2.3 eV.

$$\begin{aligned}
E &= \frac{hc}{\lambda} = \frac{(6.63\times10^{-34})(3.00\times10^{8})}{4.50\times10^{-7}} = 4.42\times10^{-19}\ \text{J} \quad (2.76\ \text{eV}) \\
\phi &= 2.3 \times 1.60\times10^{-19} = 3.68\times10^{-19}\ \text{J} \\
E_{k,max} &= 4.42\times10^{-19} - 3.68\times10^{-19} = 7.4\times10^{-20}\ \text{J} \\
f_0 &= \frac{\phi}{h} = \frac{3.68\times10^{-19}}{6.63\times10^{-34}} = 5.55\times10^{14}\ \text{Hz}
\end{aligned}$$

An electron accelerated through 150 V:

$$\begin{aligned}
p &= \sqrt{2meV} = \sqrt{2(9.11\times10^{-31})(1.60\times10^{-19})(150)} = 6.61\times10^{-24}\ \text{kg m s}^{-1} \\
\lambda &= \frac{h}{p} = \frac{6.63\times10^{-34}}{6.61\times10^{-24}} = 1.00\times10^{-10}\ \text{m}
\end{aligned}$$

## Common mistakes
- Leaving $\phi$ in eV while $hf$ is in J.
- Saying more intense light gives electrons more energy (it gives more electrons).
- Describing the work function as the energy of the emitted electrons.
- Claiming that a photon is shared between several electrons.
- Confusing absorption and emission lines or using $E_1 - E_2$ and getting a negative energy.

## Exam tips
- For "explain why wave theory fails" give the observation, then what wave theory predicts, then the photon explanation.
- Say "maximum" kinetic energy; most emitted electrons have less.
- For spectra, show the transition on an energy-level diagram with an arrow downward.
- Distinguish continuous and characteristic X-ray features by their cause.
