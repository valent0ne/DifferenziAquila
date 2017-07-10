//Dobbiamo fare il controllo come fatto con l'id anche per gli altri attributi????


export class RecyclingSackRequest{

  public id: number=-1;
  public amount: string="";
  public date: Date;//stesso problema di calendar

  constructor(obj?: any) {
    this.setObj(obj);
  }

  setObj(obj?: any) {
    if (obj){
      this.id=(typeof obj.id === "number" )? obj.id:this.id;
      this.amount= obj.amount || this.amount;
      this.date= obj.date || this.date;
    }
  }
}
