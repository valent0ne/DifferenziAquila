//Dobbiamo fare il controllo come fatto con l'id anche per gli altri attributi????


export class User{

  public clientcode: string="";
  public firstname: string="";
  public lastname: string="";
  public address: string="";

  token: string="";


  constructor(obj?: any) {
    this.setObj(obj);
  }

  setObj(obj?: any) {
    if (obj){
      this.clientcode= obj.clientcode || this.clientcode;
      this.firstname= obj.firstname || this.firstname;
      this.lastname= obj.lastname || this.lastname;
      this.address= obj.address || this.address;
      this.token= obj.token || this.token;

    }
  }
}
