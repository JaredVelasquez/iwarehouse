CREATE VIEW dbo.GetLabsCode
AS
  SELECT DISTINCT lb.codeLab
  FROM [oe_labs] lb
GO

SELECT *
FROM dbo.GetLabsCode
