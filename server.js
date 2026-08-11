const express = require("express");

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());

// Serve frontend files
app.use(express.static(__dirname));

// In-memory blog data
let blogs = [
    {
        id: 1,
        title: "Welcome Blog",
        content: "This is the first blog post."
    }
];


// ==========================================
// FRONTEND PAGES
// ==========================================

// Home page
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

// Add Blog page
app.get("/blog", (req, res) => {
    res.sendFile(__dirname + "/blog.html");
});


// ==========================================
// GET ALL BLOGS
// ==========================================

app.get("/blogs", (req, res) => {
    res.json(blogs);
});


// ==========================================
// GET SINGLE BLOG
// ==========================================

app.get("/blogs/:id", (req, res) => {

    const id = parseInt(req.params.id);

    const blog = blogs.find(blog => blog.id === id);

    if (!blog) {
        return res.status(404).json({
            success: false,
            message: "Blog not found."
        });
    }

    res.json(blog);
});


// ==========================================
// ADD BLOG
// ==========================================

app.post("/blogs", (req, res) => {

    const { title, content } = req.body;

    if (!title || !content) {
        return res.status(400).json({
            success: false,
            message: "Please enter both title and content."
        });
    }

    const newBlog = {
        id: blogs.length > 0
            ? Math.max(...blogs.map(blog => blog.id)) + 1
            : 1,
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


// ==========================================
// EDIT BLOG
// ==========================================

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


// ==========================================
// DELETE BLOG
// ==========================================

app.delete("/blogs/:id", (req, res) => {

    const id = parseInt(req.params.id);

    const blogIndex = blogs.findIndex(
        blog => blog.id === id
    );

    if (blogIndex === -1) {
        return res.status(404).json({
            success: false,
            message: "Blog not found."
        });
    }

    const deletedBlog = blogs.splice(blogIndex, 1)[0];

    res.json({
        success: true,
        message: "Blog deleted successfully!",
        blog: deletedBlog
    });
});


// ==========================================
// START SERVER
// ==========================================

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});