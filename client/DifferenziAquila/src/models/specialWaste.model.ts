//Dobbiamo fare il controllo come fatto con l'id anche per gli altri attributi????


export class SpecialWaste{

  public id: number=-1;
  public name: String="";

  constructor(obj?: any) {
    this.setObj(obj);
  }

  setObj(obj?: any) {
    if (obj){
      this.id=(typeof obj.id === "number") ? obj.id : this.id;
      this.name= obj.name || this.name;
    }
  }
}
