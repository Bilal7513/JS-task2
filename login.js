const form = document.getElementById("form");
const username = document.getElementById("username");
const password = document.getElementById("password");

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

form.addEventListener("submit", e => {
    e.preventDefault();
    checkRequired([username,password]);
    let userData = JSON.parse(localStorage.getItem("user")) || [];

    const userinput = userData.find(user => user.username === username.value && user.password === password.value);
    if(userinput){
        localStorage.setItem('loginUser', username.value);
        window.location.href = 'index.html';
    } else {
        alert('Incorrect username or password');
    }

});
