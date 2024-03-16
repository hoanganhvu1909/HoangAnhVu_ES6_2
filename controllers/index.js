import Person from '../models/Person.js';
import ListPerson from '../models/ListPerson.js';
import Employee from '../models/Employee.js';
import Students from '../models/Student.js';
import Customer from '../models/Customer.js';

// Hiển thị modal theo từng đối tượng
document.getElementById('choseType').addEventListener('change', function () {
  const type = document.getElementById('choseType').value;
  let content = ``;
  if (type === 'Giảng viên') {
    content += `
        <div class="container-fluid py-1">
        <h5>Số ngày làm việc</h5>
        <input id="workDay" type="number" class="form-control" placeholder="Nhập số ngày làm việc">
        <span id="spanWorkingDay" class="text-danger"></span>
    </div>
    <div class="container-fluid py-1">
        <h5>Lương theo ngày</h5>
        <input id="salaryByDay" type="number" class="form-control" placeholder="Nhập lương theo ngày">
        <span id="spanSalary" class="text-danger"></span>
    </div>
        
        `;
  } else if (type === 'Học viên') {
    content += `
        <div class="container-fluid py-1">
            <h5>Điểm Toán</h5>
            <input id="addToan" type="text"  class="form-control" placeholder="Nhập điểm toán">
            <span id="spanToan" class="text-danger"></span>
        </div>
        <div class="container-fluid py-1">
            <h5>Điểm Lý</h5>
            <input id="addLy" type="text"  class="form-control" placeholder="Nhập điểm lý">
            <span id="spanLy" class="text-danger"></span>
        </div>
        <div class="container-fluid py-1">
            <h5>Điểm Hoá</h5>
            <input id="addHoa" type="text"  class="form-control" placeholder="Nhập điểm hoá">
            <span id="spanHoa" class="text-danger"></span>
        </div>
`;
  } else if (type === 'Khách hàng') {
    content += `
        <div class="container-fluid py-1">
            <h5>Tên công ty</h5>
            <input id="nameCompany" type="text" class="form-control" placeholder="Nhập tên công ty">
            <span id="spanCompName" class="text-danger"></span>
        </div>
        <div class="container-fluid py-1">
            <h5>Trị giá hoá đơn</h5>
            <input id="billCost" type="number" class="form-control" placeholder="Nhập trị giá hoá đơn">
            <span id="spanBillPrice" class="text-danger"></span>
        </div>
        <div class="container-fluid py-1">
            <h5>Đánh giá</h5>
            <input id="rate" type="text" class="form-control" placeholder="Nhập đánh giá">
            <span id="spanRate" class="text-danger"></span>
        </div>
    `;
  }
  document.getElementById('userInfo').innerHTML = content;
});
let listPerSon = new ListPerson();
// Lấy thông tin user nhập
document.getElementById('btnSave').onclick = function () {
  // NV1: Thực hiện truy xuất tới tất cả các input và select và textarea có trong modal và lấy ra dữ liệu
  const arrField = document.querySelectorAll('#infoForm input,#infoForm select,#infoForm select input');
  //   console.log(arrField);
  //   const monAn = new MonAn();
  // const person = new Person();
  let type = document.getElementById('choseType').value;
  let person;
  if (type === 'Giảng viên') {
    person = new Employee();
  } else if (type === 'Học viên') {
    // Tạo đối tượng Học viên tương tự như trên
    person = new Students();
  } else if (type === 'Khách hàng') {
    // Tạo đối tượng Khách hàng tương tự như trên
    person = new Customer();
  }
  console.log(person);
  arrField.forEach((field, index) => {
    // destructuring
    let { id, value } = field;
    // console.log(id);
    // console.log(value);
    person[id] = value;
  });

  listPerSon.AddUser(person);
  console.log(listPerSon.arr);
  renderPerson();
  // // tắt modal
  // $('#myModal').modal('hide');
  // clear dữ liệu trên form
  // document.getElementById('infoForm').reset();
  // document.getElementById('exampleModal');

  // // Lưu trữ dữ liệu xuống local
  // saveDataLocal();
};

// Render dữ liệu
const renderPerson = (arrPerson = listPerSon.arr) => {
  // sử dụng vòng lặp để đưa danh sách món ăn lên giao diện
  let content = '';
  arrPerson.forEach((user, index) => {
    let newPerson = new Person();

    newPerson = { ...newPerson, ...user };
    const {
      addId,
      addName,
      addAddress,
      addEmail,
      choseType,
      addToan,
      addLy,
      addHoa,
      // tinhDiemTrungBinh,
      workDay,
      salaryByDay,
      // tongLuong,
      nameCompany,
      billCost,
      rate,
    } = newPerson;
    content += `
    <tr class="styleTable">
    <td>${index + 1}</td>
    <td>${addId}</td>
    <td>${addName}</td>
    <td>${addAddress}</td>
    <td>${addEmail}</td>
    <td>${choseType}</td>
    `;
    if (choseType == 'Giảng viên') {
      content += `
        <td>Số ngày làm: ${workDay}
        <br>
        Lương theo ngày: ${salaryByDay}
        <br>
        Tổng lương: ${newPerson.tongLuong()} VND
        </td>;
        <td>
        <button class="btn btn-danger" >
        <i class="fs-5  fa-solid fa-trash-can"></i>
        </button>
        <button class="btn btn-info">
        <i class="fs-5 fs-5  fa-solid fa-pen"></i>
        </button>
        </td>
        </tr>
        `;
    } else if (choseType == 'Học viên') {
      content += `
        <td>Điểm toán: ${addToan}
        <br>
        Điểm Lý: ${addLy}
        <br>
        Điểm hoá: ${addHoa}
        <br>
        Điểm trung bình: ${newPerson.tinhDiemTrungBinh()}
        </td>;
        <td>
            <button class="btn btn-danger" >
            <i class="fs-5 fa-solid fa-trash-can"></i>
            </button>
            <button class="btn btn-info">
            <i class="fs-5 fa-solid fa-pen"></i>
            </button>
        </td>
        </tr>

        `;
    } else if (choseType == 'Khách hàng') {
      content += `
        <td>Tên công ty: ${nameCompany}
        <br>
       Trị giá hoá đơn: ${billCost}
        <br>
       Đánh giá: ${rate}
        </td>;
        <td>
        <button class="btn btn-danger" >
        <i class="fs-5  fa-solid fa-trash-can"></i>
        </button>
        <button class="btn btn-info">
        <i class="fs-5  fa-solid fa-pen"></i>
        </button>
        </td>
        </tr>

        `;
    }
  });

  document.getElementById('tbodyPerson').innerHTML = content;
};
