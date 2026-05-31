function pipe(...fns) {
    return function(x) {
        return fns.reduce((result, fn) => fn(result), x);
    };
}

const process = pipe(
    x => x * 2,
    x => x + 10,
    x => x.toString(),
    x => "Kết quả: " + x
);
console.log(process(5));


function memoize(fn) {
    let cache = {};

    return function(...args) {
        let key = JSON.stringify(args);

        if (cache[key] !== undefined) {
            return cache[key];
        }

        let result = fn(...args);
        cache[key] = result;
        return result;
    };
}

const expensiveCalc = memoize((n) => {
    console.log("Đang tính...");
    let result = 0;
    for (let i = 0; i < n; i++) result += i;
    return result;
});

console.log(expensiveCalc(1000000));
console.log(expensiveCalc(1000000));


function debounce(fn, delay) {
    let timer = null;

    return function(...args) {
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(() => {
            fn(...args);
        }, delay);
    };
}

const search = debounce((query) => {
    console.log("Searching:", query);
}, 500);

search("i");
search("ip");
search("iph");
search("ipho");
search("iphone");


async function retry(fn, maxAttempts = 3) {
    let attempt = 1;

    while (attempt <= maxAttempts) {
        try {
            let result = await fn();
            return result;
        } catch (error) {
            console.log(`Lần thử ${attempt} thất bại: ${error.message}`);
            attempt++;

            if (attempt > maxAttempts) {
                throw new Error(`Đã thử ${maxAttempts} lần nhưng vẫn lỗi!`);
            }
        }
    }
}

let count = 0;
const unreliableApi = () => {
    return new Promise((resolve, reject) => {
        count++;
        if (count < 3) {
            reject(new Error("Server lỗi tạm thời"));
        } else {
            resolve("Thành công!");
        }
    });
};

retry(unreliableApi, 3).then(result => {
    console.log("retry() kết quả:", result);
}).catch(err => {
    console.log("retry() thất bại:", err.message);
});