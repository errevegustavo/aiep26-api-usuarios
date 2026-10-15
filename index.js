require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./db.js');

const app = express();

app.use(cors());
app.use(express.json());

// Crear Usuario (POST)
app.post('/api/usuarios', (req, res) => {
    const { nombre, email, password } = req.body;
    
    if (!nombre || !email || !password) {
        return res.status(400).json({ error: 'Faltan campos obligatorios' });
    }

    const sql = 'INSERT INTO Usuario (nombre, email, password) VALUES (?, ?, ?)';
    
    db.run(sql, [nombre, email, password], function(err) {
        if (err) {
            if (err.message.includes('UNIQUE constraint failed')) {
                 return res.status(400).json({ error: 'El email ya está registrado' });
            }
            return res.status(500).json({ error: 'Error interno del servidor', detalle: err.message });
        }
        res.status(201).json({ mensaje: 'Usuario creado con exito', id_usuario: this.lastID });
    });
});

// Leer Usuarios (GET)
app.get('/api/usuarios', (req, res) => {
    const sql = 'SELECT id_usuario, nombre, email, created_at FROM Usuario';
    
    db.all(sql, [], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Error al obtener usuarios', detalle: err.message });
        }
        res.status(200).json(results);
    });
});

// Actualizar Usuario (PUT)
app.put('/api/usuarios/:id', (req, res) => {
    const { id } = req.params;
    const { nombre, email, password } = req.body;

    const sql = 'UPDATE Usuario SET nombre = ?, email = ?, password = ? WHERE id_usuario = ?';
    
    db.run(sql, [nombre, email, password, id], function(err) {
        if (err) {
            return res.status(500).json({ error: 'Error al actualizar usuario', detalle: err.message });
        }
        if (this.changes === 0) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
        res.status(200).json({ mensaje: 'Usuario actualizado correctamente' });
    });
});

// Eliminar Usuario (DELETE)
app.delete('/api/usuarios/:id', (req, res) => {
    const { id } = req.params;
    
    const sql = 'DELETE FROM Usuario WHERE id_usuario = ?';
    
    db.run(sql, [id], function(err) {
        if (err) {
            return res.status(500).json({ error: 'Error al eliminar usuario', detalle: err.message });
        }
        if (this.changes === 0) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
        res.status(200).json({ mensaje: 'Usuario eliminado correctamente' });
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor de API Usuarios corriendo en el puerto ${PORT}`);
});