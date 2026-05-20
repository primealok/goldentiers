const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

const DATA_FILE = './data.json';

function getPlayers() {
    return JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
}

function savePlayers(players) {
    fs.writeFileSync(DATA_FILE, JSON.stringify(players, null, 2));
}

app.get('/api/players', (req, res) => {
    const players = getPlayers();
    res.json(players);
});

app.post('/api/add-player', (req, res) => {
    const { name, tier } = req.body;

    if (!name || !tier) {
        return res.status(400).json({
            error: 'Name and tier required'
        });
    }

    const players = getPlayers();

    players.push({
        name,
        tier
    });

    savePlayers(players);

    res.json({
        success: true,
        message: 'Player added'
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});