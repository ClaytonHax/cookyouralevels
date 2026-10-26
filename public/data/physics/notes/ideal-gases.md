# Ideal gases
> Examiners want you to move between macroscopic gas laws and the molecular picture, and to derive or apply $pV = \tfrac13 Nm\langle c^2\rangle$ with the correct assumptions.

## Key ideas

### Equation of state
For an ideal gas,
$$pV = nRT = NkT$$
where $n$ is the amount in moles, $N$ the number of molecules, $R = 8.31$ J mol$^{-1}$ K$^{-1}$ and $k = 1.38\times10^{-23}$ J K$^{-1}$ is the Boltzmann constant ($k = R/N_A$). One mole contains $N_A = 6.02\times10^{23}$ particles, so $N = nN_A$. Pressure must be in Pa, volume in m$^3$ and temperature in K. For a fixed mass of gas, $pV/T$ is constant, so you can compare two states directly.

### Assumptions of the kinetic theory
- Molecules are identical point-like particles whose volume is negligible compared with the container.
- They move randomly, with a large number of them.
- There are no intermolecular forces except during collisions, so no potential energy.
- Collisions are perfectly elastic and of negligible duration.
- Newton's laws apply.

### Pressure from kinetic theory
Pressure arises from molecules changing momentum when they collide with walls. Considering a molecule bouncing between two faces of a cube, summing over all molecules and averaging over three dimensions (since $\langle c^2\rangle = 3\langle c_x^2\rangle$) gives
$$pV = \tfrac13 Nm\langle c^2\rangle$$
where $\langle c^2\rangle$ is the mean-square speed. The root-mean-square speed is $c_{rms} = \sqrt{\langle c^2\rangle}$. Equivalently $p = \tfrac13\rho\langle c^2\rangle$, with $\rho$ the gas density.

### Kinetic energy and temperature
Comparing $pV = NkT$ with $pV = \tfrac13 Nm\langle c^2\rangle$ gives $\tfrac12 m\langle c^2\rangle = \tfrac32 kT$. So the mean translational kinetic energy per molecule is proportional to the thermodynamic temperature and independent of the gas. It follows that $c_{rms} = \sqrt{3kT/m}$, so lighter molecules move faster at the same temperature. For a monatomic gas the internal energy is $U = \tfrac32 NkT = \tfrac32 nRT$.

### Explaining the gas laws
- Boyle's law ($p \propto 1/V$ at constant $T$): same mean speed, but the molecules hit the walls more often in a smaller volume, so the pressure rises.
- Pressure law ($p \propto T$ at constant $V$): higher $T$ means a higher mean speed, so each collision involves a greater momentum change and collisions are more frequent.
- Volume law ($V \propto T$ at constant $p$): faster molecules would raise pressure, so the volume must increase to keep the collision rate per area constant.

## Definitions to learn

| Term | Definition |
|---|---|
| Mole | The amount of substance containing as many particles as there are atoms in 12 g of carbon-12 ($6.02\times10^{23}$). |
| Avogadro constant | The number of particles per mole, $N_A = 6.02\times10^{23}$ mol$^{-1}$. |
| Ideal gas | A gas that obeys $pV = nRT$ at all pressures and temperatures. |
| Root-mean-square speed | The square root of the mean of the squared speeds of the molecules. |
| Boltzmann constant | $k = R/N_A$, the gas constant per molecule. |

## Equations

| Equation | Symbols and units | Data sheet? |
|---|---|---|
| $pV = nRT$ | $p$ Pa, $V$ m$^3$, $T$ K | Learn |
| $pV = NkT$ | $N$ number of molecules | Learn |
| $pV = \tfrac13 Nm\langle c^2\rangle$ | $m$ mass of one molecule in kg | Given |
| $E_k = \tfrac32 kT$ | Mean translational energy per molecule, J | Learn |

## Worked example

Find the pressure of 2.0 mol of ideal gas at 300 K in a volume of 0.010 m$^3$.

$$p = \frac{nRT}{V} = \frac{2.0 \times 8.31 \times 300}{0.010} = 4.99\times10^{5}\ \text{Pa}$$

Find $c_{rms}$ for helium at 300 K, given a helium atom has mass $4.0 \times 1.66\times10^{-27} = 6.64\times10^{-27}$ kg.

$$\begin{aligned}
\langle c^2\rangle &= \frac{3kT}{m} = \frac{3 \times 1.38\times10^{-23} \times 300}{6.64\times10^{-27}} = 1.87\times10^{6}\ \text{m}^2\text{s}^{-2} \\
c_{rms} &= 1.37\times10^{3}\ \text{m s}^{-1}
\end{aligned}$$

## Common mistakes
- Using Celsius, or volume in cm$^3$ or litres, in $pV = nRT$.
- Confusing $m$ (mass of one molecule) with the total mass, or $N$ with $n$.
- Taking the mean of the speeds instead of the root of the mean of the squares.
- Writing "molecules collide with each other more often, so pressure rises"; it is collisions with the walls that matter.
- Forgetting the factor $\tfrac13$ and its origin.

## Exam tips
- A good explanation of pressure has four steps: molecule changes momentum on hitting wall, so force (Newton's second law), many molecules so average force is steady, force per unit area is pressure.
- Atomic masses: use $m = A \times 1.66\times10^{-27}$ kg, or molar mass divided by $N_A$.
- For two-state problems use $p_1V_1/T_1 = p_2V_2/T_2$ and avoid computing $nR$.
- Check that your $c_{rms}$ is of the order of hundreds to thousands of m s$^{-1}$.
