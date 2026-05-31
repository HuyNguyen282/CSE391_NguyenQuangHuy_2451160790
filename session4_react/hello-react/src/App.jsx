// function App() {
//   return (
//     <div>
//       <h1>Xin chào React!</h1>
//       <p>Đây là component đầu tiên của bạn</p>
//     </div>
//   );
// }

// export default App;
//js và jsx khác nhau ở cú pháp và cách trình duyệt biên dịch. js chỉ cho viết code js thuần, jsx cho viết đoạn html/xml trực tiếp vào trong code 
//export default app để react biết được component nào cần render
// nếu xoá đi thì app sẽ lỗi vì react không biết được component nào cần render

// function profile() {
//   return (
//     <div className="profile">
//       <h1>Hồ sơ cá nhân</h1>
//       <img src="photo.jpg" alt="Ảnh đại diện"></img>
//         <table>
//           <tr>
//             <td>Họ tên:</td>
//             <td>Minh</td>
//           </tr>
//           <tr>
//             <td>Email:</td>
//             <td>minh@example.com</td>
//           </tr>
//         </table>
//     </div>
//   );
// }
// export default profile;
// function ProductInfo() {
//     return (
//         <div className="product">
//             <h2>iPhone 15</h2>

//             <p className="price">25.000.000đ</p>

//             <ul>
//                 <li>Màn hình: 6.1 inch</li>
//                 <li>Camera: 48MP</li>
//                 <li>Pin: 3349 mAh</li>
//             </ul>

//             <button>Mua ngay</button>
//         </div>
//     );
// }

// export default ProductInfo;
function LifecycleDemo() {
    console.log("1️⃣ Component được gọi!");
    
    return (
        <div style={{ padding: "20px", border: "2px solid #3498db" }}>
            <h2>Lifecycle Demo</h2>
            <p>Mở Console (F12) để xem log</p>
            <p>Component này chỉ render MỘT lần</p>
        </div>
    );
}

export default LifecycleDemo;
//---//
//Component chỉ render 1 lần bởi vì không có gì thay đổi, react chỉ render lại khi có lý do, ví dụ khi state hay props thay đổi, nếu component không có state, không có props từ cha thay đổi thì react sẽ không thấy có j change và k thêm j hết
// render lại khi setstate được gọi- state bên trong component này tự thay đổi - proops từ component gốc thay đổi khi gốc thay đổi thì truyền lại giá trị mới xuống