// ======================================
// LOAD BLOGS
// ======================================

async function loadBlogs() {

    const blogList = document.getElementById("blogList");

    // If blogList doesn't exist, stop
    if (!blogList) {
        return;
    }

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

                    <button
                        class="edit-button"
                        onclick="editBlog(${blog.id})"
                    >
                        Edit
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


// ======================================
// ADD BLOG
// ======================================

const blogForm = document.getElementById("blogForm");

if (blogForm) {

    blogForm.addEventListener("submit", async function (event) {

        event.preventDefault();

        const title =
            document.getElementById("title").value.trim();

        const content =
            document.getElementById("content").value.trim();

        const message =
            document.getElementById("message");


        if (title === "" || content === "") {

            message.style.color = "red";

            message.innerText =
                "Please fill all fields.";

            return;
        }


        try {

            const response = await fetch("/blogs", {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    title: title,
                    content: content
                })

            });


            const data = await response.json();


            if (response.ok) {

                message.style.color = "green";

                message.innerText =
                    "Blog added successfully!";

                blogForm.reset();

            } else {

                message.style.color = "red";

                message.innerText =
                    data.message;

            }

        } catch (error) {

            message.style.color = "red";

            message.innerText =
                "Something went wrong.";

            console.error(error);
        }

    });

}


// ======================================
// EDIT BLOG
// ======================================

async function editBlog(id) {

    try {

        const response =
            await fetch(`/blogs/${id}`);

        /*
        The server currently has no separate
        GET /blogs/:id requirement, so we get
        all blogs and find the selected one.
        */

        if (!response.ok) {

            throw new Error("Unable to get blog.");

        }

    } catch (error) {

        // Get all blogs instead
        const response =
            await fetch("/blogs");

        const blogs =
            await response.json();

        const blog =
            blogs.find(blog => blog.id === id);

        if (!blog) {

            alert("Blog not found.");

            return;
        }

        openEditForm(blog);
    }
}


// ======================================
// OPEN EDIT FORM
// ======================================

function openEditForm(blog) {

    const editSection =
        document.getElementById("editSection");

    const editId =
        document.getElementById("editId");

    const editTitle =
        document.getElementById("editTitle");

    const editContent =
        document.getElementById("editContent");


    editId.value = blog.id;

    editTitle.value = blog.title;

    editContent.value = blog.content;


    editSection.style.display = "block";

    editSection.scrollIntoView({
        behavior: "smooth"
    });
}


// ======================================
// UPDATE BLOG
// ======================================

const editForm =
    document.getElementById("editForm");

if (editForm) {

    editForm.addEventListener(
        "submit",
        async function (event) {

            event.preventDefault();


            const id =
                document.getElementById("editId").value;

            const title =
                document.getElementById("editTitle")
                .value
                .trim();

            const content =
                document.getElementById("editContent")
                .value
                .trim();

            const editMessage =
                document.getElementById("editMessage");


            if (title === "" || content === "") {

                editMessage.style.color = "red";

                editMessage.innerText =
                    "Please fill all fields.";

                return;
            }


            try {

                const response = await fetch(
                    `/blogs/${id}`,
                    {

                        method: "PUT",

                        headers: {
                            "Content-Type": "application/json"
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

                    // Reload blogs
                    loadBlogs();

                    // Hide form after update
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


// ======================================
// CANCEL EDIT
// ======================================

const cancelEdit =
    document.getElementById("cancelEdit");

if (cancelEdit) {

    cancelEdit.addEventListener("click", function () {

        document.getElementById(
            "editSection"
        ).style.display = "none";

    });

}


// ======================================
// LOAD BLOGS WHEN PAGE OPENS
// ======================================

loadBlogs();