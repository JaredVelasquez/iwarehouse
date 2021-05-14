CREATE VIEW dbo.GetCasesClassRooms
AS
  SELECT cr.codeClassRoom 'CodigoAula', cs.serial  'Serial', cs.brand 'Marca', cs.model 'Modelo', cs.inventoryCode 'CodigoInventario', cs.processorType 'Procesador', cs.ramMemory 'RAM', cs.diskSpace 'Almacenamiento', cs.equipmentStatus 'Estado'
  FROM [oe_classRooms] cr, [we_cases] cs
  WHERE cr.caseId = cs.id
GO


SELECT *
FROM dbo.GetCasesClassRooms
