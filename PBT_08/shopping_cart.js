function createCart() {
    let items = [];
    let discountAmount = 0;

    return {
        addItem(product, quantity = 1) {
            let existing = items.find(item => item.id === product.id);
            if (existing) {
                existing.quantity += quantity;
            } else {
                items.push({
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    quantity: quantity
                });
            }
        },

        removeItem(productId) {
            items = items.filter(item => item.id !== productId);
        },

        updateQuantity(productId, newQuantity) {
            let item = items.find(item => item.id === productId);
            if (item) {
                if (newQuantity <= 0) {
                    this.removeItem(productId);
                } else {
                    item.quantity = newQuantity;
                }
            }
        },

        getTotal() {
            let total = items.reduce((sum, item) => {
                return sum + item.price * item.quantity;
            }, 0);
            return total - discountAmount;
        },

        applyDiscount(code) {
            let subTotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

            if (code === "SALE10") {
                discountAmount = subTotal * 0.1;
                console.log("Đã áp dụng mã SALE10: Giảm 10%");
            } else if (code === "SALE20") {
                discountAmount = subTotal * 0.2;
                console.log("Đã áp dụng mã SALE20: Giảm 20%");
            } else if (code === "FREESHIP") {
                discountAmount = 30000;
                console.log("Đã áp dụng mã FREESHIP: Giảm 30.000đ");
            } else {
                console.log("Mã giảm giá không hợp lệ!");
            }
        },

        printCart() {
            if (items.length === 0) {
                console.log("Giỏ hàng đang trống!");
                return;
            }

    
            console.log("│ #  │ Sản phẩm        │ SL │ Đơn giá      │ Tổng         │");
        

            items.forEach((item, index) => {
                let stt = (index + 1).toString().padStart(2);
                let name = item.name.padEnd(15);
                let sl = item.quantity.toString().padStart(2);
                let donGia = item.price.toLocaleString("vi-VN").padStart(12);
                let tongItem = (item.price * item.quantity).toLocaleString("vi-VN").padStart(12);
                console.log(`│ ${stt} │ ${name} │ ${sl} │ ${donGia} │ ${tongItem} │`);
            });

           
            if (discountAmount > 0) {
                console.log(`│ Giảm giá: -${discountAmount.toLocaleString("vi-VN").padStart(35)}đ │`);
            }
            console.log(`│ Tổng cộng: ${this.getTotal().toLocaleString("vi-VN").padStart(36)}đ │`);
          ;
        },

        getItemCount() {
            return items.reduce((sum, item) => sum + item.quantity, 0);
        },

        clearCart() {
            items = [];
            discountAmount = 0;
            console.log("Đã xóa toàn bộ giỏ hàng.");
        }
    };
}

const cart = createCart();

cart.addItem({ id: 1, name: "iPhone 16", price: 25990000 }, 1);
cart.addItem({ id: 3, name: "AirPods Pro", price: 6990000 }, 2);
cart.addItem({ id: 1, name: "iPhone 16", price: 25990000 }, 1);

cart.printCart();

cart.applyDiscount("SALE10");
cart.printCart();

console.log("Số SP:", cart.getItemCount());
cart.removeItem(3);
console.log("Sau xóa:", cart.getItemCount());