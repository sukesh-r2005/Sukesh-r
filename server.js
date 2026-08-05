const express = require("express");

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(express.static(__dirname));

// Store blogs in a JavaScript array
let blogs = [
    {
        id: 1,
        title: "My First Blog",
        content: "Learning Express.js"
    }
];

// Home page
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

// GET all blogs
app.get("/blogs", (req, res) => {
    res.json(blogs);
});

// POST - Add a blog
app.post("/blogs", (req, res) => {

    const { title, content } = req.body;

    if (!title || !content) {
        return res.status(400).json({
            message: "Please fill all fields."
        });
    }

    const newBlog = {
        id: blogs.length + 1,
        title,
        content
    };

    blogs.push(newBlog);

    res.status(201).json({
        message: "Blog added successfully!",
        blog: newBlog
    });

});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});