const students = [
    { name: "An",    math: 8,  physics: 7, cs: 9, gender: "M" },
    { name: "Bình",  math: 6,  physics: 9, cs: 7, gender: "F" },
    { name: "Chi",   math: 9,  physics: 6, cs: 8, gender: "F" },
    { name: "Dũng",  math: 5,  physics: 5, cs: 6, gender: "M" },
    { name: "Em",    math: 10, physics: 8, cs: 9, gender: "F" },
    { name: "Phong", math: 3,  physics: 4, cs: 5, gender: "M" },
    { name: "Giang", math: 7,  physics: 7, cs: 7, gender: "F" },
    { name: "Huy",   math: 4,  physics: 6, cs: 3, gender: "M" },
];


function tinhTB(sv) {
    return sv.math * 0.4 + sv.physics * 0.3 + sv.cs * 0.3;
}

function xepLoai(tb) {
    if (tb >= 8.0) return "Giỏi";
    if (tb >= 6.5) return "Khá";
    if (tb >= 5.0) return "Trung bình";
    return "Yếu";
}

for (let i = 0; i < students.length; i++) {
    students[i].tb = Math.round(tinhTB(students[i]) * 10) / 10;
    students[i].xepLoai = xepLoai(students[i].tb);
}

console.log("=== Bài B2: Xử lý dữ liệu sinh viên ===\n");

const line = "|-----|--------|------|-------------|";
const header = "| STT | Tên    | TB   | Xếp loại    |";

console.log(line);
console.log(header);
console.log(line);

for (let i = 0; i < students.length; i++) {
    const sv = students[i];
    const stt = String(i + 1).padEnd(3);
    const name = sv.name.padEnd(6);
    const tb = String(sv.tb).padEnd(4);
    const xl = sv.xepLoai.padEnd(11);
    console.log(`| ${stt} | ${name} | ${tb} | ${xl} |`);
}
console.log(line);

const demXepLoai = { "Giỏi": 0, "Khá": 0, "Trung bình": 0, "Yếu": 0 };
for (let i = 0; i < students.length; i++) {
    demXepLoai[students[i].xepLoai]++;
}

console.log("\n--- Thống kê xếp loại ---");
for (const loai in demXepLoai) {
    console.log(`${loai}: ${demXepLoai[loai]} sinh viên`);
}

let svMax = students[0];
let svMin = students[0];

for (let i = 1; i < students.length; i++) {
    if (students[i].tb > svMax.tb) svMax = students[i];
    if (students[i].tb < svMin.tb) svMin = students[i];
}

console.log("\n--- Sinh viên xuất sắc nhất ---");
console.log(`${svMax.name} — TB: ${svMax.tb} (${svMax.xepLoai})`);
console.log("\n--- Sinh viên cần cải thiện nhất ---");
console.log(`${svMin.name} — TB: ${svMin.tb} (${svMin.xepLoai})`);

let tongMath = 0, tongPhysics = 0, tongCS = 0;
for (let i = 0; i < students.length; i++) {
    tongMath    += students[i].math;
    tongPhysics += students[i].physics;
    tongCS      += students[i].cs;
}
const n = students.length;

console.log("\n--- Điểm TB toàn lớp từng môn ---");
console.log(`Toán:    ${(tongMath    / n).toFixed(2)}`);
console.log(`Lý:      ${(tongPhysics / n).toFixed(2)}`);
console.log(`Tin học: ${(tongCS      / n).toFixed(2)}`);

let tongTB_M = 0, demM = 0;
let tongTB_F = 0, demF = 0;
 
for (let i = 0; i < students.length; i++) {
    if (students[i].gender === "M") {
        tongTB_M += students[i].tb;
        demM++;
    } else {
        tongTB_F += students[i].tb;
        demF++;
    }
}

console.log("\n Điểm TB theo giới tính ");
console.log(`Nam (${demM} SV): TB = ${(tongTB_M / demM).toFixed(2)}`);
console.log(`Nữ  (${demF} SV): TB = ${(tongTB_F / demF).toFixed(2)}`);