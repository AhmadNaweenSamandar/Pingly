// Navbar Shadow on Scroll
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 10) {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = 'none';
    }
});

// Login page animation code and authentication logic
document.addEventListener('DOMContentLoaded', function() {
    const container = document.querySelector('.auth-container');
    const showSignup = document.getElementById('showSignup');
    const showLogin = document.getElementById('showLogin');
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    const welcomeLogin = document.getElementById('welcomeLogin');
    const welcomeSignup = document.getElementById('welcomeSignup');

    // Simple user storage (in a real app, this would be a server/database)
    let users = JSON.parse(localStorage.getItem('pinglyUsers')) || [];

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

    // Login form submission
    document.getElementById('login').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = this.querySelector('input[type="text"]').value;
        const password = this.querySelector('input[type="password"]').value;
        
        // Check if user exists
        const user = users.find(u => (u.email === email || u.username === email) && u.password === password);
        
        if (user) {
            // Store current user in session
            sessionStorage.setItem('currentUser', JSON.stringify(user));
            window.location.href = "dashboard.html";
        } else {
            alert("Invalid credentials. Please try again.");
        }
    });

    // Signup form submission
    document.getElementById('signup').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = this.querySelector('input[type="text"]').value;
        const email = this.querySelector('input[type="email"]').value;
        const password = this.querySelector('input[type="password"]').value;
        
        // Check if user already exists
        if (users.some(u => u.email === email)) {
            alert("User with this email already exists.");
            return;
        }
        
        // Create new user
        const newUser = {
            name: name,
            email: email,
            password: password,
            username: email.split('@')[0] // Simple username generation
        };
        
        // Add to users array
        users.push(newUser);
        
        // Save to localStorage
        localStorage.setItem('pinglyUsers', JSON.stringify(users));
        
        alert("Account created successfully! Please log in.");
        showLogin.click();
        
        // Clear the form
        this.reset();
    });
});