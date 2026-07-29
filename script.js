// Select form and message area

const form = document.getElementById("blogForm");

const message = document.getElementById("message");


// Add submit event

form.addEventListener("submit", function(event){

    // Stop page refresh

    event.preventDefault();


    // Get input values

    const title = document.getElementById("title").value.trim();

    const author = document.getElementById("author").value.trim();

    const content = document.getElementById("content").value.trim();



    // Validation

    if(title === "" || author === "" || content === ""){


        message.innerHTML = "❌ Please fill all fields";

        message.style.color = "red";


    }

    else{


        message.innerHTML = "✅ Blog added successfully!";

        message.style.color = "green";


        // Clear form

        form.reset();


    }


});