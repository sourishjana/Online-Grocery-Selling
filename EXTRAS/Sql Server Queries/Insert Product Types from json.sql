USE [GroceryDB]
GO

/*  

F:\dotnet+angular\ecom\EXTRAS\SeedData\types.json
is just the path 
copy path and paste it here 

*/

Declare @JSON varchar(max)
SELECT @JSON=BulkColumn
FROM OPENROWSET (BULK 'F:\CTS Final Project\Ecommerce-demo-dotnet-angular\EXTRAS\SeedData\ProductTypes.json', SINGLE_CLOB) import

INSERT INTO [dbo].[ProductTypes]
SELECT *
FROM OPENJSON (@JSON)
WITH 
(
	[Name] nvarchar(max)
)
GO

select * from [dbo].[ProductTypes]

delete from [dbo].[ProductTypes]

DBCC CHECKIDENT ('[ProductTypes]', RESEED, 0);
GO