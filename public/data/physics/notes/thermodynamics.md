# Thermodynamics
> Examiners want you to apply the first law with the correct sign for each term and to read work done from a p-V diagram.

## Key ideas

### Internal energy
The internal energy $U$ of a system is the sum of the random kinetic and potential energies of its molecules. Kinetic energy comes from random motion (translational, and rotational and vibrational in real molecules). Potential energy comes from intermolecular forces: it is zero for an ideal gas and significant in liquids and solids. The word "random" matters: the bulk motion of the whole gas is not part of $U$.

### Internal energy, temperature and phase changes
For an ideal gas $U$ depends only on temperature, because there is no potential energy: heating raises the mean kinetic energy and so $U$. For a real substance, raising temperature at fixed phase mainly increases kinetic energy. During melting or boiling, temperature (and mean kinetic energy) stays constant, but $U$ increases because the energy supplied raises the potential energy as molecules are pulled apart. Condensing and freezing decrease $U$ at constant temperature.

### The first law of thermodynamics
$$\Delta U = q + w$$
Here $q$ is energy transferred *to* the system by heating and $w$ is work done *on* the system. The increase in internal energy equals the heat supplied plus the work done on the gas. Sign conventions: heat into the gas is positive, heat out is negative; work done on the gas (compression) is positive, work done by the gas (expansion) is negative. State your convention clearly, since it is the usual source of lost marks.

### Work done at constant pressure
When a gas expands at constant pressure $p$ through a volume change $\Delta V$, the work done by the gas is $p\Delta V$, so in the first law $w = -p\Delta V$. On a p-V diagram the work done by or on the gas equals the area under the curve, even if the pressure is not constant. Expansion (moving right) means the gas does work; compression (moving left) means work is done on the gas. For a cycle, the net work is the area enclosed by the loop.

## Definitions to learn

| Term | Definition |
|---|---|
| Internal energy | The sum of the random kinetic and potential energies of all the molecules in a system. |
| First law of thermodynamics | The increase in internal energy of a system equals the heat transferred to it plus the work done on it. |
| Isothermal | A change at constant temperature. |
| Work done by a gas | The product of pressure and volume change, $p\Delta V$, at constant pressure. |

## Equations

| Equation | Symbols and units | Data sheet? |
|---|---|---|
| $\Delta U = q + w$ | All in J; $w$ is work done *on* the gas | Learn |
| $W = p\Delta V$ | Work done by gas at constant $p$; $p$ in Pa, $V$ in m$^3$ | Learn |
| $U = \tfrac32 nRT$ | Ideal monatomic gas only | Derive from $E_k = \tfrac32 kT$ |

## Worked example

A gas at constant pressure $1.0\times10^{5}$ Pa expands from $2.0\times10^{-3}$ m$^3$ to $5.0\times10^{-3}$ m$^3$ while 500 J of heat is supplied. Find the change in internal energy.

$$\begin{aligned}
W_{by} &= p\Delta V = 1.0\times10^{5} \times (5.0-2.0)\times10^{-3} = 300\ \text{J} \\
w &= -300\ \text{J}\ \text{(work done on the gas)} \\
\Delta U &= q + w = 500 + (-300) = +200\ \text{J}
\end{aligned}$$

The internal energy rises by 200 J, so the temperature of the gas rises.

## Common mistakes
- Mixing up the sign of $w$: with $\Delta U = q + w$, expansion gives a *negative* $w$.
- Saying internal energy is only kinetic, or that temperature rises during a phase change.
- Using $p\Delta V$ when pressure is not constant; use the area under the graph instead.
- Quoting pressure in kPa or volume in dm$^3$ and getting a power of ten wrong.
- Saying that heat is "stored" in a gas; internal energy is stored, heat is the transfer.

## Exam tips
- Write down the sign of $q$ and $w$ in words before using the equation.
- For ideal gases at constant temperature (isothermal) $\Delta U = 0$, so $q = -w$.
- On a p-V cycle, shade the enclosed area and say whether the net work is done on or by the gas, based on direction (clockwise cycles do net work by the gas).
- Link phase changes to potential energy of molecules to get the explanation mark.
