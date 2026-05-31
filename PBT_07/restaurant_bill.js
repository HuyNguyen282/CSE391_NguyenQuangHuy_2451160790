
//   @param {Array<{name, price, qty}>} items - danh sách món
//   @param {boolean} includeTip - có tính tip không
//   @param {number} ngayTrongTuan - 0=CN, 1=T2, ..., 3=T4(Wednesday), ..., 6=T7

function tinhHoaDon(items, includeTip = false, ngayTrongTuan = null) {
    const WIDTH = 42;
    const pad  = (str, len, right = false) =>
        right ? str.padStart(len) : str.padEnd(len);
    const line  = (ch = "═") => ch.repeat(WIDTH);
    const row   = (content) => `║ ${content.padEnd(WIDTH - 4)} ║`;

    
    for (let i = 0; i < items.length; i++) {
        tongGoc += items[i].price * items[i].qty;
    }

    let phanTramGiam = 0;
    if (tongGoc > 1_000_000)      phanTramGiam = 15;
    else if (tongGoc > 500_000)   phanTramGiam = 10;

    // Thứ 4 (Wednesday = 3) → giảm thêm 5%
    const isWed = ngayTrongTuan === 3;
    if (isWed) phanTramGiam += 5;

    const soTienGiam  = Math.round(tongGoc * phanTramGiam / 100);
    const sauGiam     = tongGoc - soTienGiam;
    const vat         = Math.round(sauGiam * 0.08);
    const tip         = includeTip ? Math.round(sauGiam * 0.05) : 0;
    const tongThanhToan = sauGiam + vat + tip;

    
    const fmt = (n) => n.toLocaleString("vi-VN") + "đ";

    
    console.log(`╔${line()}╗`);
    console.log(row("       HÓA ĐƠN NHÀ HÀNG"));
    console.log(`╠${line()}╣`);

    for (let i = 0; i < items.length; i++) {
        const { name, price, qty } = items[i];
        const total = price * qty;
        const left  = `${i + 1}. ${name.padEnd(10)} x${qty}   @${fmt(price)}`;
        const right = `= ${fmt(total)}`;
        // căn phải
        const content = left + "  " + right.padStart(WIDTH - 4 - left.length - 2);
        console.log(row(content));
    }

    console.log(`╠${line()}╣`);

    const rows = [
        ["Tổng cộng:",                                fmt(tongGoc)],
        [`Giảm giá (${phanTramGiam}%)${isWed ? " (Thứ 4)" : ""}:`, `-${fmt(soTienGiam)}`],
        ["VAT (8%):",                                 `+${fmt(vat)}`],
    ];
    if (includeTip) rows.push(["Tip (5%):", `+${fmt(tip)}`]);

    for (const [label, value] of rows) {
        const content = label + value.padStart(WIDTH - 4 - label.length);
        console.log(row(content));
    }

    console.log(`╠${line()}╣`);
    const payLabel = "THANH TOÁN:";
    const payValue = fmt(tongThanhToan);
    console.log(row(payLabel + payValue.padStart(WIDTH - 4 - payLabel.length)));
    console.log(`╚${line()}╝`);
}

console.log("\n📋 Test 1: Tổng nhỏ, không ưu đãi\n");
tinhHoaDon([
    { name: "Phở bò",   price: 65_000, qty: 2 },
    { name: "Trà đá",   price:  5_000, qty: 3 },
    { name: "Bún chả",  price: 55_000, qty: 1 },
], false, 1);

console.log("\n📋 Test 2: Tổng > 500k + Thứ 4 + Tip\n");
tinhHoaDon([
    { name: "Bít tết",   price: 180_000, qty: 2 },
    { name: "Cơm rang",  price:  75_000, qty: 3 },
    { name: "Nước ngọt", price:  30_000, qty: 4 },
], true, 3);


console.log("\n📋 Test 3: Tổng > 1 triệu\n");
tinhHoaDon([
    { name: "Hải sản",   price: 350_000, qty: 2 },
    { name: "Lẩu thái",  price: 280_000, qty: 1 },
    { name: "Rượu vang", price: 200_000, qty: 2 },
], true, 5);