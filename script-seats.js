const container = document.querySelector('.theater-container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const displayMovieTitle = document.getElementById('display-movie-title');
const displayMoviePrice = document.getElementById('display-movie-price');
const proceedBtn = document.getElementById('proceed-btn');

let baseTicketPrice = 0;
let movieTitle = '';

// Premium adjustments
const PREMIUM_SURCHARGE = 200;
const VIP_SURCHARGE = 350;

function init() {
    movieTitle = localStorage.getItem('selectedMovieTitle');
    baseTicketPrice = +(localStorage.getItem('selectedMoviePrice'));
    const movieTime = localStorage.getItem('selectedMovieTime') || 'Time Not Selected';

    if (!movieTitle || !baseTicketPrice) {
        window.location.href = 'index.html'; // redirect if no movie selected
        return;
    }

    displayMovieTitle.innerText = movieTitle;
    displayMoviePrice.innerText = baseTicketPrice;

    const displayMovieTime = document.getElementById('display-movie-time');
    if (displayMovieTime) {
        displayMovieTime.innerText = `Showtime: ${movieTime}`;
    }

    // Load saved seats from local storage
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
    if (selectedSeats !== null && selectedSeats.length > 0) {
        seats.forEach((seat, index) => {
            if (selectedSeats.indexOf(index) > -1) {
                seat.classList.add('selected');
            }
        });
    }

    updateSelectedCount();
}

function updateSelectedCount() {
    const selectedSeats = document.querySelectorAll('.row .seat.selected');

    // Save index of selected seats to local storage
    const seatsIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat));
    localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

    const selectedSeatsCount = selectedSeats.length;
    count.innerText = selectedSeatsCount;

    // Calculate dynamic total price
    let currentTotal = 0;
    selectedSeats.forEach(seat => {
        let seatPrice = baseTicketPrice;
        if (seat.classList.contains('premium')) {
            seatPrice += PREMIUM_SURCHARGE;
        } else if (seat.classList.contains('vip')) {
            seatPrice += VIP_SURCHARGE;
        }
        currentTotal += seatPrice;
    });

    total.innerText = currentTotal;

    // Save actual total to local storage for payment page
    localStorage.setItem('actualTotalPrice', currentTotal);
}

// Seat click event
container.addEventListener('click', e => {
    if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
        e.target.classList.toggle('selected');
        updateSelectedCount();
    }
});

// Proceed to payment
proceedBtn.addEventListener('click', () => {
    const selectedSeatsCount = document.querySelectorAll('.row .seat.selected').length;
    
    if (selectedSeatsCount === 0) {
        if(typeof showToast === 'function') {
            showToast('Please select at least one seat to proceed.', '⚠️');
        } else {
            alert('Please select at least one seat.');
        }
        return;
    }

    window.location.href = 'payment.html';
});

// Run initialization
init();
