const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const router = express.Router();

// Ruta para registrar un nuevo usuario
router.post('/register', async (req, res) => {
  const { name, email, password, role, phone, address } = req.body;

  // Verificar si el usuario ya existe
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).send('Este correo ya está registrado');
  }

  // Verificar que la contraseña esté presente
  if (!password) {
    return res.status(400).send('La contraseña es obligatoria');
  }

  // Encriptar la contraseña (salt = 10)
  try {
    const hashedPassword = await bcrypt.hash(password, 10); // 10 es el salt
    const newUser = new User({ name, email, password: hashedPassword, role, phone, address });

    await newUser.save();
    res.status(201).json({ message: "Usuario registrado con éxito", user: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al encriptar la contraseña');
  }
});

// Ruta para iniciar sesión
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  // Buscar el usuario por correo electrónico
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).send('Usuario no encontrado');
  }

  // Verificar la contraseña
  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    return res.status(400).send('Contraseña incorrecta');
  }

  res.status(200).json({ message: 'Inicio de sesión exitoso', user });
});

// Ruta para obtener todos los usuarios registrados
router.get('/', async (req, res) => {
  try {
    const users = await User.find();  // Buscar todos los usuarios
    res.status(200).json(users);  // Enviar respuesta con los usuarios
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al obtener los usuarios');
  }
});

// Ruta para editar datos de un usuario
router.put('/edit/:id', async (req, res) => {
  const { name, phone, address } = req.body;
  const updatedUser = await User.findByIdAndUpdate(req.params.id, { name, phone, address }, { new: true });
  res.status(200).json(updatedUser);
});

// Ruta para eliminar un usuario
router.delete('/delete/:id', async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.status(200).send('Usuario eliminado');
});

module.exports = router;
