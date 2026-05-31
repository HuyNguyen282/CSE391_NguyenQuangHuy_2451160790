const products = [
    { id: 1, name: 'iPhone 16', price: 25990000, category: 'phone', image: 'https://placehold.co/400x300/4f8ef7/white?text=iPhone+16', rating: 4.5, inStock: true },
    { id: 2, name: 'Samsung Galaxy S25', price: 22490000, category: 'phone', image: 'https://placehold.co/400x300/2ecc71/white?text=Galaxy+S25', rating: 4.3, inStock: true },
    { id: 3, name: 'Xiaomi 14T', price: 12990000, category: 'phone', image: 'https://placehold.co/400x300/e74c3c/white?text=Xiaomi+14T', rating: 4.1, inStock: false },
    { id: 4, name: 'MacBook Air M3', price: 32990000, category: 'laptop', image: 'https://placehold.co/400x300/1a1a2e/white?text=MacBook+Air', rating: 4.8, inStock: true },
    { id: 5, name: 'Dell XPS 15', price: 29500000, category: 'laptop', image: 'https://placehold.co/400x300/8e44ad/white?text=Dell+XPS+15', rating: 4.4, inStock: true },
    { id: 6, name: 'Asus Vivobook 16', price: 15990000, category: 'laptop', image: 'https://placehold.co/400x300/16a085/white?text=Asus+Vivobook', rating: 3.9, inStock: true },
    { id: 7, name: 'Tai nghe Sony WH-1000XM5', price: 8490000, category: 'audio', image: 'https://placehold.co/400x300/d35400/white?text=Sony+WH1000', rating: 4.7, inStock: true },
    { id: 8, name: 'AirPods Pro 2', price: 6990000, category: 'audio', image: 'https://placehold.co/400x300/2c3e50/white?text=AirPods+Pro', rating: 4.6, inStock: true },
    { id: 9, name: 'JBL Flip 6', price: 2490000, category: 'audio', image: 'https://placehold.co/400x300/27ae60/white?text=JBL+Flip+6', rating: 4.2, inStock: false },
    { id: 10, name: 'iPad Air 11"', price: 18990000, category: 'tablet', image: 'https://placehold.co/400x300/2980b9/white?text=iPad+Air', rating: 4.5, inStock: true },
    { id: 11, name: 'Samsung Tab S9', price: 17490000, category: 'tablet', image: 'https://placehold.co/400x300/c0392b/white?text=Tab+S9', rating: 4.3, inStock: true },
    { id: 12, name: 'Xiaomi Pad 7', price: 8990000, category: 'tablet', image: 'https://placehold.co/400x300/7f8c8d/white?text=Xiaomi+Pad+7', rating: 4.0, inStock: true },
]

let cartCount = 0
let currentCategory = 'all'
let currentSort = 'default'
let searchKeyword = ''

function formatPrice(price) {
    return price.toLocaleString('vi-VN') + 'đ'
}

function renderStars(rating) {
    const full = Math.floor(rating)
    const half = rating % 1 >= 0.5 ? '½' : ''
    return '★'.repeat(full) + half
}

function getFilteredProducts() {
    let result = [...products]

    if (currentCategory !== 'all') {
        result = result.filter(p => p.category === currentCategory)
    }

    if (searchKeyword) {
        result = result.filter(p => p.name.toLowerCase().includes(searchKeyword.toLowerCase()))
    }

    if (currentSort === 'price-asc') result.sort((a, b) => a.price - b.price)
    else if (currentSort === 'price-desc') result.sort((a, b) => b.price - a.price)
    else if (currentSort === 'name-az') result.sort((a, b) => a.name.localeCompare(b.name))
    else if (currentSort === 'rating') result.sort((a, b) => b.rating - a.rating)

    return result
}

function renderProducts() {
    const grid = document.querySelector('.product-grid')
    grid.innerHTML = ''

    const filtered = getFilteredProducts()

    if (filtered.length === 0) {
        const empty = document.createElement('p')
        empty.className = 'no-results'
        empty.textContent = 'Không tìm thấy sản phẩm nào'
        grid.appendChild(empty)
        return
    }

    filtered.forEach(product => {
        const card = document.createElement('div')
        card.className = 'product-card'
        card.dataset.id = product.id

        const img = document.createElement('img')
        img.src = product.image
        img.alt = product.name

        const body = document.createElement('div')
        body.className = 'card-body'

        const name = document.createElement('h3')
        name.textContent = product.name

        const price = document.createElement('p')
        price.className = 'card-price'
        price.textContent = formatPrice(product.price)

        const rating = document.createElement('p')
        rating.className = 'card-rating'
        rating.innerHTML = renderStars(product.rating) + '<span>' + product.rating + '</span>'

        const addBtn = document.createElement('button')
        addBtn.className = 'add-cart-btn'
        addBtn.textContent = product.inStock ? '🛒 Thêm vào giỏ' : 'Hết hàng'
        addBtn.disabled = !product.inStock

        body.appendChild(name)
        body.appendChild(price)
        body.appendChild(rating)

        if (!product.inStock) {
            const oos = document.createElement('p')
            oos.className = 'out-of-stock'
            oos.textContent = 'Hết hàng'
            body.appendChild(oos)
        }

        body.appendChild(addBtn)
        card.appendChild(img)
        card.appendChild(body)
        grid.appendChild(card)
    })
}

function openModal(product) {
    const overlay = document.querySelector('.modal-overlay')
    const modal = overlay.querySelector('.modal')
    modal.innerHTML = ''

    const closeBtn = document.createElement('button')
    closeBtn.className = 'modal-close'
    closeBtn.textContent = '✕'
    closeBtn.addEventListener('click', closeModal)

    const img = document.createElement('img')
    img.src = product.image
    img.alt = product.name

    const name = document.createElement('h2')
    name.textContent = product.name

    const price = document.createElement('p')
    price.className = 'modal-price'
    price.textContent = formatPrice(product.price)

    const rating = document.createElement('p')
    rating.className = 'modal-rating'
    rating.textContent = renderStars(product.rating) + ' ' + product.rating + '/5'

    const category = document.createElement('p')
    category.className = 'modal-category'
    category.textContent = 'Danh mục: ' + product.category

    const addBtn = document.createElement('button')
    addBtn.className = 'add-cart-btn'
    addBtn.textContent = product.inStock ? '🛒 Thêm vào giỏ' : 'Hết hàng'
    addBtn.disabled = !product.inStock
    addBtn.addEventListener('click', (e) => {
        e.stopPropagation()
        addToCart()
        closeModal()
    })

    modal.appendChild(closeBtn)
    modal.appendChild(img)
    modal.appendChild(name)
    modal.appendChild(price)
    modal.appendChild(rating)
    modal.appendChild(category)
    modal.appendChild(addBtn)

    overlay.classList.add('open')
}

function closeModal() {
    document.querySelector('.modal-overlay').classList.remove('open')
}

function addToCart() {
    cartCount++
    const badge = document.querySelector('.cart-badge')
    badge.textContent = cartCount
    badge.style.display = 'inline'
}

function filterByCategory(cat) {
    currentCategory = cat
    document.querySelectorAll('.cat-btn').forEach(btn => btn.classList.remove('active'))
    document.querySelector(`.cat-btn[data-cat="${cat}"]`).classList.add('active')
    renderProducts()
}

function searchProducts(keyword) {
    searchKeyword = keyword
    renderProducts()
}

function sortProducts(sort) {
    currentSort = sort
    renderProducts()
}

// BUILD UI
function buildUI() {
    const navbar = document.createElement('nav')
    navbar.className = 'navbar'

    const logo = document.createElement('h1')
    logo.textContent = '🛍️ Shop Online'

    const navRight = document.createElement('div')
    navRight.className = 'navbar-right'

    const cartIcon = document.createElement('div')
    cartIcon.className = 'cart-icon'
    cartIcon.textContent = '🛒'
    const badge = document.createElement('span')
    badge.className = 'cart-badge'
    cartIcon.appendChild(badge)

    const darkToggle = document.createElement('button')
    darkToggle.id = 'darkToggle'
    darkToggle.textContent = '🌙 Dark mode'
    darkToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode')
        darkToggle.textContent = document.body.classList.contains('dark-mode') ? '☀️ Light mode' : '🌙 Dark mode'
    })

    navRight.appendChild(cartIcon)
    navRight.appendChild(darkToggle)
    navbar.appendChild(logo)
    navbar.appendChild(navRight)

    const main = document.createElement('div')
    main.className = 'main'

    // toolbar
    const toolbar = document.createElement('div')
    toolbar.className = 'toolbar'

    const searchInput = document.createElement('input')
    searchInput.id = 'searchInput'
    searchInput.type = 'text'
    searchInput.placeholder = '🔍 Tìm kiếm sản phẩm...'
    searchInput.addEventListener('input', (e) => searchProducts(e.target.value))

    const sortSelect = document.createElement('select')
    sortSelect.id = 'sortSelect'
    const sortOptions = [
        { value: 'default', label: 'Sắp xếp' },
        { value: 'price-asc', label: 'Giá: Thấp → Cao' },
        { value: 'price-desc', label: 'Giá: Cao → Thấp' },
        { value: 'name-az', label: 'Tên: A → Z' },
        { value: 'rating', label: 'Đánh giá cao nhất' },
    ]
    sortOptions.forEach(opt => {
        const option = document.createElement('option')
        option.value = opt.value
        option.textContent = opt.label
        sortSelect.appendChild(option)
    })
    sortSelect.addEventListener('change', (e) => sortProducts(e.target.value))

    toolbar.appendChild(searchInput)
    toolbar.appendChild(sortSelect)

    // category buttons
    const catBar = document.createElement('div')
    catBar.className = 'category-bar'

    const categories = ['all', 'phone', 'laptop', 'audio', 'tablet']
    const catLabels = { all: 'Tất cả', phone: '📱 Điện thoại', laptop: '💻 Laptop', audio: '🎧 Âm thanh', tablet: '📟 Máy tính bảng' }

    categories.forEach(cat => {
        const btn = document.createElement('button')
        btn.className = 'cat-btn' + (cat === 'all' ? ' active' : '')
        btn.dataset.cat = cat
        btn.textContent = catLabels[cat]
        btn.addEventListener('click', () => filterByCategory(cat))
        catBar.appendChild(btn)
    })

    // product grid
    const grid = document.createElement('div')
    grid.className = 'product-grid'

    main.appendChild(toolbar)
    main.appendChild(catBar)
    main.appendChild(grid)

    // modal
    const overlay = document.createElement('div')
    overlay.className = 'modal-overlay'
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) closeModal()
    })
    const modal = document.createElement('div')
    modal.className = 'modal'
    overlay.appendChild(modal)

    document.body.appendChild(navbar)
    document.body.appendChild(main)
    document.body.appendChild(overlay)

    // event delegation cho grid
    grid.addEventListener('click', (e) => {
        const addBtn = e.target.closest('.add-cart-btn')
        if (addBtn && !addBtn.disabled) {
            e.stopPropagation()
            addToCart()
            return
        }

        const card = e.target.closest('.product-card')
        if (card) {
            const id = Number(card.dataset.id)
            const product = products.find(p => p.id === id)
            openModal(product)
        }
    })

    renderProducts()
}

buildUI()