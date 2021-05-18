CREATE VIEW dbo.GetCasesLabs
AS
  SELECT lb.codeLab 'CodigoLab', cs.serial  'Serial', cs.brand 'Marca', cs.model 'Modelo', cs.inventoryCode 'CodigoInventario', cs.processorType 'Procesador', cs.ramMemory 'RAM', cs.diskSpace 'Almacenamiento', cs.equipmentStatus 'Estado'
  FROM [oe_labs] lb, [we_cases] cs
  WHERE lb.caseId = cs.id
GO

SELECT *
FROM dbo.GetCasesLabs
