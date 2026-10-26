# Astronomy and cosmology
> Examiners want you to turn observations (flux, spectra, redshift) into stellar and cosmic quantities with the right equation and to explain the evidence chain for the Big Bang.

## Key ideas

### Luminosity, flux and standard candles
Luminosity $L$ is the total power emitted by a star (W). Radiant flux $F$ is the power received per unit area at the observer, and for a source radiating equally in all directions
$$F = \frac{L}{4\pi d^2}.$$
Flux obeys the inverse square law, because the power spreads over a sphere of area $4\pi d^2$. A standard candle is an object of known luminosity, such as a Cepheid variable (luminosity linked to pulsation period) or a Type Ia supernova. Measuring its flux gives its distance: $d = \sqrt{L/(4\pi F)}$.

### Radiation laws
Wien's displacement law: the peak wavelength emitted by a black body is inversely proportional to its thermodynamic temperature, $\lambda_{max}T = $ constant ($2.90\times10^{-3}$ m K). Hotter stars peak at shorter wavelengths (blue-white), cooler stars at longer (red). The Stefan-Boltzmann law gives the luminosity of a star modelled as a black body:
$$L = 4\pi r^2\sigma T^4$$
with $\sigma = 5.67\times10^{-8}$ W m$^{-2}$ K$^{-4}$. Comparing two stars with ratios of $L$ and $T$ gives their radius ratio without calculating the constants.

### Stellar properties from spectra
The continuous spectrum's peak gives surface temperature via Wien's law; absorption lines in the spectrum show the elements present in the star's atmosphere and their strength depends on temperature. Luminosity and temperature give radius via the Stefan-Boltzmann law, and the apparent flux with a known distance gives luminosity. Doppler shifts of lines give radial velocity.

### Redshift
Light from receding sources is shifted to longer wavelengths. For speeds much less than $c$,
$$\frac{\Delta\lambda}{\lambda} \approx \frac{v}{c}$$
where $\Delta\lambda$ is the shift in wavelength from a lab measurement of wavelength $\lambda$. Distant galaxies show redshifts that indicate recession; the same relation gives the speed.

### Hubble's law and the expanding universe
Galaxies recede at speeds proportional to their distance:
$$v = H_0d.$$
$H_0$ is the Hubble constant (about 70 km s$^{-1}$ Mpc$^{-1}$, or about $2\times10^{-18}$ s$^{-1}$). This is explained by the expansion of space, with no centre of expansion: every galaxy sees others receding. Running time backwards suggests all matter started from a hot, dense state about $1/H_0$ ago (roughly 14 billion years): the Big Bang.

### Evidence for the Big Bang
The key evidence is the cosmic microwave background (CMB): radiation with a black-body spectrum at about 2.7 K, extremely uniform in all directions. It is the redshifted remnant of radiation from when the universe became transparent (about 380 000 years after the Big Bang); expansion has stretched the wavelengths into the microwave region. The CMB, the observed galactic redshifts and the proportion of light elements (about 75% hydrogen, 25% helium by mass) all fit. The universe's expansion appears to be accelerating, attributed to dark energy; galaxy rotation curves and gravitational lensing indicate dark matter, mass that exerts gravity but neither emits nor absorbs light.

### Stellar evolution and the H-R diagram
A star forms from a collapsing cloud of gas (a protostar); fusion begins when the core is hot enough and a main-sequence star forms, in which gravity inward balances radiation and gas pressure outward. When core hydrogen is exhausted a low-mass star expands into a red giant, ejects its outer layers as a planetary nebula and its core becomes a white dwarf. A much more massive star becomes a red supergiant, then explodes as a supernova, leaving a neutron star or black hole. On the Hertzsprung-Russell diagram, luminosity is plotted against temperature (with temperature increasing to the left): most stars lie on the main sequence from hot and bright to cool and dim, red giants and supergiants are top right, and white dwarfs bottom left.

## Definitions to learn

| Term | Definition |
|---|---|
| Luminosity | The total power radiated by a star. |
| Radiant flux | The power received per unit area, perpendicular to the direction of the radiation. |
| Standard candle | An astronomical object of known luminosity, used to find distance. |
| Redshift | The increase in wavelength of light from a receding source. |
| Cosmic microwave background | Microwave radiation at about 2.7 K filling the universe, a remnant of the early hot universe. |

## Equations

| Equation | Symbols and units | Data sheet? |
|---|---|---|
| $F = L/(4\pi d^2)$ | $F$ in W m$^{-2}$, $d$ in m | Learn |
| $L = 4\pi r^2\sigma T^4$ | $T$ in K | Given |
| $\lambda_{max}T = 2.90\times10^{-3}$ m K | Wien's law | Learn |
| $\Delta\lambda/\lambda \approx v/c$ | Dimensionless | Given |
| $v = H_0d$ | $H_0$ in s$^{-1}$ or km s$^{-1}$ Mpc$^{-1}$ | Learn |

## Worked example

A star with $L = 3.83\times10^{26}$ W is $4.1\times10^{16}$ m away:

$$F = \frac{3.83\times10^{26}}{4\pi(4.1\times10^{16})^2} = \frac{3.83\times10^{26}}{2.11\times10^{34}} = 1.8\times10^{-8}\ \text{W m}^{-2}$$

Radius of a star at 5800 K with the same luminosity:

$$r = \sqrt{\frac{L}{4\pi\sigma T^4}} = \sqrt{\frac{3.83\times10^{26}}{4\pi(5.67\times10^{-8})(5800)^4}} = 6.9\times10^{8}\ \text{m}$$

A hydrogen line of rest wavelength 656.3 nm is observed at 659.6 nm:

$$v = c\frac{\Delta\lambda}{\lambda} = 3.00\times10^{8} \times \frac{3.3}{656.3} = 1.5\times10^{6}\ \text{m s}^{-1}$$

Using $H_0 = 70$ km s$^{-1}$ Mpc$^{-1}$: $d = v/H_0 = 1500/70 = 21$ Mpc.

## Common mistakes
- Confusing luminosity (intrinsic) with flux or apparent brightness (depends on distance).
- Forgetting that $T^4$ needs temperature in kelvin.
- Saying the galaxies are moving "through" space away from a centre; space itself expands.
- Using the redshift formula for speeds close to $c$.
- Plotting the H-R diagram with temperature increasing to the right.

## Exam tips
- For ratios, write $L \propto r^2T^4$ and substitute the ratios directly.
- Explain CMB as black-body radiation, 2.7 K, isotropic, and redshifted from about 3000 K.
- Keep units consistent: Mpc to m, or work in km s$^{-1}$ throughout.
- State that dark matter and dark energy are inferred from gravitational effects, not directly observed.
