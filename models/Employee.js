import Person from './Person';

export default class Employee extends Person {
  constructor(addId, addName, addAddress, addEmail, choseType, workDay, salaryByDay) {
    super(addId, addName, addAddress, addEmail, choseType, workDay, salaryByDay);
    this.workDay = workDay;
    this.salaryByDay = salaryByDay;
  }
  tongLuong = function () {
    let total = this.workDay + this.salaryByDay;
    return total;
  };
}
