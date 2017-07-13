package it.univaq.disim.mobile.differenziaquila.business.domain;


import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "calendar")
public class Calendar {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;


    @ManyToOne
    @JoinColumn(name = "id_waste_category", nullable = false)
    private WasteCategory wastecategory;

    @Temporal(TemporalType.DATE)
    @Column(name = "day", nullable = false)
    private Date day;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public WasteCategory getWastecategory(){ return this.wastecategory; }

    public void setWastecategory(WasteCategory wastecategory) {
        this.wastecategory = wastecategory;
    }

    public Date getDay() {
        return day;
    }

    public void setDay(Date day) {
        this.day = day;
    }
}
