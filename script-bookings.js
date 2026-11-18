const tbody = document.getElementById('bookings-tbody');

function renderBookings() {
    const allBookings = JSON.parse(localStorage.getItem('allBookings')) || [];
    
    if (allBookings.length === 0) {
        tbody.innerHTML = `<tr><td colspan="7" style="text-align: center; color: var(--text-muted); padding: 30px;">You have no active bookings.</td></tr>`;
        return;
    }

    tbody.innerHTML = allBookings.map(b => `
        <tr>
            <td>#${b.id.toString().slice(-6)}</td>
            <td style="font-weight: 600;">${b.movie}</td>
            <td style="color: var(--text-muted);">${b.time || 'N/A'}</td>
            <td>${b.tickets}</td>
            <td style="color: var(--accent); font-weight: 700;">₹${b.total}</td>
            <td>${b.date}</td>
            <td>
                <button class="btn" style="padding: 5px 10px; font-size: 0.8rem; margin-right: 5px;" onclick="editBooking(${b.id})">Edit</button>
                <button class="btn-cancel" onclick="cancelBooking(${b.id})">Cancel</button>
            </td>
        </tr>
    `).join('');
}

function cancelBooking(id) {
    if (confirm('Are you sure you want to cancel this ticket?')) {
        let allBookings = JSON.parse(localStorage.getItem('allBookings')) || [];
        allBookings = allBookings.filter(b => b.id !== id);
        localStorage.setItem('allBookings', JSON.stringify(allBookings));
        
        renderBookings();
        
        // Show cancellation toast
        if (typeof showToast === 'function') {
            showToast('Ticket Cancelled Successfully', '❌');
        }
    }
}

function editBooking(id) {
    let allBookings = JSON.parse(localStorage.getItem('allBookings')) || [];
    const bookingIndex = allBookings.findIndex(b => b.id === id);
    if (bookingIndex > -1) {
        const newTime = prompt(`Editing Showtime for ${allBookings[bookingIndex].movie}.\nExample times: 10:00 AM, 2:00 PM, 6:30 PM\n\nEnter new time:`, allBookings[bookingIndex].time || '');
        if (newTime !== null && newTime.trim() !== '') {
            allBookings[bookingIndex].time = newTime;
            localStorage.setItem('allBookings', JSON.stringify(allBookings));
            renderBookings();
            if (typeof showToast === 'function') showToast('Booking Updated Successfully', '✅');
        }
    }
}

// Initial render
renderBookings();
