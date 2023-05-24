const express = require("express");
const { Sequelize, DataTypes } = require("sequelize");

const PORT = process.env.PORT || 4000;

// Create a new Sequelize instance
const sequelize = new Sequelize("database", "username", "password", {
  host: "localhost",
  dialect: "mysql",
});

// Define a new model for the date and time
const DateTime = sequelize.define("DateTime", {
  datetime: {
    type: DataTypes.DATE,
    allowNull: false,
  },
});

// Sync the model with the database
sequelize.sync();

// Create a new Express app
const app = express();

// Define a route that returns the current date and time as a JSON object
app.get("/datetime", async (req, res), next) => {
    try {
        // Get the current date and time
        const now = new Date();

        // Create a new DateTime record in the database
        await DateTime.create({ datetime: now });

        // Return the current date and time as a JSON object
        res.json({ datetime: now });
    } catch (error) {
        next(error);
    }
};

// Start the server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});