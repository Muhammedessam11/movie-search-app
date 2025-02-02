const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const OMDB_API_KEY = 'your-omdb-api-key'; // Replace with your OMDB API key
const OMDB_URL = 'http://www.omdbapi.com/';

// Search for movies
app.get('/search', async (req, res) => {
  const { query } = req.query;
  try {
    const response = await axios.get(OMDB_URL, {
      params: {
        apikey: OMDB_API_KEY,
        s: query,
      },
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch data from OMDB API' });
  }
});

// Get movie details by ID
app.get('/movie/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const response = await axios.get(OMDB_URL, {
      params: {
        apikey: OMDB_API_KEY,
        i: id,
      },
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch movie details' });
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
