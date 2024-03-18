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
  // Tắt modal
  $('#modelId').modal('hide');
  // Reset form
  // console.log(document.getElementById('infoForm'));
  document.getElementById('infoForm').reset();
  saveDataLocal();
};

// Render dữ liệu
const renderPerson = (arrPerson = listPerSon.arr) => {
  // let type = document.getElementById('choseType').value;
  // console.log(type);
  let content = '';
  arrPerson.forEach((user, index) => {
    let newPerson;
    if (user.choseType === 'Giảng viên') {
      newPerson = new Employee();
    } else if (user.choseType === 'Học viên') {
      newPerson = new Students();
    } else if (user.choseType === 'Khách hàng') {
      newPerson = new Customer();
    }
    console.log(newPerson);
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
        </td>
        <td>
        <button onClick="deletePerson('${addId}')" id="btnXoa" class="btn btn-danger" >
        <i class="fs-5  fa-solid fa-trash-can"></i>
        </button>
        <button onClick="getDetailPerson('${addId}')" class="btn btn-info">
            <i class="fs-5 fa-solid fa-pen"></i>
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
        </td>
        <td>
            <button onClick="deletePerson('${addId}')" class="btn btn-danger" >
            <i class="fs-5 fa-solid fa-trash-can"></i>
            </button>
            <button onClick="getDetailPerson('${addId}')" class="btn btn-info">
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
        </td>
        <td>
        <button onClick="deletePerson('${addId}')" class="btn btn-danger" >
        <i class="fs-5  fa-solid fa-trash-can"></i>
        </button>
        <button onClick="getDetailPerson('${addId}')" class="btn btn-info">
        <i class="fs-5  fa-solid fa-pen"></i>
        </button>
        </td>
        </tr>
        `;
    }
  });

  document.getElementById('tbodyPerson').innerHTML = content;
};
function saveDataLocal() {
  let stringData = JSON.stringify(listPerSon.arr);
  localStorage.setItem('arrPerson', stringData);
}
// // Hàm giúp lấy dữ liệu từ localSttorage
function getDataLocal() {
  let stringData = localStorage.getItem('arrPerson');
  // Kiểm tra nếu không bị null thì thêm dữ liệu vào mảng
  if (stringData) {
    listPerSon.arr = JSON.parse(stringData);
    renderPerson(); // Không truyền tham số vào đây
  }
}
getDataLocal();

// Chức năng xoá

function deletePerson(idPerson) {
  console.log(idPerson);
  let index = listPerSon.arr.findIndex((person, index) => {
    return person.addId == idPerson;
  });
  if (index != -1) {
    listPerSon.DelUser(index);
    saveDataLocal();
    renderPerson();
  }
}

// Hàm giúp lấy thông tin
let getDetailPerson = (idPerson) => {
  // let person = listPerSon.arr.findIndex((user, index) => {
  //   return user.addId == idPerson;
  // });
  // console.log(person);
  let person = listPerSon.arr.find((user) => {
    return user.addId == idPerson;
  });
  console.log(person);
  if (person) {
    // sử dụng querySelectorAll để gọi tới tất cả input, select
    let arrInputHtml = document.querySelectorAll('form input,form select');
    let arrInputJs = document.querySelectorAll('#userInfo input');
    console.log(arrInputJs);
    let arrAllInput = [...arrInputHtml, ...arrInputJs];
    arrAllInput.forEach((item, index) => {
      let { id } = item;
      console.log(id);
      item.value = person[id];
    });
    // mở modal để hiển thị dữ liệu
    $('#modelId').modal('show');

    // document.getElementById('foodID').readOnly = true;
  }
};
window.onload = () => {
  // Khi js và css được khởi chạy xong, sẽ dom tới button và thêm sự kiện onclick

  // tạo ra một phương thức có tên trùng với hàm deleteFood cho window lưu trữ
  window.deletePerson = (addId) => {
    console.log(addId);
    deletePerson(addId);
  };

  window.getDetailPerson = (addId) => {
    getDetailPerson(addId);
  };
};
