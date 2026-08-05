const express = require("express");

const app = express();
const PORT = 3000;

// Parse JSON requests
app.use(express.json());

// Serve static files from the current folder
app.use(express.static(__dirname));

// Home page
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

// GET route
app.get("/blogs", (req, res) => {
    res.json([
        {
            id: 1,
            title: "My First Blog",
            content: "Learning Express.js"
        }
    ]);
});

// POST route
app.post("/blogs", (req, res) => {
    const { title, content } = req.body;

    res.json({
        message: "Blog added successfully!",
        blog: {
            title,
            content
        }
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});