# Circular measure
> Examiners want radians used confidently, the arc and sector formulae applied correctly, and composite shapes (sectors, triangles, segments) broken into simple pieces.

## Key ideas

### Degrees and radians
One radian is the angle subtended at the centre by an arc equal in length to the radius. A full turn is $2\pi$ radians, so $180^\circ=\pi$ radians.
1. Degrees to radians: multiply by $\dfrac{\pi}{180}$.
2. Radians to degrees: multiply by $\dfrac{180}{\pi}$.

Useful values: $30^\circ=\dfrac\pi6$, $45^\circ=\dfrac\pi4$, $60^\circ=\dfrac\pi3$, $90^\circ=\dfrac\pi2$, $120^\circ=\dfrac{2\pi}3$, $150^\circ=\dfrac{5\pi}6$. Leave answers in terms of $\pi$ when exact values are asked for. Make sure your calculator is in radian mode for trig of radian angles.

### Arc length
For a sector of radius $r$ and angle $\theta$ (in radians) the arc length is
$$s=r\theta.$$
This formula only works in radians. The perimeter of a sector is $2r+r\theta$.

### Sector area
$$A=\tfrac12r^2\theta.$$
Again $\theta$ must be in radians.

### Segments, triangles and combined shapes
A **segment** is the region between a chord and its arc.
1. Find the sector area $\tfrac12r^2\theta$.
2. Find the triangle area $\tfrac12r^2\sin\theta$ (formed by the two radii and the chord).
3. Segment area = sector $-$ triangle $=\tfrac12r^2(\theta-\sin\theta)$.

The chord length is $2r\sin\dfrac\theta2$, found from the right-angled triangle made by halving the isosceles triangle. For perimeter of a segment, add the arc and the chord.

Problems often combine two sectors, or a sector with a triangle, and ask for a perimeter or area. Split the shape, find each part, then add or subtract. Sometimes you must first find $\theta$ from a given area or perimeter using an equation.

## Formulae
- **In MF19:** arc length $s=r\theta$ and sector area $A=\tfrac12r^2\theta$ ($\theta$ in radians).
- **Memorise:** $\pi\ \text{rad}=180^\circ$.
- **Memorise** (not in MF19): triangle area $\tfrac12ab\sin C$.
- Segment area $\tfrac12r^2(\theta-\sin\theta)$ is not in MF19; derive it as sector minus triangle.

## Worked example
**Question.** A sector $OAB$ has radius $10\text{ cm}$ and angle $AOB=1.2$ radians. Find (a) the arc length, (b) the area of the sector, (c) the area of the segment cut off by the chord $AB$, (d) the perimeter of that segment.

**Solution.**
(a)
$$s=10\times1.2=12\text{ cm}.$$
(b)
$$A=\tfrac12(10)^2(1.2)=60\text{ cm}^2.$$
(c) Triangle area: $\tfrac12(10)^2\sin1.2=50\times0.93204=46.602$. So
$$\text{segment}=60-46.602=13.4\text{ cm}^2\ (3\text{ s.f.}).$$
(d) Chord:
$$AB=2(10)\sin0.6=20\times0.564642=11.29\text{ cm}.$$
Perimeter $=12+11.29=23.3\text{ cm}$ (3 s.f.).

**Question 2.** Express $150^\circ$ in radians and find the exact arc length for a circle of radius $6$ with that angle.

**Solution.**
$$150\times\frac\pi{180}=\frac{5\pi}6,\qquad s=6\times\frac{5\pi}6=5\pi.$$

## Common mistakes
- Using a calculator in degree mode for radian values.
- Using $s=r\theta$ with $\theta$ in degrees.
- Forgetting the two radii when asked for the perimeter of a sector.
- Using the sector area instead of the triangle area, or subtracting in the wrong order, for a segment.
- Using $\sin\theta$ rather than $\sin\dfrac\theta2$ for half the chord.

## Exam tips
- Label all known lengths and angles on a diagram, and add the radii and chord you need.
- "Exact" means leave $\pi$ and surds; look for $\dfrac\pi6$, $\dfrac\pi4$, $\dfrac\pi3$.
- If you need $\theta$ from an equation like $\tfrac12r^2\theta=k$, do not round until the end.
- Check units: $\text{cm}$ for lengths and $\text{cm}^2$ for areas.
