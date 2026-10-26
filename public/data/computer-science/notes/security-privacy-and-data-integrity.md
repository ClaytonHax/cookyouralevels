# Security, privacy and data integrity
> Three related but distinct ideas, and the exam loves to test whether you can tell them apart and pick the right check for a data-entry scenario.

## Key ideas

### Security, privacy and integrity
- Data security: protecting data from unauthorised access, loss or damage.
- Data privacy: the right of individuals to control how their personal data is collected, used and shared.
- Data integrity: data is accurate, complete, consistent and up to date.

### Protecting systems
- Single PC: strong passwords, biometrics, anti-malware, firewall, software updates, encryption, backups, user access levels, screen locks.
- Network: user accounts and access rights, firewall between LAN and internet, encryption of transmitted data (and of Wi-Fi), proxy servers, physical security of servers, network monitoring.
- Backups and recovery plans protect against accidental loss; encrypted data is useless to a thief without the key.

### Network threats
- Malware: virus (attaches to files and spreads when run), worm (self-replicates over networks), trojan (disguised as legitimate), spyware (records activity), ransomware (encrypts files and demands payment).
- Hacking: unauthorised access to a computer or network. Reduce with firewalls, strong passwords, two-factor authentication and updates.
- Phishing: fake emails or messages tricking users into revealing details or clicking links. Reduce with training, spam filters and checking sender and URL.
- Pharming: malicious code redirects users from a genuine website to a fake one without their knowledge, often by altering DNS or host files. Reduce with anti-malware, checking HTTPS certificates and secure DNS.

### Validation and verification
- Validation: automatic check that data is reasonable and in an acceptable form; it cannot prove data is correct.
- Verification: check that data has been copied or entered accurately; it cannot prove data is sensible.

### Validation checks
| Check | What it tests | Example |
|---|---|---|
| Range | Value between limits | Age 0 to 120 |
| Format | Pattern | `AA9999` |
| Length | Number of characters | Phone number 10 digits |
| Presence | Not left empty | Surname required |
| Existence | Value is in a list/database | Country exists in a table |
| Limit | One-sided boundary | Quantity >= 1 |
| Check digit | Final digit computed from others | ISBN, barcode |

- Check digit: calculated from other digits using a formula (weights and modulus); recalculated on entry and compared. Detects transposition and mistyped digits.

### Verification methods
- During entry: visual check (read data on screen against source) and double entry (type twice, or two people, and compare).
- During transfer: parity check (extra bit makes the count of 1s even/odd; byte-level or block parity with rows and columns can locate the error), checksum (value calculated from block, recalculated by receiver and compared), and echo check (receiver returns data to sender). Check digits are validation but also used for transcription.

## Key terms
| Term | Meaning |
|---|---|
| Phishing | Fraudulent messages tricking users into revealing sensitive information. |
| Pharming | Redirecting users from a real site to a fake one to steal data. |
| Firewall | Software or hardware that monitors and filters traffic between a network and outside. |
| Encryption | Scrambling data so that it cannot be understood without the key. |
| Validation | Checking that input data is reasonable and in the correct form. |
| Verification | Checking that data has been entered or transferred accurately. |
| Parity bit | Extra bit added to make the number of 1s odd or even. |
| Checksum | Value calculated from data used to detect transmission errors. |

## Worked example
**Question:** A form accepts a student's year group (7 to 13) and a six-character code. Describe suitable validation and verification. [5]

**Model answer:**
- Range check on year group: reject values below 7 or above 13 (1).
- Length check on code: exactly 6 characters (1).
- Presence check: both fields must be filled in (1).
- Verification by double entry: the code is typed twice and compared (1).
- Validation cannot confirm the entered year is the student's real year; only that it is plausible (1).

## Common mistakes
- Saying validation ensures data is "correct".
- Confusing phishing (email) with pharming (redirect).
- Treating privacy and security as the same.
- Suggesting a range check for text data or a format check for a number's size.
- Describing parity as detecting an error and then correcting it (a single parity bit cannot correct).

## Exam tips
- Name the check and say what it does in the context given.
- "Describe" threats: how it works plus one prevention.
- For transmission questions, mention both sender and receiver actions (calculate, send, recalculate, compare).
- A mark is often for "data entered is reasonable but not necessarily correct".
