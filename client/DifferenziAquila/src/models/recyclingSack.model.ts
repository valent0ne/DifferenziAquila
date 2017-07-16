export class RecyclingSack{

  public id: number=-1;
  public name: String="";
  public color: String="";


  constructor(obj?: any) {
    this.setObj(obj);
  }

  setObj(obj?: any) {
    if (obj){
      this.id=(typeof obj.id === "number" )? obj.id:this.id;
      this.name= obj.name || this.name;
      this.color=obj.color || this.color;
    }
  }
}
