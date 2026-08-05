const btn = document.getElementById("btn");

btn.addEventListener("click", () => {

alert("Welcome to Express!");

});

const form = document.getElementById("blogForm");

form.addEventListener("submit", function(e){

e.preventDefault();

const title = document.getElementById("title").value;

const content = document.getElementById("content").value;

fetch("/blogs",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({
title,
content
})

})
.then(response=>response.json())
.then(data=>{

document.getElementById("message").innerHTML=data.message;

form.reset();

});

});