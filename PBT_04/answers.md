# PHẦN A — KIỂM TRA ĐỌC HIỂU

## Câu A1 (10đ) — 5 Loại Positioning

| Position | Vẫn chiếm chỗ trong flow? | Tham chiếu vị trí | Cuộn theo trang? | Use case |
|----------|---------------------------|-------------------|------------------|----------|
| `static` |  Có | Không áp dụng (top/left/bottom/right vô hiệu) |  Có | Mặc định, không cần định vị đặc biệt |
| `relative` |  Có | Chính vị trí gốc của nó |  Có | Tạo "khung" định vị cho con absolute; dịch nhẹ phần tử |
| `absolute` |  Không (bị đẩy ra khỏi flow) | Nearest positioned ancestor |  Có | Badge, tooltip, dropdown menu, popup |
| `fixed` |  Không | Viewport (cửa sổ trình duyệt) |  Không (luôn cố định) | Header cố định, nút scroll-to-top, chatbot |
| `sticky` |  Có | Scroll container (cuộn trong parent) | Cuộn bình thường, "dính" khi đến ngưỡng | Sidebar sticky, thead bảng, nav dính đầu trang |

### Nearest Positioned Ancestor

**`absolute` tham chiếu `body` khi:** Không có ancestor nào có `position` khác `static`. Phần tử sẽ leo lên tìm mãi đến `body`.

**`absolute` tham chiếu parent khi:** Có ít nhất 1 ancestor với `position: relative | absolute | fixed | sticky`. Nó sẽ tham chiếu ancestor **gần nhất** trong số đó.

```css
/* Ví dụ minh họa */
.wrapper { position: relative; }   /* ← absolute sẽ tham chiếu đây */
  .inner { /* static (mặc định) */ }
    .badge { position: absolute; top: 0; right: 0; }
    /* .badge tham chiếu .wrapper, KHÔNG phải .inner hay body */
```

---

## Câu A2 (10đ) — Dự đoán layout Flexbox/Grid

### Trường hợp 1: `display:flex` + `flex:1` — 4 items
```
[   item 1   ][   item 2   ][   item 3   ][   item 4   ]
```
→ 1 hàng, 4 cột đều nhau (flex:1 = grow:1, mỗi item chiếm 25% container)

### Trường hợp 2: `flex-wrap:wrap` + `width:45%` + `margin:2.5%` — 6 items
```
[ item 1 (45%) ][ item 2 (45%) ]   ← hàng 1: 45+2.5+2.5+45+2.5+2.5 = 100%
[ item 3 (45%) ][ item 4 (45%) ]   ← hàng 2
[ item 5 (45%) ][ item 6 (45%) ]   ← hàng 3
```
→ 3 hàng, 2 cột

### Trường hợp 3: `justify-content:space-between` + `align-items:center` — 3 items
```
[item1]          [item2]          [item3]
   ^                                  ^
 bên trái                         bên phải
```
→ Item 1 sát trái, item 3 sát phải, item 2 ở giữa. Tất cả căn dọc giữa container.

### Trường hợp 4: `grid-template-columns: 200px 1fr 200px` — 3 items
```
[200px cố định][     1fr (tự giãn)     ][200px cố định]
```
→ 1 hàng, 3 cột. Cột giữa tự co giãn theo chiều rộng còn lại sau khi trừ 2×200px + gap.

### Trường hợp 5: `repeat(3, 1fr)` + gap 10px — 7 items
```
[ item 1 ][ item 2 ][ item 3 ]   ← hàng 1
[ item 4 ][ item 5 ][ item 6 ]   ← hàng 2
[ item 7 ][        ][        ]   ← hàng 3: item 7 ở cột 1, 2 ô còn trống
```
→ 3 hàng, item cuối (7) nằm ở góc trái hàng 3. 2 ô còn lại trống.

---

# PHẦN C — SUY LUẬN

## Câu C1 (10đ) — Flexbox vs Grid: Khi nào dùng gì?

### 1. Navigation bar ngang → **Flexbox**
**Lý do:** Navbar là bố cục 1 chiều (ngang). `display: flex; justify-content: space-between` phân bố logo/menu/buttons hoàn hảo. Grid sẽ thừa phức tạp cho bố cục 1 hàng.

### 2. Lưới ảnh Instagram (3 cột, số lượng không biết) → **Grid**
**Lý do:** Lưới 2 chiều rõ ràng. `grid-template-columns: repeat(3, 1fr)` tự động xếp ảnh vào ô mà không cần biết số lượng. Flexbox sẽ khó kiểm soát alignment dọc.

### 3. Layout blog: main + sidebar → **Grid**
**Lý do:** Bố cục 2 vùng với tỷ lệ cố định: `grid-template-columns: 1fr 300px`. Grid cho phép kiểm soát cả 2 chiều, sidebar luôn đúng kích thước.

### 4. Footer 4 cột → **Grid hoặc Flexbox** (cả hai đều tốt)
- **Grid:** `repeat(4, 1fr)` → mỗi cột đúng 25%, căn dọc tốt hơn
- **Flexbox:** `flex: 1` trên mỗi cột → đơn giản hơn nếu không cần kiểm soát hàng
- **Nên chọn Grid** nếu cần responsive (thay đổi số cột dễ hơn).

### 5. Card sản phẩm (ảnh trên, text giữa, nút dưới) → **Flexbox (column)**
**Lý do:** Bố cục dọc bên trong card. `flex-direction: column` + `flex: 1` trên vùng text + `margin-top: auto` trên nút → nút luôn dính đáy dù text dài ngắn khác nhau.

---
 
# PHẦN C — SUY LUẬN
 
## Câu C1 (10đ) — Flexbox vs Grid: Khi nào dùng gì?
 
### 1. Navigation bar ngang → **Flexbox**
**Lý do:** Navbar là bố cục 1 chiều (ngang). `display: flex; justify-content: space-between` phân bố logo/menu/buttons hoàn hảo. Grid sẽ thừa phức tạp cho bố cục 1 hàng.
 
### 2. Lưới ảnh Instagram (3 cột, số lượng không biết) → **Grid**
**Lý do:** Lưới 2 chiều rõ ràng. `grid-template-columns: repeat(3, 1fr)` tự động xếp ảnh vào ô mà không cần biết số lượng. Flexbox sẽ khó kiểm soát alignment dọc.
 
### 3. Layout blog: main + sidebar → **Grid**
**Lý do:** Bố cục 2 vùng với tỷ lệ cố định: `grid-template-columns: 1fr 300px`. Grid cho phép kiểm soát cả 2 chiều, sidebar luôn đúng kích thước.
 
### 4. Footer 4 cột → **Grid hoặc Flexbox** (cả hai đều tốt)
- **Grid:** `repeat(4, 1fr)` → mỗi cột đúng 25%, căn dọc tốt hơn
- **Flexbox:** `flex: 1` trên mỗi cột → đơn giản hơn nếu không cần kiểm soát hàng
- **Nên chọn Grid** nếu cần responsive (thay đổi số cột dễ hơn).
### 5. Card sản phẩm (ảnh trên, text giữa, nút dưới) → **Flexbox (column)**
**Lý do:** Bố cục dọc bên trong card. `flex-direction: column` + `flex: 1` trên vùng text + `margin-top: auto` trên nút → nút luôn dính đáy dù text dài ngắn khác nhau.
 
---
 
## Câu C2 (10đ) — Debug Flexbox
 
### Lỗi 1: Cards không đều chiều cao — nút "Mua" bị nhảy lên/xuống
 
**Nguyên nhân:** `.card` không có `display: flex; flex-direction: column`, nên nút không biết "đáy" là đâu. Chiều cao card phụ thuộc nội dung, nút trôi tự do.
 
```css
/* ❌ Trước — bị lỗi */
.card { width: 30%; margin: 1.5%; }
.card .btn { padding: 10px; }
 
/* ✅ Sau — đã sửa */
.card {
  width: 30%;
  margin: 1.5%;
  display: flex;            /* Thêm flex */
  flex-direction: column;   /* Xếp dọc */
}
.card .btn {
  padding: 10px;
  margin-top: auto;         /* Đẩy nút xuống đáy luôn */
}
```
 
---
 
### Lỗi 2: Items vẫn dính góc trái trên dù dùng flexbox
 
**Nguyên nhân:** Flex container thiếu `justify-content: center` (căn ngang) và `align-items: center` (căn dọc). Mặc định flex items xếp từ trái và từ trên.
 
```css
/* ❌ Trước — bị lỗi */
.hero {
  height: 100vh;
  display: flex;
  /* Không có justify-content và align-items */
}
 
/* ✅ Sau — đã sửa */
.hero {
  height: 100vh;
  display: flex;
  justify-content: center;  /* Căn giữa theo trục ngang */
  align-items: center;      /* Căn giữa theo trục dọc */
}
```
 
---
 
### Lỗi 3: Sidebar bị co lại khi content quá dài
 
**Nguyên nhân:** Mặc định flex items có `flex-shrink: 1`, nghĩa là được phép co lại khi container không đủ chỗ. Sidebar `width: 250px` chỉ là "gợi ý", không phải kích thước cứng.
 
```css
/* ❌ Trước — bị lỗi */
.layout { display: flex; }
.sidebar { width: 250px; }          /* Bị co khi content dài */
.content { flex: 1; }
 
/* ✅ Sau — đã sửa */
.layout { display: flex; }
.sidebar {
  width: 250px;
  flex-shrink: 0;            /* Cấm co lại — giữ đúng 250px */
}
.content { flex: 1; }        /* Content tự co giãn phần còn lại */
```