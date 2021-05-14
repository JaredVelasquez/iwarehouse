CREATE VIEW dbo.GetProjectorsClassRooms
AS
  SELECT cr.codeClassRoom 'CodigoAula', pj.serial  'Serial', pj.brand 'Marca', pj.model 'Modelo', pj.inventoryCode 'CodigoInventario', pj.guarantee 'Garantia', pj.equipmentStatus 'Estado'
  FROM [oe_classRooms] cr, [we_projectors] pj
  WHERE cr.caseId = pj.id
GO


SELECT *
FROM dbo.GetProjectorsClassRooms
