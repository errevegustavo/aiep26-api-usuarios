# Proyecto Final: Evaluación Recuperativa Sem. 10 - Taller de Plataformas Web
# Tema: Implementación y validación CRUD API REST hacia BD
 
## Integrantes
Gustavo Rojas V.
 
## 1. Enlace al repositorio en GitHub (Público):
https://github.com/errevegustavo/aiep26-api-usuarios

## 2. Descripción de laboratorio para pruebas
- Se generó repo público en Github.
- Para el entorno de pruiebas se preparó proyecto Node.js 
- Para la BD se optó por SQLite y se creó la tabla "Usuario" (db.js).
- Se levantó servidor con Express (index.js) y se estableció conexión hacia BD (db.js).

## 3. Descripción de las pruebas de funcionamiento CRUD (API REST):
Se realizaron pruebas a los 4 endpoints requeridos utilizando cURL desde la CLI confirmando la correcta comunicación con la base de datos MySQL local:
- CREATE (POST): Se insertó un usuario exitosamente enviando datos JSON. Además se validó el manejo de error al intentar ingresar un correo duplicado.
- READ (GET): Se consultó la ruta devolviendo correctamente los registros de la tabla 'Usuario' en formato JSON para validar servidor inicialmente, y luego de cada POST, PUT y DELETE.
- UPDATE (PUT): Se actualizaró la passwird de un usuario específico mediante su ID_Usuario.
- DELETE (DELETE): Se eliminó un usuario específico de la base de datos mediante su ID_Usuario, verificando su eliminación con una consulta GET.
