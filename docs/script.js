// ==========================================
// DEFAULT BLOGS
// ==========================================

const defaultBlogs = [
    {
        id: 1,
        title: "Welcome Blog",
        content: "This is my first blog post."
    }
];


// ==========================================
// GET BLOGS FROM LOCAL STORAGE
// ==========================================

function getBlogs() {

    const storedBlogs =
        localStorage.getItem("blogs");

    if (storedBlogs) {

        return JSON.parse(storedBlogs);

    }

    localStorage.setItem(
        "blogs",
        JSON.stringify(defaultBlogs)
    );

    return defaultBlogs;
}


// ==========================================
// SAVE BLOGS
// ==========================================

function saveBlogs(blogs) {

    localStorage.setItem(
        "blogs",
        JSON.stringify(blogs)
    );

}


// ==========================================
// DISPLAY ALL BLOGS
// ==========================================

function loadBlogs() {

    const blogList =
        document.getElementById("blogList");

    const loadingMessage =
        document.getElementById(
            "loadingMessage"
        );

    if (!blogList) {
        return;
    }


    const blogs = getBlogs();

    blogList.innerHTML = "";


    if (loadingMessage) {

        loadingMessage.style.display =
            "none";

    }


    if (blogs.length === 0) {

        blogList.innerHTML =
            "<p>No blog posts available.</p>";

        return;
    }


    blogs.forEach(blog => {

        const card =
            document.createElement("div");

        card.className =
            "blog-card";


        card.innerHTML = `

            <h3>
                ${blog.title}
            </h3>

            <p>
                ${blog.content}
            </p>

            <button
                class="edit-button"
                onclick="editBlog(${blog.id})"
            >
                Edit
            </button>

            <button
                class="delete-button"
                onclick="deleteBlog(${blog.id})"
            >
                Delete
            </button>

        `;


        blogList.appendChild(card);

    });

}


// ==========================================
// ADD BLOG
// ==========================================

const blogForm =
    document.getElementById("blogForm");


if (blogForm) {

    blogForm.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            const title =
                document
                    .getElementById("title")
                    .value
                    .trim();


            const content =
                document
                    .getElementById("content")
                    .value
                    .trim();


            const message =
                document.getElementById(
                    "message"
                );


            if (!title || !content) {

                message.style.color =
                    "red";

                message.innerText =
                    "Please fill all fields.";

                return;
            }


            const blogs =
                getBlogs();


            const newBlog = {

                id:
                    blogs.length > 0
                        ? Math.max(
                            ...blogs.map(
                                blog =>
                                    blog.id
                            )
                        ) + 1
                        : 1,

                title:
                    title,

                content:
                    content

            };


            blogs.push(newBlog);


            saveBlogs(blogs);


            message.style.color =
                "green";

            message.innerText =
                "Blog added successfully!";


            blogForm.reset();

        }
    );

}


// ==========================================
// EDIT BLOG
// ==========================================

function editBlog(id) {

    const blogs =
        getBlogs();


    const blog =
        blogs.find(
            blog =>
                blog.id === id
        );


    if (!blog) {

        alert("Blog not found.");

        return;
    }


    const editSection =
        document.getElementById(
            "editSection"
        );


    if (!editSection) {

        return;
    }


    document.getElementById(
        "editId"
    ).value =
        blog.id;


    document.getElementById(
        "editTitle"
    ).value =
        blog.title;


    document.getElementById(
        "editContent"
    ).value =
        blog.content;


    editSection.style.display =
        "block";


    editSection.scrollIntoView({
        behavior: "smooth"
    });

}


// ==========================================
// UPDATE BLOG
// ==========================================

const editForm =
    document.getElementById(
        "editForm"
    );


if (editForm) {

    editForm.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            const id =
                parseInt(
                    document.getElementById(
                        "editId"
                    ).value
                );


            const title =
                document.getElementById(
                    "editTitle"
                ).value.trim();


            const content =
                document.getElementById(
                    "editContent"
                ).value.trim();


            const message =
                document.getElementById(
                    "editMessage"
                );


            if (!title || !content) {

                message.style.color =
                    "red";

                message.innerText =
                    "Please fill all fields.";

                return;
            }


            const blogs =
                getBlogs();


            const blog =
                blogs.find(
                    blog =>
                        blog.id === id
                );


            if (!blog) {

                message.style.color =
                    "red";

                message.innerText =
                    "Blog not found.";

                return;
            }


            blog.title =
                title;

            blog.content =
                content;


            saveBlogs(blogs);


            message.style.color =
                "green";

            message.innerText =
                "Blog updated successfully!";


            loadBlogs();


            setTimeout(
                function() {

                    document.getElementById(
                        "editSection"
                    ).style.display =
                        "none";

                },
                1000
            );

        }
    );

}


// ==========================================
// CANCEL EDIT
// ==========================================

const cancelEdit =
    document.getElementById(
        "cancelEdit"
    );


if (cancelEdit) {

    cancelEdit.addEventListener(
        "click",
        function() {

            document.getElementById(
                "editSection"
            ).style.display =
                "none";

        }
    );

}


// ==========================================
// DELETE BLOG
// ==========================================

function deleteBlog(id) {

    const confirmation =
        confirm(
            "Are you sure you want to delete this blog?"
        );


    if (!confirmation) {

        return;

    }


    let blogs =
        getBlogs();


    blogs =
        blogs.filter(
            blog =>
                blog.id !== id
        );


    saveBlogs(blogs);


    alert(
        "Blog deleted successfully!"
    );


    loadBlogs();

}


// ==========================================
// LOAD BLOGS
// ==========================================

loadBlogs();