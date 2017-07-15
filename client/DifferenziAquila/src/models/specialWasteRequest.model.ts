
import {isString} from "ionic-angular/util/util";
export class SpecialWasteRequest{

  public amount: number=0;
  public date: Date;
  public hour: String="";
  public description: String="";


  constructor(obj?: any) {
    this.setObj(obj);
  }

  setObj(obj?: any) {
    if (obj) {
      this.amount =(typeof obj.amount === "number" )? obj.amount : this.amount;
      this.date = obj.date || this.date;
      this.hour = (isString(obj.hour))? obj.hour : this.hour;
      this.description=(isString(obj.description))? obj.description : this.description;

    }
  }
  }
