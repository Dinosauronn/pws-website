let userId = null; // Variabele om de userId op te slaan

// Login form handler
document.getElementById('loginForm')?.addEventListener('submit', function(e) {
    e.preventDefault(); // Voorkom herladen van de pagina

    let username = document.getElementById('username').value;

    if (username && password) {
        // Stuur de inloggegevens naar de server
        fetch('/saveUserData', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username: username }),
        })
        .then(response => response.json()) // Verander dit naar response.json() om JSON data te krijgen
        .then(data => {
            if (data.message === 'Inloggegevens succesvol opgeslagen.') {
                localStorage.setItem('userId', data.userId); // Opslaan van userId in local storage
                window.location.href = '/waarschuwing';  // Stuur door naar de waarschuwingspagina
            } else {
                document.getElementById('message').textContent = 'Inloggen mislukt.';
            }
        })
        .catch(error => {
            console.error('Error:', error);
            document.getElementById('message').textContent = 'Er is iets misgegaan.';
        });
    } else {
        document.getElementById('message').textContent = 'Vul alle velden in!';
    }
});


