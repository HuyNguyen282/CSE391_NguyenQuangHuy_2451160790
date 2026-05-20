### Câu A1 (5đ) — Viewport & Mobile-First
 
#### 1. Thẻ `<meta viewport>` chuẩn
 
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```
 
Giải thích từng thuộc tính:
 
| Thuộc tính | Ý nghĩa |
|---|---|
| `name="viewport"` | Khai báo đây là thẻ meta điều khiển viewport — vùng hiển thị của trình duyệt trên thiết bị |
| `content="..."` | Chuỗi cấu hình gồm nhiều tham số, ngăn cách nhau bởi dấu phẩy |
| `width=device-width` | Đặt chiều rộng viewport bằng đúng chiều rộng vật lý của thiết bị, thay vì giá trị mặc định ~980px mà trình duyệt mobile hay dùng |
| `initial-scale=1.0` | Mức zoom ban đầu khi trang load = 1 (100%), tức là không phóng to cũng không thu nhỏ |
 
#### 2. Nếu THIẾU thẻ `<meta viewport>`, iPhone hiển thị thế nào?
> Tài liệu tham chiếu: Chương 13_creating_responsive_layouts
 
 Khi thiếu thẻ này, trình duyệt Safari trên iPhone sẽ giả lập một viewport ảo rộng khoảng 980px rồi thu nhỏ toàn bộ trang để vừa với màn hình, điều đó làm cho
 
- Toàn bộ trang bị zoom out, chữ cực nhỏ, khó đọc
- Người dùng phải pinch to zoom mới đọc được nội dung
- Layout desktop bị hiển thị thu nhỏ nguyên xi, không thân thiện với ngón tay
- Quan trọng nhất: **Media queries không hoạt động đúng** — trình duyệt nghĩ viewport đang rộng 980px nên không trigger breakpoint 768px hay 375px thực tế
#### 3. Mobile-First vs Desktop-First — ví dụ breakpoint 768px
 
**Mobile-First** — viết CSS mặc định cho mobile, dùng `min-width` để mở rộng lên:
 
```css

.col {
    width: 100%;
}
 

@media (min-width: 768px) {
    .col {
        width: 50%;
    }
}
```
 
**Desktop-First** — viết CSS mặc định cho desktop, dùng `max-width` để thu xuống:
 
```css

.col {
    width: 50%;
}
 

@media (max-width: 767px) {
    .col {
        width: 100%;
    }
}
```
 
**Tại sao Mobile-First được khuyên dùng?**
 
Mobile-First được khuyên dùng bởi vì: điện thoại tải ít CSS hơn -> Nhanh hơn/ Desktop thêm css thì ổn. Nhưng ngược lại thì lại lãng phí.
---
 
### Câu A2 (5đ) — Breakpoints
 
Breakpoints chuẩn theo **Bootstrap**: 
 
| Tên | Kích thước | Thiết bị đại diện | Lưới sản phẩm nên dùng |
|---|---|---|---|
| **xs** | < 576px | Điện thoại dọc | **1 cột** — màn hình nhỏ, ưu tiên đọc dễ |
| **sm** | ≥ 576px | Điện thoại ngang | **2 cột** — có thêm không gian ngang |
| **md** | ≥ 768px | Tablet | **2–3 cột** — vừa đủ hiển thị card rõ ràng |
| **lg** | ≥ 992px | Desktop nhỏ | **3–4 cột** |
| **xl** | ≥ 1200px | Desktop lớn | **4 cột** — hiển thị thoải mái, không chật |
 
---
 
### Câu A3 (5đ) — Đọc Media Queries — Điền bảng
 
CSS cần phân tích:
 
```css
.container { width: 100%; padding: 10px; }
 
@media (min-width: 576px)  { .container { width: 540px; } }
@media (min-width: 768px)  { .container { width: 720px; } }
@media (min-width: 992px)  { .container { width: 960px; } }
@media (min-width: 1200px) { .container { width: 1140px; } }
```
 
**Logic đọc:** Dùng `min-width` nên CSS cascade từ trên xuống — rule ở dưới sẽ **override** rule trên nếu điều kiện lớn hơn cũng thỏa mãn.
 
| Chiều rộng màn hình | `.container` width |
|---|---|
| **375px** (iPhone SE) | `100%` ≈ **375px** |
| **600px** | **540px** | 
| **800px** | **720px** |
| **1000px** | **960px** | 
| **1400px** | **1140px** | 
 
---
 
### Câu A4 (5đ) — SCSS Basics
 
>Tài liệu tham chiếu:16_sass_scss.md
 
**1. Variables — "Sửa 1 chỗ, 47 chỗ tự đổi"**
 
Lưu giá trị vào biến có tên. Khi cần thay đổi, chỉ sửa đúng 1 chỗ khai báo:
 
```scss
$primary:    #805ad5;
$danger:     #e53e3e;
$font-body:  'Inter', sans-serif;
$radius:     8px;
 
.btn-primary {
    background:    $primary;
    border-radius: $radius;
    font-family:   $font-body;
}
 
.header {
    background: $primary;   /* Đổi $primary = đổi tất cả! */
}
```
 
Câu chuyện trong tài liệu minh họa rõ nhất: Linh yêu cầu đổi màu từ `#3182ce` sang `#805ad5` — nếu dùng CSS thuần phải sửa 47 chỗ, bỏ sót 3 chỗ. Với SCSS chỉ cần sửa đúng dòng `$primary: ...`.
 
---
 
**2. Nesting — "CSS theo cấu trúc HTML"**
 
Viết CSS con lồng bên trong CSS cha, phản ánh đúng cấu trúc HTML. Ký hiệu `&` = tham chiếu đến selector cha:
 
```scss
.navbar {
    background: #1a202c;
    padding: 16px;
 
    ul {
        list-style: none;
        display: flex;
 
        li {
            margin-right: 24px;
 
            a {
                color: white;
                text-decoration: none;
 
                &:hover {        /* & = a → .navbar ul li a:hover */
                    color: $primary;
                }
            }
        }
    }
}
```
---
 
**3. Mixins — "Hàm CSS dùng chung"**
 
Định nghĩa bằng `@mixin`, gọi bằng `@include`. Có thể nhận tham số giống hàm trong lập trình:
 
```scss
/* Định nghĩa */
@mixin flex-center {
    display: flex;
    justify-content: center;
    align-items: center;
}
 
@mixin responsive($breakpoint) {
    @if $breakpoint == tablet {
        @media (min-width: 768px) { @content; }
    } @else if $breakpoint == desktop {
        @media (min-width: 1024px) { @content; }
    }
}
 
/* Sử dụng */
.hero {
    @include flex-center;
    height: 100vh;
}
 
.grid {
    grid-template-columns: 1fr;
 
    @include responsive(tablet) {
        grid-template-columns: repeat(2, 1fr);
    }
 
    @include responsive(desktop) {
        grid-template-columns: repeat(4, 1fr);
    }
}
```
 
---
 
**4. Partials & Import — "Chia file gọn gàng"**
 
File bắt đầu bằng dấu `_` là **partial** — Sass sẽ không compile riêng file đó, chỉ dùng để import vào file chính:
 
```
styles/
├── _variables.scss     ← Biến (dấu _ = đừng compile riêng)
├── _mixins.scss        ← Hàm dùng chung
├── _base.scss          ← Reset, typography
├── _navbar.scss        ← Component navbar
├── _card.scss          ← Component card
└── main.scss           ← File tổng hợp
```
 
```scss

@import 'variables';
@import 'mixins';
@import 'base';
@import 'navbar';
@import 'card';
```
 
Kết quả: Compile ra **1 file** `main.css` duy nhất, code vẫn gọn gàng chia nhỏ theo module.
 
---
 
#### Tại sao trình duyệt không đọc được `.scss`? Cần bước gì?
 
Trình duyệt chỉ hiểu **CSS thuần** theo chuẩn W3C. SCSS là ngôn ngữ preprocessing với cú pháp mở rộng (biến, nesting, mixin...) — trình duyệt không có engine để xử lý.
 
Cần bước **compile** SCSS → CSS:
 
```bash
# Cách 1: VS Code — cài extension "Live Sass Compiler" → click "Watch Sass"
# Tự compile mỗi khi save file
 
# Cách 2: Terminal (Node.js Sass)
npm install -g sass
 
# Compile một lần
sass scss/style.scss css/style.css
 
# Compile + watch (tự compile lại khi save)
sass --watch scss/style.scss:css/style.css --style=expanded
 
# Compile production (nén lại)
sass scss/style.scss css/style.css --style=compressed
```
 

---