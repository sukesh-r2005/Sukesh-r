const btn = document.getElementById("btn");

btn.addEventListener("click", () => {

alert("Welcome to Express!");

});

const form = document.getElementById("blogForm");

const blogList = document.getElementById("blogList");

const message = document.getElementById("message");

// Load blogs
async function loadBlogs(){

const response = await fetch("/blogs");

const blogs = await response.json();

blogList.innerHTML = "";

blogs.forEach(blog=>{

blogList.innerHTML += `
<div class="blog">
<h3>${blog.title}</h3>
<p>${blog.content}</p>
</div>
`;

});

}

loadBlogs();

// Add blog

form.addEventListener("submit",async function(e){

e.preventDefault();

const title=document.getElementById("title").value.trim();

const content=document.getElementById("content").value.trim();

const response=await fetch("/blogs",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({
title,
content
})

});

const data=await response.json();

message.innerHTML=data.message;

form.reset();

loadBlogs();

});