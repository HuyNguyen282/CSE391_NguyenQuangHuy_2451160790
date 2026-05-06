## Phần A

### Câu A1:
>Tài liệu tham chiếu: 08_introduction_css.md

1.Inline CSS
- Viết thẳng CSS vào thuộc tính `style` của thẻ HTML.

Ví dụ 
```
<p style= "color: red; font-size:18px;">Hello</p>
```

**Ưu điểm:**
- Nhanh, không cần tạo thêm file
- Độ ưu tiên cao nhất (trừ !important)

**Nhược điểm:**
- Khó bảo trì, phải sửa từng dòng HTML nếu muốn thay đổi
- Không tái sử dụng được, cần phải copy nhiều code

**Khi nào dùng:**
- Khi cần ghi đè style nhanh để test thử 
- Khi dùng JS để thay đổi style động 