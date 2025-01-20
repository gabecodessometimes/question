const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = 3000;

// Enable CORS to allow frontend communication
app.use(cors());
app.use(express.json());

const googleScriptUrl = 'https://script.google.com/macros/s/AKfycby0EKCCwKZrcuESAT4ppXUTHRiEpJ3D3Sat78DBZjV1uM-zDfrpfxCT6cC3-FOWP_oUJQ/exec';

// Endpoint to forward data to Google Apps Script
app.post('/submit', async (req, res) => {
  try {
    // Forward the request to Google Apps Script
    const response = await axios.post(googleScriptUrl, req.body);
    res.json(response.data); // Return the response to the frontend
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error communicating with Google Apps Script' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
