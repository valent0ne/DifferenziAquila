package it.univaq.disim.mobile.differenziaquila.business.domain;

import javax.persistence.*;

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

    @Column(name = "color", nullable = false, length = 255)
    private String color;




    public Long getId() { return id;}

    public void setId(Long id) { this.id = id; }


    public WasteCategory getWastecategory() {return wastecategory;}

    public void setWastecategory(WasteCategory wastecategory) { this.wastecategory = wastecategory;}


    public String getIcon() { return icon;}

    public void setIcon(String icon) { this.icon = icon;}


    public String getColor() { return color;}

    public void setColor(String color) {this.color = color;}
}
