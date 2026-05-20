## PHẦN A — ĐỌC HIỂU
 
### Câu A1 — Grid System
 
**Bảng layout ở 3 kích thước:**
 
| Kích thước màn hình | < 768px (mobile) | 768px – 991px (tablet) | ≥ 992px (desktop) |
|---|---|---|---|
| Class Bootstrap áp dụng | `col-12` | `col-md-6` | `col-lg-3` |
| Mỗi box chiếm | 12/12 cột = 100% | 6/12 cột = 50% | 3/12 cột = 25% |
| Cách hiển thị | 4 box xếp dọc, mỗi box 1 hàng | 2 box mỗi hàng (2 hàng × 2 cột) | 4 box trên cùng 1 hàng |
 
**Câu hỏi thêm:**
 
- **`col-md-6` nghĩa là gì?**  
  Nghĩa là từ breakpoint `md` (≥ 768px) trở lên, element chiếm 6 trong 12 cột (tức 50% chiều rộng). Dưới 768px thì class này không có hiệu lực.
- **Tại sao không cần viết `col-sm-12`?**  
  Bootstrap theo triết lý **mobile-first**: `col-12` đã áp dụng cho mọi kích thước nhỏ nhất và các breakpoint lớn hơn sẽ override nó. Viết thêm `col-sm-12` là dư thừa vì `col-12` đã bao phủ cả mobile lẫn sm.
---
 
### Câu A2 — Utilities & Components
 
**1. Giải thích `d-none d-md-block`:**
 
- `d-none` → `display: none` áp dụng từ kích thước nhỏ nhất (mobile-first).
- `d-md-block` → `display: block` từ breakpoint `md` (≥ 768px) trở lên, override lại `d-none`.
- **Kết quả:** Element **ẩn trên mobile** (< 768px), **hiện trên tablet và desktop** (≥ 768px).
**2. Năm spacing utilities:**
 
| Class | Ý nghĩa | CSS tương đương |
|---|---|---|
| `mt-3` | margin-top mức 3 | `margin-top: 1rem` (16px) |
| `px-4` | padding trái + phải mức 4 | `padding-left: 1.5rem; padding-right: 1.5rem` |
| `mb-auto` | margin-bottom tự động | `margin-bottom: auto` — thường dùng trong flexbox để đẩy phần tử xuống đáy |
| `p-0` | bỏ toàn bộ padding | `padding: 0` |
| `ms-2` | margin-start (trái) mức 2 | `margin-left: 0.5rem` |
 
> Bootstrap dùng thang từ 0–5: mỗi bước = 0.25rem. Ví dụ: mt-1=0.25rem, mt-2=0.5rem, mt-3=1rem, mt-4=1.5rem, mt-5=3rem.
 
**3. Sự khác nhau giữa `.container`, `.container-fluid`, `.container-md`:**
 
| Class | Hành vi |
|---|---|
| `.container` | Có max-width cố định thay đổi theo breakpoint, căn giữa trang, có padding 2 bên |
| `.container-fluid` | Luôn chiếm 100% chiều rộng viewport ở mọi kích thước màn hình |
| `.container-md` | 100% width trên mobile (< 768px), chuyển sang fixed max-width từ breakpoint `md` trở lên |
 
---

## PHẦN C — PHÂN TÍCH
 
### Câu C1 — Tùy biến Bootstrap
 
**1. Quy trình đổi màu `$primary` từ xanh mặc định sang `#E63946`:**
 
Cần công cụ: **Node.js**, **npm**, **Sass compiler**.
 
**Các bước thực hiện:**
 
```bash
# Bước 1: Cài Bootstrap source và Sass
npm install bootstrap sass
```
 
Tạo file `custom.scss`:
 
```scss
// Bước 2: Override biến TRƯỚC khi import Bootstrap
$primary: #E63946;
 
// Bước 3: Import toàn bộ Bootstrap
@import "node_modules/bootstrap/scss/bootstrap";
```
 
```bash
# Bước 4: Compile ra file CSS
npx sass custom.scss custom.css
```
 
Sau đó dùng `custom.css` thay vì link CDN Bootstrap mặc định.
 
**2. Tại sao KHÔNG nên override trực tiếp `.btn-primary { background: red; }`?**
 
Vì một biến `$primary` trong Bootstrap sinh ra **hàng chục class liên quan** cùng lúc: `.btn-primary`, `.bg-primary`, `.text-primary`, `.border-primary`, `.alert-primary`, `.badge.bg-primary`, v.v.
 
Nếu override trực tiếp `.btn-primary`, chỉ duy nhất class đó đổi màu, còn `.bg-primary`, `.alert-primary`... vẫn giữ màu xanh gốc → **không nhất quán** trong toàn bộ giao diện.
 
Dùng SASS variable thì Bootstrap sẽ tự động sinh lại toàn bộ hệ thống màu đồng bộ từ 1 chỗ duy nhất.
 
---
 
### Câu C2 — So sánh Bootstrap vs CSS thuần
 
Lấy ví dụ: viết 1 navbar responsive + 1 product card.
 
| Tiêu chí | CSS thuần | Bootstrap |
|---|---|---|
| **Số dòng CSS cần viết** | ~80–120 dòng | 0 dòng (chỉ thêm class vào HTML) |
| **Thời gian phát triển** | 2–3 giờ | 15–30 phút |
| **Responsive** | Tự viết media queries | Grid và breakpoints có sẵn |
| **Khả năng tùy biến** | Toàn quyền, không giới hạn | Bị ràng buộc bởi design system Bootstrap |
| **File size** | Nhỏ (chỉ CSS cần thiết) | To hơn (~30KB gzip full Bootstrap) |
| **Nhất quán giao diện** | Phụ thuộc người viết | Đảm bảo nhất quán theo hệ thống |
 
**Khi NÊN dùng Bootstrap:**
- Cần ra sản phẩm nhanh (prototype, MVP, admin panel).
- Team nhiều người, cần design system thống nhất.
- Dự án không cần giao diện quá độc đáo (trang nội bộ, dashboard).
**Khi KHÔNG NÊN dùng Bootstrap:**
- Cần thiết kế hoàn toàn tùy chỉnh, khác biệt so với các trang Bootstrap thông thường.
- Yêu cầu tối ưu performance nghiêm ngặt (file CSS Bootstrap nặng hơn so với chỉ viết đúng thứ cần).
- Dự án đã dùng framework CSS khác (Tailwind, Bulma) — dùng 2 framework dễ conflict.