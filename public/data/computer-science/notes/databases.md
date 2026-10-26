# Databases
> Expect a normalisation question, an SQL question and a "what does a DBMS do" question; marks go for correct keywords, correct clause order and precise relational terms.

## Key ideas

### File-based versus relational
- File-based problems: data duplicated across files (redundancy), inconsistent copies, hard to search and combine, no central security, programs depend on file structure (poor data independence), no multi-user control.
- Relational databases store data in linked tables, reduce redundancy, keep one copy of each fact, enforce integrity and allow flexible queries and controlled access.

### Relational terminology
- Table (relation): rows are records (tuples), columns are fields (attributes).
- Primary key: unique identifier for each record. Candidate key: any field that could be the primary key. Secondary key: another field indexed for searching. Foreign key: field that is the primary key of another table, creating the link. Composite key: made from two or more fields.
- Relationships: one-to-one, one-to-many, many-to-many (resolved with a link table).
- Referential integrity: every foreign key value must match an existing primary key, so there are no orphan records.
- Index: a separate structure on a field that speeds up searching and sorting, at the cost of storage and slower updates.
- E-R diagram: entities as rectangles, relationships as lines with "crow's foot" on the "many" end, e.g. CUSTOMER 1 --- many ORDER.

### Normalisation
- 1NF: no repeating groups, each field holds a single (atomic) value, there is a primary key.
- 2NF: 1NF and no partial dependencies, i.e. every non-key attribute depends on the whole of the primary key (only matters with composite keys).
- 3NF: 2NF and no non-key attribute depends on another non-key attribute (no transitive dependencies).
- Memorable test: "every non-key attribute depends on the key, the whole key and nothing but the key."
- To justify 3NF, name the key, state that each other attribute depends only on it, and point to any that do not.

### DBMS features
- Data dictionary: stores metadata about tables, fields, types, validation, relationships and indexes.
- Data modelling: defining entities, relationships and the logical structure.
- Logical schema: structure of the whole database independent of storage; external schema is a user's view; physical schema describes how it is stored.
- Integrity: enforces constraints, validation, referential integrity.
- Security: user accounts, access rights, views, passwords, backup and recovery.
- Developer interface: tools to define tables, forms and queries. Query processor: interprets and optimises SQL queries and executes them.

### SQL: DDL and DML
- DDL (data definition language) defines or changes the structure; DML (data manipulation language) queries and changes the data. Both are written in SQL.

**DDL**
```sql
CREATE DATABASE School;
CREATE TABLE Student (
  StudentID INTEGER PRIMARY KEY,
  Name VARCHAR(40),
  FormID CHAR(3),
  FOREIGN KEY (FormID) REFERENCES Form(FormID)
);
ALTER TABLE Student ADD DateOfBirth DATE;
```

**DML**
```sql
SELECT Name, FormID FROM Student WHERE FormID = '9A' ORDER BY Name ASC;
SELECT COUNT(*), SUM(Mark), AVG(Mark) FROM Result;
SELECT Student.Name, Form.Tutor FROM Student, Form
  WHERE Student.FormID = Form.FormID;
INSERT INTO Student (StudentID, Name, FormID) VALUES (101, 'Amy', '9A');
UPDATE Student SET FormID = '9B' WHERE StudentID = 101;
DELETE FROM Student WHERE StudentID = 101;
```
- Clause order: SELECT, FROM, WHERE, GROUP BY, ORDER BY. Use `JOIN ... ON` or a WHERE condition linking keys to combine two tables.

## Key terms
| Term | Meaning |
|---|---|
| Primary key | Field (or fields) uniquely identifying each record in a table. |
| Foreign key | Field in one table that is the primary key of another table. |
| Referential integrity | Rule that foreign key values must match an existing primary key value. |
| Normalisation | Organising tables to remove redundancy and update anomalies. |
| Data dictionary | Store of metadata describing the database's structure. |
| DDL | SQL used to define and alter database structure. |
| DML | SQL used to query and modify data. |
| Index | Structure that speeds up searching on a field. |

## Worked example
**Question:** ORDER(OrderID, Date, CustomerID, CustomerName, ProductID, ProductName, Qty). Normalise to 3NF. [5]

**Model answer:**
- OrderID, ProductID is a composite key; Date, CustomerID depend only on OrderID, ProductName only on ProductID (partial dependencies) so 2NF is not met (1).
- ORDER(OrderID, Date, CustomerID) (1)
- ORDERLINE(OrderID, ProductID, Qty) with composite key (1)
- PRODUCT(ProductID, ProductName) (1)
- CUSTOMER(CustomerID, CustomerName), since CustomerName depends on CustomerID (a transitive dependency), giving 3NF (1).

## Common mistakes
- Defining a foreign key as "a key from another table" without saying it is that table's primary key.
- Using `=` with strings without quotes; forgetting commas or a closing semicolon.
- Using `WHERE` with aggregate functions, or putting `ORDER BY` before `WHERE`.
- Calling normalisation "making the database smaller" instead of removing redundancy and anomalies.
- Selecting two tables without a joining condition (produces every combination).

## Exam tips
- State the key at each step of normalisation; mark schemes use it.
- Write SQL keywords in capitals and use the exact table and field names from the question.
- Distinguish "DDL: CREATE, ALTER" from "DML: SELECT, INSERT, UPDATE, DELETE".
- "Explain why" referential integrity matters: prevents orphan records and inconsistent data.
