const { response } = require("express");
const express = require("express");
const router = express.Router();
const knex = require("../database");



// GET - returns all reservations 
router.get('/', async (req, res) => { 
  try {
    const reservation = await knex('reservations').select('*');
    response.json(reservation);
  } catch (error) {
    res.status(500).send("error");
    throw error;
  }
  
});

//POST - adds a new all reservations  to the database

router.post('/', async (req, res) => {
  try {
    const newReservation = req.body;
      const insertedReservation = await knex('reservations').insert(newReservation);
      res.status(201).json(insertedReservation);
  } catch (error) {
    res.status(500).send("error");
    throw error;;
  }
  
});


// GET - returns the all reservations  by id 
router.get('/:id', async (req, res) => {
  try {
    const reservationId = req.params.id;
    const reservation = await knex('reservations').where({ id: reservationId });
    if (reservation) {
        res.json(reservation);
      } else {
        res.status(404).json("Reservation with the specified ID was not found.");
      }
  } catch (error) {
    res.status(500).send("error");
    throw error;;
  }
  
});

// PUT - updates the all reservations  by id
router.put('/:id', async (req, res) => {
  try {
    const reservationId = req.params.id;
    const updateReservation = await knex('reservations').where({ id: reservationId }).update(req.body);
    if (updateReservation) {
        res.send('Reservation successfully updated.');
      } else {
        res.status(404).json("Reservation with the specified ID was not found.");
      }
  } catch (error) {
    res.status(500).send("error");
    throw error;; 
  }
  
});

// DELETE - deletes the all reservations by id

router.delete('/:id', async (req, res) => { 
  try {
    const reservationId = req.params.id;
    const deleteReservation = await knex('reservations').where({ id: reservationId }).del();
    if (deleteReservation) {
        res.send('Reservation successfully deleted.');
      } else {
        res.status(404).json("Reservation with the specified ID was not found.");
      }
  } catch (error) {
    res.status(500).send("error");
    throw error;;
  }
  
});

module.exports = router;
