//Dobbiamo fare il controllo come fatto con l'id anche per gli altri attributi????


import {isDate} from "rxjs/util/isDate";
export class RecyclingSackRequest{

  public id: number=-1;
  public amount: number=0;
  public date: Date;//stesso problema di calendar

  constructor(obj?: any) {
    this.setObj(obj);
  }

  setObj(obj?: any) {
    if (obj){
      this.id=(typeof obj.id === "number" )? obj.id : this.id;
      this.amount= (typeof obj.amount === "number")? obj.amount : this.amount;
      this.date= (isDate(obj.date))? obj.date : this.date;
    }
  }
}
