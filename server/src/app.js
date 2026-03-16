const express = require('express');
const path = require('path');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Phục vụ static files (ảnh upload, css, js của client)
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));
app.use(express.static(path.join(__dirname, '../../client/dist'), { index: false })); // bundle.js, assets - index.html handled by SSR

// API routes
app.use('/api/villas', require('./routes/villaRoutes'));
// ... các route khác

// SSR - serve React for all unhandled GET requests
const ssrHandler = require('./ssrHandler');
app.use((req, res, next) => {
    if (req.method === 'GET') return ssrHandler(req, res);
    next();
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});