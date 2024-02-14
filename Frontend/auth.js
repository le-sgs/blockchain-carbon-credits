// Helper function to get CSRF token from cookies
function getCsrfToken() {
  let csrfToken = null;
  const cookies = document.cookie.split(';');
  for (let cookie of cookies) {
    const [name, value] = cookie.trim().split('=');
    if (name === 'csrftoken') {
      csrfToken = decodeURIComponent(value);
      break;
    }
  }
  return csrfToken;
}

// Helper function to perform fetch requests with CSRF token included
const fetchApi = (url, method, body) => {
  const csrfToken = getCsrfToken(); // Get the CSRF token
  const headers = {
    'Content-Type': 'application/json',
  };
  if (csrfToken) {
    headers['X-CSRFToken'] = csrfToken; // Include CSRF token in header
  }
  return fetch(url, {
    method: method,
    headers: headers,
    body: body ? JSON.stringify(body) : null,
    credentials: 'include' // To ensure cookies are sent with requests
  }).then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  });
};

// Registration handler
document.getElementById('registration-form')?.addEventListener('submit', function(event){
  event.preventDefault();
  const username = document.getElementById('username').value;
  const password1 = document.getElementById('password1').value;
  const password2 = document.getElementById('password2').value;

  fetchApi('http://127.0.0.1:8000/accounts/register/', 'POST', { username, password1, password2 })
    .then(data => {
      document.getElementById('register-message').textContent = 'Registered successfully';
      window.location.href = 'login.html';
    })
    .catch(error => {
      document.getElementById('register-message').textContent = 'Registration failed: ' + error.message;
    });
});

// Login handler
document.getElementById('login-form')?.addEventListener('submit', function(event){
  event.preventDefault();
  const username = document.getElementById('login-username').value;
  const password = document.getElementById('login-password').value;

  fetchApi('http://127.0.0.1:8000/accounts/login/', 'POST', { username, password })
    .then(data => {
      localStorage.setItem('token', data.token);
      window.location.href = 'dashboard.html';
    })
    .catch(error => {
      document.getElementById('login-message').textContent = 'Login failed: ' + error.message;
    });
});

// Logout handler
const logout = () => {
  fetchApi('http://127.0.0.1:8000/accounts/logout/', 'POST')
    .then(data => {
      localStorage.removeItem('token');
      window.location.href = 'index.html';
    })
    .catch(error => {
      console.error('Logout failed: ', error);
    });
};

// Check if user is logged in and update dashboard
window.onload = () => {
  if (window.location.pathname.endsWith('dashboard.html')) {
      fetchApi('http://127.0.0.1:8000/accounts/check-auth/', 'GET')
      .then(data => {
        document.getElementById('username').textContent = data.username;
      })
      .catch(error => {
        window.location.href = 'login.html';
      });
  }
};
