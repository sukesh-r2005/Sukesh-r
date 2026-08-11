// ==========================================
// LOAD ALL BLOGS
// ==========================================

async function loadBlogs() {

    const blogList =
        document.getElementById("blogList");

    if (!blogList) {
        return;
    }

    try {

        const response =
            await fetch("/blogs");

        const blogs =
            await response.json();

        blogList.innerHTML = "";


        if (blogs.length === 0) {

            blogList.innerHTML =
                "<p>No blog posts available.</p>";

            return;
        }


        blogs.forEach(blog => {

            blogList.innerHTML += `

                <div class="blog-card">

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

                </div>

            `;

        });

    } catch (error) {

        blogList.innerHTML =
            "<p>Unable to load blogs.</p>";

        console.error(error);
    }
}


// ==========================================
// ADD BLOG
// ==========================================

const blogForm =
    document.getElementById("blogForm");

if (blogForm) {

    blogForm.addEventListener(
        "submit",
        async function (event) {

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
                document.getElementById("message");


            if (title === "" || content === "") {

                message.style.color = "red";

                message.innerText =
                    "Please fill all fields.";

                return;
            }


            try {

                const response =
                    await fetch("/blogs", {

                        method: "POST",

                        headers: {
                            "Content-Type":
                                "application/json"
                        },

                        body: JSON.stringify({
                            title: title,
                            content: content
                        })

                    });


                const data =
                    await response.json();


                if (response.ok) {

                    message.style.color =
                        "green";

                    message.innerText =
                        "Blog added successfully!";


                    blogForm.reset();

                } else {

                    message.style.color =
                        "red";

                    message.innerText =
                        data.message;

                }

            } catch (error) {

                message.style.color =
                    "red";

                message.innerText =
                    "Something went wrong.";

                console.error(error);
            }

        }
    );
}


// ==========================================
// EDIT BLOG
// ==========================================

async function editBlog(id) {

    try {

        const response =
            await fetch(`/blogs/${id}`);


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


        const editId =
            document.getElementById(
                "editId"
            );


        const editTitle =
            document.getElementById(
                "editTitle"
            );


        const editContent =
            document.getElementById(
                "editContent"
            );


        editId.value =
            blog.id;


        editTitle.value =
            blog.title;


        editContent.value =
            blog.content;


        editSection.style.display =
            "block";


        editSection.scrollIntoView({
            behavior: "smooth"
        });


    } catch (error) {

        alert("Unable to load blog.");

        console.error(error);

    }
}


// ==========================================
// UPDATE BLOG
// ==========================================

const editForm =
    document.getElementById("editForm");

if (editForm) {

    editForm.addEventListener(
        "submit",
        async function (event) {

            event.preventDefault();


            const id =
                document
                    .getElementById("editId")
                    .value;


            const title =
                document
                    .getElementById("editTitle")
                    .value
                    .trim();


            const content =
                document
                    .getElementById("editContent")
                    .value
                    .trim();


            const editMessage =
                document.getElementById(
                    "editMessage"
                );


            if (title === "" || content === "") {

                editMessage.style.color =
                    "red";

                editMessage.innerText =
                    "Please fill all fields.";

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

                            body: JSON.stringify({
                                title: title,
                                content: content
                            })

                        }
                    );


                const data =
                    await response.json();


                if (response.ok) {

                    editMessage.style.color =
                        "green";

                    editMessage.innerText =
                        "Blog updated successfully!";


                    await loadBlogs();


                    setTimeout(() => {

                        document.getElementById(
                            "editSection"
                        ).style.display = "none";

                    }, 1000);


                } else {

                    editMessage.style.color =
                        "red";

                    editMessage.innerText =
                        data.message;

                }

            } catch (error) {

                editMessage.style.color =
                    "red";

                editMessage.innerText =
                    "Something went wrong.";

                console.error(error);
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
        function () {

            document.getElementById(
                "editSection"
            ).style.display = "none";

        }
    );
}


// ==========================================
// DELETE BLOG
// ==========================================

async function deleteBlog(id) {

    const confirmation =
        confirm(
            "Are you sure you want to delete this blog?"
        );


    if (!confirmation) {

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


        if (response.ok) {

            alert(
                "Blog deleted successfully!"
            );

            loadBlogs();

        } else {

            alert(data.message);

        }

    } catch (error) {

        alert(
            "Unable to delete the blog."
        );

        console.error(error);

    }
}


// ==========================================
// LOAD BLOGS WHEN HOME PAGE OPENS
// ==========================================

loadBlogs();