const express = require('express');
const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
    res.send('Hello World from codomaX Internship!');
});

app.listen(PORT, () => {
    console.log(`Server is running smoothly at http://localhost:${PORT}`);
});