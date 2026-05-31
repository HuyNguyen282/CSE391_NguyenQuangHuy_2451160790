# 📝 Bài 1.1 — Component Render Lần Đầu

> ⏱ Thời gian: 8 phút

---

## 🔍 Giải thích

Khi bạn viết `<App />`, React sẽ thực hiện 3 bước:

1. **Gọi** function `App()`
2. **Lấy** kết quả `return` (JSX)
3. **Hiển thị** lên màn hình

---

## 💻 Code mẫu — `LifecycleDemo.jsx`

```jsx
function LifecycleDemo() {
    console.log("1️⃣ Component được gọi!");

    return (
        <div style={{ padding: "20px", border: "2px solid #3498db" }}>
            <h2>Lifecycle Demo</h2>
            <p>Mở Console (F12) để xem log</p>
            <p>Component này chỉ render MỘT lần</p>
        </div>
    );
}

export default LifecycleDemo;
```

---

## 🧪 Thử nghiệm

1. Mở **Console** (`F12`)
2. **Refresh** trang
3. Quan sát log xuất hiện trong Console

```
1️⃣ Component được gọi!
```

> **Kết quả:** Log xuất hiện **1 lần duy nhất**.

---

## ❓ Câu hỏi & Trả lời

### Tại sao component chỉ render 1 lần?

Vì `LifecycleDemo` không có bất kỳ yếu tố nào kích hoạt re-render:

- Không có **state** (trạng thái nội bộ)
- Không có **props** thay đổi
- Không có **component cha** nào re-render

---

### Khi nào nó sẽ render lại?

Component sẽ re-render trong **3 trường hợp**:

| # | Nguyên nhân | Mô tả | Ví dụ |
|---|-------------|-------|-------|
| 1 | **Thay đổi State** | Hàm cập nhật `useState` được gọi với giá trị mới | Bấm nút tăng số đếm → số đếm thay đổi → re-render |
| 2 | **Thay đổi Props** | Component cha truyền giá trị mới qua thuộc tính | `<LifecycleDemo title={currentTitle} />` — khi `currentTitle` thay đổi |
| 3 | **Component cha re-render** | Khi component cha render lại, tất cả component con mặc định render theo | Component chứa `LifecycleDemo` bị ép render lại |

---

## 🎯 Tổng kết

### Luồng cập nhật khi có State thay đổi

```
setState(newState)
    ↓
Component function gọi lại
    ↓
Return JSX mới
    ↓
React cập nhật DOM (chỉ phần thay đổi)
```

### Sơ đồ React Flow đầy đủ

```
┌─────────────────────────────────────────────────────────┐
│                      REACT FLOW                         │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  1. Component function được gọi                         │
│              ↓                                          │
│  2. Return JSX (giao diện)                              │
│              ↓                                          │
│  3. React hiển thị lên màn hình                         │
│              ↓                                          │
│  4. Người dùng tương tác (click, nhập...)               │
│              ↓                                          │
│  5. Gọi setState(newValue)                              │
│              ↓                                          │
│  6. React gọi lại component function  ← RE-RENDER       │
│              ↓                                          │
│  7. Return JSX mới                                      │
│              ↓                                          │
│  8. React cập nhật màn hình (chỉ phần thay đổi)         │
│              ↓                                          │
│         ↩ Quay lại bước 4                              │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

> 💡 **Lưu ý quan trọng:** React **không** cập nhật toàn bộ DOM mà chỉ cập nhật **đúng phần đã thay đổi** — đây là lý do React hoạt động hiệu quả.