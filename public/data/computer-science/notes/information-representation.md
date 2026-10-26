# Information representation
> Almost every Paper 1 starts with number-system and data-encoding marks; examiners want exact working, correct units and a clear link between a setting (resolution, sample rate) and its effect on size and quality.

## Key ideas

### Binary and decimal prefixes
- Decimal (SI) prefixes use powers of 10: kilo $10^3$, mega $10^6$, giga $10^9$, tera $10^{12}$.
- Binary prefixes use powers of 2: kibi $2^{10}=1024$, mebi $2^{20}$, gibi $2^{30}$, tebi $2^{40}$.
- Storage makers advertise in decimal, so a "500 GB" drive shows fewer GiB in an operating system that reports in binary units.

### Number bases and negative numbers
- Convert denary to binary by repeated division by 2 (read remainders upwards) or by subtracting place values (128, 64, 32 ...).
- Hexadecimal groups binary into nibbles: $1010\,1111_2 = AF_{16} = 175_{10}$.
- BCD stores each denary digit in its own 4-bit nibble: $259_{10} = 0010\,0101\,1001_{BCD}$.
- One's complement: invert every bit. Two's complement: invert then add 1; equivalently the MSB has weight $-2^{n-1}$. In 8 bits the range is $-128$ to $+127$.
- Example: $-13$ in 8-bit two's complement: $13 = 00001101$, invert $11110010$, add 1 gives $11110011$.

### Binary arithmetic and overflow
- Add column by column: $1+1=10$ (carry 1), $1+1+1=11$.
- Subtract by adding the two's complement of the second number and discarding the carry out of the MSB.
- Overflow occurs when the true result is outside the representable range, e.g. in 8-bit two's complement adding two positives and getting a result with MSB 1. The result stored is then wrong.

### Where BCD and hex are used
- BCD: digital clocks, calculators, displays and financial systems where each decimal digit must be shown or rounded exactly.
- Hex: shorter and less error-prone than binary for memory addresses, colour codes (`#FF8800`), MAC addresses, machine code and error/debug dumps.

### Character sets
- ASCII uses 7 bits (128 characters); extended ASCII uses 8 bits (256) for accents and symbols.
- Unicode assigns a code point to characters of nearly every writing system (and emoji); encodings such as UTF-8 and UTF-16 use 1-4 bytes or more per character, so files are larger but multilingual text is supported.
- Characters are stored as their code, so "A" (65) and "a" (97) differ.

### Bitmap and vector graphics
- Bitmap: a grid of pixels, each stored as a binary colour value. Resolution is pixels per image; colour depth is bits per pixel.
- Vector: a list of objects (shapes) with properties (type, coordinates, line/fill colour) held in a drawing list.
- Use bitmaps for photographs; use vectors for logos, diagrams and anything scaled up, since vectors scale without pixelation and are small, but are unsuitable for photos.

### Bitmap file size
$$\text{size (bits)} = \text{width} \times \text{height} \times \text{colour depth}$$
Divide by 8 for bytes. A file header (dimensions, depth) adds a little. Higher resolution gives more detail but a larger file; higher colour depth gives more colours (number of colours $=2^{depth}$) but a larger file.

### Sound
- Analogue sound is sampled: the amplitude is measured at regular intervals and each value stored as binary.
- Sampling rate = samples per second (Hz); sampling resolution = bits per sample.
- Higher rate or resolution gives a waveform closer to the original (more accurate) but a bigger file.
$$\text{size (bits)} = \text{rate} \times \text{resolution} \times \text{seconds} \times \text{channels}$$

### Compression
- Lossless: original can be rebuilt exactly (needed for text, programs, spreadsheets). Lossy: some data permanently discarded for a much smaller file.
- Text: lossless methods such as run-length encoding or dictionary/Huffman coding.
- Images: lossy (e.g. JPEG) reduces colours/detail; lossless (e.g. PNG) or RLE keeps all pixels.
- Sound: lossy (e.g. MP3) removes sounds humans barely hear, or lowers rate/resolution.
- RLE stores each run as (count, value): `AAAABBBCC` becomes `4A3B2C`. It works best with long runs and can make data bigger if there are few repeats.

## Key terms
| Term | Meaning |
|---|---|
| Kibibyte (KiB) | 1024 bytes. |
| Nibble | 4 bits, one hex digit. |
| Two's complement | Signed representation where the MSB has negative weight; negate by inverting and adding 1. |
| Overflow | A result too large to fit in the available number of bits. |
| BCD | Binary-coded decimal: each denary digit stored in 4 bits. |
| Colour depth | Number of bits used per pixel. |
| Resolution | Number of pixels in the image (width x height). |
| Sampling rate | Number of sound samples taken per second. |
| Lossless compression | Reduces size so that the original can be restored exactly. |
| RLE | Replaces runs of identical values with a count and the value. |

## Worked example
**Question:** A 1.5-minute mono sound is recorded at 44 100 Hz with 16-bit resolution. Calculate the file size in MiB, and state two effects of halving the sampling rate. [5]

**Model answer:**
- Time = 90 s. (1)
- Bits = $44100 \times 16 \times 90 = 63\,504\,000$ bits. (1)
- Bytes = $63\,504\,000 / 8 = 7\,938\,000$. (1)
- MiB = $7\,938\,000 / 1\,048\,576 \approx 7.57$ MiB. (1)
- Halving the rate halves the file size (fewer samples) and the recording is a less accurate reproduction of the original wave (higher frequencies lost). (1)

## Common mistakes
- Dividing by 1000 instead of 1024 when the question uses kibi/mebi.
- Forgetting to add 1 in two's complement, or forgetting leading zeros to fill the byte.
- Calling overflow "a carry out" in every case; for unsigned it is a carry out of the MSB, for two's complement it is a sign error.
- Saying vector images are "made of pixels" or that compression "removes redundant data" in lossy methods without saying data is lost permanently.
- Mixing up resolution (how many pixels) with colour depth (bits per pixel).

## Exam tips
- "Calculate" means show every step; marks are for method, not just the answer.
- Convert the final answer to the unit requested, and state units.
- For "explain the effect of..." give both the direction (larger/smaller) and the reason (more bits per sample or pixel).
- Hex-to-denary and BCD questions: write the 4-bit groups under each digit to avoid slips.
