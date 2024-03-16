import Person from './Person.js';

export default class Employee extends Person {
  constructor(addId, addName, addAddress, addEmail, choseType, workDay, salaryByDay) {
    super(addId, addName, addAddress, addEmail, choseType, workDay, salaryByDay);
    this.workDay = workDay * 1;
    this.salaryByDay = salaryByDay * 1;
  }
  tongLuong = function () {
    let total = this.workDay * this.salaryByDay;
    // Format đơn vị tiền tệ:
    var formatTongLuong = total.toLocaleString({
      style: 'currency',
      currency: 'VND',
    });
    return formatTongLuong;
  };
}
