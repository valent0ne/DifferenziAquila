//Dobbiamo fare il controllo come fatto con l'id anche per gli altri attributi????

export class Calendar{

  public id: number=-1;
  public day: Date; //FORSE E' ERRORE... LE STRINGHE LE METTO A VUOTO E LA DATA??? ANCHE SE SECONDO ME NON COMPORTA NULLA!!!!

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
