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