const express = require('express');
const app = express();
const recordRoutes = require('./routes/recordRoutes');
const path = require("node:path");
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
})

app.use('/api/records', recordRoutes);

app.listen(PORT, () => {
    console.log(`Server listening on port http://localhost:${PORT}/`);
})