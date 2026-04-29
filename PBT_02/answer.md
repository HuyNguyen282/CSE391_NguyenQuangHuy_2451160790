# Bài tập

## Phần A: Đọc hiểu

### Câu A1
>
> Tài liệu tham chiếu: 07_forms_interactive.md

1. `type = "mail"` → Ô nhập text, tự kiểm tra có @ và domain hợp lệ → Dùng cho form đăng ký/đăng nhập
2. `type = "password"` → Ô nhập text nhưng ẩn ký tự, không có validation định dạng cố định → Dùng cho form nhập mật khẩu
3. `type = "number"` → Ô nhập số có mũi tên tăng/giảm, tự validate chỉ nhận số → Dùng cho trường tăng giảm số lượng
4. `type = "tel"` → Ô nhập text, không tự validation → Dùng cho nhập số điện thoại
5. `type = "date"` → Bộ chọn ngày tháng năm, tự validate định dạng ngày → Dùng cho set lịch
6. `type = "url"` → Ô nhập text, tự kiểm tra xem đường dẫn có http:// hoặc https:// không → Dùng cho trường nhập link
7. `type = "range"` → Thanh trượt giữa min và max → Dùng cho bộ lọc
8. `type = "checkbox"` → Ô vuông tick/bỏ tick → Dùng làm nhiều lựa chọn
9. `type = "radio"` → Nút chọn 1 trong nhiều lựa chọn → Dùng làm lựa chọn
10. `type="file"` → Nút chọn file từ máy, hỗ trợ accept, multiple →Dùng cho upload ảnh,...

### Câu A2
>
> Tài liệu tham chiếu: 07_forms_interactive.md

Không chạy code, khi user bấm Submit cho mỗi trường hợp sẽ xảy ra:
    **Trường hợp 1:** Khi bấm submit mà user để trống,form sẽ không submit. Browser sẽ tự động hiển thị yêu cầu điền vào ô text này. `required` yêu cầu ô input phải có giá trị khác rỗng trước khi submit
    ![alt text](/PBT_02/screenshot/image.png)
    Sau khi so sánh với kết quả validation thực tế thì dự đoán trên là đúng
    **Trường hợp 2:** Khi bấm submit mà user gõ "abc", form sẽ không submit. Browser sẽ báo lỗi yêu cầu nhập địa chỉ email. "abc" thiếu ký tự @ và phần domain. `type="email"` tự động validate format email
    ![alt text](/PBT_02/screenshot/image-1.png)
    Sau khi so sánh với kết quả validation thực tế thì dự đoán trên là đúng
    **Trường hợp 3:** Khi user gõ 15, Form sẽ không submit. Browser sẽ báo giá trị cần phải nhỏ hơn hoặc bằng 10 vì 15 vượt quá `max="10"`.Validation của `type="number"` kiểm tra min max.
    ![alt text](/PBT_02/screenshot/image-2.png)
    Sau khi so sánh với kết quả validation thực tế thì dự đoán trên là đúng
    **Trường hợp 4:** User gõ "abc123" form không submit. Browser báo lỗi yêu cầu nhập đúng định dạng vì pattern yêu cầu 10 chữ số.
    ![alt text](/PBT_02/screenshot/image-4.png)
    Sau khi so sánh với kết quả validation thực tế thì dự đoán trên là đúng
    **Trường hợp 5:** user gõ "123" form sẽ không submit. Browser báo yêu cầu nhập ít nhất 8 kí tự vì "123" chỉ có 8 ký tự trong khi yêu cầu `minlength="8"`
    ![alt text](/PBT_02/screenshot/image-5.png)
    Sau khi so sánh với kết quả validation thực tế thì dự đoán trên là đúng

### Câu A3
>
> Tài liệu tham chiếu: 07_forms_interactive.md

1. Tại sao `<label for="email">` quan trọng cho người dùng screen reader?
    Screen reader đọc màn hình cho người khiếm thị. Khi user Tab vào một `label`, screen reader cần đọc tên label của ô đó.
2. Khi nào dùng `<fieldset>` + `<legend>`? Cho ví dụ cụ thể.
    Dùng `<fieldset>` và `<legend>` khi nhóm input có cùng chủ đề, đặc biệt bắt buộc với radio/checkbox vì không thể dùng `<label>` để mô tả cả nhóm
    Ví dụ: với thẻ `<fieldset>` thì khi khai báo nhóm giới tính, nếu không có `<fieldset>`, screen reader sẽ đọc "nam,nút radio" mà không biết đấy là câu hỏi về giới tính.
    Nhóm địa chỉ giao hàng gồm tỉnh, quận , địa chỉ chi tiết nó sẽ giúp phân biệt với địa chỉ khác như địa chỉ xuất hoá đơn trong một form dài
3. `aria-label` dùng khi nào? Tại sao KHÔNG nên dùng `aria-label` khi đã có `<label>`?
    `Aria-label` chỉ dùng khi không thể đặt đươc label trực quan trên giao diện.
    Không nên dùng `aria-label` khi đã có `label` bởi vì nó có thể gây trùng lặp. `aria-label` ghi đè lên `label`, hai nội dung khác nhau gây nhầm lẫn

### Câu A4

1.
   - Thuộc tính `loading = "lazy"` chỉ định browser tải ảnh trễ, chỉ tải ảnh khi ảnh sắp xuất hiện trong viewpoint thay vì hiển thị tất cả ảnh ngay khi load page
   - Thuộc tính này giúp giảm thời trang load trang ban đầu, giảm số request đồng thời
   - Không nên dùng khi ảnh là ảnh banner đầu trang, ảnh hiển thị ngay khi mở trang, logo, ảnh quan trọng cho LCP
2.
    - Cung cấp nhiều source trong thẻ video bởi vì mỗi website hỗ trợ các kiểu mã hoá dữ liệu hình ảnh, video khác nhau. Nhiều source thì website sẽ có thể chọn ra format phù hợp nhất.
    - Có 3 kiểu format video web phổ biến:
        - MP4
        - WebM
        - OGG
3.
    - Alt cung cấp văn bản thay thế khi hình ảnh không hiển thị được, nó cũng là text mà screen reader đọc cho người khiếm thị. giúp SEO hiểu được nội dung của hình ảnh
    - Alt tốt cho 3 trường hợp:
        -Ảnh sản phẩm iPhone 16:`alt = "iPhone 16 Pro Max màu Đen, 1TB, mặt trước"`
        -Ảnh trang trí(decorative): `alt=""`
        -Ảnh biểu đồ doanh thu Q1/2026: `alt="Biểu đồ cột doanh thu Q1/2026: Tháng 1 đạt 2,3 tỷ đồng, tháng 2 đạt 1,8 tỷ đồng, tháng 3 đạt 3,6 tỷ đồng"`

### Câu A5

**Cách 1**: Dùng khi ảnh chỉ có tính minh hoạ, không cần chú thích.

- Ví dụ:  Avatar người dùng `<img src="avatar.jpg" alt="Avatar Nguyễn Quang Huy">`
        Ảnh icon trong sidebar hoặc navigation `<img src="icon-cart.svg" alt="giỏ hàng">`
**Cách 2**: Dùng khi ảnh cần có nội chú thích thêm thông tin, nội dung có thể đứng độc lập hoặc muốn nhóm ảnh với các thông tin liên quan
- Ví dụ: Ảnh sản phẩm trong trang chi tiết và tên giá: `<figure><img src = "iphone.jpg" alt = "iPhoen 16 Pro"><figcaption>iPhone 16 Pro Max — 25.990.000đ</figcaption></figure>`
        Ảnh cần ghi nguồn: `<figure><img src = "review.jpg" alt = "..."><figcaption>Nguồn: Báo chí</figcaption></figure>`

_______________________________________________________________

## Phần B: Thực hành

### Câu B1

    HTML không thể validate confrim password bởi vì HTML5 constraint validation không cung cấp cơ chế so sánh giữa hai input khác nhau, thuộc tính pattern chỉ kiểm tra giá trị của chính input đó với một biểu thức cố định, không có quyền để động đến giá trị của input khác.
______________________________________________________________________

## Phần C : Suy luận

### Câu C1

**Lỗi 1:** Dòng 1 - `<form>` không có `action` và `method` — vi phạm best practices, form không biết gửi dữ liệu đi đâu bằng phương thức gì
**Sửa lỗi 1**
`<form action="#" method="POST">`

**Lỗi 2**:Dòng 2 - Input "tên" nhưng không có `<label>` liên kết - vi phạm accessibility
**Sửa lỗi 2:**

```
<label for = "name">Tên:</label> 
<input type = "text" id = "name" name="name" required>
```

**Lỗi 3:** Dòng 4 - input email không có `<label>` liên kết - vi phạm accessibility
**Sửa lỗi 3:**

```
<label for = "email">Email:</label> 
<input type = "email" id = "email" name = "email" required placeholder="Email của bạn>
```

**Lỗi 4:** Dòng 6 - input password không có `<label>` liên kết - vi phạm accessibility
**Sửa lỗi 4:**

```
<label for = "pass">Mật khẩu:</label> 
<input type="password" id = "pass" name = "pass" required placeholder="Mật khẩu">
```

**Lỗi 5:** Dòng 7 - input nhập lại mật khẩu không có `<label>` liên kết - vi phạm accessibility
**Sửa lỗi 5:**

```
<label for = "confrim_pass">Nhập lại mật khẩu</label> 
<input type = "password" id = "confirm_pass" name="confirm_pass" required placeholder="Nhập lại mật khẩu">
```

**Lỗi 6:** Dòng 9 - input Phone dùng `type="text"` thay vì `type="tel"` và không có `<label>` — sai semantic và accessibility  
**Sửa lỗi 6:**

```
<label for="phone">Số điện thoại:</label> 
<input type="tel" id="phone" name="phone" pattern="[0-9]{10}" placeholder="0901234567">
```

**Lỗi 7:** Dòng 11 - `<select>` không có `<label>` liên kết và không có `name`/`id` — vi phạm accessibility và form không gửi được dữ liệu  
**Sửa lỗi 7:**

```
<label for="city">Thành phố:</label> 
<select id="city" name="city"> 
    <option value="">Chọn thành phố </option> 
    <option value="hn">Hà Nội</option> 
    <option value="hcm">TP.HCM</option> 
</select>
```

**Lỗi 8:** Dòng 16 - `<label>Tôi đồng ý điều khoản</label>` không liên kết với checkbox nào (không có input checkbox) — thiếu input
**Sửa lỗi 8**

```
<label><input type="checkbox" name="agree" required> Tôi đồng ý điều khoản</label>
```

### Câu C2

**1. Pattern regex cho CMND/CCCD và Số tài khoản:**

```
<label for = "cccd">CMND/CCCD:</label><br>
<input type="text" 
       id="cccd" 
       name="cccd" 
       pattern="[0-9]{12}" 
       maxlength="12"
       required
       title="CCCD phải gồm đúng 12 chữ số">
<label for = "stk">Số tài khoản:</label><br>
<input type="text" 
       id="account" 
       name="account" 
       pattern="[0-9]{10,15}" 
       required
       title="Số tài khoản gồm 10 đến 15 chữ số">

<label for = "email">Email:</label><br>
<input type = "email"
       id = "email"
       name = "email"
       required>
<label for = "pin>Mã PIN:</label><br>
<input type = "password"
       id = "PIN"
       name = "PIN"
       required>
```

**2. HTML5 validation đủ an toàn cho ứng dụng ngân hàng chưa?**

- Chưa đủ an toàn. Bởi vì HTML5 chỉ hỗ trợ kiểm tra dữ liệu phí frontend, toàn bộ code đều chạy trên máy người dùng. Hacker có thể:
  - Sử dụng DevTools chỉnh sửa HTML, sửa các required, pattern,...
  - Gửi request trực tiếp bằng Postman hoặc script tự động, bỏ qua browser
  - Bỏ qua mọi validation trong trình duyệt

**3. 3 loại validation mà HTML5 KHÔNG THỂ làm, phải dùng JavaScript:**

- **So sánh 2 trường dữ liệu:** Ví dụ kiểm tra "Mật khẩu" và "Xác nhận mật khẩu" có giống nhau không — HTML5 không thể so sánh giá trị giữa các input
- **Validate theo thời gian thực:** Kiểm tra username đã tồn tại chưa bằng cách gọi API server — HTML5 không có khả năng async request
- **Validate logic phức tạp:** Ví dụ "Nếu chọn thanh toán thẻ thì bắt buộc nhập số thẻ, nếu chọn COD thì không cần" — logic conditional validation phụ thuộc vào state của form

**4. 2 rủi ro bảo mật nếu chỉ validate Frontend, không validate Backend:**

- SQL Injection: Kẻ tấn công bỏ qua frontend validation, gửi dữ liệu độc hại trực tiếp tới server
- Giả mạo các request hoặc bypass qua các logic giao dịch: Hacker gửi số tiền âm, số lượng sản phẩm vượt quá lần quy định. dữ liệu sai vẫn được lưu vào database, gây thiệt hại cho ngân hàng

---
