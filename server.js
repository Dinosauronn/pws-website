const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');


const link = 'mongodb+srv://skykluiters:Q29e295666@fiosite.xfxfi.mongodb.net/?retryWrites=true&w=majority&appName=Fiosite'
const mongoose = require('mongoose');
mongoose.connect(link)
const userSchema = new mongoose.Schema({
    username: String,
});

const app = express();
const PORT = 3000;

// Middleware
app.use(express.static(path.join(__dirname, '/')));
app.use(bodyParser.json());


const User = mongoose.model('User', userSchema);

// Route om de inloggegevens op te slaan
app.post('/saveUserData', async (req, res) => {
    const { username } = req.body;

    const newUser = new User({ username });
    try {
        await newUser.save();
        console.log(`Inloggegevens opgeslagen voor gebruiker: ${username}`);
        res.send({ message: 'Inloggegevens succesvol opgeslagen.', userId: newUser._id });
    } catch (err) {
        console.error('Fout bij het opslaan van de data', err);
        res.status(500).send('Er is een fout opgetreden.');
    }
});

// Route voor de enquêtepagina
app.get('/waarschuwing', (req, res) => {
    res.sendFile(path.join(__dirname, 'waarschuwing.html'));
});

// Start de server
app.listen(PORT, () => {
    console.log(`Server draait op http://localhost:${PORT}`);
});
