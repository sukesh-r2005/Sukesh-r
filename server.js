const express = require("express");

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());

// Serve static files
app.use(express.static(__dirname));

// Blog data stored in JavaScript array
let blogs = [
    {
        id: 1,
        title: "Welcome Blog",
        content: "This is the first blog post."
    }
];

// -------------------------
// Home Page
// -------------------------

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

// -------------------------
// Blog Page
// -------------------------

app.get("/blog", (req, res) => {
    res.sendFile(__dirname + "/blog.html");
});

// -------------------------
// GET - Get all blogs
// -------------------------

app.get("/blogs", (req, res) => {
    res.json(blogs);
});

// -------------------------
// POST - Add a new blog
// -------------------------

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
        title: title,
        content: content
    };

    blogs.push(newBlog);

    res.status(201).json({
        success: true,
        message: "Blog added successfully!",
        blog: newBlog
    });
});

// -------------------------
// PUT - Edit an existing blog
// -------------------------

app.put("/blogs/:id", (req, res) => {

    const id = parseInt(req.params.id);

    const { title, content } = req.body;

    const blog = blogs.find(blog => blog.id === id);

    if (!blog) {
        return res.status(404).json({
            success: false,
            message: "Blog not found."
        });
    }

    if (!title || !content) {
        return res.status(400).json({
            success: false,
            message: "Please enter both title and content."
        });
    }

    blog.title = title;
    blog.content = content;

    res.json({
        success: true,
        message: "Blog updated successfully!",
        blog: blog
    });
});

// -------------------------
// Start Server
// -------------------------

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});