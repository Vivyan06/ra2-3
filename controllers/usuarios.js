const { response, request } = require("express");
const Usuarios = require("../models/usuarios");
const bcryptjs = require('bcryptjs');

const usuariosGet = (req, res = response) => {
  res.json({
    msg: 'get API-controlador'
  });
};

const usuariosPut = (req, res = response) => {
  const { nombre, Email } = req.body;
  res.json({
    msg: 'put API-controlador',
    nombre,
    Email
  });
};

const usuariosPatch = (req, res = response) => {
  const { nombre, Email } = req.body;
  res.json({
    msg: 'Patch API-controlador',
    nombre,
    Email
  });
};

const usuariosDelete = (req, res = response) => {
  res.json({
    msg: 'delete API-controlador'
  });
};

const usuariosPost = async (req, res = response) => {
  try {
    const { correo, password } = req.body;

    // Verificar si el correo ya existe en la base de datos
    const existingUser = await Usuarios.findOne({ correo });
    if (existingUser) {
      return res.status(400).json({ msg: 'El correo ya está registrado.' });
    }

    // Generar una sal
    const salt = await bcryptjs.genSalt(10); // El número 10 es el costo del hashing

    // Hash de la contraseña con la sal generada
    const passwordHash = await bcryptjs.hash(password, salt);

    // Crear un nuevo usuario con la contraseña encriptada
    const usuario = new Usuarios({
      ...req.body,
      password: passwordHash,
    });

    // Guardar el usuario en MongoDB
    await usuario.save();

    res.json({
      msg: 'post API-controlador',
      passwordHash,
      body: req.body
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

module.exports = {
  usuariosGet,
  usuariosPut,
  usuariosPatch,
  usuariosDelete,
  usuariosPost
};
