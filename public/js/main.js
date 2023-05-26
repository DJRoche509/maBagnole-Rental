const selectBtn = document.getElementById("select-form");

// Get the selected pick-up date and time
const pickupDate = document.getElementById("pickup-date").value;
const pickupTime = document.getElementById("pickup-time").value;
// Get the selected return date and time
const returnDate = document.getElementById("return-date").value;
const returnTime = document.getElementById("return-time").value;
const year = document.getElementById('year');
const carMake = document.getElementById('car-make');
const carModel = document.getElementById('car-model');
const color = document.getElementById('color');
const mileage = document.getElementById('mileage');
const carSize = document.getElementById('size');
const price = document.getElementById('price');

const display = document.getElementById('bookings');
const baseURL = 'http://localhost:4004/'



function activeSlide(e) {
    let id = e.relatedTarget.id;
    axios.get(`${baseURL}api/bookings/${id}`)
    .then(res => {
            displayBookings(res);
        })
    axios.get(`${baseURL}api/getCarID/${id}`)
    .then(res => {
        updateCarInfoSection(res.data[0]);
    })
  }

  // Get the carousel element and look for active class
  const carousel = document.getElementById("carouselExampleDark");
  carousel.addEventListener("slid.bs.carousel", activeSlide);

  //get request with the current active class on load
  //call the display function with the response
  let active = document.getElementsByClassName("active")
  axios.get(`${baseURL}api/getCarID/${active[1].id}`)
    .then(res => {
        updateCarInfoSection(res.data[0]);
    })

    axios.get(`${baseURL}api/bookings/${active[1].id}`)
    .then(res => {
            displayBookings(res);
        })

// Update the car info section with the selected car and booking information
function updateCarInfoSection(selectedCar) { console.log(selectedCar, 'selectcar');
    // Populate the car info
    carMake.innerHTML = selectedCar.make;
    carModel.innerHTML = selectedCar.model;
    color.innerHTML = selectedCar.color;
    mileage.innerHTML = selectedCar.mileage;
    year.innerHTML = selectedCar.year;
    carSize.innerHTML = selectedCar.size;
    price.innerHTML = `$${selectedCar.cost} per day`;
    price.value = selectedCar.cost
}

const carSelection = event => {
    event.preventDefault();

   
    // Get the booking information from the form
    const pickupDateValue = document.getElementById('pickup-date').value;
    const pickupTimeValue = document.getElementById('pickup-time').value;
    const returnDateValue = document.getElementById('return-date').value;
    const returnTimeValue = document.getElementById('return-time').value;
      
    
    // Send the booking information to the server using axios
    const yearValue = document.getElementById('year').innerHTML;
    const carMakeValue = document.getElementById('car-make').innerHTML;
    const carModelValue = document.getElementById('car-model').innerHTML;
    const colorValue = document.getElementById('color').innerHTML;
    const mileageValue = document.getElementById('mileage').innerHTML;
    const carSizeValue = document.getElementById('size').innerHTML;
    const priceValue = document.getElementById('price').value;
    let id = document.getElementsByClassName("active");

    const bookingData = {
        id:id[1].id,
        year: yearValue ,
        make: carMakeValue,
        model: carModelValue,
        color: colorValue,
        size: carSizeValue,
        mileage: mileageValue,
        cost: priceValue,
        pickupDate: pickupDateValue,
        pickupTime: pickupTimeValue,
        returnDate: returnDateValue,
        returnTime: returnTimeValue,  
    };
    axios.post(`${baseURL}api/booking`, bookingData)
    .then(res => {
        
        var queryString = '?data=' + encodeURIComponent(JSON.stringify(res.data));
        window.location.href = "/public/confirmation.html" + queryString;
    })
    .catch(error => console.error(error) );

    // Log out the selected date and time values
    console.log(`Pick-up date: ${pickupDate}`);
    console.log(`Pick-up time: ${pickupTime}`);
    console.log(`Return date: ${returnDate}`);
    console.log(`Return time: ${returnTime}`);
}


function displayBookings(res){
    console.log(res);
    for(let i=0; i<res.data.length;i++){
            const { booking_id, checkin, checkout, status,details } = res.data[i]
            console.log(i);
            let card = document.createElement("div")
            card.setAttribute("class","card")
            card.style.width="18rem;"

            let cardBody = document.createElement("div")
            cardBody.setAttribute("class","card-body")
            cardBody.setAttribute("id",`${booking_id}`)

            let checkIn = document.createElement("h5")
            checkIn.setAttribute("class","card-title")
            checkIn.innerHTML = `Check-In: ${checkin}`
            cardBody.appendChild(checkIn)

            let checkOut = document.createElement("h5")
            checkOut.setAttribute("class","card-title")
            checkOut.innerHTML = `Check-Out: ${checkout}`
            cardBody.appendChild(checkOut)

            let statusBody = document.createElement("h6")
            statusBody.setAttribute("class","card-subtitle mb-2 text-muted")
            statusBody.innerHTML = `Status: ${status}`
            cardBody.appendChild(statusBody)

            let detailsBody = document.createElement("p")
            detailsBody.setAttribute("class","card-text")
            detailsBody.innerHTML=`${details}`
            cardBody.appendChild(detailsBody)

            let deleteBtn = document.createElement("button")
            deleteBtn.innerHTML = "Delete"
            deleteBtn.setAttribute("onclick",`deleteBooking(${booking_id})`)
            cardBody.appendChild(deleteBtn)
            card.appendChild(cardBody)
            display.appendChild(card)
        }

}

function deleteBooking(id){
    axios.delete(`${baseURL}api/deletebooking/${id}`)
    .then((res) => {
        location.reload();    
    }).catch((err) =>console.log(err))};



// Add an event listener to the submit button
selectBtn.addEventListener("click", carSelection);