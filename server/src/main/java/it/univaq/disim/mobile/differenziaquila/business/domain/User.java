package it.univaq.disim.mobile.differenziaquila.business.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "users")
public class User implements java.io.Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "client_code", nullable = false, length = 255)
    private String clientcode;
    
    @Column(name = "first_name", nullable = false, length = 255)
    private String firstname;
    
    @Column(name = "last_name", nullable = false, length = 255)
    private String lastname;
    
    @Column(name = "address", nullable = false, length = 255)
    private String address;

    @JsonIgnore
    @OneToMany(cascade = {CascadeType.PERSIST, CascadeType.MERGE}, mappedBy = "user", fetch = FetchType.LAZY)
    private Set<SpecialWasteRequest> specialwasterequests = new HashSet<>();

    @JsonIgnore
    @OneToMany(cascade = {CascadeType.PERSIST, CascadeType.MERGE}, mappedBy = "user", fetch = FetchType.LAZY)
    private Set<RecyclingSackRequest> recyclingsackequests = new HashSet<>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getClientcode() {
        return clientcode;
    }

    public void setClientcode(String clientcode) {
        this.clientcode = clientcode;
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

    public Set<SpecialWasteRequest> getSpecialwasterequests() {
        return specialwasterequests;
    }

    public Set<RecyclingSackRequest> getRecyclingsackequests() {
        return recyclingsackequests;
    }

    public void setSpecialwasterequests(Set<SpecialWasteRequest> specialwasterequests) {
        this.specialwasterequests = specialwasterequests;
    }

    public void setRecyclingsackequests(Set<RecyclingSackRequest> recyclingsackequests) {
        this.recyclingsackequests = recyclingsackequests;
    }

    public void addSpecialwasterequest(/* ? */){
        //TODO
    }

    public void addRecyclingsackrequest(/* ? */){
        //TODO
    }
}
