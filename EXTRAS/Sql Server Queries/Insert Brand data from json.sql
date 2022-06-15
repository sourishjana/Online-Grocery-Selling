USE [EcomDB]
GO

/*  

F:\dotnet+angular\ecom\EXTRAS\SeedData\brands.json
is just the path 
copy path and paste it here 

*/

Declare @JSON varchar(max)
SELECT @JSON=BulkColumn
FROM OPENROWSET (BULK 'F:\dotnet+angular\ecom\EXTRAS\SeedData\brands.json', SINGLE_CLOB) import

INSERT INTO [dbo].[ProductBrands]
SELECT *
FROM OPENJSON (@JSON)
WITH 
(
	[Name] nvarchar(max)
)
GO


delete from [dbo].[ProductBrands]

select * from [dbo].[ProductBrands]

DBCC CHECKIDENT ('[ProductBrands]', RESEED, 0);
GO
