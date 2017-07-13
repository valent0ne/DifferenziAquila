//Dobbiamo fare il controllo come fatto con l'id anche per gli altri attributi????


import {isDate} from "rxjs/util/isDate";
export class RecyclingSackRequest{

  public amount: number=0;
  public date: Date;//stesso problema di calendar

  constructor(obj?: any) {
    this.setObj(obj);
  }

  setObj(obj?: any) {
    if (obj){
      this.amount= (typeof obj.amount === "number")? obj.amount : this.amount;
      this.date= (isDate(obj.date))? obj.date : this.date;
    }
  }
}
