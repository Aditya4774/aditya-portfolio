// Initialize toast container if it doesn't exist
document.addEventListener("DOMContentLoaded", () => {
    if (!document.getElementById('toast-container')) {
        const container = document.createElement('div');
        container.id = 'toast-container';
        container.className = 'toast-container';
        document.body.appendChild(container);
    }
});

// Toast Notification Function
function showToast(message, icon = '✅') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
        <span class="toast-icon">${icon}</span>
        <span class="toast-message">${message}</span>
    `;

    container.appendChild(toast);

    // Remove toast after 3 seconds
    setTimeout(() => {
        toast.classList.add('fade-out');
        setTimeout(() => {
            toast.remove();
        }, 300);
    }, 3000);
}

// Admin Authentication
function attemptAdminLogin(e) {
    e.preventDefault(); // Prevent default link behavior
    const password = prompt("Enter Admin Password:");
    
    if (password === "Aditya.") {
        window.location.href = "admin.html";
    } else if (password !== null) {
        alert("Incorrect password. Access denied.");
    }
}
