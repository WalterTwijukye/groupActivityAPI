const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
const PORT = 3001;

// Base64 encoding the credentials
const credentials = Buffer.from('Skununka:Nomisr123$$$$').toString('base64');

// Middleware to parse JSON bodies
app.use(express.json());
app.use(cors());

app.get('/grtng', async(req, res) => {
    res.status(201).json({ msg: 'Hey '})
});

// Endpoint to handle POST requests
app.post('/trackedEntityInstances1', async (req, res) => {
    const { enteredValue } = req.body; // Extract the enteredValue from the request body

    if (!enteredValue) {
        return res.status(400).json({ error: 'enteredValue is required' });
    }

    try {
        // Make the GET request to the external API
        const response = await axios.get(
            `https://ovckla.org/ovc/api/trackedEntityInstances/query.json?ouMode=ACCESSIBLE&program=RDEklSXCD4C&attribute=HLKc2AKR9jW:EQ:${enteredValue}&paging=false`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Basic ${credentials}`,
                },
            }
        );

        // Respond with the data received from the external API
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching data:', error.message);
        res.status(500).json({ error: 'Error fetching data' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
