class User {
  constructor(id, name) {
    this.id = id;
    this.name = name;
    this.games = [];
  }

  static persistUser(userData) {
    let responseObject;
    fetch(`${app.url}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.id) {
            //Set current user & remove form overlay
          let user = new User(data.id, data.username);
          app.user = user;
          document.getElementById('form-wrapper').remove();
        } else {
            //Display errors on form
          for (let error in data) {
            let ele = document.querySelector(`label[for=${error}]`);
            ele.setAttribute("data-after", `${data[error]}`);
            document.addEventListener("click", (e) => {
              const labels = document.querySelectorAll("label");
              labels.forEach((label) => label.setAttribute("data-after", ""));
            });
          }
        }
      });
  }
}
