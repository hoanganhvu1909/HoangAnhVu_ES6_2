import Person from './Person';

export default class Students extends Person {
  constructor(addId, addName, addAddress, addEmail, choseType, addToan, addLy, addHoa) {
    super(addId, addName, addAddress, addEmail, choseType, addToan, addLy, addHoa);
    this.addToan = addToan;
    this.addLy = addLy;
    this.Hoa = addHoa;
  }
  tinhDiemTrungBinh = function () {
    let diemTrungBinh = (this.addToan + this.addLy + this.addHoa) / 3;
    return diemTrungBinh.toFixed(2);
  };
}
