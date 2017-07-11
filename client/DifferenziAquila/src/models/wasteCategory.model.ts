//Dobbiamo fare il controllo come fatto con l'id anche per gli altri attributi????


export class WasteCategory{

  public id: number=-1;
  public name: String="";
  public description: String="";
  public icon: String="";


  constructor(obj?: any) {
    this.setObj(obj);
  }

  setObj(obj?: any) {
    if (obj){
      this.id=(typeof obj.id === "number" )? obj.id:this.id;
      this.name= obj.name || this.name;
      this.description= obj.description || this.description;
      this.icon= obj.icon || this.icon;
    }
  }
}
