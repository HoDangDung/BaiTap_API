
// Hàm kiểm tra input Account
function validateAcc() {
    let acc = dom("#TaiKhoan").value,
        spanEL = dom("#spanAcc");

    if (!acc) {
        spanEL.innerHTML = "Tài khoản không được để trống";
        return false;
    }
    // if(params.length > 0){
    //     spanEL.innerHTML = "Tài khoản trùng";
    //     return false;
    // }
    spanEL.innerHTML = "";
    return true;
}

// Hàm kiểm tra input Name
function validateName() {
    let name = dom("#HoTen").value,
        spanEL = dom("#spanName");

    // Kiểm tra rỗng
    if (!name) {
        spanEL.innerHTML = "Tên không được để trống";
        return false;
    }

    // Kiểm tra định dạng
    let regex = /^\d+$/
    if (regex.test(name)) {
        spanEL.innerHTML = "Tên không đúng định dạng";
        return false;
    }
    spanEL.innerHTML = ""
    return true;
}

// Hàm kiểm tra input Password
function validatePass() {
    let pass = dom("#MatKhau").value,
        spanEL = dom("#spanPass");

    // Kiểm tra rỗng
    if (!pass) {
        spanEL.innerHTML = "Mật khẩu không được để trống";
        return false;
    }

    // Kiểm tra định dạng
    let regex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9]{8})$/
    if (!regex.test(pass)) {
        spanEL.innerHTML = "Mật khẩu phải có ít nhất 8 kí tự bao gồm(A-Z a-z 0-9)";
        return false;
    }
    spanEL.innerHTML = ""
    return true;
}

// Hàm kiểm tra input Email
function validateEmail() {
    let email = dom("#Email").value,
        spanEL = dom("#spanEmail");

    // Kiểm tra rỗng
    if (!email) {
        spanEL.innerHTML = "Email không được để trống"
        return false;
    }

    // Kiểm tra định dạng
    let regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if (!regex.test(email)) {
        spanEL.innerHTML = "Email không đúng định dạng"
        return false;
    }
    spanEL.innerHTML = ""
    return true;
}

// Hàm kiểm tra input Người dùng
function validateTypeUser() {
    let typeUser = dom("#loaiNguoiDung").value,
        spanEL = dom("#spanUser");

    // Kiểm tra rỗng
    if (!typeUser || typeUser === "Chọn loại người dùng") {
        spanEL.innerHTML = "Phải chọn loại người dùng"
        return false;
    }
    spanEL.innerHTML = ""
    return true;
}

// Hàm kiểm tra input Ngôn ngữ
function validateTypeLangue() {
    let typeLangue = dom("#loaiNgonNgu").value,
        spanEL = dom("#spanLangue");

    // Kiểm tra rỗng
    if (!typeLangue || typeLangue === "Chọn ngôn ngữ") {
        spanEL.innerHTML = "Phải chọn loại ngôn ngữ"
        return false;
    }
    spanEL.innerHTML = ""
    return true;
}

// Hàm kiểm tra Mô tả
function validateScribe() {
    let typeLangue = dom("#MoTa").value,
        length = typeLangue.length,
        spanEL = dom("#spanScribe");

    // Kiểm tra rỗng
    if (!typeLangue) {
        spanEL.innerHTML = "Mô tả không được để trống"
        return false;
    }

    // Kiểm tra độ dài Mô tả
    if (length > 61) {
        spanEL.innerHTML = `Mô tả không được quá 60 ký tự(${length})`;
        return false;
    }
    spanEL.innerHTML = ""
    return true;
}

// Hàm kiểm tra thêm mới User
function validateForm() {
    let isValid = true;
    isValid = validateAcc() & validateName() & validatePass() & validateEmail() & validateTypeUser() & validateTypeLangue() & validateScribe();
    if (!isValid) {
        return false;
    }
    return true;
}

// Hàm kiểm tra cập nhật User
function validateFormUpdate() {
    let isValid = true;
    isValid = validateName() & validatePass() & validateEmail() & validateTypeUser() & validateTypeLangue() & validateScribe();
    if (!isValid) {
        return false;
    }
    return true;
}