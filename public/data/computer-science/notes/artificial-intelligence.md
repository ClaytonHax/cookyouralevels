# Artificial Intelligence (AI)
> Expect to trace Dijkstra's and A* on a small graph and to compare learning types with clear, scenario-based reasons.

## Key ideas

### Graphs in AI
- A **graph** is a set of **nodes** (vertices) joined by **edges**; in AI edges often carry a **weight** (distance, cost, time). Graphs model maps, networks, puzzle states and game moves, so finding a good route becomes a search problem.
- Search can be stored as an adjacency matrix or adjacency list (see the ADT notes).

### Dijkstra's shortest path algorithm
- Finds the lowest-cost path from a start node to every other node in a graph with non-negative weights.
- Method:
  1. Give the start node distance 0 and all others infinity; mark none as visited.
  2. Choose the unvisited node with the smallest distance; mark it visited (its distance is now final).
  3. For each unvisited neighbour, if distance to current + edge weight is less than the neighbour's stored distance, update it and record the current node as its previous node.
  4. Repeat until the destination is visited (or all nodes are).
  5. Follow the previous nodes backwards to read off the path.
- It does not use knowledge of where the target is, so it may explore many unhelpful nodes.

### A* search
- Like Dijkstra but chooses the next node by $f(n) = g(n) + h(n)$:
  - $g(n)$: actual cost from the start to $n$.
  - $h(n)$: **heuristic**, an estimate of the cost from $n$ to the goal (e.g. straight-line distance).
- Keeps an **open list** (nodes to consider, ordered by $f$) and a **closed list** (already expanded). Expand the lowest-$f$ node, update neighbours, stop when the goal is chosen.
- If $h$ never overestimates the true cost (it is **admissible**), A* finds an optimal path, usually exploring far fewer nodes than Dijkstra. A poor heuristic costs speed or optimality.

### Machine learning
- **Machine learning** lets a system improve at a task from data rather than being explicitly programmed with every rule.
- **Supervised learning**: trained on labelled examples (input with the correct output), e.g. spam detection; used for classification and prediction.
- **Unsupervised learning**: finds structure in unlabelled data, e.g. clustering customers into groups.
- **Reinforcement learning**: an agent acts in an environment and receives rewards or penalties, learning a strategy that maximises long-term reward, e.g. game-playing or robot control. No labelled answers are supplied.
- **Deep learning**: uses neural networks with many hidden layers to learn features automatically from large amounts of data (image and speech recognition). Needs large datasets and heavy computing power, and its decisions are hard to explain.

### Neural networks
- An artificial neural network has an **input layer**, one or more **hidden layers** and an **output layer** of connected **neurons**. Each connection has a **weight**; a neuron sums its weighted inputs (plus a bias) and passes the result through an **activation function** to produce its output.
- Networks help machine learning because they can model complex, non-linear relationships and learn them from examples by adjusting weights.

### Back propagation and regression
- **Back propagation** trains the network: the input is passed forward to produce an output; the **error** (difference from the desired output) is calculated; the error is propagated backwards through the layers and each weight is adjusted slightly in the direction that reduces the error. This repeats over many examples until error is acceptably small.
- **Regression** predicts a continuous numeric value from input variables by fitting a function (for example a line) to the data, then using it to predict new values. Training chooses parameters that minimise the error between predictions and actual values. Used for forecasting, e.g. house prices.

## Key terms
| Term | Meaning |
|---|---|
| Node/edge | Point and connection in a graph |
| Heuristic | Estimate used to guide a search |
| Admissible | Heuristic that never overestimates the cost |
| Labelled data | Training data with the correct answers attached |
| Weight | Value scaling a connection's contribution in a neural network |
| Back propagation | Adjusting weights by sending error backwards |
| Regression | Predicting a numeric value by fitting a function to data |

## Worked example
**Question:** Weighted graph edges: A-B 4, A-C 2, B-C 1, B-D 5, C-D 8, D-E 2, C-E 10. Use Dijkstra's algorithm to find the shortest route from A to E. [5]

**Answer:**
- Start: A=0, others infinity.
- Visit A: B=4, C=2. (1)
- Visit C (2): B via C = 3 (better than 4, update); D = 10; E = 12. (1)
- Visit B (3): D via B = 8 (better than 10, update). (1)
- Visit D (8): E via D = 10 (better than 12, update). (1)
- Visit E (10). Backtrack: E from D, D from B, B from C, C from A. Route **A-C-B-D-E, cost 10**. (1)

## Common mistakes
- Marking a node visited as soon as a distance is set rather than when it is the smallest unvisited.
- In A*, using only $h(n)$ (that is greedy search) or forgetting to add $g(n)$.
- Saying unsupervised learning has no data; it has data without labels.
- Describing back propagation as moving the input backwards instead of the error.
- Calling reinforcement learning "supervised with rewards"; no correct answers are given.

## Exam tips
- Lay out a table of node, distance and previous node, updating it each step; this earns method marks.
- State what $g$ and $h$ mean in your A* answer, with an example heuristic.
- Match learning type to scenario: labels given means supervised, grouping unlabelled means unsupervised, reward in an environment means reinforcement.
- Mention weights and error when explaining how a network learns.
