USE [GroceryDB]
GO

/*  

F:\dotnet+angular\ecom\EXTRAS\SeedData\brands.json
is just the path 
copy path and paste it here 

Below code is to add json data from a fiel.json to sql server table

*/

Declare @JSON varchar(max)
SELECT @JSON=BulkColumn
FROM OPENROWSET (BULK 'F:\dotnet+angular\ecom\EXTRAS\SeedData\ProductBrands.json', SINGLE_CLOB) import

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

/*

Below code
Used to reset the index to 1 so that indexing can again start from 1

*/
DBCC CHECKIDENT ('[ProductBrands]', RESEED, 0);
GO
