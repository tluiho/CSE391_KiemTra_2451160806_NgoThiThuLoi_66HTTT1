const tableBody = document.getElementById('productTableBody');
const productForm = document.getElementById('productForm');
const btnReset = document.getElementById('btnReset');

// Hàm nhận vào một mảng và vẽ các hàng (row) tương ứng vào thẻ tbody
function renderProducts(productsList) {
    // Xóa trắng toàn bộ các dòng cũ đang tồn tại trong bảng trước
    tableBody.innerHTML = '';

    // Duyệt qua từng sản phẩm trong mảng dữ liệu bằng vòng lặp forEach
    productsList.forEach((product, index) => {
        // Tạo một thẻ tr mới đại diện cho 1 hàng dữ liệu
        const row = document.createElement('tr');

        // Lựa chọn badge trạng thái tương ứng dựa vào thuộc tính Boolean true/false [cite: 64]
        const statusBadge = product.status 
            ? `<span class="badge badge-success">Còn hàng</span>` 
            : `<span class="badge badge-danger">Hết hàng</span>`;

        // Định hình cấu trúc chuỗi HTML cho từng cột trong hàng [cite: 32, 33, 34, 35, 36]
        row.innerHTML = `
            <td>${index + 1}</td>
            <td style="font-weight: 500;">${product.name}</td>
            <td style="color: #4a5568;">${product.category}</td>
            <td style="font-weight: bold; color: #1a202c;">${product.price}</td>
            <td>${statusBadge}</td>
        `;

        // Đính kèm hàng tr vừa tạo vào bên trong thẻ tbody trên cây DOM
        tableBody.appendChild(row);
    });
}

// Lắng nghe hành vi người dùng bấm nút gửi dữ liệu (Submit Form) [cite: 28]
productForm.addEventListener('submit', function(e) {
    e.preventDefault(); // Chặn hành động tải lại trang mặc định của form

    // Thu thập toàn bộ nội dung dữ liệu được nhập từ các ô dữ liệu đầu vào [cite: 20, 22, 24, 26]
    const name = document.getElementById('prodName').value;
    const category = document.getElementById('prodCategory').value;
    const priceRaw = document.getElementById('prodPrice').value;
    const status = document.getElementById('prodStatus').value === 'true';

    // Chuyển đổi định dạng số thành chuỗi tiền tệ VNĐ (Ví dụ: 25000000 -> 25.000.000 ₫)
    const formattedPrice = Number(priceRaw).toLocaleString('vi-VN') + ' ₫';

    // Đóng gói thông tin thành cấu trúc một đối tượng sản phẩm hoàn chỉnh [cite: 64]
    const newProduct = {
        id: products.length + 1, // Tạo ID tự tăng
        name: name,
        category: category,
        price: formattedPrice,
        status: status
    };

    // Bổ sung bản ghi mới này vào mảng dữ liệu mẫu ban đầu [cite: 64]
    products.push(newProduct);

    // Kích hoạt vẽ lại giao diện bảng để hiển thị ngay dòng vừa thêm
    renderProducts(products);

    // =========================================================================
    // ĐOẠN CODE THÊM MỚI: Hiển thị thông tin thông báo cho người dùng
    // =========================================================================
    alert(`Thêm sản phẩm "${name}" thành công!`);

    // Dọn sạch toàn bộ form về trạng thái trống rỗng [cite: 29]
    productForm.reset();
});

// Bắt sự kiện bấm nút "Làm mới form" để xóa nhanh dữ liệu đang điền dở [cite: 29]
btnReset.addEventListener('click', function() {
    productForm.reset();
});

// Chạy hiển thị danh sách sản phẩm mẫu lần đầu tiên khi trang web vừa tải xong [cite: 31, 64]
renderProducts(products);