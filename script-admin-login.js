const adminLoginForm = document.getElementById('admin-login-form');
const adminPasswordInput = document.getElementById('admin-password');
const loginError = document.getElementById('login-error');

adminLoginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    if (adminPasswordInput.value === "Aditya.") {
        window.location.href = "admin.html";
    } else {
        loginError.style.display = 'block';
        adminPasswordInput.value = '';
    }
});
