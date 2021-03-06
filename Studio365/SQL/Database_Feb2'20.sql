USE [Studio365]
GO
/****** Object:  Table [dbo].[UsersDetails]    Script Date: 02/02/2020 13:18:10 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[UsersDetails](
	[Sno] [int] IDENTITY(1,1) NOT NULL,
	[Name] [varchar](255) NULL,
	[MobileNumber] [varchar](15) NULL,
	[Salary] [int] NULL,
	[Userrole] [varchar](25) NULL,
	[Gender] [varchar](6) NULL,
	[Status] [varchar](10) NULL,
	[JoinDate] [datetime] NULL,
	[Password] [varchar](15) NULL,
PRIMARY KEY CLUSTERED 
(
	[Sno] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[PackageConfiguration]    Script Date: 02/02/2020 13:18:10 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[PackageConfiguration](
	[sno] [int] IDENTITY(1,1) NOT NULL,
	[PackageName] [varchar](255) NULL,
	[PackageDetails] [varchar](max) NULL,
	[Date] [datetime] NULL,
	[EmployeeID] [varchar](20) NULL,
PRIMARY KEY CLUSTERED 
(
	[sno] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[Orders]    Script Date: 02/02/2020 13:18:10 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Orders](
	[Sno] [int] IDENTITY(1,1) NOT NULL,
	[BillNo] [varchar](6) NULL,
	[Date] [datetime] NULL,
	[CustomerMobile] [varchar](10) NULL,
	[CustomerName] [varchar](255) NULL,
	[AdvanceAmount] [int] NULL,
	[Discount] [int] NULL,
	[Total] [int] NULL,
	[Orders] [varchar](max) NULL,
	[EmployeeID] [varchar](20) NULL,
PRIMARY KEY CLUSTERED 
(
	[Sno] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[Master]    Script Date: 02/02/2020 13:18:10 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Master](
	[Sno] [int] IDENTITY(1,1) NOT NULL,
	[ProductTypes] [varchar](255) NULL,
	[ProductSubTypes] [varchar](255) NULL,
	[Price] [int] NULL,
	[GST] [int] NULL,
	[Type] [varchar](20) NULL,
	[Status] [varchar](10) NULL,
PRIMARY KEY CLUSTERED 
(
	[Sno] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[MarriageOrders]    Script Date: 02/02/2020 13:18:10 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[MarriageOrders](
	[sno] [int] IDENTITY(1,1) NOT NULL,
	[BillNo] [varchar](10) NULL,
	[Date] [datetime] NULL,
	[CustomerDetails] [varchar](max) NULL,
	[OrderDetails] [varchar](max) NULL,
	[AdvanceAmount] [int] NULL,
	[DiscountAmount] [int] NULL,
	[Total] [int] NULL,
	[EmployeeID] [varchar](20) NULL,
PRIMARY KEY CLUSTERED 
(
	[sno] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[LookupTypes]    Script Date: 02/02/2020 13:18:10 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[LookupTypes](
	[Sno] [int] IDENTITY(1,1) NOT NULL,
	[LookupID] [uniqueidentifier] NULL,
	[LookupType] [varchar](255) NULL,
PRIMARY KEY CLUSTERED 
(
	[Sno] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[Lookups]    Script Date: 02/02/2020 13:18:10 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Lookups](
	[Sno] [int] IDENTITY(1,1) NOT NULL,
	[LookupID] [uniqueidentifier] NULL,
	[Lookups] [varchar](255) NULL,
PRIMARY KEY CLUSTERED 
(
	[Sno] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[History]    Script Date: 02/02/2020 13:18:10 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[History](
	[Sno] [int] IDENTITY(1,1) NOT NULL,
	[BillNo] [varchar](6) NULL,
	[Date] [datetime] NULL,
	[Amount] [int] NULL,
	[EmployeeID] [varchar](20) NULL,
	[Notes] [varchar](100) NULL,
PRIMARY KEY CLUSTERED 
(
	[Sno] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[Denomination]    Script Date: 02/02/2020 13:18:10 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Denomination](
	[Sno] [int] IDENTITY(1,1) NOT NULL,
	[RupeeCounts] [varchar](max) NULL,
	[Date] [datetime] NULL,
	[userID] [varchar](10) NULL,
PRIMARY KEY CLUSTERED 
(
	[Sno] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[Customers]    Script Date: 02/02/2020 13:18:10 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Customers](
	[Sno] [int] IDENTITY(1,1) NOT NULL,
	[ID] [varchar](255) NULL,
	[Name] [varchar](255) NULL,
	[Mobile] [varchar](255) NULL,
	[Address] [varchar](255) NULL,
	[EmailID] [varchar](255) NULL,
PRIMARY KEY CLUSTERED 
(
	[Sno] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[commonDetail]    Script Date: 02/02/2020 13:18:10 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[commonDetail](
	[Sno] [int] IDENTITY(1,1) NOT NULL,
	[Name] [varchar](255) NULL,
	[ItemDetails] [varchar](max) NULL,
PRIMARY KEY CLUSTERED 
(
	[Sno] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[common]    Script Date: 02/02/2020 13:18:10 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[common](
	[Sno] [int] IDENTITY(1,1) NOT NULL,
	[Name] [varchar](255) NULL,
	[ItemDetails] [varchar](max) NULL,
PRIMARY KEY CLUSTERED 
(
	[Sno] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET ANSI_PADDING OFF
GO
