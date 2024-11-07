require('dotenv').config();
const express = require('express');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;
const API_KEY = process.env.WEATHER_API_KEY;

// Define a route to fetch weather data by city name
app.get('/weather/city', async (req, res) => {
    const { city } = req.query;
    if (!city) return res.status(400).json({ error: 'City name is required' });

    try {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather`, {
            params: {
                q: city,
                appid: API_KEY,
                units: 'metric',
            },
        });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Define a route to fetch weather data by coordinates
app.get('/weather/coordinates', async (req, res) => {
    const { lat, lon } = req.query;
    console.log('Latitude:', lat); // Log latitude
    console.log('Longitude:', lon); // Log longitude

    if (!lat || !lon) return res.status(400).json({ error: 'Latitude and Longitude are required' });

    try {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather`, {
            params: {
                lat,
                lon,
                appid: API_KEY,
                units: 'metric',
            },
        });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// Define a route to fetch 5-day forecast data by city ID
app.get('/forecast/cityid', async (req, res) => {
    const { cityid } = req.query;
    if (!cityid) return res.status(400).json({ error: 'City ID is required' });

    try {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/forecast`, {
            params: {
                id: cityid,
                appid: API_KEY,
                units: 'metric',
            },
        });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
