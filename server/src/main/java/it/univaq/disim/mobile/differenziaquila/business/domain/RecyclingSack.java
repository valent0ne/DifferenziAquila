package it.univaq.disim.mobile.differenziaquila.business.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "recycling_sacks")
public class RecyclingSack {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;


    @OneToOne
    @JoinColumn(name = "id_waste_category", nullable = false)
    private WasteCategory wastecategory;

    @Column(name = "icon", nullable = false, length = 255)
    private String icon;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Column(name = "name", nullable = false, length = 255)
    private String name;



    @JsonIgnore
    @OneToMany(cascade = {CascadeType.PERSIST, CascadeType.MERGE}, mappedBy = "recyclingsack", fetch = FetchType.LAZY)
    private Set<RecyclingSackRequest> recyclingsackequests = new HashSet<>();

    public Long getId() { return id;}

    public void setId(Long id) { this.id = id; }

    public Set<RecyclingSackRequest> getRecyclingsackequests() {
        return recyclingsackequests;
    }

    public void setRecyclingsackequests(Set<RecyclingSackRequest> recyclingsackequests) {
        this.recyclingsackequests = recyclingsackequests;
    }

    public WasteCategory getWastecategory() {return wastecategory;}

    public void setWastecategory(WasteCategory wastecategory) { this.wastecategory = wastecategory;}

    public String getIcon() { return icon;}
    public void setIcon(String icon) { this.icon = icon;}

}
