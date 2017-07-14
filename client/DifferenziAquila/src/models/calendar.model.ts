


export class Calendar{

  public id: number=-1;
  public color: any = null;
  public day: Date;

  constructor(obj?:any){
    this.setObj(obj);
  }

  setObj(obj?: any) {
    if (obj) {
      this.id=(typeof obj.id === "number" )? obj.id:this.id;
      this.color = obj.color || this.color;
      this.day = obj.day || this.day;
    }
  }
}
