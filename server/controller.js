require('dotenv').config()
const Sequelize = require('sequelize')
const { CONNECTION_STRING } = process.env

// Create a new Sequelize instance
const sequelize = new Sequelize(CONNECTION_STRING, {
    dialect: ' postgres',
    dialectOptions: {
        ssl: {
            rejectUnauthorized:false
        }
    }
});

module.exports = {
    seed: (req, res) => {
        sequelize.query(`
        DROP TABLE IF EXISTS bookings;
        DROP TABLE IF EXISTS customers;
                   DROP TABLE IF EXISTS cars;
       
                   CREATE TABLE customers (
                       id SERIAL PRIMARY KEY,
                       FName VARCHAR(35) NOT NULL,
                       LName VARCHAR(35) NOT NULL,
                       age INTEGER,
                       email varchar(100) NOT NULL,
                       phoneNumber VARCHAR(11),
                       address VARCHAR(35) NOT NULL,
                       city VARCHAR(45) NOT NULL,
                       state VARCHAR(35) NOT NULL,
                       zipCode INTEGER
                   );
                   
                   CREATE TABLE cars(
                       car_id Serial PRIMARY KEY,
                       year INTEGER ,
                       make VARCHAR(55) NOT NULL,
                       model VARCHAR(55) NOT NULL,
                       color VARCHAR(55),
                       size VARCHAR(55),
                       image VARCHAR(250),
                       mileage INTEGER,
                       status VARCHAR(35),
                       cost INT NOT NULL
                   );
                       
                   CREATE TABLE bookings (
                       booking_id SERIAL PRIMARY KEY,
                       checkin TIMESTAMP,
                       checkout TIMESTAMP,
                       amount INTEGER,
                       status VARCHAR(25),
                       details VARCHAR(255),
                       car_id INTEGER REFERENCES cars(car_id),
                       customer_id INTEGER REFERENCES customers(id)
                   );
       
                   
                   INSERT INTO cars (year, make, model, color,size,image,mileage,status,cost)
                   VALUES (2023,'Bugatti','La Voiture Noire','black','super-compact, coupe','https://carleasespecialoffers.co.uk/assets/images/bugatti-la-voiture-noire-for-top-5.jpg',55,'Available',350),
                       (2021,'Peugeot','907','black','super-compact','https://d.scdn.gr/images/sku_main_images/009099/9099895/20160525135916_bburago_1_18_peugeot_907_v12.jpeg',2700,'Available',165),
                       (2006,'Peugeot','908 RC','dark charcoal','midsize','https://www.topgear.com/sites/default/files/news-listicle/image/peugeot_908_rc_concept_front34.jpg?w=1290&h=726',22802,'Available',285),
                       (2020,'Renault','Twingo E-Tech RC','white','mini','https://www.renaultgroup.com/wp-content/uploads/2020/11/nouvelle_twingo_electric-1.jpg',9640,'Available',85),
                       (2022,'Renault','Arkana','blue','compact, coupe','https://www.renaultgroup.com/wp-content/uploads/2023/04/r-dam_1418131.jpg',2733,'Available',125),
                       (2010,'Citroen','Survolt','black, turquoise','super-compact, coupe','https://i0.wp.com/www.car-revs-daily.com/wp-content/uploads/2014/11/Concept-Flashback-2010-Citroen-Survolt-12.jpg?resize=1600%2C747&ssl=1',29530,'Available',325),
                       (2016,'BMW','750LI','dark grey','midsize, compact','https://www.autotrader.com/wp-content/uploads/2020/02/245017.jpg',14121,'Available',145),
                       (2023,'Jeep','Gladiator','black gold','pickup, large','https://www.carscoops.com/wp-content/uploads/2022/01/Jeep-Gladiator-1.jpg',15,'Available',178),
                       (2021,'Lincoln','Navigator L','blue','very large, family-size','https://images.dealer.com/ddc/vehicles/2021/Lincoln/Navigator%20L/SUV/perspective/front-left/2021_24.png',3689,'Available',210),
                       (2023,'Toyota','Tundra TRD Pro','dark blue','pickup, very large','https://alcf.s3.us-west-1.amazonaws.com/_custom/2023/toyota/tundra/2023-toyota-tundra-main.png',5,'Available',160);
       
                   INSERT INTO customers (fname, lname, age, email, phonenumber, address, city, state, zipcode)
                   VALUES ('Juliane', 'Jones', 32,'juliane.jones@yahoo.com', '3347927472', '123 S Beach Ave', 'Miami', 'FL', 33213),
                       ('David', 'Miller', 27, 'dmiller@netzero.net', '2137921892', '361 Central Ave', 'Bushwick', 'NY', 11221),
                       ('Rebecca', 'Davis', 41,'reb.davis@example.com', '4568903214', '80 10th St S', 'Minneapolis', 'MN', 55403);
            `).then(() => { 
                console.log('DB seeded successfully!');
                res.sendStatus(200)
            }).catch(err => console.log('error seeding DB', err))
    },
    
    // Define a new model for the booking
    getBookings: (req,res) => {
        sequelize.query(`
            SELECT * 
            FROM bookings
            WHERE car_id = ${req.params.id}
        `)
        .then(dbRes => res.status(200).send(dbRes[0]))
        .catch(err => console.log('Unable t find this vehicle',err));
    },
    
    getCarID:(req,res) => {
        const {id} = req.params;
        sequelize.query(`
            SELECT year, make, model, color,size,mileage,cost
            FROM cars
            WHERE car_id = ${id};
        `)
        .then(dbRes => res.status(200).send(dbRes[0]))
        .catch(err => console.log('Unable t find this vehicle',err));
    },

    createBooking:(req,res) => {
        // bookingConfirmation.push(req.body);
        const {pickupDate, pickupTime,returnDate, returnTime, cost, id} = req.body; 

        let query = `INSERT INTO bookings (checkin,checkout,amount,status,details,car_id,customer_id)
        VALUES ('${pickupDate} ${pickupTime}:00', '${returnDate} ${returnTime}:00',${cost}, 'Ready','Weekend trip',${id},2);`
        sequelize.query(query)
        .then(res.status(200).send(req.body)) ; 
    },

    deleteBooking: (req,res) => {
        const id = req.params.id;
        sequelize.query(`
            DELETE 
            FROM bookings
            WHERE booking_id = ${id};
        `).then(res.sendStatus(200))
        .catch(err=> res.sendStatus(err));
    }
}


// Get all available cars from the database
exports.getCars = (req, res) => {
    Car.findAll({
        where: {
            status: 'Available'
        }
    }).then(cars => {
        res.json(cars);
    }).catch(err => {
        console.log('Error getting cars', err);
        res.status(500).json({ message: 'Error getting cars' });
    });
};