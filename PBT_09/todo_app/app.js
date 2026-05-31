const form = document.querySelector('#todoForm')
const input = document.querySelector('#todoInput')
const list = document.querySelector('#todoList')
const countDisplay = document.querySelector('#countDisplay')
const clearBtn = document.querySelector('#clearCompleted')
const filterBtns = document.querySelectorAll('.filter-btn')

let todos = JSON.parse(localStorage.getItem('todos')) || []
let currentFilter = 'all'

function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos))
}

function createTodoElement(todo) {
    const li = document.createElement('li')
    li.dataset.id = todo.id
    if (todo.completed) li.classList.add('completed')

    const span = document.createElement('span')
    span.className = 'todo-text'
    span.textContent = todo.text

    const deleteBtn = document.createElement('button')
    deleteBtn.className = 'delete-btn'
    deleteBtn.textContent = '❌'

    li.appendChild(span)
    li.appendChild(deleteBtn)
    return li
}

function renderTodos() {
    list.innerHTML = ''

    let filtered = todos
    if (currentFilter === 'active') filtered = todos.filter(t => !t.completed)
    if (currentFilter === 'completed') filtered = todos.filter(t => t.completed)

    filtered.forEach(todo => {
        const li = createTodoElement(todo)
        list.appendChild(li)
    })

    const remaining = todos.filter(t => !t.completed).length
    countDisplay.textContent = remaining + ' việc còn lại'
}

// thêm todo
form.addEventListener('submit', (e) => {
    e.preventDefault()
    const text = input.value.trim()
    if (!text) return

    const newTodo = {
        id: Date.now(),
        text: text,
        completed: false
    }
    todos.push(newTodo)
    saveTodos()
    renderTodos()
    input.value = ''
    input.focus()
})

// event delegation cho list - xử lý click, double click, xóa
list.addEventListener('click', (e) => {
    const li = e.target.closest('li')
    if (!li) return
    const id = Number(li.dataset.id)

    // xóa
    if (e.target.classList.contains('delete-btn')) {
        todos = todos.filter(t => t.id !== id)
        saveTodos()
        renderTodos()
        return
    }

    // toggle completed khi click vào text
    if (e.target.classList.contains('todo-text')) {
        const todo = todos.find(t => t.id === id)
        todo.completed = !todo.completed
        saveTodos()
        renderTodos()
    }
})

// double click để edit
list.addEventListener('dblclick', (e) => {
    if (!e.target.classList.contains('todo-text')) return

    const li = e.target.closest('li')
    const id = Number(li.dataset.id)
    const todo = todos.find(t => t.id === id)

    const editInput = document.createElement('input')
    editInput.value = todo.text
    e.target.replaceWith(editInput)
    editInput.focus()

    const saveEdit = () => {
        const newText = editInput.value.trim()
        if (newText) todo.text = newText
        saveTodos()
        renderTodos()
    }

    editInput.addEventListener('keydown', (ev) => {
        if (ev.key === 'Enter') saveEdit()
        if (ev.key === 'Escape') renderTodos()
    })
    editInput.addEventListener('blur', saveEdit)
})

// filter buttons
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'))
        btn.classList.add('active')
        currentFilter = btn.dataset.filter
        renderTodos()
    })
})

// xóa tất cả đã xong
clearBtn.addEventListener('click', () => {
    todos = todos.filter(t => !t.completed)
    saveTodos()
    renderTodos()
})

renderTodos()