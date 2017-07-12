//Dobbiamo fare il controllo come fatto con l'id anche per gli altri attributi????


export class RecyclingSack{

  public id: number=-1;
  public icon: String="";
  public color: String="";


  constructor(obj?: any) {
    this.setObj(obj);
  }

  setObj(obj?: any) {
    if (obj){
      this.id=(typeof obj.id === "number" )? obj.id:this.id;
      this.icon= obj.icon || this.icon;
      this.color= obj.color || this.color;
    }
  }
}
