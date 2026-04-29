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
