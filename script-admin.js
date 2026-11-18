const tbody = document.getElementById('admin-tbody');
const totalBookingsEl = document.getElementById('total-bookings-val');
const totalTicketsEl = document.getElementById('total-tickets-val');
const totalRevenueEl = document.getElementById('total-revenue-val');

function renderAdminDashboard() {
    const allBookings = JSON.parse(localStorage.getItem('allBookings')) || [];
    
    // Calculate stats
    const totalBookings = allBookings.length;
    const totalTickets = allBookings.reduce((sum, b) => sum + b.tickets, 0);
    const totalRevenue = allBookings.reduce((sum, b) => parseInt(sum) + parseInt(b.total), 0);
    
    totalBookingsEl.innerText = totalBookings;
    totalTicketsEl.innerText = totalTickets;
    totalRevenueEl.innerText = '₹' + totalRevenue;

    if (allBookings.length === 0) {
        tbody.innerHTML = `<tr><td colspan="7" style="text-align: center; color: var(--text-muted); padding: 30px;">No bookings found on the platform.</td></tr>`;
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
                <button class="btn-cancel" onclick="adminDeleteBooking(${b.id})">Delete</button>
            </td>
        </tr>
    `).join('');
}

function editBooking(id) {
    let allBookings = JSON.parse(localStorage.getItem('allBookings')) || [];
    const bookingIndex = allBookings.findIndex(b => b.id === id);
    if (bookingIndex > -1) {
        const newTime = prompt(`Admin Edit Showtime for ${allBookings[bookingIndex].movie}.\nExample times: 10:00 AM, 2:00 PM, 6:30 PM\n\nEnter new time:`, allBookings[bookingIndex].time || '');
        if (newTime !== null && newTime.trim() !== '') {
            allBookings[bookingIndex].time = newTime;
            localStorage.setItem('allBookings', JSON.stringify(allBookings));
            renderAdminDashboard();
            if (typeof showToast === 'function') showToast('Booking Updated Successfully', '✅');
        }
    }
}

function adminDeleteBooking(id) {
    if (confirm('WARNING: Are you sure you want to FORCE DELETE this booking? This action cannot be undone.')) {
        let allBookings = JSON.parse(localStorage.getItem('allBookings')) || [];
        allBookings = allBookings.filter(b => b.id !== id);
        localStorage.setItem('allBookings', JSON.stringify(allBookings));
        
        renderAdminDashboard();
        
        // Show cancellation toast
        if (typeof showToast === 'function') {
            showToast('Booking Force Deleted', '🗑️');
        }
    }
}

// Initial render
renderAdminDashboard();
