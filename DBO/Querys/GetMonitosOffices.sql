CREATE VIEW dbo.GetMonitorsOfices
AS
  SELECT ous.firstName + ' ' + ous.lastName 'NombreUsuario', mt.serial  'Serial', mt.brand 'Marca', mt.model 'Modelo', mt.inventoryCode 'CodigoInventario', mt.equipmentStatus 'Estado'
  FROM [oe_offices] ofi, [we_monitors] mt, [oe_officeUsers] ous
  WHERE ofi.monitorId = mt.id and ofi.officeUserId = ous.id
GO


SELECT *
FROM dbo.GetMonitorsOfices
