const express = require("express");
const cors = require('cors');
require('dotenv').config();

// Create a new Express app
const app = express();

const {SERVER_PORT} = process.env;
const {seed, getCustomers, getBookings, getCarID, getCars, createBooking, editBooking, editUserInfo, deleteBooking} = require('./controller')

app.use(express.json());
app.use(cors());

// Serve static files from the app
app.use(express.static(`${__dirname}/public`));

// Seed the database
app.post('/seed', seed)

// Get all availabe cars
// app.get('/api/cars', getCars);
// Get all bookings
app.get('/api/bookings/:id', getBookings);
// create a new booking
app.post('/api/booking', createBooking);
// create a new booking
// app.get('/api/customers', getCustomers);
app.get('/api/getCarID/:id', getCarID)

// Delete a booking
app.delete('/api/deletebooking/:id', deleteBooking);

//entry point for our website
app.get("/", (req,res) => {
  res.sendFile(`${__dirname}../public/index.html`)
})

// Start the server
app.listen(SERVER_PORT, () => console.log(`Jamming on port: ${SERVER_PORT}`));
