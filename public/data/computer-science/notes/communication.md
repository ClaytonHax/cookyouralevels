# Communication
> Networks questions reward precise vocabulary (topology, protocol, packet, router) and the ability to compare options for a stated scenario rather than listing generic facts.

## Key ideas

### LANs, WANs and LAN hardware
- LAN: covers a small area on one site (school, office), owned and managed by one organisation. WAN: spans large areas, often uses leased or public telecom links; the internet is the biggest WAN.
- LAN hardware: network interface cards (NICs), switches or hubs, wireless access points, cabling, and a router to leave the LAN.
- A switch sends frames only to the intended device; a hub broadcasts to all ports.
- A router joins different networks, reads destination IP addresses and forwards packets along the best route; a home router also does NAT, DHCP and connects the LAN to an ISP.

### Client-server, peer-to-peer, thin and thick clients
| | Client-server | Peer-to-peer |
|---|---|---|
| Control | Central server manages files, security, backups | Each computer shares its own resources |
| Cost | Server expensive, needs admin | Cheap, easy for a few computers |
| Failure | Server failure stops service | No single point of failure |
- Thick client: does most processing locally and has its own storage and software (good offline, costly per machine). Thin client: relies on a server for processing and storage (cheap, easy to manage, but needs a reliable connection).

### Topologies
- Bus: one shared backbone; data goes to every node and each checks the address. Cheap, but collisions rise with load and a break in the backbone can split the network.
- Star: each node connects to a central switch; packets go node to switch to destination. A cable failure affects one node only; switch failure stops everything.
- Mesh: nodes interconnected with multiple paths; packets can be re-routed. Very reliable, expensive (full mesh needs $n(n-1)/2$ links); used in the internet core and wireless mesh.
- Hybrid: a combination (e.g. stars joined by a bus backbone).

### Cloud computing
- Storage and services provided over the internet from remote data centres.
- Public cloud: shared infrastructure owned by a provider and rented. Private cloud: dedicated to one organisation.
- Pros: access anywhere, scalable, no hardware to maintain, automatic backups. Cons: needs internet, ongoing cost, security/privacy worries, dependence on provider.

### Transmission media
| Medium | Notes |
|---|---|
| Copper (twisted pair/coax) | Cheap, easy; short range, interference, lower bandwidth |
| Fibre optic | Light pulses; very high bandwidth and range, no EM interference, expensive to install |
| Radio (Wi-Fi) | Convenient, mobile; interference, security risk, shorter range |
| Microwave | Line-of-sight point-to-point towers; high capacity, weather affected |
| Satellite | Wide coverage, remote areas; high latency and cost |

### Ethernet and CSMA/CD
- Collisions occur when two devices transmit at once on a shared medium.
- CSMA/CD: a device listens (carrier sense); if the medium is free it sends; if a collision is detected, both stop, send a jam signal, wait a random time and try again.

### Bit streaming
- On-demand: the whole file is stored on a server and the user chooses when to watch; data is buffered and played while downloading.
- Real-time: an event is captured, encoded and sent as it happens, so there is no pre-stored file.
- Bit rate (bits per second delivered) must be high enough for the content; if too low, the buffer empties and playback stutters. Higher rates give better quality but need more bandwidth.

### Internet versus the web
- The internet is the global network infrastructure (routers, cables, servers, protocols). The World Wide Web is a service that runs on it: web pages and resources accessed via HTTP/HTTPS and browsers.
- Supporting hardware: routers, switches, servers, ISP infrastructure, modems/gateways and transmission links.

### IP addressing
- IPv4: 32 bits, shown as four denary octets (e.g. 192.168.1.20), about 4.3 billion addresses. IPv6: 128 bits in hexadecimal groups (e.g. `2001:db8::1`), solving exhaustion.
- Subnetting splits a network into smaller ones; the address has a network ID and host ID, separated by a subnet mask. Benefits: less congestion, better security and management.
- Public addresses are unique and routable on the internet; private addresses (e.g. 10.x.x.x, 192.168.x.x) are used inside LANs and are not routed publicly.
- Static addresses never change (servers); dynamic addresses are assigned by DHCP for each session (cheap, easy, but not suitable for hosting).

### URLs and DNS
- A URL specifies protocol, domain name and path: `https://www.example.com/page.html`.
- DNS translates domain names to IP addresses: the browser asks a DNS server; if that does not know, it queries other DNS servers up the hierarchy; the IP is returned and cached, then the browser connects to it.

## Key terms
| Term | Meaning |
|---|---|
| Router | Device that forwards packets between networks using IP addresses. |
| Topology | The physical or logical layout of a network. |
| CSMA/CD | Collision-handling method: listen before sending and back off randomly after a collision. |
| Bit rate | Number of bits transmitted per second. |
| Subnet mask | Value that separates the network portion from the host portion of an IP address. |
| DNS | System that resolves domain names to IP addresses. |
| Thin client | Terminal that depends on a server for processing and storage. |

## Worked example
**Question:** A small school wants a network for 30 computers. Recommend a topology and describe how a packet travels from one computer to another. [6]

**Model answer:**
- Star topology recommended (1).
- Each computer has a cable to a central switch (1).
- Fault on one cable affects only that computer (1).
- The sender splits data into packets with source and destination addresses (1).
- The switch reads the destination address and forwards the packet only to that port (1).
- The receiver reassembles the packets (1).

## Common mistakes
- Saying "the internet and the web are the same thing".
- Describing a hub as intelligent; it sends data to every port.
- Giving only advantages when asked to compare, or generic answers that ignore the scenario.
- Saying a collision is prevented by CSMA/CD; it is detected and recovered from.
- Confusing public/private addresses with static/dynamic.

## Exam tips
- "Compare" needs both sides in the same point; use words like "whereas".
- Name the device in every answer (switch forwards to one port, router connects networks).
- For topologies, always link a feature to a consequence (e.g. central switch means single point of failure).
- Quote the number of bits for IPv4/IPv6 and the key reason for IPv6.
