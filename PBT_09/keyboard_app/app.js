const images = [
    { src: 'https://placehold.co/800x450/4f8ef7/white?text=Photo+1', title: 'Biển Đà Nẵng' },
    { src: 'https://placehold.co/800x450/e74c3c/white?text=Photo+2', title: 'Phố cổ Hội An' },
    { src: 'https://placehold.co/800x450/2ecc71/white?text=Photo+3', title: 'Vịnh Hạ Long' },
    { src: 'https://placehold.co/800x450/f39c12/white?text=Photo+4', title: 'Núi Fansipan' },
    { src: 'https://placehold.co/800x450/8e44ad/white?text=Photo+5', title: 'Hồ Tây - Hà Nội' },
    { src: 'https://placehold.co/800x450/16a085/white?text=Photo+6', title: 'Ruộng bậc thang Mù Cang Chải' },
    { src: 'https://placehold.co/800x450/c0392b/white?text=Photo+7', title: 'Phú Quốc' },
    { src: 'https://placehold.co/800x450/2980b9/white?text=Photo+8', title: 'Cầu Rồng Đà Nẵng' },
    { src: 'https://placehold.co/800x450/27ae60/white?text=Photo+9', title: 'Đỉnh đèo Mã Pì Lèng' },
]

let current = 0
let slideshowTimer = null

const mainImg = document.querySelector('#mainImg')
const slideCounter = document.querySelector('#slideCounter')
const slideTitle = document.querySelector('#slideTitle')
const playBadge = document.querySelector('#playBadge')
const thumbStrip = document.querySelector('#thumbStrip')
const prevBtn = document.querySelector('#prevBtn')
const nextBtn = document.querySelector('#nextBtn')
const paletteOverlay = document.querySelector('#paletteOverlay')
const paletteInput = document.querySelector('#paletteInput')
const paletteList = document.querySelector('#paletteList')

function goTo(index) {
    current = (index + images.length) % images.length
    mainImg.style.opacity = 0
    setTimeout(() => {
        mainImg.src = images[current].src
        mainImg.alt = images[current].title
        mainImg.style.opacity = 1
    }, 100)
    slideCounter.textContent = (current + 1) + ' / ' + images.length
    slideTitle.textContent = images[current].title
    document.querySelectorAll('.thumb-strip img').forEach((img, i) => {
        img.classList.toggle('active', i === current)
    })
}

function prev() { goTo(current - 1) }
function next() { goTo(current + 1) }

function toggleSlideshow() {
    if (slideshowTimer) {
        clearInterval(slideshowTimer)
        slideshowTimer = null
        playBadge.classList.remove('active')
    } else {
        slideshowTimer = setInterval(next, 2000)
        playBadge.classList.add('active')
    }
}

// Build thumbnails
images.forEach((img, i) => {
    const thumb = document.createElement('img')
    thumb.src = img.src
    thumb.alt = img.title
    thumb.tabIndex = 0
    thumb.setAttribute('aria-label', 'Ảnh ' + (i + 1) + ': ' + img.title)
    thumb.addEventListener('click', () => goTo(i))
    thumb.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') goTo(i)
    })
    thumbStrip.appendChild(thumb)
})

prevBtn.addEventListener('click', prev)
nextBtn.addEventListener('click', next)

// Command palette
const commands = [
    { icon: '▶', label: 'Ảnh tiếp theo', shortcut: '→', action: next },
    { icon: '◀', label: 'Ảnh trước', shortcut: '←', action: prev },
    { icon: '⏯', label: 'Bật/tắt slideshow', shortcut: 'Space', action: toggleSlideshow },
    { icon: '1️⃣', label: 'Đến ảnh 1', shortcut: '1', action: () => goTo(0) },
    { icon: '2️⃣', label: 'Đến ảnh 2', shortcut: '2', action: () => goTo(1) },
    { icon: '3️⃣', label: 'Đến ảnh 3', shortcut: '3', action: () => goTo(2) },
    { icon: '4️⃣', label: 'Đến ảnh 4', shortcut: '4', action: () => goTo(3) },
    { icon: '5️⃣', label: 'Đến ảnh 5', shortcut: '5', action: () => goTo(4) },
    { icon: '6️⃣', label: 'Đến ảnh 6', shortcut: '6', action: () => goTo(5) },
    { icon: '7️⃣', label: 'Đến ảnh 7', shortcut: '7', action: () => goTo(6) },
    { icon: '8️⃣', label: 'Đến ảnh 8', shortcut: '8', action: () => goTo(7) },
    { icon: '9️⃣', label: 'Đến ảnh 9', shortcut: '9', action: () => goTo(8) },
    { icon: '✕', label: 'Đóng palette', shortcut: 'Esc', action: closePalette },
]

let selectedCmd = 0

function renderPalette(keyword) {
    paletteList.innerHTML = ''
    selectedCmd = 0
    const filtered = commands.filter(c =>
        c.label.toLowerCase().includes(keyword.toLowerCase())
    )
    if (filtered.length === 0) {
        const li = document.createElement('li')
        li.textContent = 'Không tìm thấy lệnh nào'
        li.style.color = '#666'
        paletteList.appendChild(li)
        return
    }
    filtered.forEach((cmd, i) => {
        const li = document.createElement('li')
        li.setAttribute('role', 'option')
        li.setAttribute('aria-label', cmd.label)
        if (i === 0) li.classList.add('selected')

        const icon = document.createElement('span')
        icon.className = 'cmd-icon'
        icon.textContent = cmd.icon

        const label = document.createElement('span')
        label.textContent = cmd.label

        const shortcut = document.createElement('span')
        shortcut.className = 'cmd-shortcut'
        shortcut.textContent = cmd.shortcut

        li.appendChild(icon)
        li.appendChild(label)
        li.appendChild(shortcut)
        li.addEventListener('click', () => {
            cmd.action()
            closePalette()
        })
        paletteList.appendChild(li)
    })
    return filtered
}

function openPalette() {
    paletteOverlay.classList.add('open')
    paletteInput.value = ''
    renderPalette('')
    paletteInput.focus()
}

function closePalette() {
    paletteOverlay.classList.remove('open')
}

paletteInput.addEventListener('input', () => {
    renderPalette(paletteInput.value)
})

paletteInput.addEventListener('keydown', (e) => {
    const items = paletteList.querySelectorAll('li')
    if (e.key === 'ArrowDown') {
        e.preventDefault()
        items[selectedCmd]?.classList.remove('selected')
        selectedCmd = Math.min(selectedCmd + 1, items.length - 1)
        items[selectedCmd]?.classList.add('selected')
        items[selectedCmd]?.scrollIntoView({ block: 'nearest' })
    } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        items[selectedCmd]?.classList.remove('selected')
        selectedCmd = Math.max(selectedCmd - 1, 0)
        items[selectedCmd]?.classList.add('selected')
    } else if (e.key === 'Enter') {
        items[selectedCmd]?.click()
    } else if (e.key === 'Escape') {
        closePalette()
    }
})

paletteOverlay.addEventListener('click', (e) => {
    if (e.target === paletteOverlay) closePalette()
})

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Nếu đang focus vào input bình thường thì bỏ qua
    if (e.target.tagName === 'INPUT' && e.target !== paletteInput) return

    if (e.key === 'ArrowLeft' && !paletteOverlay.classList.contains('open')) {
        prev()
    } else if (e.key === 'ArrowRight' && !paletteOverlay.classList.contains('open')) {
        next()
    } else if (e.key === ' ' && !paletteOverlay.classList.contains('open')) {
        e.preventDefault()
        toggleSlideshow()
    } else if (e.key === 'Escape') {
        closePalette()
        if (slideshowTimer) toggleSlideshow()
    } else if (e.ctrlKey && e.key === 'k') {
        e.preventDefault()
        openPalette()
    } else if (!paletteOverlay.classList.contains('open')) {
        const num = parseInt(e.key)
        if (num >= 1 && num <= images.length) {
            goTo(num - 1)
        }
    }
})

// init
goTo(0)