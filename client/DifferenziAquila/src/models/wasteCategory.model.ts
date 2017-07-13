export class WasteCategory{

  public id: number=-1;
  public color: String="";


  constructor(obj?: any) {
    this.setObj(obj);
  }

  setObj(obj?: any) {
    if (obj){
      this.id=(typeof obj.id === "number" )? obj.id:this.id;
      this.color = obj.color || this.color;
    }
  }
}
