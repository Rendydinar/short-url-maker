const express = require('express');

const app = express();

const cors = require('cors');

const connectDB = require('./config/db');

// connect to db
connectDB();

app.use(express.json({ extended: false }));
app.use(cors());

// EJS template engine
app.set('view engine', 'ejs');

// Define Routes
app.use('/', require('./routes/index'));
app.use('/api/url', require('./routes/url'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server running on port ${PORT}`));