//Dobbiamo fare il controllo come fatto con l'id anche per gli altri attributi????


export class News{

  public id: number=-1;
  public title: String="";
  public body: String="";
  public date: Date;


  constructor(obj?: any) {
    this.setObj(obj);
  }

  setObj(obj?: any) {
    if (obj){
      this.id=(typeof obj.id === "number" )? obj.id:this.id;
      this.title= obj.title || this.title;
      this.body= obj.body || this.body;
      this.date= obj.date || this.date;
    }
  }
}
