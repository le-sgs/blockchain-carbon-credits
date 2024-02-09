document.addEventListener("DOMContentLoaded", function() {
    const apiUrl = 'https://your-api-domain.com'; // Replace this with your actual API domain

    const toggleRegisterLink = document.getElementById('toggleRegister');
    const registerForm = document.getElementById('registerForm');
    const loginForm = document.getElementById('loginForm');

    toggleRegisterLink.addEventListener('click', function(event) {
        event.preventDefault();
        registerForm.classList.toggle('show');
        loginForm.classList.toggle('show');
        // Change the text of the register link based on the form visibility
        const linkText = registerForm.classList.contains('show') ? 'Back to Login' : 'Register';
        toggleRegisterLink.textContent = linkText;
    });

    registerForm.addEventListener('submit', async function(event) {
        event.preventDefault();
        
        const password1 = document.getElementById('registerPassword1').value;
        const password2 = document.getElementById('registerPassword2').value;

        if (password1 !== password2) {
            alert('Passwords do not match');
            return;
        }

        const formData = new FormData(this);
        const registerUrl = `${apiUrl}/accounts/register/`;
        try {
            const response = await fetch(registerUrl, {
                method: 'POST',
                body: formData
            });
            if (response.ok) {
                alert('Registration successful');
            } else if (response.status === 400) {
                alert('Registration failed: Bad Request');
            } else {
                alert('Registration failed');
            }
        } catch (error) {
            console.error('Error registering:', error);
            alert('Registration failed: An error occurred');
        }
    });

    loginForm.addEventListener('submit', async function(event) {
        event.preventDefault();
        const formData = new FormData(this);
        const loginUrl = `${apiUrl}/accounts/login/`;
        try {
            const response = await fetch(loginUrl, {
                method: 'POST',
                body: formData
            });
            if (response.ok) {
                alert('Login successful');
                window.location.href = "dashboard.html"; // Redirect to the dashboard page
            } else if (response.status === 401) {
                alert('Login failed: Unauthorized');
            } else {
                alert('Login failed');
            }
        } catch (error) {
            console.error('Error logging in:', error);
            alert('Login failed: An error occurred');
        }
    });
});
