let form = document.querySelector('form');

let handleSubmit = (e) => {
    e.preventDefault();

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
    fetch("http://localhost:8000/message", Params)
        .then(response => response.json())
        .then(data => {
            let error = document.querySelector('.error');
            const errorsArray = data.error
            let list;
            for (let i of errorsArray) {
                list = `<li class="error--message">${i.msg}</li>`;
            }
            error.innerHTML = list;
            console.log(data, "the data")
        })
        .catch(err => console.log(err));
    form.reset();
}

form.onsubmit = handleSubmit;