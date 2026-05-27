console.log(x);   // undefined (không phải lỗi)
var x = 5;
console.log("x sau khi gán:", x);


try {
    console.log(y); // ReferenceError
    let y = 10;
} catch (e) {
    console.log("Lỗi bắt được:", e.message);
}


try {
    const z = 15;
    z = 20;         // TypeError
    console.log(z);
} catch (e) {
    console.log("Lỗi bắt được:", e.message);
}


const arr = [1, 2, 3];
arr.push(4);
console.log(arr); // [1, 2, 3, 4]


let a = 1;
{
    let a = 2;
    console.log("Trong block:", a);  // → 2
}
console.log("Ngoài block:", a);      // → 1