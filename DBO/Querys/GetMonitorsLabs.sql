CREATE VIEW dbo.GetMonitorsLabs
AS
  SELECT lb.codeLab 'CodigoLab', mt.serial  'Serial', mt.brand 'Marca', mt.model 'Modelo', mt.inventoryCode 'CodigoInventario', mt.equipmentStatus 'Estado'
  FROM [oe_labs] lb, [we_monitors] mt
  WHERE lb.monitorId = mt.id
GO

SELECT *
FROM dbo.GetMonitorsLabs
