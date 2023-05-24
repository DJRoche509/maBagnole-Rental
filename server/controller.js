require('dotenv').config()
const Sequelize = require('sequelize')
const { CONNECTION_STRING } = process.env

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
            DROP TABLE IF EXISTS customers;
            DROP TABLE IF EXISTS cars;
            DROP TABLE IF EXISTS bookings;

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
                make VARCHAR(35) NOT NULL,
                model VARCHAR(35) NOT NULL,
                imgage VARCHAR(250),
                mileage INTEGER,
                size VARCHAR(35),
                status VARCHAR(25),
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

            
            INSERT INTO cars (year, make, model, image,mileage,status,cost)
            VALUES (2023,'Bugatti','La Voiture Noire','https://carleasespecialoffers.co.uk/assets/images/bugatti-la-voiture-noire-for-top-5.jpg',55,'Available',350),
                (2021,'Peugeot','907','https://d.scdn.gr/images/sku_main_images/009099/9099895/20160525135916_bburago_1_18_peugeot_907_v12.jpeg',2700,'Available',165),
                (2006,'Peugeot','908 RC','https://www.topgear.com/sites/default/files/news-listicle/image/peugeot_908_rc_concept_front34.jpg?w=1290&h=726',22802,'Available',285),
                (2020,'Renault','Twingo E-Tech RC','https://www.renaultgroup.com/wp-content/uploads/2020/11/nouvelle_twingo_electric-1.jpg',9640,'Available',85),
                (2022,'Renault','Arkana','https://www.renaultgroup.com/wp-content/uploads/2023/04/r-dam_1418131.jpg',2733,'Available',125),
                (2010,'Citroen','Survolt','https://i0.wp.com/www.car-revs-daily.com/wp-content/uploads/2014/11/Concept-Flashback-2010-Citroen-Survolt-12.jpg?resize=1600%2C747&ssl=1',29530,'Available',325),
                (2016,'BMW','750LI','https://www.autotrader.com/wp-content/uploads/2020/02/245017.jpg',14121,'Available',145),
                (2023,'Jeep','Gladiator','https://www.carscoops.com/wp-content/uploads/2022/01/Jeep-Gladiator-1.jpg',15,'Available',178),
                (2021,'Lincoln','Navigator L','https://images.dealer.com/ddc/vehicles/2021/Lincoln/Navigator%20L/SUV/perspective/front-left/2021_24.png',3689,'Available',210),
                (2023,'Toyota','Tundra TRD Pro','https://alcf.s3.us-west-1.amazonaws.com/_custom/2023/toyota/tundra/2023-toyota-tundra-main.png',5,'Available',160);

            INSERT INTO customers (fname, lname, age, email, phonenumber, address, city, state, zipcode)
            VALUES ('Juliane', 'Jones', 32,'juliane.jones@yahoo.com', '3347927472', '123 S Beach Ave', 'Miami', 'FL', 33213),
                ('David', 'Miller', 27, 'dmiller@netzero.net', '2137921892', '361 Central Ave', 'Bushwick', 'NY', 11221),
                ('Rebecca', 'Davis', 41,'reb.davis@example.com', '4568903214', '80 10th St S', 'Minneapolis', 'MN', 55403);
            `).then(() => {

            }).catch(err => console.log('error seeding DB', err))
        },

        }