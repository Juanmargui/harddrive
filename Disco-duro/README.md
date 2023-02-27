# Disco-duro

Proyecto 2 Hack a Boss

Este proyecto se crea con el objetivo de emular una aplicación similar a Dropbox o Google Drive; Un disco duro en la nube.

Instalar:

• Crear una base de datos vacía en una instancia de MySQL local.

• Guardar el archivo .env.example como .env y cubrir los datos necesarios.

• Ejecutar el comando npm install o npm i para instalar las dependencias.

• Ejecutar el fichero "initDB.js"; Usar el comando: node db/initDB para crear las tablas necesarias en la base de datos anteriormente creada.

• Ejecutar npm run dev o npm start para lanzar el servidor.

Base de datos:

• users: id, name, email, password, avatar, createdAt, modifiedAt.

• folders: id, name, createdAt, idUser.

• files: id, idUser, name, createdAt, idFolder, modifiedAt.

Endpoints:

Usuarios:

• POST [/users] : Registro de usuario.

• POST[/users/login] : Login de usuario.

• GET [/users] : Devuelve información del usuario.

• PUT[/users] : Editar nombre de usuario o email.

• PUT [/users/avatar]: Editar el avatar del usuario.

Folders :

• POST [/folders] : Añade una carpeta.

• GET [/folders] : Lista todas las carpetas.

• DELETE [/users/:idUser/folders/:idFolder] : Elimina una carpeta.

Files:

• POST /files] : Añade un archivo.

• GET [/files] : Lista todos los archivos.

• GET [/download/:idFile] : Descarga un archivo.

• DELETE [/users/:idUser/files/:idFile] : Elimina un archivo.
