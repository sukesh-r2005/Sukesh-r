const express = require("express");

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());

// Serve static files from current folder
app.use(express.static(__dirname));

// Store blog posts in a JavaScript array
let blogs = [
    {
        id: 1,
        title: "Welcome Blog",
        content: "This is the first blog post."
    }
];

// Home Page
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

// Blog Page
app.get("/blog", (req, res) => {
    res.sendFile(__dirname + "/blog.html");
});

// GET - View all blogs
app.get("/blogs", (req, res) => {
    res.json(blogs);
});

// POST - Add a new blog
app.post("/blogs", (req, res) => {

    const { title, content } = req.body;

    if (!title || !content) {
        return res.status(400).json({
            success: false,
            message: "Please enter both title and content."
        });
    }

    const newBlog = {
        id: blogs.length + 1,
        title,
        content
    };

    blogs.push(newBlog);

    res.status(201).json({
        success: true,
        message: "Blog added successfully!",
        blog: newBlog
    });

});

// Optional API to fetch a single blog
app.get("/blogs/:id", (req, res) => {

    const id = parseInt(req.params.id);

    const blog = blogs.find(b => b.id === id);

    if (!blog) {
        return res.status(404).json({
            success: false,
            message: "Blog not found."
        });
    }

    res.json(blog);

});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});