# Temperature
> Examiners want you to link temperature to energy transfer, use the Kelvin scale correctly, and handle heating and phase-change calculations with the right equation and the right (sometimes experimental) assumptions.

## Key ideas

### Thermal equilibrium
Two objects in thermal contact exchange energy until they reach thermal equilibrium: no net energy transfer between them, and they are at the same temperature. If A is in equilibrium with C, and B is in equilibrium with C, then A and B are in equilibrium with each other. This is the zeroth law, and it is what makes a thermometer work: the thermometer reaches equilibrium with the object and its reading tells us the object's temperature. Energy flows spontaneously from higher to lower temperature.

### Celsius and Kelvin scales
The thermodynamic (Kelvin) scale does not depend on the properties of any particular substance. Absolute zero, 0 K, is the lowest possible temperature, where molecules have minimum possible energy (it is not "no motion" in a simple sense, but the minimum internal energy). Convert using
$$T/\text{K} = \theta/^\circ\text{C} + 273.15.$$
A temperature change of 1 K equals a change of $1^\circ$C. Use kelvin in gas laws and in any formula derived from kinetic theory.

### Using physical properties to measure temperature
Any property that varies measurably with temperature can be used: liquid volume in a glass thermometer, resistance of a thermistor or metal wire, e.m.f. of a thermocouple, pressure of a fixed volume of gas. A thermistor is sensitive and quick but non-linear; a thermocouple has a wide range and small probe (fast response, good for rapid changes), but gives a small e.m.f.; a liquid-in-glass thermometer is cheap and simple but has limited range and is slow. Sensitivity means the change in the property per kelvin; range is the span over which it works.

### Specific heat capacity and latent heat
Specific heat capacity $c$ is the energy needed per unit mass to raise the temperature by 1 K without a phase change:
$$Q = mc\,\Delta\theta.$$
Specific latent heat $L$ is the energy needed per unit mass to change phase at constant temperature:
$$Q = mL.$$
$L_f$ is for fusion (solid to liquid) and $L_v$ for vaporisation (liquid to gas). $L_v$ is much larger than $L_f$ because molecules must be separated completely, against all attractive forces, and the gas does work expanding against the atmosphere.

### Experimental determination
For a solid block, insert an electric heater and a thermometer, insulate it, and measure $V$, $I$, time $t$, mass and temperature rise: $VIt = mc\Delta\theta$. For a liquid, use a continuous-flow method or heat a known mass. For latent heat, run a heater in a liquid at its boiling point (or melting ice) and measure the mass change over a time; repeat at two different powers and subtract to remove heat losses to the surroundings. Reduce errors with lagging, a lid, stirring and using a large temperature rise.

## Definitions to learn

| Term | Definition |
|---|---|
| Thermal equilibrium | No net transfer of thermal energy between objects in contact; they are at the same temperature. |
| Absolute zero | The lowest possible temperature, 0 K, where a system has minimum internal energy. |
| Specific heat capacity | Energy required per unit mass to raise the temperature by 1 K (or $1^\circ$C). |
| Specific latent heat of fusion | Energy required per unit mass to change a solid to a liquid at constant temperature. |
| Specific latent heat of vaporisation | Energy required per unit mass to change a liquid to a gas at constant temperature. |

## Equations

| Equation | Symbols and units | Data sheet? |
|---|---|---|
| $T = \theta + 273.15$ | K and $^\circ$C | Learn |
| $Q = mc\Delta\theta$ | $Q$ in J, $c$ in J kg$^{-1}$ K$^{-1}$ | Learn |
| $Q = mL$ | $L$ in J kg$^{-1}$ | Learn |
| $E = VIt$ (or $Pt$) | Electrical energy supplied, J | Learn |

## Worked example

A 2.0 kW heater warms 0.80 kg of water from $20^\circ$C to $100^\circ$C ($c = 4200$ J kg$^{-1}$ K$^{-1}$). Assuming no losses, how long does it take?

$$\begin{aligned}
Q &= mc\Delta\theta = 0.80 \times 4200 \times 80 = 2.69\times10^{5}\ \text{J} \\
t &= \frac{Q}{P} = \frac{2.69\times10^{5}}{2000} = 134\ \text{s}
\end{aligned}$$

Then how much energy melts 0.050 kg of ice at $0^\circ$C ($L_f = 3.34\times10^{5}$ J kg$^{-1}$)?

$$Q = mL_f = 0.050 \times 3.34\times10^{5} = 1.67\times10^{4}\ \text{J}$$

## Common mistakes
- Forgetting to convert to kelvin, or adding 273 to a temperature *difference*.
- Using $mc\Delta\theta$ during a phase change, or $mL$ when the temperature is changing.
- Ignoring heat losses in experiments and not saying their effect (the measured $c$ comes out too large).
- Saying temperature measures "the heat in an object"; it measures how energy would flow.
- Mixing up energy per unit mass (specific) and per kelvin (heat capacity).

## Exam tips
- For multi-stage heating, calculate each stage (warm solid, melt, warm liquid, boil) and add.
- In an experiment, state what to measure and which equation links it, then name one source of error and its effect.
- Explain latent heat in terms of energy increasing potential energy of molecules, not kinetic energy, since temperature stays constant.
- Keep $\Delta\theta$ in either K or $^\circ$C, but not mixed with absolute $T$.
