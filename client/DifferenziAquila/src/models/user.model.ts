export class User{

  public clientcode: String="";
  public firstname: String="";
  public lastname: String="";
  public address: String="";

  public token: String="";


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
