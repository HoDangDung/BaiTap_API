getUsers();
// =================================================================

// function getUsers request API để lấy danh sách sản phẩm
function getUsers(searchTerm) {
    apiGetUsers(searchTerm)
        .then((response) => {
            // Duyệt qua danh sách người dùng và tạo đối tượng người dùng
            if (response.data) {
                let users = response.data.map((user) => {
                    return new Users(user.id,
                        user.account,
                        user.name,
                        user.pass,
                        user.email,
                        user.image,
                        user.typeUser,
                        user.typeLangue,
                        user.describe)
                });
                // Hiển thị danh sách ra giao diện
                display(users);
            }
        })
        .catch((error) => {
            console.log(error);
        });
}

// function addUser request API để thêm sản phẩm
function addUsers(user) {
    apiAddUsers(user)
        .then(() => {
            // Dữ liệu thêm mới chỉ mới tồn tại ở phía server
            getUsers();

        })
        .catch((error) => {
            console.log(error);
        });
}

// function deleteUser request API để xóa sản phẩm
function deleteUser(userID) {
    apiDeleteUsers(userID)
        .then(() => {
            getUsers();
        })
        .catch((error) => {
            console.log(error);
        });
}

function updateUser(userID, user) {
    apiUpdateUsers(userID, user)
        .then(() => {
            getUsers();
        })
        .catch((error) => {
            console.log(error);
        });
}

// =================================================================

// =================================================================
function display(users) {
    let output = users.reduce((result, user, index) => {
        return result + `
            <tr>
                <td>${index + 1}</td>
                <td>${user.account}</td>
                <td>${user.pass}</td>
                <td>${user.name}</td>
                <td>${user.email}</td>
                <td>${user.typeLangue}</td>
                <td>${user.typeUser}</td>
                <td>
                    <button class = "btn btn-danger" data-type="deleteUser" data-id="${user.id}">Xóa</button>
                    <button class = "btn btn-primary" data-type="editUser" data-id="${user.id}" data-toggle="modal" data-target="#myModal">Edit</button>
                </td>
            </tr>
        `
    }, "")
    console.log(output);
    dom("#tblDanhSachNguoiDung").innerHTML = output;
}

const dom = (params) => {
    return document.querySelector(params);
}
const resetForm = () => {
    dom("#MaUser").value = null
    dom("#TaiKhoan").value = null
    dom("#HoTen").value = null
    dom("#MatKhau").value = null
    dom("#Email").value = null
    dom("#HinhAnh").value = null
    dom("#loaiNguoiDung").value = "Chọn loại người dùng"
    dom("#loaiNgonNgu").value = "Chọn ngôn ngữ"
    dom("#MoTa").value = null
    dom("#TaiKhoan").disabled = false;
}

// =================================================================

// ======================= DOM ==============================

// Lắng nghe sự kiện click của button thêm mới và gọi tới call function
dom("#btnThemNguoiDung").addEventListener("click", () => {
    dom(".modal-title").innerHTML = "Thêm người dùng"
    resetForm();
    dom(".modal-footer").innerHTML = `
        <button class="btn btn-primary" data-type="add">Thêm</button>
        <button class="btn btn-danger" data-dismiss="modal">Hủy</button>
    `;
})

// Thêm người dùng
dom(".modal-footer").addEventListener("click", (evt) => {
    let type = evt.target.getAttribute("data-type");

    // DOM các inputs để lấy dữ liệu
    let id = dom("#MaUser").value,
        acc = dom("#TaiKhoan").value,
        name = dom("#HoTen").value,
        pass = dom("#MatKhau").value,
        email = dom("#Email").value,
        image = dom("#HinhAnh").value,
        typeUser = dom("#loaiNguoiDung").value,
        typeLangue = dom("#loaiNgonNgu").value,
        describe = dom("#MoTa").value;
    // tạo object từ lớp đối tượng
    let user = new Users(null, acc, name, pass, email, image, typeUser, typeLangue, describe);

    if (type === "add" && validateForm()) {
        addUsers(user);
        resetForm();
    }

    if (type === "update") {
        if (!validateFormUpdate()) {
            return;
        }
        updateUser(id, user);
        resetForm();
    }
});

dom("#tblDanhSachNguoiDung").addEventListener("click", (evt) => {
    console.log(evt.target.innerHTML === "Xóa");
    let type = evt.target.getAttribute("data-type");
    let id = evt.target.getAttribute("data-id");

    if (type === "deleteUser") {
        deleteUser(id);
    }

    if (type === "editUser") {
        dom(".modal-title").innerHTML = "Cập nhật thông tin người dùng"
        dom(".modal-footer").innerHTML = `
            <button class="btn btn-primary" data-type="update" ">Cập nhật</button>
            <button class="btn btn-danger" data-dismiss="modal">Hủy</button>
        `;
        apiSelectUser(id)
            .then((response) => {
                dom("#MaUser").value = response.data.id
                dom("#TaiKhoan").value = response.data.account
                dom("#HoTen").value = response.data.name
                dom("#MatKhau").value = response.data.pass
                dom("#Email").value = response.data.email
                dom("#HinhAnh").value = response.data.image
                dom("#loaiNguoiDung").value = response.data.typeUser
                dom("#loaiNgonNgu").value = response.data.typeLangue
                dom("#MoTa").value = response.data.describe
                dom("#TaiKhoan").disabled = true;
            })
            .catch((error) => {
                console.log(error);
            })
    }
});

// Search Keydown
dom("#search").addEventListener("keydown", (evt) => {
    console.log(evt.key);
    if (evt.key !== "Enter") {
        return;
    } else {
        getUsers(evt.target.value);
    }

})

// Search button click
dom(".input-group-append").addEventListener("click", (evt) => {
    let search = dom("#search").value;
    getUsers(search);
});

// ====================== End DOM ===========================

