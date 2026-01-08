const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Serve static frontend files
app.use(express.static(__dirname));

// For parsing JSON
app.use(express.json());

// Root route
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Weather API route
app.get('/weather', async (req, res) => {
  const city = req.query.city;
  if (!city) return res.status(400).json({ error: 'City name is required' });

  try {
    const apiKey = process.env.API_KEY;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Unable to fetch weather data' });
  }
});

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));

