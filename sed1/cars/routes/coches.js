const express = require('express');
const Car = require('../models/car');
const router = express.Router();

// Ruta para crear un coche
router.post('/', async (req, res) => {
  const { brand, model, year, price } = req.body;
  const newCar = new Car({ brand, model, year, price });

  try {
    await newCar.save();
    res.status(201).json({ message: 'Coche añadido', car: newCar });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al añadir el coche');
  }
});

// Ruta para obtener todos los coches
router.get('/', async (req, res) => {
  try {
    const cars = await Car.find();
    res.status(200).json(cars);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al obtener los coches');
  }
});

module.exports = router;
