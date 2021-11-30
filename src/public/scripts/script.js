
let form = document.querySelector('form');
let formResponse = document.querySelector(".response");
let username = document.getElementById('name');
let email = document.getElementById('email');
let message = document.getElementById('message');



const onSuccess = (input, message) => {
    let parent = input.parentElement;
    let messageElement = parent.querySelector("small");
    messageElement.style.visibility = "hidden";
  messageElement.innerText = "";
  parent.classList.remove("error");
  parent.classList.add("success");
}

const onError = (input, message) => {
  let parent = input.parentElement;
    let messageElement = parent.querySelector("small");
    messageElement.style.visibility = "visible";
  messageElement.innerText = message;
  parent.classList.remove("success");
  parent.classList.add("error");
}


const validateFormInput = () => {
  var validRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  
  if (username.value.trim() === "" || username.value.length < 2) {
    onError(username, "Name is required and must not be less than two characters");
  } else {
    onSuccess(username);
  }
  if (email.value.match(validRegex) && email.value.length > 0) {
    onSuccess(email)
  } else {
    onError(email, "Please enter a valid email");
  }
  if (message.value.trim() === "") {
    onError(message, "Message field is required");
  } else {
    onSuccess(message)
  }
}

let postData = () => {
    
    let formData = new FormData(form);

    let Params = {
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        name: formData.get("name"),
        email: formData.get("email"),
        message: formData.get("message")
      }),
      method: "POST"
    }
    
  fetch("https://esdeathng.herokuapp.com/message", Params)
    .then((response) => {
      console.log(response, "the response")
      if (response.ok) {
        const successText = (
          `<li class="success--message">Your Message has been sent successfully</li>`
        );
        formResponse.innerHTML = successText;
        formResponse.style.visibility = "visible";
      }
      setTimeout(() => {
        formResponse.style.visibility = "hidden";
      }, 10000);
      return response.json()
    })
    .then((data) => {
      
        console.log(data, "the data");
      })
      .catch((err) => console.log(err));
   
}


const handleSubmit = (e) => {
  e.preventDefault();
  validateFormInput();
  postData();
  form.reset();
}

form.onsubmit = handleSubmit;