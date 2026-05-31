# Answers - Phiếu Bài Tập 09

## PHẦN A

### Câu A1 — DOM Tree

```
document
└── html
    ├── head
    └── body
        └── div#app
            ├── header
            │   ├── h1 ("Todo App")
            │   └── nav
            │       ├── a.active ("All")
            │       ├── a ("Active")
            │       └── a ("Completed")
            └── main
                ├── form#todoForm
                │   ├── input#todoInput
                │   └── button ("Add")
                └── ul#todoList
                    ├── li.todo-item ("Learn HTML")
                    └── li.todo-item.completed ("Learn CSS")
```

**querySelector:**

```js
// Chọn thẻ h1
document.querySelector('h1')

// Chọn input trong form
document.querySelector('#todoForm input')

// Chọn tất cả .todo-item
document.querySelectorAll('.todo-item')

// Chọn link đang active
document.querySelector('a.active')

// Chọn li đầu tiên trong #todoList
document.querySelector('#todoList li:first-child')

// Chọn tất cả a bên trong nav
document.querySelectorAll('nav a')
```

---

### Câu A2 — innerHTML vs textContent

- `textContent` lấy/set nội dung text thuần, không parse HTML. Dùng khi muốn hiển thị text bình thường.
- `innerHTML` lấy/set nội dung kể cả thẻ HTML, trình duyệt sẽ parse và render thẻ đó. Dùng khi cần chèn HTML thật sự.

**Ví dụ:**
```js
// textContent - hiển thị đúng text kể cả nếu có thẻ html
el.textContent = '<b>Hello</b>'  // → hiển thị "<b>Hello</b>" chữ thường

// innerHTML - browser parse và render thẻ
el.innerHTML = '<b>Hello</b>'   // → hiển thị chữ in đậm "Hello"
```

**XSS với innerHTML:**

Nếu user nhập `<img src=x onerror="alert('Hacked!')">` và mình gán vào innerHTML thì browser sẽ tạo thẻ img, src lỗi nên chạy onerror tức là chạy JS của hacker.

```js
// Nguy hiểm
const userInput = document.querySelector('#search').value
document.querySelector('#result').innerHTML = userInput  // chạy script của user

// Sửa bằng textContent - browser không parse HTML
document.querySelector('#result').textContent = userInput
```

---

### Câu A3 — Event Bubbling

Khi click vào button, event bubble từ con lên cha:

**Không có stopPropagation:**
```
BUTTON
INNER
OUTER
```

**Có stopPropagation:**
```
BUTTON
```
Event dừng lại ở button, không bubble lên #inner và #outer nữa.

---

## PHẦN C

### Câu C1 — Debug

Các lỗi tìm được:

```js
const countDisplay = document.querySelector('.count')
const historyList = document.getElementById('history')

let count = 0

document.querySelector('#incrementBtn').addEventListener('click', function () {
    count++
    countDisplay.textContent = count  // fix: innerHTML → textContent (không cần parse html)

    const li = document.createElement('li')
    li.textContent = 'Count changed to ' + count
    li.addEventListener('click', function () {
        deleteHistory(this)
    })
    historyList.appendChild(li)  // fix: append → appendChild (tường minh hơn, ok cả 2)
})

// fix: "onclick" → "click" (sai tên event)
document.querySelector('#decrementBtn').addEventListener('click', function () {
    count--
    countDisplay.textContent = count  // fix: innerHTML → textContent
})

document.querySelector('#resetBtn').addEventListener('click', () => {
    count = 0
    countDisplay.textContent = count  // fix: countDisplay = count → countDisplay.textContent = count (không thể gán lại DOM element)
    historyList.innerHTML = ''        // fix: null → '' (innerHTML = null sẽ ra chữ "null")
})

function deleteHistory(element) {
    element.parentNode.removeChild(element)
}

document.querySelector('#clearHistory').addEventListener('click', () => {
    const items = historyList.querySelectorAll('li')
    items.forEach(item => {
        item.remove()  // fix: item.remove → item.remove() (thiếu gọi hàm)
    })
})

window.addEventListener('beforeunload', () => {
    localStorage.setItem('count', count)
    localStorage.setItem('history', historyList.innerHTML)
})

window.addEventListener('load', () => {
    const saved = localStorage.getItem('count')
    if (saved !== null) {
        count = parseInt(saved)  // fix: getItem trả về string, cần parse sang number
        countDisplay.textContent = count
    }
})
```

**Tóm tắt 7 lỗi:**
1. `"onclick"` → `"click"` (tên event sai)
2. `countDisplay = count` → `countDisplay.textContent = count` (gán nhầm biến)
3. `historyList.innerHTML = null` → `= ''` (null ra chữ "null")
4. `item.remove` → `item.remove()` (thiếu dấu `()`)
5. `count = localStorage.getItem("count")` thiếu `parseInt()` (getItem trả về string)
6. Hai chỗ dùng `innerHTML = count` để hiển thị số nguyên, nên dùng `textContent`
7. `historyList.append(li)` — không phải lỗi cứng nhưng nên dùng `appendChild` cho nhất quán

---

### Câu C2 — Performance

**1. Tại sao bind event lên 1000 elements là bad practice:**

Mỗi event listener tốn bộ nhớ. Bind 1000 lần = 1000 listeners trong memory. Ngoài ra mỗi khi thêm element mới phải bind thêm listener, và khi remove element phải nhớ remove listener không thì memory leak.

Event Delegation giải quyết bằng cách bind 1 listener duy nhất lên element cha. Khi click vào con thì event bubble lên cha, cha check `e.target` để biết con nào được click rồi xử lý. Chỉ 1 listener cho cả 1000 con.

```js
// Thay vì bind từng cái
document.querySelectorAll('li').forEach(li => {
    li.addEventListener('click', handleClick)
})

// Dùng delegation - 1 listener thôi
document.querySelector('ul').addEventListener('click', (e) => {
    if (e.target.tagName === 'LI') {
        handleClick(e.target)
    }
})
```

**2. Refactor dùng DocumentFragment:**

```js
// Tạo fragment - nằm trong memory, không attach vào DOM
const fragment = document.createDocumentFragment()

for (let i = 0; i < 1000; i++) {
    const div = document.createElement('div')
    div.textContent = `Item ${i}`
    fragment.appendChild(div)  // append vào fragment, không gây reflow
}

document.body.appendChild(fragment)  // chỉ 1 lần reflow duy nhất
```

Lý do nhanh hơn: Mỗi lần `appendChild` vào DOM thật thì browser phải tính lại layout (reflow) và vẽ lại (repaint). Làm 1000 lần = 1000 reflow rất chậm. DocumentFragment nằm ngoài DOM nên append vào đó không trigger reflow. Chỉ khi append fragment vào DOM mới thật mới tính lại 1 lần.