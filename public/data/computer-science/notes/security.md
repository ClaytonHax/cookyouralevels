# Security
> Examiners want you to say which key does what: who can read, who can verify, and how a certificate links a public key to a real identity.

## Key ideas

### Symmetric and asymmetric encryption
- **Plaintext** is turned into **ciphertext** by an algorithm and a key. Encryption gives confidentiality; it does not on its own stop data being deleted or altered.
- **Symmetric encryption**: the same secret key encrypts and decrypts.
  - Fast, suitable for large amounts of data.
  - Weakness: the key must be shared securely beforehand, and every pair of users needs its own key.
- **Asymmetric encryption**: a mathematically linked **key pair**. The **public key** is shared openly; the **private key** is kept secret.
  - **Privacy**: sender encrypts with the receiver's public key; only the receiver's private key can decrypt.
  - **Verification of sender**: sender encrypts (signs) with their own private key; anyone can decrypt with the public key, proving the sender held the private key.
  - Slower than symmetric, so usually used to exchange a symmetric key rather than to encrypt bulk data.
- Longer keys make **brute-force** attacks (trying every key) take impractically long.

### Quantum cryptography
- **Purpose**: to share an encryption key securely using properties of quantum physics, typically photons with polarisation states.
- **Benefits**: any eavesdropping disturbs the photons and is detected, so the key can be discarded; it does not depend on the difficulty of a mathematical problem, so it resists attack by quantum computers (which could break current public-key methods).
- **Drawbacks**: needs specialised and expensive equipment, works over limited distance without repeaters, low data rate, and the technology is not yet widespread.

### SSL/TLS
- **TLS** (successor to SSL) secures communication between a client and a server at the transport level. Used for HTTPS (online banking, shopping, logins), secure email and any exchange of sensitive data.
- Handshake in outline:
  1. Client requests a secure connection and the server sends its **digital certificate** (containing its public key).
  2. Client checks the certificate is valid and issued by a trusted authority.
  3. Client and server agree on a session key, exchanged using asymmetric encryption.
  4. All further data is encrypted with the fast **symmetric session key**.
- Provides confidentiality, authentication of the server and data integrity. Use it whenever data crosses an untrusted network.

### Digital certificates and signatures
- A **digital certificate** binds a public key to an identity. It contains the owner's name, public key, serial number, validity dates, issuer name and the issuer's digital signature.
- **Obtaining one:** the applicant generates a key pair, sends the public key and identity details to a **certificate authority (CA)**; the CA checks the identity and issues a certificate signed with the CA's private key.
- A **digital signature** proves who sent a message and that it was not altered:
  1. The sender runs the message through a **hashing algorithm** to produce a **digest**.
  2. The digest is encrypted with the sender's **private key**; this is the signature, sent with the message.
  3. The receiver decrypts the signature with the sender's public key (obtained from the certificate) and gets the digest.
  4. The receiver hashes the received message. If both digests match, the sender is authentic and the message unchanged.
- Signatures give **authentication**, **integrity** and **non-repudiation** (sender cannot deny sending).

## Key terms
| Term | Meaning |
|---|---|
| Ciphertext | Encrypted, unreadable form of data |
| Symmetric encryption | One shared key for both encryption and decryption |
| Public key | Openly shared key of a key pair |
| Private key | Secret key of a key pair |
| Digest | Fixed-size output of a hash of a message |
| Certificate authority | Trusted body that issues and signs certificates |
| Non-repudiation | Sender cannot deny having sent a message |
| Session key | Temporary symmetric key used for one TLS session |

## Worked example
**Question:** Amit sends a signed contract to a bank. Describe how the bank can be sure the contract came from Amit and was not changed. [6]

**Answer:**
- Amit hashes the contract to produce a digest. (1)
- He encrypts the digest with his private key to form the digital signature and sends it with the contract. (1)
- The bank obtains Amit's public key from his digital certificate issued by a CA. (1)
- The bank decrypts the signature with the public key to recover the digest. (1)
- The bank hashes the received contract with the same algorithm. (1)
- If the two digests match, only Amit's private key could have created the signature and the contract is unchanged. (1)

## Common mistakes
- Encrypting with the sender's public key for privacy (it is the receiver's public key).
- Saying the digital signature encrypts the whole message rather than the digest.
- Stating that a certificate contains the owner's private key; it never does.
- Claiming TLS uses asymmetric encryption for all the data (only to set up the session key).
- Saying quantum cryptography "cannot be hacked"; give the specific benefit (eavesdropping is detectable).

## Exam tips
- Always name which key (public or private) and whose it is.
- Structure signature answers as numbered steps; mark schemes award each step.
- For "why use a certificate", say it proves the public key really belongs to the claimed owner and prevents impersonation.
- Distinguish confidentiality (encryption) from authentication/integrity (signature).
