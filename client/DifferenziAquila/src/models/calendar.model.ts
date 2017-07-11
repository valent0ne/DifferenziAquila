//Dobbiamo fare il controllo come fatto con l'id anche per gli altri attributi????

export class Calendar{

  public id: number=-1;
  public day: Date;

  constructor(obj?:any){
      this.setObj(obj);
  }

  setObj(obj?: any) {
    if (obj) {
      this.id=(typeof obj.id === "number" )? obj.id:this.id;
      this.day = obj.day || this.day;
    }
  }
}
