# Phần A — Kiểm tra đọc hiểu

## Câu A1 — Function Declaration vs Expression vs Arrow

```javascript
// Cách 1: Function Declaration
function tinhThueBaoHiem(luong) {
    let thue = 0;
    if (luong > 11000000) {
        thue = luong * 0.1;
    }
    let thuc_nhan = luong - thue;
    return { thue, thuc_nhan };
}

// Cách 2: Function Expression
const tinhThueBaoHiem2 = function(luong) {
    let thue = 0;
    if (luong > 11000000) {
        thue = luong * 0.1;
    }
    let thuc_nhan = luong - thue;
    return { thue, thuc_nhan };
};

// Cách 3: Arrow Function
const tinhThueBaoHiem3 = (luong) => {
    let thue = 0;
    if (luong > 11000000) {
        thue = luong * 0.1;
    }
    let thuc_nhan = luong - thue;
    return { thue, thuc_nhan };
};
```

**Hoisting:**

Có, 3 cách này khác nhau về hoisting!

- **Function Declaration** được hoisting hoàn toàn, nghĩa là có thể gọi hàm trước khi khai báo:

```javascript
console.log(tinhThueBaoHiem(15000000)); // chạy được bình thường dù khai báo bên dưới

function tinhThueBaoHiem(luong) {
    // ...
}
```

- **Function Expression và Arrow Function** KHÔNG được hoisting, nếu gọi trước khi khai báo sẽ bị lỗi:

```javascript
console.log(tinhThueBaoHiem2(15000000)); // ReferenceError: Cannot access 'tinhThueBaoHiem2' before initialization

const tinhThueBaoHiem2 = function(luong) {
    // ...
};
```

---

## Câu A2 — Scope & Closure

**Đoạn 1:**

```
1  ← c.increment() → count từ 0 lên 1, trả về 1
2  ← c.increment() → count lên 2, trả về 2
3  ← c.increment() → count lên 3, trả về 3
2  ← c.decrement() → count xuống 2, trả về 2
2  ← c.getCount()  → count đang là 2, trả về 2
```

**Đoạn 2 — Output sau 200ms:**

```
var: 3
var: 3
var: 3
let: 0
let: 1
let: 2
```

**Giải thích:**

- Với `var`: biến `i` dùng chung một ô nhớ cho cả vòng lặp (function scope). Khi setTimeout chạy sau 100ms thì vòng lặp đã chạy xong rồi, lúc đó `i` đã bằng 3, nên cả 3 lần đều in ra `var: 3`.

- Với `let`: mỗi lần lặp tạo ra một biến `j` riêng biệt (block scope). Mỗi callback setTimeout "nhớ" đúng giá trị `j` của lần lặp đó, nên in ra `let: 0`, `let: 1`, `let: 2`.

---

## Câu A3 — Array Methods

```javascript
const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// 1. Lấy các số chẵn
const chanSo = nums.filter(x => x % 2 === 0); // [2, 4, 6, 8, 10]

// 2. Nhân mỗi số với 3
const nhan3 = nums.map(x => x * 3); // [3, 6, 9, ..., 30]

// 3. Tính tổng tất cả
const tong = nums.reduce((sum, x) => sum + x, 0); // 55

// 4. Tìm số đầu tiên > 7
const timDau = nums.find(x => x > 7); // 8

// 5. Kiểm tra CÓ số > 10 không
const coSoLon = nums.some(x => x > 10); // false

// 6. Kiểm tra TẤT CẢ đều > 0
const tatCaDuong = nums.every(x => x > 0); // true

// 7. Tạo mảng "Số X là [chẵn/lẻ]"
const chanLe = nums.map(x => `Số ${x} là ${x % 2 === 0 ? "chẵn" : "lẻ"}`);

// 8. Đảo ngược mảng không mutate
const dao = [...nums].reverse(); // [10, 9, ..., 1]
```

---

## Câu A4 — Object Destructuring & Spread

```javascript
const product = {
    name: "iPhone 16",
    price: 25990000,
    specs: { ram: 8, storage: 256, color: "Titan" }
};

const { name, price, specs: { ram, color } } = product;
console.log(name, price, ram, color);
// → iPhone 16 25990000 8 Titan

console.log(specs);
// → ReferenceError: specs is not defined
// (vì destructuring đặt tên biến là ram và color, không có biến tên specs)

const updated = { ...product, price: 23990000, sale: true };
console.log(updated.price);   // → 23990000 (bị ghi đè)
console.log(updated.sale);    // → true
console.log(product.price);   // → 25990000 (gốc KHÔNG đổi)

const copy = { ...product };
copy.specs.ram = 16;
console.log(product.specs.ram); // → 16
```

**Tại sao là 16?** Vì spread `{...product}` chỉ copy nông (shallow copy). `copy.specs` và `product.specs` cùng trỏ vào một object trong bộ nhớ, nên sửa `copy.specs.ram` thì `product.specs.ram` cũng bị thay đổi theo.

---

---

# Phần C — Suy luận

## Câu C1 — Refactor Code

```javascript
function processOrders(orders) {
    return orders
        .filter(order => order.status === "completed" && order.total > 100000)
        .map(({ id, customer, total }) => ({
            id,
            customer,
            total,
            discount: total * 0.1,
            finalTotal: total - total * 0.1
        }))
        .sort((a, b) => b.finalTotal - a.finalTotal);
}
```

---

## Câu C2 — Thiết kế API miniArray

```javascript
const miniArray = {
    map(arr, fn) {
        // Tạo mảng rỗng rồi đẩy từng phần tử đã transform vào
        let result = [];
        for (let i = 0; i < arr.length; i++) {
            result.push(fn(arr[i], i, arr));
        }
        return result;
    },

    filter(arr, fn) {
        // Chỉ đẩy vào nếu fn trả về true
        let result = [];
        for (let i = 0; i < arr.length; i++) {
            if (fn(arr[i], i, arr)) {
                result.push(arr[i]);
            }
        }
        return result;
    },

    reduce(arr, fn, initialValue) {
        // accumulator bắt đầu từ initialValue, cộng dần từng phần tử
        let acc = initialValue;
        for (let i = 0; i < arr.length; i++) {
            acc = fn(acc, arr[i], i, arr);
        }
        return acc;
    }
};

// Test
console.log(miniArray.map([1, 2, 3], x => x * 2));           // [2, 4, 6]
console.log(miniArray.filter([1, 2, 3, 4], x => x > 2));      // [3, 4]
console.log(miniArray.reduce([1, 2, 3, 4], (a, b) => a + b, 0)); // 10
```
