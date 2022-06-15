USE [EcomDB]
GO
/*  

F:\dotnet+angular\ecom\EXTRAS\SeedData\products.json
is just the path 
copy path and paste it here 

*/

Declare @JSON varchar(max)
SELECT @JSON=BulkColumn
FROM OPENROWSET (BULK 'F:\dotnet+angular\ecom\EXTRAS\SeedData\products.json', SINGLE_CLOB) import

INSERT INTO [dbo].[Products]
SELECT *
FROM OPENJSON (@JSON)
WITH 
(
	[Name] nvarchar(100),
    [Description] nvarchar(180),
    [Price] decimal(18,2),
    [PictureUrl] nvarchar(max),
    [ProductTypeId] int,
    [ProductBrandId] int
)
GO


delete from [dbo].[Products]

select * from [dbo].[Products]

DBCC CHECKIDENT ('[Products]', RESEED, 0);
GO
