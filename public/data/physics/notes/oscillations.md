# Oscillations
> Examiners want you to start from $a = -\omega^2 x$, read graphs of $x$, $v$ and $a$ accurately, and explain damping and resonance in terms of energy.

## Key ideas

### Types of oscillation and terminology
A free oscillation has a system oscillating at its natural frequency with no external driving force (and, ideally, constant amplitude). A damped oscillation loses energy to the surroundings, so its amplitude decreases. A forced oscillation is driven by a periodic external force. Key terms: displacement $x$ from equilibrium, amplitude $x_0$ (maximum displacement), period $T$ (time for one cycle), frequency $f = 1/T$ and angular frequency $\omega = 2\pi f = 2\pi/T$.

### Simple harmonic motion
SHM occurs when the acceleration is proportional to the displacement and always directed towards the equilibrium position:
$$a = -\omega^2 x.$$
The minus sign shows that $a$ and $x$ have opposite directions. A graph of $a$ against $x$ is a straight line through the origin with gradient $-\omega^2$. Displacement, velocity and acceleration against time are sinusoidal: velocity leads displacement by a quarter of a cycle (it is maximum when $x = 0$), and acceleration is in antiphase with displacement. The gradient of the $x$-$t$ graph gives $v$ and the gradient of the $v$-$t$ graph gives $a$.

### Equations of SHM
Starting from the equilibrium position, $x = x_0 \sin\omega t$, and then $v = v_0\cos\omega t$ with maximum speed $v_0 = \omega x_0$. Starting from maximum displacement, use cosine instead. Eliminating time gives
$$v = \pm\omega\sqrt{x_0^2 - x^2}.$$
The maximum acceleration is $\omega^2 x_0$, at the extremes. For a mass on a spring $\omega = \sqrt{k/m}$ and for a simple pendulum (small angles) $\omega = \sqrt{g/L}$. Period does not depend on amplitude: this isochronous property is why SHM is used for clocks.

### Energy in SHM
Total energy is constant when there is no damping: $E = \tfrac12 m\omega^2x_0^2$. Kinetic energy is $\tfrac12 m\omega^2(x_0^2 - x^2)$ and potential energy is $\tfrac12 m\omega^2x^2$. At the equilibrium position all the energy is kinetic; at the extremes it is all potential. Energy against displacement graphs are parabolas ($E_p$ is an upright parabola, $E_k$ is inverted, and the total is a horizontal line). Against time, $E_k$ and $E_p$ oscillate at twice the frequency of the motion.

### Damping
Light damping: amplitude decays gradually (exponentially) while the period is almost unchanged, for example a pendulum in air. Critical damping: the system returns to equilibrium in the shortest time without oscillating, as in a car suspension or a door closer. Heavy (over-) damping: returns slowly with no oscillation, as when a door closer has too much resistance or the system is in thick oil. Damping forces dissipate energy as thermal energy.

### Resonance
Resonance occurs when the driving frequency equals the natural frequency of the system, giving maximum amplitude and maximum energy transfer from driver to oscillator. The amplitude-frequency curve peaks at the natural frequency. Increasing damping lowers and broadens the peak and moves it slightly to lower frequencies. Examples: tuning a radio, microwave oven, buildings in earthquakes (unwanted, so damping is added).

## Definitions to learn

| Term | Definition |
|---|---|
| Simple harmonic motion | Motion in which the acceleration is proportional to the displacement from a fixed point and directed towards that point. |
| Amplitude | Maximum displacement from the equilibrium position. |
| Angular frequency | $\omega = 2\pi f$, the rate of change of phase angle in rad s$^{-1}$. |
| Critical damping | Damping that returns the system to equilibrium in the shortest time without oscillating. |
| Resonance | Maximum amplitude response when the driving frequency equals the natural frequency of the system. |

## Equations

| Equation | Symbols and units | Data sheet? |
|---|---|---|
| $a = -\omega^2 x$ | $a$ in m s$^{-2}$, $x$ in m | Given |
| $x = x_0\sin\omega t$ | $\omega$ in rad s$^{-1}$, set calculator to radians | Given |
| $v = v_0\cos\omega t$, $v_0 = \omega x_0$ | m s$^{-1}$ | Given |
| $v = \pm\omega\sqrt{x_0^2 - x^2}$ | m s$^{-1}$ | Given |
| $E = \tfrac12 m\omega^2x_0^2$ | Total energy, J | Derive |

## Worked example

A 0.20 kg oscillator has amplitude 5.0 cm and frequency 2.0 Hz. Find its maximum speed, maximum acceleration, the speed at $x = 3.0$ cm, and total energy.

$$\begin{aligned}
\omega &= 2\pi f = 4\pi = 12.57\ \text{rad s}^{-1} \\
v_0 &= \omega x_0 = 12.57 \times 0.050 = 0.63\ \text{m s}^{-1} \\
a_{max} &= \omega^2 x_0 = 157.9 \times 0.050 = 7.9\ \text{m s}^{-2} \\
v &= \omega\sqrt{x_0^2 - x^2} = 12.57\sqrt{0.050^2 - 0.030^2} = 12.57 \times 0.040 = 0.50\ \text{m s}^{-1} \\
E &= \tfrac12 mv_0^2 = \tfrac12 (0.20)(0.628)^2 = 3.9\times10^{-2}\ \text{J}
\end{aligned}$$

## Common mistakes
- Using $f$ instead of $\omega$ in the SHM equations.
- Using degrees in $\sin\omega t$.
- Forgetting the negative sign in $a = -\omega^2 x$, or claiming acceleration is constant.
- Saying critical damping means "no damping" or "maximum damping".
- Sketching a resonance curve that peaks at a different frequency from the natural frequency, or that drops to zero at zero frequency.

## Exam tips
- To prove SHM, show that $a \propto -x$ and quote the constant $\omega^2$.
- Identify graph features: gradient = velocity, maximum $v$ at the zero crossing of $x$.
- When asked about energy, give energies at both equilibrium and extreme positions.
- For damping effects on resonance say: lower peak, broader, shifted slightly left.
