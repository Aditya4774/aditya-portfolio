const movieTitle = localStorage.getItem('selectedMovieTitle');
const ticketPrice = localStorage.getItem('selectedMoviePrice');
const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));

if (!movieTitle || !ticketPrice || !selectedSeats || selectedSeats.length === 0) {
    window.location.href = 'index.html';
}

const numTickets = selectedSeats.length;
const totalPrice = localStorage.getItem('actualTotalPrice') || (numTickets * (+ticketPrice));

document.getElementById('summary-movie').innerText = movieTitle;
document.getElementById('summary-tickets').innerText = numTickets;
document.getElementById('summary-price').innerText = 'Starting from ₹' + ticketPrice;
document.getElementById('summary-total').innerText = '₹' + totalPrice;

const paymentForm = document.getElementById('payment-form');
const successModal = document.getElementById('success-modal');

paymentForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Save to all bookings
    const newBooking = {
        id: Date.now(),
        movie: movieTitle,
        time: localStorage.getItem('selectedMovieTime') || 'Not Selected',
        tickets: numTickets,
        total: totalPrice,
        date: new Date().toLocaleDateString()
    };
    
    let allBookings = JSON.parse(localStorage.getItem('allBookings')) || [];
    allBookings.push(newBooking);
    localStorage.setItem('allBookings', JSON.stringify(allBookings));

    // Show toast
    if (typeof showToast === 'function') {
        showToast('Ticket Booked Successfully!', '🎟️');
    }

    // Show success modal
    successModal.style.display = 'flex';
    
    // Clear temporary current booking
    localStorage.removeItem('selectedSeats');
    localStorage.removeItem('selectedMovieTitle');
    localStorage.removeItem('selectedMoviePrice');
    localStorage.removeItem('selectedMovieTime');
});
