# Medical physics
> Examiners want you to explain each imaging technique as a chain of physical steps, and to use the reflection and attenuation equations with the correct quantities.

## Key ideas

### Ultrasound production and properties
Ultrasound is sound with frequency above about 20 kHz; medical scans use roughly 1 to 15 MHz. It is generated and detected by a piezoelectric transducer: an alternating p.d. applied across a piezoelectric crystal makes it vibrate at the same frequency (the inverse piezoelectric effect), emitting ultrasound; returning echoes make the crystal vibrate and generate an alternating p.d. (the piezoelectric effect). The crystal works best at resonance, so its thickness is chosen to match the required frequency. Short pulses are emitted so that the probe can "listen" for echoes between them. Higher frequency gives shorter wavelength and better resolution but is absorbed more strongly, so penetration is poorer.

### Ultrasound scans and acoustic impedance
Ultrasound partly reflects at the boundary between tissues of different acoustic impedance
$$Z = \rho c$$
where $\rho$ is density and $c$ the speed of sound in the medium (unit kg m$^{-2}$ s$^{-1}$). The intensity reflection coefficient for normal incidence is
$$\frac{I_R}{I_0} = \frac{(Z_2 - Z_1)^2}{(Z_2 + Z_1)^2}.$$
A big difference in $Z$ (air to skin, or soft tissue to bone) gives strong reflection and little transmission. So a gel is applied between the probe and the skin to remove air and match impedance. In an A-scan the time delay of each echo gives depth, $d = ct/2$; a B-scan builds a two-dimensional image from many beams, with brightness showing echo strength.

### X-ray production and attenuation
X-rays are produced by accelerating electrons through a high p.d. onto a heavy metal target (see the quantum physics topic). The intensity of a collimated X-ray beam falls exponentially as it passes through a material:
$$I = I_0e^{-\mu x}$$
where $\mu$ is the linear attenuation coefficient (unit m$^{-1}$ or cm$^{-1}$), depending on the material and photon energy. Bone has a larger $\mu$ than soft tissue, giving contrast. Half-value thickness is $x_{1/2} = \ln 2/\mu$. Absorption mechanisms include the photoelectric effect and Compton scattering. Soft X-rays are removed by filters since they add dose but not image information. Contrast media (barium or iodine compounds) are used to image soft tissues.

### CT scanning
A CT (computed tomography) scanner rotates an X-ray source and an array of detectors around the patient to take many narrow-beam measurements of attenuation at different angles through a thin slice. A computer processes the attenuation data to construct the pattern of $\mu$ in each small volume element (voxel) of the slice, shown as a grey-scale image. The patient is moved along to obtain successive slices, which can be assembled into a 3D image. Compared with a plain X-ray, CT gives better contrast and no overlap of structures, but at a higher radiation dose.

### PET scanning
In positron emission tomography the patient is given a radioactive tracer, for example fluorine-18 attached to a glucose-like molecule, which concentrates in regions of high metabolic activity. The nuclei emit positrons ($\beta^+$), which travel a short distance before meeting an electron and annihilating, producing two gamma-ray photons of 0.511 MeV each travelling in opposite directions (momentum conservation). Detectors in a ring detect the photons arriving at almost the same instant, so the source lies along the line joining them. Many such lines locate the tracer concentration. The tracer needs a short half-life (hours) to limit dose but long enough to be made and used.

### MRI
A strong, steady magnetic field makes the spin of hydrogen nuclei (protons) in the body precess, so they align with or against the field. A radio-frequency pulse at the Larmor (resonant) frequency makes the nuclei absorb energy and flip. When the pulse stops, the nuclei relax and re-emit radio-frequency signals that are detected by coils. Non-uniform gradient fields make the resonant frequency depend on position, so signals can be located. Different tissues have different relaxation times, giving contrast. MRI uses no ionising radiation, but the strong field excludes patients with metal implants.

## Definitions to learn

| Term | Definition |
|---|---|
| Piezoelectric effect | The generation of a p.d. across a crystal when it is deformed (and the reverse). |
| Acoustic impedance | The product of the density of a medium and the speed of sound in it, $Z = \rho c$. |
| Linear attenuation coefficient | A constant $\mu$ in $I = I_0e^{-\mu x}$ describing how strongly a material attenuates a beam. |
| Tracer | A radioactive substance introduced into the body to follow a process through the radiation it emits. |
| Annihilation | A particle and its antiparticle destroy each other, converting their mass to photons. |

## Equations

| Equation | Symbols and units | Data sheet? |
|---|---|---|
| $Z = \rho c$ | kg m$^{-2}$ s$^{-1}$ | Learn |
| $I_R/I_0 = (Z_2 - Z_1)^2/(Z_2 + Z_1)^2$ | Dimensionless | Given |
| $I = I_0e^{-\mu x}$ | $\mu$ in m$^{-1}$ | Learn |
| $d = ct/2$ | Echo depth | Derive |

## Worked example

Reflection at a soft tissue ($Z_1 = 1.63\times10^{6}$ kg m$^{-2}$ s$^{-1}$) and bone ($Z_2 = 7.8\times10^{6}$ kg m$^{-2}$ s$^{-1}$) boundary:

$$\frac{I_R}{I_0} = \frac{(7.8 - 1.63)^2}{(7.8 + 1.63)^2} = \frac{38.1}{88.9} = 0.43$$

So 43% of the intensity is reflected. For X-rays through 4.0 cm of muscle with $\mu = 0.35\ \text{cm}^{-1}$:

$$\frac{I}{I_0} = e^{-0.35 \times 4.0} = e^{-1.4} = 0.25, \qquad x_{1/2} = \frac{\ln 2}{0.35} = 2.0\ \text{cm}$$

An echo returns 80 $\mu$s after the pulse in tissue where $c = 1540$ m s$^{-1}$:

$$d = \frac{ct}{2} = \frac{1540 \times 80\times10^{-6}}{2} = 6.2\times10^{-2}\ \text{m}$$

## Common mistakes
- Forgetting the factor of 2 (round trip) in the depth calculation.
- Saying that ultrasound uses ionising radiation or that PET detects positrons directly.
- Describing the gel as "to lubricate" without mentioning the impedance match.
- Mixing units in $\mu x$, such as cm$^{-1}$ with m.
- Saying that MRI uses X-rays or the magnetic field "magnetises the patient".

## Exam tips
- Build each technique as a numbered chain: source, interaction, detection, image formation.
- For the piezoelectric transducer, say both emission and detection roles.
- In the reflection equation, only the size of the difference in $Z$ matters.
- PET annihilation photons: two photons, equal energy, opposite directions, simultaneous detection.
