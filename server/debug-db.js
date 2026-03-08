require('dotenv').config();
const mongoose = require('mongoose');

console.log('Attempting to connect to MongoDB...');
console.log('URI:', process.env.MONGODB_URI.replace(/:([^@]+)@/, ':****@'));

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('✅ Connected successfully');
        process.exit(0);
    })
    .catch(err => {
        console.error('❌ Connection failed');
        console.error('Error Name:', err.name);
        console.error('Error Message:', err.message);
        if (err.reason) console.error('Error Reason:', JSON.stringify(err.reason, null, 2));
        process.exit(1);
    });
