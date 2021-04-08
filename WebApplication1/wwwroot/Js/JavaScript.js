function postUser() {
    let user = {
        userEmail: document.getElementById("h1").value,
        userPassword: document.getElementById("h2").value,
        userFirstName: document.getElementById("h3").value,
        userLastName: document.getElementById("h4").value
    };
    fetch("api/User", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(user),
    }).then(response => {
        if (response.ok) {
            alert("new user added successfully");
        }
        else {
            response.json().then(error1 => { alert(JSON.stringify(error1.errors)); })
        }
    })
}

function newUser() {
    let div = document.getElementById("hide");
    div.hidden = false;  
}

function getUser() {
    let name = document.getElementById("name").value;
    let password = document.getElementById("pswd").value;
    fetch("api/User/" + name + "/" + password)
        .then(response => {
            return response.json();
        })
        .then(data1=> {
            if (data1.user != "") {
                sessionStorage.setItem('user', JSON.stringify(data1));
                window.location.href = "htmlpage1.html";
            }
            else
                alert("your name or password are incorrect :( please try again ")
        })
        .catch((error) => {
            alert("your name or password are incorrect :( please try again ")
        });
}

function putUser() {
    let oldUser = JSON.parse(sessionStorage.getItem("user"));
    let user = {
        userEmail: document.getElementById("h1").value,
        userPassword: document.getElementById("h2").value,
        userFirstName: document.getElementById("h3").value,
        userLastName: document.getElementById("h4").value,
    };
    fetch("api/User/" + oldUser.userId, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(user),
    }).then(response => {
        if (response.ok)
            alert("The update was successful");
        else
            response.json().then(error => { alert(JSON.stringify(error.errors)) })
    }).catch(error => {
        console.log(error);
        alert("Sorry, the update was not performed successfully");
    });
}