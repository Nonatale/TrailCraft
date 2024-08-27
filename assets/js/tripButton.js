
const tripButton = document.querySelector("#trip-button");
const submitButton = document.querySelector("#trip-submit-button");
const title = document.querySelector("#tripTitle");
const tripForm = document.querySelector("#tripForm");
const tripContainer = document.querySelector("#tripContainer");

const tripList = initTripList();



function initTripList() {
    const localTripList = localStorage.getItem("tripList");
    return localTripList ? JSON.parse(localTripList) : [];
}

// Unhides/hides the trip form upon button click
function tripFormClick(event) {
    event.preventDefault();
    if (tripForm.classList.contains("hidden")) {
        tripForm.classList.remove("hidden");
    } else {
        tripForm.classList.add("hidden");
    }

}

// Submits new trip element to the local storage upon button click
function tripFormSubmit(event) {
    event.preventDefault();

    // Only proceeds if entry is not empty. Otherwise, nothing happens
    if (title.value.length !== 0 && (localStorage.getItem("imageArray").length !== 0)) {
        // Creates new trip object: name and empty activity list
        const trip = {
            name: title.value.trim(),
            activity: [],

            imgUrl: getRandomImage(this)
        }
        tripList.push(trip);

        // Adds new trip list to local storage
        localStorage.setItem("tripList", JSON.stringify(tripList));
        // Hides form after successful submission
        tripForm.classList.add("hidden");

        displayTrip();
    } else {
        if (localStorage.getItem("imageArray").length <= 0) {
            noTripImageError();
        }
        tripFormError();
    }

}

function noTripImageError() {
    // Check if an error message already exists
    const existingErrorMsg = tripForm.querySelector(".error");
    if (existingErrorMsg) {
        // Remove the existing error message
        tripForm.removeChild(existingErrorMsg);
    }
    const errorMsg = document.createElement("p");
    errorMsg.classList.add("error");
    errorMsg.textContent = "Maximum trip created.";
    tripForm.appendChild(errorMsg);
}

function tripFormError() {
    // Check if an error message already exists
    const existingErrorMsg = tripForm.querySelector(".error");
    if (existingErrorMsg) {
        // Remove the existing error message
        tripForm.removeChild(existingErrorMsg);
    }
    const errorMsg = document.createElement("p");
    errorMsg.classList.add("error");
    errorMsg.textContent = "Please enter a trip name.";
    tripForm.appendChild(errorMsg);
}

// Adds html elements of the trip to the page and give it a background img
function displayTrip() {
    tripContainer.innerHTML = "";
    for (const trip of tripList) {
        const tripblock = document.createElement("div");
        tripblock.classList.add("trip-block");
        const triptitle = document.createElement("h2");
        const textBackground = document.createElement("div");
        //Add trip image
        tripblock.style.backgroundImage = trip.imgUrl;

        textBackground.classList.add("white-background");
        triptitle.textContent = trip.name;

        tripContainer.appendChild(tripblock);
        
        tripblock.appendChild(triptitle);
        tripblock.appendChild(textBackground);
        // Adds clickable event to the images and redirects page when clicked
        tripblock.addEventListener("click", (event) => {
            redirEventPage(event, trip.name)
        });
    }
}

function redirEventPage(event, tripName) {
    event.preventDefault();
    console.log(tripName);
    localStorage.setItem("currTrip", tripName);
    redirectPage("./assets/html/events.html");
}

tripButton.addEventListener("click", tripFormClick);
submitButton.addEventListener("click", tripFormSubmit);

imageSetup();
displayTrip();