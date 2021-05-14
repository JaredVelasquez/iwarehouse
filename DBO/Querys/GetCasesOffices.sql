CREATE VIEW dbo.GetCasesOfices
AS
  SELECT ous.firstName + ' ' + ous.lastName 'NombreUsuario', cs.serial  'Serial', cs.brand 'Marca', cs.model 'Modelo', cs.inventoryCode 'CodigoInventario', cs.processorType 'Procesador', cs.ramMemory 'RAM', cs.diskSpace 'Almacenamiento', cs.equipmentStatus 'Estado'
  FROM [oe_offices] ofi, [we_cases] cs, [oe_officeUsers] ous
  WHERE ofi.caseId = cs.id and ofi.officeUserId = ous.id
GO


SELECT *
FROM dbo.GetCasesOfices
