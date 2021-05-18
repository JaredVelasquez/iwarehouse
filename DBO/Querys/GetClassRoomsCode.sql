CREATE VIEW dbo.GetClassRoomsCode
AS
  SELECT DISTINCT cl.codeClassRoom
  FROM [oe_classRooms] cl
GO

SELECT *
FROM dbo.GetClassRoomsCode
