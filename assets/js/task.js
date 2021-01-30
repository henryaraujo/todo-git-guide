const action = document.querySelector('.action');
const input = document.querySelector('.input');
const listGroup = document.querySelector('.list__group');
const titleHeader = document.querySelector("#title")
const taskCreated = document.querySelector("#task-created")
const taskCompleted = document.querySelector("#task-completed")


class Task {
    constructor() {
        this.status = false;
        this.date = new Date();
        this.tasks = []
    }

    add(title) {
        this.tasks.push({
            title,
            date: this.date,
            status: this.status
        })
    }

    remove(index) {
        this.tasks.splice(index, 1)
        return this.tasks
    }

    getlist() {
        return this.tasks;
    }
}


function setHeaderTitle() {

    const days = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sabado'];
    
    const date = new Date()
    const day = days[date.getDay()]
    let [,month, dayNumber,] = date.toString().split(' ')
    
    titleHeader.innerHTML = `${day}, <span>${dayNumber} ${month}</span>`
}

setHeaderTitle();

function countTask() {

}

function itemMount(list) {
    let items = list.map((item, i) => {
        return `<li class="group-item">
        <span class="material-icons check ${getStyleToStatus(item.status).checked} clickable" onclick="checkTask(${i})">
            ${getStyleToStatus(item.status).icon}
        </span>
        <div class="item__title ${getStyleToStatusToggle(item.status)}">
            ${item.title}
            <span class="title__time">${item.date.toLocaleTimeString()}</span>
        </div>
        <span class="material-icons delete ${getStyleToStatusToggle(item.status)} clickable" onclick="removeTask(${i})">
            delete_outline
        </span>
    </li>`
    })

    return items;
}

function getStyleToStatus(status) {
    return {
        checked: status ? 'active' : 'deactive',
        icon: status ? 'check_circle_outline' : 'radio_button_unchecked'
    }
}

function getStyleToStatusToggle(status) {
    return status ? 'deactive' : '';
}

const task = new Task();
function addTask() {
    if(!!input.value.trim().length) {
        task.add(input.value)
        listGroup.innerHTML = itemMount(task.getlist()).join('')
        taskCreated.innerText = getDisplayCountTask(task.list.length)
    }
        
}

function removeTask(index) {
    if (task.list[index].status)
        return;
    listGroup.innerHTML = itemMount(task.remove(index)).join('')
}

function checkTask(index) {
    task.list[index].status = true;
    console.log(task.list.filter(item => !!item.status).length)
    taskCompleted.innerText = getDisplayCountTask(task.list.filter(item => !!item.status).length)
    orderTasksByStatus()
}

function orderTasksByStatus() {
   task.list = task.list.sort((a, b) => b.status - a.status)
   listGroup.innerHTML = itemMount(task.list).join('')
}

function getDisplayCountTask(input) {
    return input < 10 ? `0${input}` : input
}


input.addEventListener('keydown', (evt) => {
    if(evt.keyCode === 13) {
        addTask();
        evt.target.value = ''
    }
})

action.addEventListener('click', () => {
    input.classList.toggle('input--show')
    input.focus()
})
