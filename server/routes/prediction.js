const express = require('express');
const axios = require('axios');
const router = express.Router();

// Predict ASD
router.post('/assess', async (req, res) => {
    try {
        const { features } = req.body;
        const aiServiceUrl = process.env.AI_SERVICE_URL || 'http://localhost:8000';

        const response = await axios.post(`${aiServiceUrl}/predict`, { features });
        res.json(response.data);
    } catch (err) {
        res.status(500).json({ message: 'AI Service Error', error: err.message });
    }
});

module.exports = router;
