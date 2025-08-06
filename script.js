// Navbar Shadow on Scroll
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 10) {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = 'none';
    }
});





// Login page animation code 

document.addEventListener('DOMContentLoaded', function() {
    const container = document.querySelector('.auth-container');
    const showSignup = document.getElementById('showSignup');
    const showLogin = document.getElementById('showLogin');
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    const welcomeLogin = document.getElementById('welcomeLogin');
    const welcomeSignup = document.getElementById('welcomeSignup');

    showSignup.addEventListener('click', function(e) {
        e.preventDefault();
        container.classList.add('swap');
        
        // Switch forms
        loginForm.classList.remove('active');
        signupForm.classList.add('active');
        
        // Switch welcome messages
        welcomeLogin.classList.remove('active');
        welcomeSignup.classList.add('active');
    });

    showLogin.addEventListener('click', function(e) {
        e.preventDefault();
        container.classList.remove('swap');
        
        // Switch forms
        signupForm.classList.remove('active');
        loginForm.classList.add('active');
        
        // Switch welcome messages
        welcomeSignup.classList.remove('active');
        welcomeLogin.classList.add('active');
    });

    document.getElementById('login').addEventListener('submit', function(e) {
        e.preventDefault();
        if (grecaptcha.getResponse().length === 0) {
            alert("Please complete the CAPTCHA!");
            return;
        }
        window.location.href = "dashboard.html";
    });

    document.getElementById('signup').addEventListener('submit', function(e) {
        e.preventDefault();
        if (grecaptcha.getResponse().length === 0) {
            alert("Please complete the CAPTCHA!");
            return;
        }
        alert("Account created successfully! Please log in.");
        showLogin.click();
    });
});
