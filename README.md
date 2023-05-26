# Car Rental API - maBagnole

This is a sample project that demonstrates how to build a car rental API using Node.js, Express, Sequelize, and PostgreSQL. The API allows users to view a list of available cars, reserve a car, and view their reservations.

## Installation
1- Clone the repository:

```
git clone https://github.com/your-username/car-rental-api.git
```


2- Install the dependencies:
```
npm install - y
```

3- Create a .env file in the root directory of the project and set the following environment variables:
```
DB_USERNAME=your-username
DB_PASSWORD=your-password
DB_NAME=car_rental
```

Or, you could copy your connection string code from your database server, 
  - if you are using postgresql from www.bit.io like I did, your code would look very similar to this:
  ![image](https://github.com/DJRoche509/maBagnole-Rental/assets/100164051/e32f9604-719f-4a8d-baf9-985951389c91)
 
  - Next, create a VARIABLE_NAME in that .env file and past/set that variable equal to the connection code.
    ```
    CONNECTION_STRING = postgresql://YourUserName****************************************/YourUserName/SchemaName
    ```
    
 4- Go back to your terminal, and start the server:
 ```
 npm start
 ```
 
 The server should now be running on http://localhost:4004.
 
 ## View of Home page
 ![image](https://github.com/DJRoche509/maBagnole-Rental/assets/100164051/5f5ed389-627f-4d48-baaf-cc4b45034f52)

 ## Usage
 
 #### Endpoints
 #### GET /api/cars
 Returns a list of available cars.
 
 ###POST /api/bookings
 Reserves a car for a specified date range.
 
 ##### Request Body
 ```
 {
  "carId": 1,
  "pickupDate": "2023-06-01",
  "returnDate": "2023-06-05"
}
 ```   
 
  ##### Response Body
 ```
{
  "id": 1,
  "carId": 1,
  "pickupDate": "2023-06-01",
  "returnDate": "2023-06-05",
  "createdAt": "2023-05-29T21:34:19.000Z",
  "updatedAt": "2023-05-29T21:34:19.000Z"
}
 ```
 
 #### GET /api/bookings
 Returns a list of all reservations.
 
 #### DELETE /api/booking/:id
 Deletes a booking reservation that matches the booking id number passed in.

#### <span style="color:purple;">AUthentication</span>
Authentication is not currently implemented in this API, but it is recommended that you implement it before using this API in production.

## Dependencies
This project uses the following dependencies:

- Node.js
- Express.js
- Sequelize
- Sequelize (PostgreSQL)
- pg
- pg-hstore
- Nodemon (dev)

## Contributing
If you would like to contribute to this project, please fork the repository and submit a pull request.

## License
This project is licensed under the MIT License.

    



