import Person from './Person.js';

export default class Customer extends Person {
  constructor(addId, addName, addAddress, addEmail, choseType, nameCompany, billCost, rate) {
    super(addId, addName, addAddress, addEmail, choseType, nameCompany, billCost, rate);
    this.nameCompany = nameCompany;
    this.billCost = billCost;
    this.rate = rate;
  }
}
