// db.js
const sqlite3 = require('sqlite3').verbose();

// Conectamos a la base de datos (se creará el archivo database.sqlite si no existe)
const db = new sqlite3.Database('./database.sqlite', (err) => {
    if (err) {
        console.error('Error al conectar a la base de datos:', err.message);
    } else {
        console.log('Conectado a la base de datos SQLite.');
        
        // Creamos la tabla Usuario según el modelo solicitado en la pauta
        db.run(`CREATE TABLE IF NOT EXISTS Usuario (
            id_usuario INTEGER PRIMARY KEY AUTOINCREMENT,
            nombre TEXT NOT NULL,
            email TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )`, (err) => {
            if (err) {
                console.error('Error al crear la tabla Usuario:', err.message);
            } else {
                console.log('Tabla Usuario lista y configurada.');
            }
        });
    }
});

module.exports = db;