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
 
Lệnh compile đã dùng cho Bài B3: `sass --watch scss/style.scss:css/style.css`.
---
## PHẦN C 
### Câu C1 (10đ) — Phân tích trang web thực: **Youtube (youtube.com)**

#### 3 kích thước màn hình — phân tích

**Mobile (375px):**

- **Navigation:** Header thu gọn chỉ còn Logo + icon Tìm kiếm. Thanh điều hướng chính chuyển thành bottom tab bar cố định dưới cùng (Trang chủ / Shorts / Kênh đăng ký / Bạn). Thanh lọc chủ đề (chips filter) bị thu hẹp, người dùng phải vuốt ngang để xem tiếp.
- **Lưới video:** 1 cột — ảnh thumbnail chiếm trọn 100% chiều rộng màn hình (trừ lề), giúp người dùng dễ xem nhất trên màn hình dọc.
- **Bị ẩn trên mobile:** Menu bên trái (sidebar) hoàn toàn không có. Một số lượng lớn các thẻ chủ đề (chips) bị khuất. Các nút thao tác phụ trên video (icon 3 chấm) nhỏ hơn hoặc ẩn đi cho tới khi tương tác.
- **Font size:** Kích thước chữ vẫn dễ đọc (khoảng 12–14px) nhưng tiêu đề video dài sẽ bị cắt ngắn bằng dấu ba chấm ... sớm hơn (tối đa 2 dòng) để tiết kiệm diện tích.

**Tablet (768px):**

- **Navigation:** Tương tự mobile, header có Logo + icon Tìm kiếm, và (dựa theo ảnh cung cấp) vẫn sử dụng bottom tab bar dưới cùng. Thanh lọc chủ đề ở trên trải dài hơn, hiển thị được nhiều từ khóa hơn mà không cần vuốt.
- **Lưới video:** 2 cột — không gian mở rộng giúp chia đôi màn hình, hiển thị 2 video song song.
- **Bottom tab bar:** Sidebar bên trái vẫn chưa xuất hiện (dựa trên ảnh hiện tại).
- **Font size:** Chữ giữ nguyên kích thước chuẩn nhưng tiêu đề có nhiều không gian hiển thị chiều ngang hơn, ít bị cắt chữ hơn so với mobile.

**Desktop (1440px):**

- **Navigation:** Header rộng rãi, thanh lọc chủ đề hiển thị được tối đa các tùy chọn (Tất cả, Trò chơi, Trực tiếp,...).
- **Lưới video:** 4 cột — dàn trải đều nội dung lấp đầy không gian màn hình lớn.
- **Bị ẩn trên desktop:** Hầu như không có. Tất cả các thông tin từ thumbnail, độ dài video, avatar kênh, tên kênh, lượt xem, thời gian đăng đều được hiển thị đầy đủ và thoáng mắt.
- **Font size:** Tiêu chuẩn (khoảng 14–16px). Khoảng cách (padding/margin) giữa các khối video rộng rãi, tạo cảm giác không bị chật chội.

### Câu C2 (10đ) — Thiết kế Responsive Strategy: Trang Đặt Bàn Nhà Hàng

#### Wireframe 3 kích thước

```
MOBILE (< 768px)
┌─────────────────────────┐
│ NHÀ HÀNG    SĐT         │  ← Header: logo + số điện thoại (to, dễ bấm)
├─────────────────────────┤
│                         │
│     HERO IMAGE          │  ← full width, height: 250px
│   (toàn chiều rộng)     │
│                         │
├─────────────────────────┤
│  [ảnh 1]                │  ← Grid ảnh món ăn: 1 cột (6 ảnh chồng)
│  [ảnh 2]                │    Đơn giản, tải nhanh trên mobile
│  [ảnh 3]                │
│  [ảnh 4]                │
│  [ảnh 5]                │
│  [ảnh 6]                │
├─────────────────────────┤
│  FORM ĐẶT BÀN           │  ← Form  dọc 1 cột
│  Ngày: [_______]        │    Input full width
│  Giờ:  [_______]        │
│  Số người: [___]        │
│  Ghi chú: [_____]       │
│  [  ĐẶT BÀN NGAY  ]     │
├─────────────────────────┤
│  BẢN ĐỒ GOOGLE MAPS     │  ← height: 250px, full width
│  (nhúng iframe)         │
├─────────────────────────┤
│  FOOTER                 │
└─────────────────────────┘

Ẩn trên mobile: nav links (chỉ giữ logo + SĐT)


TABLET (768px – 1023px)
┌──────────────────────────────────────────┐
│  🍽️ NHÀ HÀNG  [Giới thiệu][Menu][Đặt bàn]│
├──────────────────────────────────────────┤
│                                          │
│            HERO IMAGE                   │  
│                                          │
├──────────────────────────────────────────┤
│  [ảnh 1]  [ảnh 2]  [ảnh 3]              │  ← Grid 3 cột (6 ảnh = 2 hàng)
│  [ảnh 4]  [ảnh 5]  [ảnh 6]              │
├──────────────────────────────────────────┤
│  Ngày: [___]  Giờ: [___]                │  ← Form 2 cột
│  Số người: [___]  Ghi chú: [________]   │
│         [  ĐẶT BÀN NGAY  ]              │
├──────────────────────────────────────────┤
│           BẢN ĐỒ GOOGLE MAPS            │  ← full width, height: 350px
├──────────────────────────────────────────┤
│           FOOTER (2 cột)                 │
└──────────────────────────────────────────┘


DESKTOP (≥ 1024px)
┌─────────────────────────────────────────────────────────┐
│  🍽️ NHÀ HÀNG ABC   [Giới thiệu][Menu][Đặt bàn][Blog]   │
├─────────────────────────────────────────────────────────┤
│                                                         │
│                    HERO IMAGE                           │  ← height: 550px
│                                                         │
├────────────────────────────────────┬────────────────────┤
│  GRID ẢNH MÓN ĂN (3 cột)          │  FORM ĐẶT BÀN      │
│  [ảnh 1]  [ảnh 2]  [ảnh 3]        │  Ngày:  [_______]  │
│  [ảnh 4]  [ảnh 5]  [ảnh 6]        │  Giờ:   [_______]  │
│                                    │  Số ng: [_______]  │
│                                    │  Ghi chú:          │
│                                    │  [_____________]   │
│                                    │  [  ĐẶT NGAY  ]    │
├────────────────────────────────────┴────────────────────┤
│                  BẢN ĐỒ GOOGLE MAPS (full width)        │
├─────────────────────────────────────────────────────────┤
│             FOOTER (4 cột)                               │
└─────────────────────────────────────────────────────────┘

Desktop: Layout 2 cột (ảnh + form cạnh nhau). Không có sidebar.
```

#### CSS Skeleton — Mobile-First, Grid + Media Queries

```css


* { box-sizing: border-box; margin: 0; padding: 0; }

/* --- HEADER --- */
.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px;
}

.header__nav {
    display: none;  
}


.hero {
    width: 100%;
    height: 250px;
    object-fit: cover;
}


.food-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 12px;
    padding: 16px;
}


.booking-form {
    display: grid;
    grid-template-columns: 1fr;
    gap: 12px;
    padding: 16px;
}

.booking-form input,
.booking-form textarea,
.booking-form select {
    width: 100%;
    padding: 12px;
}

/* --- BẢN ĐỒ --- */
.map-section {
    width: 100%;
    height: 250px;
}

.map-section iframe {
    width: 100%;
    height: 100%;
    border: 0;
}

/* --- FOOTER: mobile 1 cột --- */
.footer__grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 24px;
    padding: 32px 16px;
}

/* ============================================
   TABLET — min-width: 768px
   ============================================ */
@media (min-width: 768px) {

    .header__nav {
        display: flex;   /* Hiện nav links */
        gap: 24px;
    }

    .hero {
        height: 400px;
    }

    /* Ảnh món: 3 cột */
    .food-grid {
        grid-template-columns: repeat(3, 1fr);
    }

    /* Form: 2 cột */
    .booking-form {
        grid-template-columns: repeat(2, 1fr);
    }

    .map-section { height: 350px; }

    .footer__grid {
        grid-template-columns: repeat(2, 1fr);
    }
}

/* ============================================
   DESKTOP — min-width: 1024px
   ============================================ */
@media (min-width: 1024px) {

    .hero {
        height: 550px;
    }

    /* Layout chính: 2 cột (ảnh món | form) */
    .main-content {
        display: grid;
        grid-template-columns: 3fr 2fr;
        gap: 40px;
        max-width: 1200px;
        margin: 0 auto;
        padding: 40px 24px;
    }

    /* Ảnh giữ 3 cột trong cột trái */
    .food-grid {
        grid-template-columns: repeat(3, 1fr);
    }

    /* Form full height bên phải */
    .booking-form {
        grid-template-columns: 1fr;  /* 1 cột dọc bên phải */
    }

    .map-section { height: 420px; }

    .footer__grid {
        grid-template-columns: repeat(4, 1fr);
    }
}
```