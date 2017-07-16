
export class Notification{

  public hh: number=null;
  public mm: number=null;



  constructor(obj?: any) {
    this.setObj(obj);
  }

  setObj(obj?: any) {
    if (obj){
      this.hh= obj.hh || this.hh;
      this.mm= obj.mm || this.mm;


    }
  }
}
