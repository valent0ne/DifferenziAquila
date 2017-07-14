export class CollectionPoint{

  public id: number=-1;
  public longitude: String="";
  public latitude: String="";
  public description: String="";
  public specialwaste: String="";

  constructor(obj?: any) {
    this.setObj(obj);
  }

  setObj(obj?: any) {
    if (obj){
      this.id=(typeof obj.id === "number" )? obj.id:this.id;
      this.longitude= obj.longitude || this.longitude;
      this.latitude= obj.latitude || this.latitude;
      this.description= obj.description || this.description;
      this.specialwaste= obj.specialwaste || this.specialwaste;
    }
  }
}
