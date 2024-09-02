const input = document.getElementById('input');
const addBtn = document.getElementById('add-btn');
const taskList = document.getElementById('task-list');
const userLogin = document.getElementById('user-login');

function createList(value = ''){
    const list = document.createElement('li');
    list.innerHTML = `
        ${value || input.value}<span><i class="delete fa fa-trash"></i><i class="edit fa-solid fa-pen-to-square"></i></span>`;
        taskList.appendChild(list);
        list.addEventListener('click', e => {
        if(e.target.tagName === 'LI'){
            e.target.classList.toggle('checked');
            loadData();
        }
        if(e.target.classList.contains('delete')){
            list.remove();
            loadData();
        }
        if(e.target.classList.contains('edit')){
            const edit = list.innerHTML = `<input class="edit-text" type="text" id="edit-text"><button class="edit-btn" id="edit-btn">Edit</button>`;
            const editText = document.getElementById('edit-text');
            editText.focus();
            const editBtn = document.getElementById('edit-btn');
            editBtn.addEventListener('click', () => {
                if(editText.value.trim()){
                    list.innerHTML = `
                    ${editText.value}<span><i class="delete fa fa-trash"></i><i class="edit fa-solid fa-pen-to-square"></i></span>
                    `;
                    loadData();
                } else {
                    alert("Input can't be empty");
                }
            });
            editText.addEventListener("keypress", function(event) {
                if (event.key === "Enter") {
                  event.preventDefault();
                  editBtn.click();
                }
            });
        }
        
    });
    loadData();
    input.value = '';
};

function loadData(){
    const activeUser = localStorage.getItem('loginUser');
    const data = document.querySelectorAll('#task-list li');
    const dataList = [];
    data.forEach(list => {
        dataList.push(list.firstChild.textContent.trim());
    });
    localStorage.setItem(`to-do-list_${activeUser}`, JSON.stringify(dataList));
};

function getData(){
    const activeUser = localStorage.getItem('loginUser');
    if(activeUser){
        userLogin.innerHTML = activeUser;
        const storedList = JSON.parse(localStorage.getItem(`to-do-list_${activeUser}`));
        if(storedList){
            storedList.forEach(item => {
                createList(item);
            })
        }
    }
};

function removeLoginUser(){
    localStorage.removeItem('loginUser');
}

addBtn.addEventListener('click', () => {
    if(input.value.trim()){
        createList();
    } else {
        alert('Write something!');
    };
});

input.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      addBtn.click();
    }
});

window.onload = getData();