export default class ListPerson {
  constructor() {
    this.arr = [];
  }
  //Method
  //Thêm người dùng
  AddUser(User) {
    this.arr.push(User);
  }
  //tim vi tri
  FindIndex(id) {
    let index = -1;
    for (let i = 0; i < this.arr.length; i++) {
      if (id === this.arr[i].id) {
        index = i;
        break;
      }
    }
    return index;
  }
  //Thuc hien nguoi dung
  DelUser(id) {
    const index = this.FindIndex(id);
    if (index === -1) {
      alert('Không tìm thấy id');
    } else {
      this.arr.splice(index, 1);
    }
  }
}
