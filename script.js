// -------------------------
// Load Blogs on Home Page
// -------------------------

async function loadBlogs() {

    const blogList = document.getElementById("blogList");

    // If this page doesn't have blogList (e.g., blog.html), do nothing
    if (!blogList) return;

    try {

        const response = await fetch("/blogs");
        const blogs = await response.json();

        blogList.innerHTML = "";

        if (blogs.length === 0) {
            blogList.innerHTML = "<p>No blog posts available.</p>";
            return;
        }

        blogs.forEach(blog => {

            blogList.innerHTML += `
                <div class="blog-card">
                    <h3>${blog.title}</h3>
                    <p>${blog.content}</p>
                </div>
            `;

        });

    } catch (error) {

        blogList.innerHTML = "<p>Unable to load blogs.</p>";

    }

}

// -------------------------
// Add Blog
// -------------------------

const blogForm = document.getElementById("blogForm");

if (blogForm) {

    blogForm.addEventListener("submit", async function (e) {

        e.preventDefault();

        const title = document.getElementById("title").value.trim();
        const content = document.getElementById("content").value.trim();
        const message = document.getElementById("message");

        if (title === "" || content === "") {

            message.style.color = "red";
            message.innerText = "Please fill all fields.";

            return;

        }

        try {

            const response = await fetch("/blogs", {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    title,
                    content
                })

            });

            const data = await response.json();

            message.style.color = "green";
            message.innerText = data.message;

            blogForm.reset();

        } catch (error) {

            message.style.color = "red";
            message.innerText = "Something went wrong.";

        }

    });

}

// -------------------------
// Load blogs when Home opens
// -------------------------

loadBlogs();