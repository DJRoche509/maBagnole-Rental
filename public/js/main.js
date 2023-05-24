
const reserve = document.getElementById("reserve-form");


const carReservation = event => {
    event.preventDefault();

    // Get the selected pick-up date and time
    const pickupDate = document.getElementById("pickup-date").value;
    const pickupTime = document.getElementById("pickup-time").value;

    // Get the selected return date and time
    const returnDate = document.getElementById("return-date").value;
    const returnTime = document.getElementById("return-time").value;

    // Submit the form data to the server using Axios
    axios.post("/booking", {
        pickupDate,
        pickupTime,
        returnDate,
        returnTime,
    })
    .then(response => {
        // Redirect the user to the confirmation page
        window.location.href = "/confirmation.html";
    })
    .catch(error => {console.error(error);    });

    // Log out the selected date and time values
    console.log(`Pick-up date: ${pickupDate}`);
    console.log(`Pick-up time: ${pickupTime}`);
    console.log(`Return date: ${returnDate}`);
    console.log(`Return time: ${returnTime}`);
}

reserve.addEventListener("submit", carReservation);