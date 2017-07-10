//Dobbiamo fare il controllo come fatto con l'id anche per gli altri attributi????


export class SpecialWasteRequest{

  public id: number=-1;
  public amount: string="";
  public date: Date;//stesso problema di calendar
  public hour: string="";//come la rappresento l'ora?


  constructor(obj?: any) {
    this.setObj(obj);
  }

  setObj(obj?: any) {
    if (obj) {
      this.id=(typeof obj.id === "number" )? obj.id:this.id;
      this.amount = obj.amount || this.amount;
      this.date = obj.date || this.date;
      this.hour = obj.hour || this.hour;

    }
  }
  }
