const express = require("express");
const cors = require('cors');


const {SERVER_PORT} = process.env;

// Create a new Sequelize instance
const sequelize = new Sequelize("database", "username", "password", {
  host: "localhost",
  dialect: "mysql",
});

// Define a new model for the booking
const Booking = sequelize.define("Booking", {
  pickupDate: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  pickupTime: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  returnDate: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  returnTime: {
    type: DataTypes.TIME,
    allowNull: false,
 });

// Sync the model with the database
sequelize.sync();

// Create a new Express app
const app = express();

// Use the body-parser middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));

// Define a route that handles the form submission
app.post("/booking", async (req, res), next) => {
  try {
    // Get the selected date and time values from the request body
    const { pickupDate, pickupTime, returnDate, returnTime } = req.body;

    // Create a new Booking record in the database
    await Booking.create({ pickupDate, pickupTime, returnDate, returnTime });

    // Redirect the user to a confirmation page
    res.redirect("/confirmation.html");
  } catch (error) {
    next(error);
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});