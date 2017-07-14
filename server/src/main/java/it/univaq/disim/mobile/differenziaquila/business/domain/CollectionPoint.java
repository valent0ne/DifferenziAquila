package it.univaq.disim.mobile.differenziaquila.business.domain;


import javax.persistence.*;


@Entity
@Table(name = "collection_points")
public class CollectionPoint {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "id_special_waste", nullable = false)
    private SpecialWaste specialwaste;

    @Column(name="longitude", nullable=false, length=255)
    private String longitude;

    @Column(name="latitude", nullable=false, length=255)
    private String latitude;

    @Column(name="description", nullable=false)
    private String description;

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public SpecialWaste getSpecialwaste() {
        return specialwaste;
    }

    public void setSpecialwaste(SpecialWaste specialwaste) {
        this.specialwaste = specialwaste;
    }

    public String getLongitude() {
        return longitude;
    }

    public void setLongitude(String longitude) {
        this.longitude = longitude;
    }

    public String getLatitude() {
        return latitude;
    }

    public void setLatitude(String latitude) {
        this.latitude = latitude;
    }
}
