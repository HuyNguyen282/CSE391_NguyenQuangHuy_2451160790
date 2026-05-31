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

function profile() {
  return (
    <div className="profile">
      <h1>Hồ sơ cá nhân</h1>
      <img src="photo.jpg" alt="Ảnh đại diện"></img>
        <table>
          <tr>
            <td>Họ tên:</td>
            <td>Huy</td>
          </tr>
          <tr>
            <td>Email:</td>
            <td>minh@example.com</td>
          </tr>
        </table>
    </div>
  );
}
export default profile;
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
