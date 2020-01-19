-- Database Creation
create database Studio365;
use Studio365;

-- Tables Creations 
-- USERS
create table Users(
Sno int primary key identity(1,1),
Name varchar(255),
MobileNumber varchar(15),
Salary int,
Userrole varchar(25),
Gender varchar(6),
Status varchar(10),
JoinDate Datetime);

-- Lookuptypes 
create table LookupTypes(
Sno int primary key identity(1,1),
LookupID uniqueidentifier,
LookupType varchar(255));

-- Lookups
create table Lookups(
Sno int primary key identity(1,1),
LookupID uniqueidentifier,
Lookups varchar(255));

--Master
create table Master(
Sno int primary key identity(1,1),
ProductTypes varchar(255),
ProductSubTypes varchar(255),
Price int,
Status varchar(10));

-- Customers
create table Customers(
Sno int primary key identity(1,1),
ID varchar(255),
Name varchar(255),
Mobile varchar(255),
EmailID varchar(255))

-- Orders 
create table Orders(
Sno int primary key identity(1,1),
BillNo varchar(6),
Date datetime,
CustomerMobile varchar(10),
TotalPrice int,
Discount int,
GST int,
Orders varchar(max))

-- History
create table History(
Sno int primary key identity(1,1),
BillNo varchar(6),
Date Datetime,
Amount int,
Notes varchar(100))

create table Denomination(
Sno int primary key identity(1,1),
RupeeCounts varchar(max),
Date datetime,
userID varchar(10))

