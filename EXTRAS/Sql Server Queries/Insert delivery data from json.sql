USE [EcomDB]
GO

/*  

F:\dotnet+angular\ecom\EXTRAS\SeedData\types.json
is just the path 
copy path and paste it here 

*/

Declare @JSON varchar(max)
SELECT @JSON=BulkColumn
FROM OPENROWSET (BULK 'F:\dotnet+angular\ecom\EXTRAS\SeedData\delivery.json', SINGLE_CLOB) import

INSERT INTO [dbo].[DeliveryMethods]
SELECT *
FROM OPENJSON (@JSON)
WITH 
(
	[ShortName] nvarchar(max),
	[DeliveryTime] nvarchar(max),
	[Description] nvarchar(max),
	[Price] decimal(18,2)
)
GO





select * from [dbo].[DeliveryMethods]

delete from [dbo].[DeliveryMethods]

DBCC CHECKIDENT ('[DeliveryMethods]', RESEED, 0);
GO