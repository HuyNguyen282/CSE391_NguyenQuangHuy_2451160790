## PHẦN A — ĐỌC HIỂU

### Câu A1 — var/let/const

**Đoạn 1:**
**Output:**undefined.
**Giải thích:** var được hoisting lên đầu scope.JS sẽ thấy khai báo `var x` trước khi chạy. Vì chưa gán giá trị nên in ra undefined.

**Đoạn 2:**
**Output:**ReferenceError.
**Giải thích:** `let` cũng được hoisting nhưng nằm trong vùng chết từ đầu scope đến dòng khai báo, không thể truy cập. Truy cập trong vùng chết gây ra lỗi `ReferenceError`.

**Đoạn 3:**
**Output:**TypeError
**Giải thích:** `const` không cho phép gán lại giá trị. JS sẽ báo lỗi `TypeError` ngay tại dòng z=20.

**Đoạn 4:**
**Output:**[1, 2, 3, 4]
**Giải thích:**`const` chỉ cấm gán lại biến, không cấm thay đổi lội dung của object/array. `arr` vẫn trỏ đến cùng một mảng, ta chỉ thêm phần tử vào mảng đó.

**Đoạn 5:**
**Output:**Biến trong block {} a = 2, biến ngoài block a = 1
**Giải thích:**`let` có block scope. Biến `a=2` bên trong `{}` là biến hoàn toàn khác với `a=1` bên ngoài. Hai biến không ảnh hưởng gì đến nhau.

### Câu A2 - Data Types

```
console.log(typeof null); -> "object"  // Đây là bug lịch sử của JS phiên bản đầu, không sửa vì sẽ phã vỡ code
console.log(typeof undefined); -> "undefined"        // Kiểu nguyên thuỷ đúng
console.log(typeof NaN); -> "number"             // "NaN" vẫn thuộc kiểu number
console.log("5" + 3);-> "53"                 // + có string nên nối chuỗi, 3 bị chuyển thành "3"
console.log("5" - 3); -> "2"               // - không có ý nghĩa với chuỗi, ép kiểu "5" về thành số 5, tính toán 5-3
console.log("5" * "3");  -> "15"            // * ép cả hai thành số, thực hiện phép tính 5x3
console.log(true + true); -> "2"     // true bị ép kiểu thành 1, tính 1+1
console.log([] + []);->""                // Mảng rỗng .toString()="", ""+""=""
console.log([] + {});  -> "[object Object]"              // [].toString() = "", {}.toString() = "[object Object]" -> nối lại
console.log({} + []);  -> "0"              // Khi {} ở đầu dòng, JS hiểu là block rỗng, không phải object. Còn lại +[] -> +"" -> 0

```

##### Tại sao `"5" + 3` và `"5" - 3` khác nhau?

- Toán tử `+` đa năng: vừa cộng số, vừa nối chuỗi. Khi có bất kỳ toán hạng nào là chuỗi, JS ưu tiên nối chuỗi → `"5" + 3 = "53"`.
- Toán tử `-` **chỉ có nghĩa với số**. JS không có khái niệm "trừ chuỗi" → tự động ép toán hạng về số trước → `"5" - 3 = 2`.

### Câu A3 — So sánh == vs ===

```
console.log(5 == "5");                // true
console.log(5 === "5");               // false
console.log(null == undefined);       // true
console.log(null === undefined);      //  false
console.log(NaN == NaN);             // false
console.log(0 == false);             // true
console.log(0 === false);            // false
console.log("" == false);            // true
```

##### Quy tắc: Nên dùng `===` hay `==`?

**Luôn dùng `===` (strict equality).**

**Lý do:**

1. `==` thực hiện **type coercion ngầm** với bộ quy tắc phức tạp và khó nhớ (như bảng trên — nhiều kết quả không trực quan).
2. `===` so sánh cả **giá trị lẫn kiểu dữ liệu** — hành vi rõ ràng, dễ đoán, ít bug.
Ngoại lệ duy nhất hợp lý: `x == null` để kiểm tra cả `null` và `undefined` cùng lúc.

### Câu A4 — Truthy & Falsy

##### Tất cả giá trị Falsy trong JavaScript (đúng 7 giá trị)

```
false, 0, -0, 0n, "", '', ``, null, undefined, NaN
```

```
 if ("0") // In "A"
 if ("") // Không in 
 if ([]) // In "C"
 if ({}) // In "D" 
 if (null) // Không in 
 if (0) // Không in  
 if (-1) // In "G"
 if (" ") // In "H"
```

### Câu A5 — Template Literals

**Cách 1:**

```javascript
// Trước:
var greeting = "Xin chào " + name + "! Bạn " + age + " tuổi.";
 
// Sau:
const greeting = `Xin chào ${name}! Bạn ${age} tuổi.`;
```

**Cách 2:**

```javascript
// Trước:
var url = "https://api.example.com/users/" + userId + "/orders?page=" + page;
 
// Sau:
const url = `https://api.example.com/users/${userId}/orders?page=${page}`;
```

**Cách 3:**

```javascript
// Trước:
var html = "<div class=\"card\">" +
    "<h2>" + title + "</h2>" +
    "<p>" + description + "</p>" +
    "<span>Giá: " + price + "đ</span>" +
    "</div>";
 
// Sau:
const html = `<div class="card">
    <h2>${title}</h2>
    <p>${description}</p>
    <span>Giá: ${price}đ</span>
</div>`;
```
