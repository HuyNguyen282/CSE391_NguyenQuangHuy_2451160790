const nameInput = document.querySelector('#nameInput')
const emailInput = document.querySelector('#emailInput')
const passwordInput = document.querySelector('#passwordInput')
const confirmInput = document.querySelector('#confirmInput')
const phoneInput = document.querySelector('#phoneInput')
const submitBtn = document.querySelector('#submitBtn')
const successModal = document.querySelector('#successModal')
const modalInfo = document.querySelector('#modalInfo')
const modalClose = document.querySelector('#modalClose')

const validity = { name: false, email: false, password: false, confirm: false, phone: false }

function setHint(input, hintEl, ok, msg) {
    hintEl.textContent = ok ? '✅ ' + msg : (msg ? '❌ ' + msg : '')
    hintEl.className = 'hint ' + (ok ? 'ok' : (msg ? 'error' : ''))
    input.className = ok ? 'valid' : (msg ? 'invalid' : '')
}

function checkForm() {
    submitBtn.disabled = !Object.values(validity).every(Boolean)
}

// Validate tên
nameInput.addEventListener('input', () => {
    const val = nameInput.value.trim()
    const hint = nameInput.nextElementSibling
    if (!val) {
        setHint(nameInput, hint, false, '')
        validity.name = false
    } else if (val.length < 2) {
        setHint(nameInput, hint, false, 'Tên phải ít nhất 2 ký tự')
        validity.name = false
    } else if (val.length > 50) {
        setHint(nameInput, hint, false, 'Tên tối đa 50 ký tự')
        validity.name = false
    } else {
        setHint(nameInput, hint, true, 'Hợp lệ')
        validity.name = true
    }
    checkForm()
})

// Validate email
emailInput.addEventListener('input', () => {
    const val = emailInput.value.trim()
    const hint = emailInput.nextElementSibling
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!val) {
        setHint(emailInput, hint, false, '')
        validity.email = false
    } else if (!emailRegex.test(val)) {
        setHint(emailInput, hint, false, 'Email không đúng định dạng')
        validity.email = false
    } else {
        setHint(emailInput, hint, true, 'Hợp lệ')
        validity.email = true
    }
    checkForm()
})

// Password strength
passwordInput.addEventListener('input', () => {
    const val = passwordInput.value
    const fill = document.querySelector('#strengthFill')
    const label = document.querySelector('#strengthLabel')

    let strength = 0
    if (val.length >= 8) strength++
    if (/[a-z]/.test(val) && /[A-Z]/.test(val)) strength++
    if (/\d/.test(val)) strength++
    if (/[^a-zA-Z0-9]/.test(val)) strength++

    if (!val) {
        fill.style.width = '0%'
        label.textContent = ''
        validity.password = false
    } else if (val.length < 8) {
        fill.style.width = '25%'
        fill.style.background = '#e74c3c'
        label.style.color = '#e74c3c'
        label.textContent = 'Yếu — cần ít nhất 8 ký tự'
        validity.password = false
    } else if (strength <= 2) {
        fill.style.width = '55%'
        fill.style.background = '#f39c12'
        label.style.color = '#f39c12'
        label.textContent = 'Trung bình'
        validity.password = true
    } else {
        fill.style.width = '100%'
        fill.style.background = '#2ecc71'
        label.style.color = '#2ecc71'
        label.textContent = 'Mạnh 💪'
        validity.password = true
    }

    // re-check confirm
    if (confirmInput.value) {
        checkConfirm()
    }
    checkForm()
})

// Confirm password
function checkConfirm() {
    const val = confirmInput.value
    const hint = confirmInput.nextElementSibling
    if (!val) {
        setHint(confirmInput, hint, false, '')
        validity.confirm = false
    } else if (val !== passwordInput.value) {
        setHint(confirmInput, hint, false, 'Mật khẩu không khớp')
        validity.confirm = false
    } else {
        setHint(confirmInput, hint, true, 'Khớp rồi')
        validity.confirm = true
    }
    checkForm()
}

confirmInput.addEventListener('input', checkConfirm)

// Phone — auto format 0901-234-567
phoneInput.addEventListener('input', () => {
    let digits = phoneInput.value.replace(/\D/g, '').slice(0, 10)
    let formatted = digits
    if (digits.length > 4) formatted = digits.slice(0, 4) + '-' + digits.slice(4)
    if (digits.length > 7) formatted = digits.slice(0, 4) + '-' + digits.slice(4, 7) + '-' + digits.slice(7)
    phoneInput.value = formatted

    const hint = phoneInput.nextElementSibling
    if (!digits) {
        setHint(phoneInput, hint, false, '')
        validity.phone = false
    } else if (digits.length !== 10) {
        setHint(phoneInput, hint, false, 'Số điện thoại phải có 10 chữ số')
        validity.phone = false
    } else {
        setHint(phoneInput, hint, true, 'Hợp lệ')
        validity.phone = true
    }
    checkForm()
})

// Submit
submitBtn.addEventListener('click', () => {
    modalInfo.innerHTML =
        '<b>Họ tên:</b> ' + nameInput.value + '<br>' +
        '<b>Email:</b> ' + emailInput.value + '<br>' +
        '<b>SĐT:</b> ' + phoneInput.value

    successModal.classList.add('open')
})

modalClose.addEventListener('click', () => {
    successModal.classList.remove('open')
})

successModal.addEventListener('click', (e) => {
    if (e.target === successModal) successModal.classList.remove('open')
})