CREATE VIEW dbo.GetMonitorsClassRooms
AS
  SELECT cr.codeClassRoom 'CodigoAula', mt.serial  'Serial', mt.brand 'Marca', mt.model 'Modelo', mt.inventoryCode 'CodigoInventario', mt.equipmentStatus 'Estado'
  FROM [oe_classRooms] cr, [we_monitors] mt
  WHERE cr.caseId = mt.id
GO


SELECT *
FROM dbo.GetMonitorsClassRooms
