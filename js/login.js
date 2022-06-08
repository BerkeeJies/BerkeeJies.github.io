console.log("BOK")

let login = () => {
    var username = document.getElementById("usernameInput").value;
    var password = document.getElementById("passwordInput").value;
    if(username == "root" && password == "root")
        window.location.href = 'home.html';

    console.log(username, password)
}