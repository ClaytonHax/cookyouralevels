# Alternating currents
> Examiners want you to relate peak, r.m.s. and mean power values reliably, read oscilloscope traces, and explain how diodes and capacitors convert a.c. to d.c.

## Key ideas

### Sinusoidal a.c.
An alternating current reverses direction periodically. For a sinusoidal supply the current and voltage vary as
$$I = I_0\sin\omega t, \qquad V = V_0\sin\omega t$$
where $I_0$ and $V_0$ are the peak values (amplitudes), the period $T$ is the time for one full cycle, and the frequency is $f = 1/T$ with $\omega = 2\pi f$. Peak-to-peak is twice the peak. On an oscilloscope, the vertical scale (V/div) gives voltage and the time-base (s/div) gives the period by the horizontal width of one cycle.

### R.m.s. values and power
The instantaneous power in a resistor is $P = I^2R$, which is never negative and oscillates between 0 and $I_0^2R$. The mean power is half the peak:
$$\langle P\rangle = \tfrac12 I_0^2R = \tfrac12\frac{V_0^2}{R}.$$
The root-mean-square value of a sinusoidal quantity is the steady d.c. value that would give the same mean power in the same resistor:
$$I_{rms} = \frac{I_0}{\sqrt2}, \qquad V_{rms} = \frac{V_0}{\sqrt2}.$$
So $\langle P\rangle = I_{rms}^2R = V_{rms}^2/R = I_{rms}V_{rms}$. The factor of $\sqrt2$ applies only to sine waves. Mains of "230 V" is an r.m.s. value; its peak is about 325 V. Meters on a.c. ranges normally read r.m.s.

### Rectification
A diode conducts in one direction only. Half-wave rectification uses a single diode in series with the load, passing only one half-cycle, so the output is a series of positive pulses with gaps (and the frequency of the output pulses equals the supply frequency). Full-wave rectification uses a bridge of four diodes so that both half-cycles produce current in the same direction through the load, giving pulses at twice the supply frequency with no gaps (apart from the diode threshold drop).

### Smoothing
A capacitor connected in parallel with the load charges as the voltage rises to the peak, then discharges slowly through the load when the supply voltage drops, keeping the output close to the peak. The output then has a small ripple. The ripple is reduced by a larger capacitance or larger load resistance (a longer time constant $RC$ compared with the time between peaks) and also by full-wave rectification, which reduces the discharge time between peaks.

## Definitions to learn

| Term | Definition |
|---|---|
| Peak value | The maximum magnitude of the current or voltage in a cycle. |
| Period | The time for one complete cycle of the alternating quantity. |
| Root-mean-square (r.m.s.) current | The steady direct current that dissipates the same mean power in a resistor as the alternating current. |
| Rectification | The conversion of alternating current to direct current using diodes. |

## Equations

| Equation | Symbols and units | Data sheet? |
|---|---|---|
| $x = x_0\sin\omega t$ | $x$ is $I$ or $V$ | Given |
| $I_{rms} = I_0/\sqrt2$, $V_{rms} = V_0/\sqrt2$ | A, V | Learn |
| $\langle P\rangle = \tfrac12 I_0V_0 = I_{rms}V_{rms}$ | W | Derive |
| $f = 1/T$ | Hz, s | Learn |

## Worked example

A supply has peak voltage 325 V and is connected to a 50 $\Omega$ resistor.

$$\begin{aligned}
V_{rms} &= \frac{325}{\sqrt2} = 230\ \text{V} \\
\langle P\rangle &= \frac{V_{rms}^2}{R} = \frac{(229.8)^2}{50} = 1.06\times10^{3}\ \text{W}
\end{aligned}$$

Check: $\tfrac12 V_0^2/R = 325^2/(2 \times 50) = 1.06\times10^{3}$ W.

An oscilloscope has a time-base of 5.0 ms/div and one complete cycle spans 4.0 divisions:

$$T = 4.0 \times 5.0\ \text{ms} = 20\ \text{ms}, \qquad f = \frac{1}{0.020} = 50\ \text{Hz}$$

## Common mistakes
- Using the peak value in $P = V^2/R$ and forgetting to halve, or halving twice.
- Applying the factor $\sqrt2$ to a non-sinusoidal waveform such as a square wave.
- Reading peak-to-peak off an oscilloscope and calling it the amplitude.
- Drawing the smoothed output falling below zero, or ripple that falls to zero.
- Forgetting that full-wave output has twice the frequency.

## Exam tips
- State "r.m.s. is the equivalent steady value giving the same heating effect" to earn the definition mark.
- To sketch rectified waveforms: dashed sine for input, solid for output, scale both axes, and mark the peak.
- In smoothing questions, discuss the time constant against the time between pulses.
- Convert time-base settings to seconds before calculating frequency.
