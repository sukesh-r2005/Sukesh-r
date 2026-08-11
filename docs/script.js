const blogList =
    document.getElementById("blogList");


// ==========================================
// DEFAULT DATA
// ==========================================

const defaultBlogs = [
    {
        id: 1,
        title: "Welcome Blog",
        content: "This is my first blog post."
    }
];


// ==========================================
// STORAGE
// ==========================================

function getBlogs() {

    const stored =
        localStorage.getItem("blogs");


    if (stored) {

        return JSON.parse(stored);

    }


    localStorage.setItem(
        "blogs",
        JSON.stringify(defaultBlogs)
    );


    return [...defaultBlogs];

}


function saveBlogs(blogs) {

    localStorage.setItem(
        "blogs",
        JSON.stringify(blogs)
    );

}


// ==========================================
// ESCAPE HTML
// ==========================================

function escapeHTML(value) {

    const div =
        document.createElement("div");

    div.textContent =
        value;

    return div.innerHTML;

}


// ==========================================
// DISPLAY BLOGS
// ==========================================

function loadBlogs() {

    if (!blogList) {
        return;
    }


    const blogs =
        getBlogs();


    blogList.innerHTML =
        "";


    if (blogs.length === 0) {

        blogList.innerHTML =
            "<p>No blog posts available.</p>";

        return;
    }


    blogs.forEach(blog => {

        const card =
            document.createElement(
                "article"
            );


        card.className =
            "blog-card";


        card.innerHTML = `

            <h3>
                ${escapeHTML(blog.title)}
            </h3>

            <p>
                ${escapeHTML(blog.content)}
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
    document.getElementById(
        "blogForm"
    );


if (blogForm) {

    blogForm.addEventListener(
        "submit",
        event => {

            event.preventDefault();


            const title =
                document
                    .getElementById(
                        "title"
                    )
                    .value
                    .trim();


            const content =
                document
                    .getElementById(
                        "content"
                    )
                    .value
                    .trim();


            const message =
                document.getElementById(
                    "message"
                );


            if (!title || !content) {

                message.textContent =
                    "Please fill all fields.";

                message.style.color =
                    "red";

                return;
            }


            const blogs =
                getBlogs();


            const newId =
                blogs.length > 0
                    ? Math.max(
                        ...blogs.map(
                            blog =>
                                blog.id
                        )
                    ) + 1
                    : 1;


            blogs.push({

                id: newId,

                title: title,

                content: content

            });


            saveBlogs(blogs);


            message.textContent =
                "Blog added successfully!";

            message.style.color =
                "green";


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
            item =>
                item.id === id
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
        event => {

            event.preventDefault();


            const id =
                Number(
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

                message.textContent =
                    "Please fill all fields.";

                message.style.color =
                    "red";

                return;

            }


            const blogs =
                getBlogs();


            const blog =
                blogs.find(
                    item =>
                        item.id === id
                );


            if (!blog) {

                message.textContent =
                    "Blog not found.";

                message.style.color =
                    "red";

                return;

            }


            blog.title =
                title;

            blog.content =
                content;


            saveBlogs(blogs);


            message.textContent =
                "Blog updated successfully!";

            message.style.color =
                "green";


            loadBlogs();


            setTimeout(
                () => {

                    document.getElementById(
                        "editSection"
                    ).style.display =
                        "none";

                },
                700
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
        () => {

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

    const confirmed =
        window.confirm(
            "Are you sure you want to delete this blog?"
        );


    if (!confirmed) {

        return;

    }


    const blogs =
        getBlogs();


    const updatedBlogs =
        blogs.filter(
            blog =>
                blog.id !== id
        );


    saveBlogs(
        updatedBlogs
    );


    loadBlogs();

}


// ==========================================
// INITIAL LOAD
// ==========================================

loadBlogs();