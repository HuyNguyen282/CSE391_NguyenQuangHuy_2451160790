
# CSS Core: Selectors, Box Model, Inheritance & Cascade

---

## PHAN A - KIEM TRA DOC HIEU

### Cau A1 - 3 Cach nhung CSS

#### 1. Inline CSS

```html
<p style="color: red; font-size: 16px;">Hello World</p>
```

Uu diem: Ap dung truc tiep vao tung element, do uu tien cao nhat (tru !important).
Nhuoc diem: Kho bao tri, khong tai su dung duoc, tron lan HTML va CSS.
Nen dung: Chi dung khi can ghi de nhanh hoac khi CSS duoc tao dong bang JavaScript.

#### 2. Internal CSS

```html
<head>
  <style>
    p { color: red; font-size: 16px; }
  </style>
</head>
```

Uu diem: Khong can file ngoai, phu hop cho trang don le.
Nhuoc diem: Khong tai su dung duoc cho nhieu trang, tang kich thuoc HTML.
Nen dung: Prototype nhanh, email HTML, trang chi co 1 file duy nhat.

#### 3. External CSS

```html
<head>
  <link rel="stylesheet" href="style.css">
</head>
```

Uu diem: Tai su dung duoc cho nhieu trang, de bao tri, browser co the cache.
Nhuoc diem: Can them HTTP request, phai quan ly file rieng.
Nen dung: Trong moi du an thuc te, khi co nhieu trang dung chung style.

#### Cau hoi them: Thu tu do uu tien khi ca 3 ap dung cung luc

Thu tu thang: Inline > Internal = External (phan thang nhau dua vao specificity va thu tu xuat hien).

Ly do: Inline style co specificity la 1,0,0,0 (cao hon ca ID selector), nen luon thang Internal va External. Giua Internal va External, cai nao duoc khai bao sau hon trong trang HTML se thang neu specificity bang nhau.

---

### Cau A2 - CSS Selectors - Du doan ket qua

```
1. h1                    -> Chon: "ShopTLU" (the h1 trong header)
2. .price                -> Chon: "25.990.000d" va "45.990.000d" (ca 2 the p co class price)
3. #app header           -> Chon: toan bo the header.top-bar.dark (hau due cua #app)
4. nav a:first-child     -> Chon: "Home" (the a dau tien trong nav)
5. .product.featured h2  -> Chon: "MacBook Pro" (h2 trong article co ca 2 class product va featured)
6. article > p           -> Chon: ca 4 the p la con truc tiep cua article (2 cai .price + 2 cai mo ta)
7. a[href="/"]           -> Chon: "Home" (the a co thuoc tinh href bang dung "/")
8. .top-bar.dark h1      -> Chon: "ShopTLU" (h1 nam trong element co ca 2 class top-bar va dark)
```

---

### Cau A3 - Box Model - Tinh toan kich thuoc

#### Truong hop 1: content-box (mac dinh)

Chieu rong hien thi = width + padding-left + padding-right + border-left + border-right
= 400 + 20 + 20 + 5 + 5 = 450px

Khong gian chiem tren trang = chieu rong hien thi + margin-left + margin-right
= 450 + 10 + 10 = 470px

#### Truong hop 2: border-box

Chieu rong hien thi = 400px (padding va border da duoc tinh vao trong width)

Kich thuoc content thuc te = width - padding-left - padding-right - border-left - border-right
= 400 - 20 - 20 - 5 - 5 = 350px

Khong gian chiem tren trang = 400 + 10 + 10 = 420px

#### Truong hop 3: Margin collapse

Khoang cach giua box-a va box-b = 40px (margin lon hon thang)

Giai thich: Khi 2 block element dung canh nhau theo chieu doc, margin-bottom cua element tren va margin-top cua element duoi KHONG cong vao nhau. Thay vao do, chi margin nao lon hon duoc su dung. Day goi la "margin collapse". Vi 40px > 25px, nen khoang cach la 40px, KHONG PHAI 25 + 40 = 65px.

#### Nang cao: margin-bottom: -10px va margin-top: 40px

Khoang cach = 40 + (-10) = 30px

Khi co margin am, quy tac la: lay margin duong lon nhat cong voi margin am nho nhat (am nhat). 40 + (-10) = 30px.

---

### Cau A4 - Specificity

Specificity duoc tinh theo dang (a, b, c):
- a = so ID selectors
- b = so class, pseudo-class, attribute selectors
- c = so element, pseudo-element selectors

```
Rule A: p                  -> (0, 0, 1) = 1
Rule B: .price             -> (0, 1, 0) = 10
Rule C: #main-price        -> (1, 0, 0) = 100
Rule D: p.price            -> (0, 1, 1) = 11
```

1. Specificity score:
   - Rule A: (0,0,1)
   - Rule B: (0,1,0)
   - Rule C: (1,0,0)
   - Rule D: (0,1,1)

2. Element hien thi mau gi: MAU DO (red) - vi Rule C co #main-price la ID selector, co specificity cao nhat (1,0,0).

3. Neu them inline style="color: orange": MAU CAM (orange) - inline style co specificity cao hon tat ca rule thong thuong, tuong duong (1,0,0,0).

4. Neu Rule A them !important: VAN LA MAU CAM - vi inline style co !important thi thang het, nhung neu khong co !important tren inline thi !important trong stylesheet thang inline. Trong truong hop nay, Rule A la `p { color: black !important; }`. Vi khong co inline !important, nen `black !important` se thang inline `orange`. Ket qua: MAU DEN (black).

   Giai thich day du:
   - !important trong stylesheet > inline style (khong co !important)
   - !important inline > !important stylesheet
   - Neu ca 2 deu co !important thi specificity quyet dinh.

---

## PHAN C - DEBUG & SUY LUAN

### Cau C1 - Debug CSS Layout

#### 1. Tinh chieu rong thuc te (content-box):

Sidebar: 300 (width) + 20 + 20 (padding) + 1 + 1 (border) = 342px
Content: 660 (width) + 30 + 30 (padding) + 1 + 1 (border) = 722px

Tong = 342 + 722 = 1064px

#### 2. Tai sao layout bi vo:

Container chi rong 960px nhung tong chieu rong cua sidebar + content la 1064px, vuot qua 104px. Do do content bi day xuong dong moi vi khong du cho de nam cung hang voi sidebar.

#### 3. Hai cach sua:

Cach 1 - Dung border-box:
```css
.sidebar, .content {
    box-sizing: border-box;
}
/* Sidebar: 300px, Content: 660px, tong = 960px - dung */
```

Cach 2 - Khong dung border-box, giam width lai:
```css
.sidebar {
    width: 258px; /* 300 - 20 - 20 - 1 - 1 = 258 */
}
.content {
    width: 598px; /* 660 - 30 - 30 - 1 - 1 = 598 */
}
/* Sidebar thuc te: 258+42=300px, Content thuc te: 598+62=660px, tong=960px */
```

---

### Cau C2 - Cascade Puzzle

#### 1. "San pham A" (h2.title.highlight trong #featured)

font-size: 20px
- Rule `.card .title { font-size: 20px; }` ap dung -> 20px
- Khong co rule nao khac override font-size cho element nay

color: green
- Cac rules lien quan: `.card { color: blue }`, `#featured .title { color: red }`, `.highlight { color: green !important }`
- `.highlight { color: green !important }` co !important nen thang tat ca
- Ket qua: mau xanh la (green)

#### 2. "Mo ta san pham" (p trong card#featured, khong co class gi)

color: blue
- Rule `.card p { color: inherit; }` -> inherit tu .card
- .card co `color: blue` -> nen p ke thua -> blue
- Khong co rule nao override
- Ket qua: mau xanh duong (blue)

#### 3. "San pham B" (h2.title trong .card khong co id)

font-size: 20px
- Rule `.card .title { font-size: 20px; }` ap dung
- Khong co override
- Ket qua: 20px

color: blue
- Rule `.card { color: blue }` va `.card .title { font-size: 20px }` (khong set color)
- `.card .title` khong dat color, nen h2 ke thua color tu .card = blue
- Khong co !important hay ID override
- Ket qua: mau xanh duong (blue)

#### 4. "Mo ta san pham B" (p.highlight trong .card thu 2)

color: green
- Rule `.card p { color: inherit; }` -> (0,2,1)
- Rule `.highlight { color: green !important }` -> co !important
- !important luon thang, nen green
- Ket qua: mau xanh la (green)

---

### Specificity Rules liet ke (Bai B3)

10 rules tu thap den cao:

```css
p { color: gray; }                               /* (0,0,1) */
.text { color: navy; }                           /* (0,1,0) */
p.text { color: teal; }                          /* (0,1,1) */
.text.highlight { color: orange; }               /* (0,2,0) */
p.text.highlight { color: purple; }             /* (0,2,1) */
div p { color: brown; }                          /* (0,0,2) - NOTE: thap hon class */
#demo { color: red; }                            /* (1,0,0) */
p#demo { color: blue; }                          /* (1,0,1) */
.text#demo { color: pink; }                      /* (1,1,0) */
p.text#demo { color: lime; }                     /* (1,1,1) */
```

Element hien thi mau gi: lime (rule cuoi cung co specificity cao nhat (1,1,1)).

Neu thay doi thu tu trong CSS: Neu 2 rules co specificity bang nhau, rule nao den sau thang. Nhung neu specificity khac nhau, thu tu KHONG anh huong - specificity cao hon luon thang.