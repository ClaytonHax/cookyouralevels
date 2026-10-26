# Communication and internet technologies
> Examiners want you to explain why layered protocols exist, follow a message down and up the TCP/IP stack, and contrast packet and circuit switching with specific reasons.

## Key ideas

### Protocols and layers
- A **protocol** is an agreed set of rules for format, timing, order and error handling of communication. Without one, devices from different makers could not interpret each other's data.
- A **layered stack** splits the job into layers, each with one responsibility and a clear interface to its neighbours.
  - Each layer can be changed or replaced without rewriting the others.
  - Developers work on one layer at a time and devices from different vendors interoperate.
  - Problems are easier to locate and test.

### The four TCP/IP layers
| Layer | Role | Examples |
|---|---|---|
| Application | Services the user's software needs; formats data for the application | HTTP, SMTP, FTP |
| Transport | Splits data into segments, numbers them, uses port numbers, reassembles, checks for loss | TCP, UDP |
| Internet (network) | Adds source and destination IP addresses; routes packets between networks | IP |
| Link (network access) | Delivers frames across the local physical link using MAC addresses | Ethernet, Wi-Fi |

**Sending a message:** the application layer passes data down; the transport layer breaks it into numbered segments with source and destination ports; the internet layer wraps each in a packet with IP addresses; the link layer puts the packet in a frame addressed to the next device on the local network. Routers pass packets on hop by hop. At the receiver the layers are processed in reverse, each stripping its header, and TCP reorders the segments and requests retransmission of any missing ones before passing the data to the application.

### Application protocols
| Protocol | Purpose |
|---|---|
| HTTP | Requests and transfers web pages and resources between browser and web server |
| FTP | Transfers files between hosts, often to upload to or download from a server |
| SMTP | Sends email from a client to a mail server and between mail servers |
| POP3 | Downloads email from a server to one device, usually removing it from the server |
| IMAP | Accesses email on the server, keeping mail there and synchronised across devices |
| BitTorrent | Peer-to-peer file sharing: a file is split into pieces and downloaded from many peers at once, each peer also uploading pieces it already has |

- A **tracker** (or distributed hash table) tells a peer which others hold pieces; the group sharing a file is a **swarm**. Peers that hold all pieces are **seeds**.

### Circuit switching
- A dedicated end-to-end path is set up before data is sent and held for the whole communication, then released.
- Fixed bandwidth, constant delay and data arrives in order, but the route is unavailable to others even when idle, and set-up takes time. Suited to traditional phone calls.

### Packet switching
- Data is split into **packets**, each with a header holding source and destination addresses, a sequence number and error-checking data.
- Each packet can take a different route; a **router** reads the destination address, consults its routing table and forwards the packet to the best next hop, balancing load and avoiding failed links.
- Packets may arrive out of order or be lost, so they are reordered and missing ones re-requested at the destination.
- Makes efficient use of the network since links are shared, and is resilient to failure; but delay varies and packets must be reassembled.

| Feature | Circuit | Packet |
|---|---|---|
| Path | Fixed, dedicated | Can vary per packet |
| Bandwidth | Reserved, even if idle | Shared, used as needed |
| Order | Guaranteed | Reassembled by destination |
| Failure | Call drops | Packets rerouted |
| Delay | Constant after set-up | Variable |

## Key terms
| Term | Meaning |
|---|---|
| Protocol | Rules for communication between devices |
| Layer | Part of a stack handling one aspect of communication |
| Packet | Small unit of data with a header, sent across a network |
| Router | Forwards packets towards their destination using routing tables |
| Port number | Identifies the application/service at a host |
| Peer-to-peer | Each node both requests and supplies data |
| Swarm | Group of peers sharing the same torrent |

## Worked example
**Question:** Describe how an email travels from Ben to Chipo, naming the protocols used, and explain why it is sent using packet switching. [6]

**Answer:**
- Ben's email client sends the message to his mail server using SMTP. (1)
- The mail server uses SMTP to forward it to Chipo's mail server. (1)
- Chipo retrieves it using POP3 or IMAP. (1)
- At each transfer, TCP splits the data into numbered segments, IP adds source and destination addresses to make packets, and routers forward them hop by hop. (1)
- Packet switching lets packets use whichever route is available and share links with other users, so no dedicated line is tied up. (1)
- At the destination, TCP uses the sequence numbers to reorder the data and requests any lost packets again. (1)

## Common mistakes
- Listing the OSI seven layers instead of the four TCP/IP layers.
- Saying IMAP "downloads" email like POP3; its key feature is that mail stays on the server.
- Confusing a router with a switch or saying it "sends packets to the destination" rather than the next hop.
- Claiming packet switching guarantees the fastest transfer; it gives variable delay.
- Putting IP addresses at the link layer (it uses MAC addresses).

## Exam tips
- Quote the layer name with its job and one example protocol.
- For "why use layers", give two distinct benefits (independence of layers, interoperability, easier testing).
- Compare switching methods in the same sentence ("circuit reserves a fixed path whereas packets share links") to earn comparison marks.
- State SMTP is for sending and POP3/IMAP are for receiving.
