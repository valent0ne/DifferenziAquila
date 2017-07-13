


export class Calendar{

  public id: number=-1;
  public id_waste: any = null;
  public day: Date;

  constructor(obj?:any){
    this.setObj(obj);
  }

  setObj(obj?: any) {
    if (obj) {
      this.id=(typeof obj.id === "number" )? obj.id:this.id;
      this.id_waste = obj.id_waste || this.id_waste;
      this.day = obj.day || this.day;

    }
  }
}
