const container = document.querySelector('.theater-container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');

populateUI();

let ticketPrice = +movieSelect.value;

// Save selected movie index and price
function setMovieData(movieIndex, moviePrice) {
    localStorage.setItem('selectedMovieIndex', movieIndex);
    localStorage.setItem('selectedMoviePrice', moviePrice);
}

// Update total and count
function updateSelectedCount() {
    const selectedSeats = document.querySelectorAll('.row .seat.selected');

    const seatsIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat));

    localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

    const selectedSeatsCount = selectedSeats.length;

    count.innerText = selectedSeatsCount;
    total.innerText = selectedSeatsCount * ticketPrice;
}

// Get data from localstorage and populate UI
function populateUI() {
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));

    if (selectedSeats !== null && selectedSeats.length > 0) {
        seats.forEach((seat, index) => {
            if (selectedSeats.indexOf(index) > -1) {
                seat.classList.add('selected');
            }
        });
    }

    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');

    if (selectedMovieIndex !== null) {
        movieSelect.selectedIndex = selectedMovieIndex;
    }
}

// Movie select event
movieSelect.addEventListener('change', e => {
    ticketPrice = +e.target.value;
    setMovieData(e.target.selectedIndex, e.target.value);
    updateSelectedCount();
});

// Seat click event
container.addEventListener('click', e => {
    if (
        e.target.classList.contains('seat') &&
        !e.target.classList.contains('occupied')
    ) {
        e.target.classList.toggle('selected');
        
        // Add a micro-animation pop effect via JS if needed, but CSS handles transform
        
        updateSelectedCount();
    }
});

// Booking button alert
const bookBtn = document.getElementById('book-btn');
bookBtn.addEventListener('click', () => {
    const selectedSeatsCount = document.querySelectorAll('.row .seat.selected').length;
    if(selectedSeatsCount > 0) {
        alert(`Successfully booked ${selectedSeatsCount} tickets for a total of ₹${selectedSeatsCount * ticketPrice}! Enjoy your movie!`);
        // Optional: Reset seats after booking
        document.querySelectorAll('.row .seat.selected').forEach(seat => {
            seat.classList.remove('selected');
            seat.classList.add('occupied');
        });
        updateSelectedCount();
    } else {
        alert('Please select at least one seat to proceed.');
    }
});

// Initial count and total set
updateSelectedCount();
