-- Table: employees
CREATE TABLE employees (
    EmployeeId INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    LastName NVARCHAR(20)  NOT NULL,
    FirstName NVARCHAR(20)  NOT NULL,
    Title NVARCHAR(30),
    Phone NVARCHAR(24),
    Email NVARCHAR(60)
);

INSERT INTO employees (EmployeeId, LastName, FirstName, Title, Phone, Email) VALUES (1, 'Adams', 'Andrew', 'General Manager', '+1 (780) 428-3457', 'andrew@chinookcorp.com');
INSERT INTO employees (EmployeeId, LastName, FirstName, Title, Phone, Email) VALUES (2, 'Edwards', 'Nancy', 'Sales Manager', '+1 (403) 262-3322', 'nancy@chinookcorp.com');
INSERT INTO employees (EmployeeId, LastName, FirstName, Title, Phone, Email) VALUES (3, 'Peacock', 'Jane', 'Sales Support Agent', '+1 (403) 262-6712', 'jane@chinookcorp.com');
INSERT INTO employees (EmployeeId, LastName, FirstName, Title, Phone, Email) VALUES (4, 'Park', 'Margaret', 'Sales Support Agent', '+1 (403) 263-4289', 'margaret@chinookcorp.com');
INSERT INTO employees (EmployeeId, LastName, FirstName, Title, Phone, Email) VALUES (5, 'Johnson', 'Steve', 'Sales Support Agent','1 (780) 836-9543', 'steve@chinookcorp.com');
INSERT INTO employees (EmployeeId, LastName, FirstName, Title, Phone, Email) VALUES (6, 'Mitchell', 'Michael', 'IT Manager', '+1 (403) 246-9899', 'michael@chinookcorp.com');
INSERT INTO employees (EmployeeId, LastName, FirstName, Title, Phone, Email) VALUES (7, 'King', 'Robert', 'IT Staff', '+1 (403) 456-8485', 'robert@chinookcorp.com');
INSERT INTO employees (EmployeeId, LastName, FirstName, Title, Phone, Email) VALUES (8, 'Callahan', 'Laura', 'IT Staff', '+1 (403) 467-8772', 'laura@chinookcorp.com');
