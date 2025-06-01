document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent form from submitting the usual way

    // Get username and password input values
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    // Check if credentials are correct
    if ((username === "KIPYEGON" && password === "Tony12706#") || 
        (username === "MIKEBII" && password === "Bootstrins.") ||
        (username === "JULIA" && password === "KIPJUJU")) {
        // Redirect to dashboard if login is successful
        window.location.href = "dashboard/dashboard.html";
    } else {
        // Clear the password input field on failed login attempt
        document.getElementById("password").value = "";
        // Show an error message if login fails
        document.getElementById("error-message").textContent = "Invalid username or password!";
    }
});

// Toggle Password Visibility
const togglePassword = document.getElementById('togglePassword');
const passwordField = document.getElementById('password');

togglePassword.addEventListener('click', function () {
    // Toggle the type attribute
    const type = passwordField.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordField.setAttribute('type', type);

    // Toggle the eye icon
    this.setAttribute('name', type === 'password' ? 'eye-off' : 'eye');
});

// Prevent special characters and spaces in username field
document.getElementById('username').addEventListener('input', function() {
    this.value = this.value.replace(/[^a-zA-Z0-9]/g, ''); // Allow only letters and numbers
});

// Prevent spaces in password field
passwordField.addEventListener('input', function() {
    this.value = this.value.replace(/\s/g, ''); // Remove any spaces entered
});

// Logo animation logic
document.addEventListener('DOMContentLoaded', () => {
    const logo = document.getElementById('logo');
    const animationDuration = 2000; // Duration for slide in and slide out in milliseconds
    const stayDuration = 15000; // Duration for staying calm in milliseconds

    const animateLogo = () => {
        logo.classList.remove('animate__animated', 'animate__backInLeft', 'animate__bounceIn', 'animate__backOutRight', 'animate__heartBeat');
        
        // Start slide in
        logo.classList.add('animate__animated', 'animate__backInLeft');
        setTimeout(() => {
            logo.classList.remove('animate__backInLeft');
            logo.classList.add('animate__bounceIn');
        }, animationDuration);
        
        // Start heartbeat after sliding in
        setTimeout(() => {
            logo.classList.remove('animate__bounceIn');
            logo.classList.add('animate__heartBeat');
        }, animationDuration + stayDuration + 2000);
        
        // Start slide out after heartbeat
        setTimeout(() => {
            logo.classList.remove('animate__heartBeat');
            logo.classList.add('animate__backOutRight');
        }, animationDuration + stayDuration + 1000);

        // Reset and loop
        setTimeout(() => {
            logo.classList.remove('animate__backOutRight');
            animateLogo();
        }, animationDuration + stayDuration + 2000);
    };

    animateLogo();
});
