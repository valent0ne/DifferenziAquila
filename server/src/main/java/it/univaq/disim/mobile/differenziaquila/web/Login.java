package it.univaq.disim.mobile.differenziaquila.web;

public class Login {

    private String token;
    private String firstname;
    private String lastname;
    private String address;
    private String clientcode;

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getFirstname() {
        return firstname;
    }

    public void setFirstname(String firstname) {
        this.firstname = firstname;
    }

    public String getLastname() {
        return lastname;
    }

    public void setLastname(String lastname) {
        this.lastname = lastname;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getClientcode(){
        return clientcode;
    }

    public void setClientcode(String clientcode){
        this.clientcode=clientcode;
    }
    
    
}
