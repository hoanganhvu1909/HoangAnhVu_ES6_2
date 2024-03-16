import Person from './Person.js';

export default class Students extends Person {
  constructor(addId, addName, addAddress, addEmail, choseType, addToan, addLy, addHoa) {
    super(addId, addName, addAddress, addEmail, choseType, addToan, addLy, addHoa);
    this.addToan = addToan * 1;
    this.addLy = addLy * 1;
    this.addHoa = addHoa * 1;
  }

  tinhDiemTrungBinh = function () {
    // console.log(typeof this.addHoa);
    // let diemTrungBinh = (this.addToan + this.addLy + this.addHoa) / 3;
    // console.log(diemTrungBinh);
    // return diemTrungBinh.toFixed(2);
    // // return diemTrungBinh;
    // Chuyển đổi chuỗi thành số nguyên
    let diemToan = parseInt(this.addToan, 10);
    let diemLy = parseInt(this.addLy, 10);
    let diemHoa = parseInt(this.addHoa, 10);

    // Kiểm tra nếu các giá trị đã được chuyển đổi thành số
    if (isNaN(diemToan) || isNaN(diemLy) || isNaN(diemHoa)) {
      return 'Lỗi: Điểm không hợp lệ!';
    }

    // Tính điểm trung bình
    let diemTrungBinh = (diemToan + diemLy + diemHoa) / 3;

    return diemTrungBinh.toFixed(2);
  };
}
