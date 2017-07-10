//Dobbiamo fare il controllo come fatto con l'id anche per gli altri attributi????

export class CollectionPoint{

  public id: number=-1;
  public longitude: string="";
  public latitude: string="";

  constructor(obj?: any) {
    this.setObj(obj);
  }

  setObj(obj?: any) {
    if (obj){
      this.id=(typeof obj.id === "number" )? obj.id:this.id;
      this.longitude= obj.longitude || this.longitude;
      this.latitude= obj.latitude || this.latitude;
    }
  }
}
