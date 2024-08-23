const form = document.getElementById("form");
const getUsername = document.getElementById("username");
const getPassword = document.getElementById("password");

function showError(input, message) {
    const formControl = input.parentElement;
    formControl.className = 'form-control error';
    const small = formControl.querySelector('small');
    small.innerText = message;
}

function checkRequired(inputArray){
    inputArray.forEach(function(input){
        if(input.value.trim() === ''){
            showError(input,`${getFieldId(input)} is required.`);
        }
    })
}

function getFieldId(input){
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

form.addEventListener("submit", function (e) {
    e.preventDefault();
    checkRequired([getUsername,getPassword]);

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    
    if (username && password) {
        let userData = JSON.parse(localStorage.getItem("user")) || [];
        const userMatch = userData.some(user => user.username === username);
        if (userMatch) {
            alert("Username is already exist, Try another one.");
        } else {
            userData.push({username, password});
            localStorage.setItem("user", JSON.stringify(userData));
            form.reset();
            window.location.href = 'login.html';
        }
    } else {
        showError(input,`${getFieldId(input)} is required.`);
    }
});
