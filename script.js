const blogList =
    document.getElementById("blogList");

const loadingMessage =
    document.getElementById("loadingMessage");


// ==========================================
// LOAD BLOGS
// ==========================================

async function loadBlogs() {

    if (!blogList) {
        return;
    }


    try {

        const response =
            await fetch("/blogs");


        if (!response.ok) {

            throw new Error(
                "Unable to load blogs."
            );

        }


        const blogs =
            await response.json();


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
                document.createElement("article");


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


    } catch (error) {

        console.error(error);


        if (loadingMessage) {

            loadingMessage.textContent =
                "Unable to load blogs.";

        }

    }

}


// ==========================================
// ESCAPE HTML
// Prevents HTML injection in blog content
// ==========================================

function escapeHTML(value) {

    const div =
        document.createElement("div");


    div.textContent =
        value;


    return div.innerHTML;

}


// ==========================================
// ADD BLOG
// ==========================================

const blogForm =
    document.getElementById("blogForm");


if (blogForm) {

    blogForm.addEventListener(
        "submit",
        async event => {

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
                document
                    .getElementById("message");


            if (!title || !content) {

                message.textContent =
                    "Please fill all fields.";

                message.style.color =
                    "red";

                return;
            }


            try {

                const response =
                    await fetch(
                        "/blogs",
                        {

                            method: "POST",

                            headers: {
                                "Content-Type":
                                    "application/json"
                            },

                            body:
                                JSON.stringify({
                                    title,
                                    content
                                })

                        }
                    );


                const data =
                    await response.json();


                if (!response.ok) {

                    throw new Error(
                        data.message
                    );

                }


                message.textContent =
                    "Blog added successfully!";

                message.style.color =
                    "green";


                blogForm.reset();


            } catch (error) {

                message.textContent =
                    error.message;

                message.style.color =
                    "red";

            }

        }
    );

}


// ==========================================
// GET SINGLE BLOG
// ==========================================

async function editBlog(id) {

    try {

        const response =
            await fetch(
                `/blogs/${id}`
            );


        if (!response.ok) {

            throw new Error(
                "Blog not found."
            );

        }


        const blog =
            await response.json();


        const editSection =
            document.getElementById(
                "editSection"
            );


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


    } catch (error) {

        alert(error.message);

    }

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
        async event => {

            event.preventDefault();


            const id =
                document
                    .getElementById(
                        "editId"
                    )
                    .value;


            const title =
                document
                    .getElementById(
                        "editTitle"
                    )
                    .value
                    .trim();


            const content =
                document
                    .getElementById(
                        "editContent"
                    )
                    .value
                    .trim();


            const message =
                document
                    .getElementById(
                        "editMessage"
                    );


            if (!title || !content) {

                message.textContent =
                    "Please fill all fields.";

                message.style.color =
                    "red";

                return;
            }


            try {

                const response =
                    await fetch(
                        `/blogs/${id}`,
                        {

                            method: "PUT",

                            headers: {
                                "Content-Type":
                                    "application/json"
                            },

                            body:
                                JSON.stringify({
                                    title,
                                    content
                                })

                        }
                    );


                const data =
                    await response.json();


                if (!response.ok) {

                    throw new Error(
                        data.message
                    );

                }


                message.textContent =
                    "Blog updated successfully!";

                message.style.color =
                    "green";


                await loadBlogs();


                setTimeout(() => {

                    document.getElementById(
                        "editSection"
                    ).style.display =
                        "none";

                }, 700);


            } catch (error) {

                message.textContent =
                    error.message;

                message.style.color =
                    "red";

            }

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

async function deleteBlog(id) {

    const confirmed =
        window.confirm(
            "Are you sure you want to delete this blog?"
        );


    if (!confirmed) {
        return;
    }


    try {

        const response =
            await fetch(
                `/blogs/${id}`,
                {
                    method: "DELETE"
                }
            );


        const data =
            await response.json();


        if (!response.ok) {

            throw new Error(
                data.message
            );

        }


        await loadBlogs();


    } catch (error) {

        alert(error.message);

    }

}


// ==========================================
// INITIALIZE
// ==========================================

loadBlogs();