
export class Notification{

  public id: number = -1;
  public title: string="";
  public text: string="";
  public at: Date;
  public led: string="";

  constructor(obj?: any) {
    this.setObj(obj);
  }

  setObj(obj?: any) {
    if (obj){
      this.id=(typeof obj.id === "number" )? obj.id:this.id;
      this.title= obj.title || this.title;
      this.text= obj.text || this.text;
      this.at= obj.at || this.at;
      this.led= obj.led || this.led;
    }
  }
}
