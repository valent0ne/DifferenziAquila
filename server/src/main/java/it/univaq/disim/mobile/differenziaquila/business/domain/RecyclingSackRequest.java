package it.univaq.disim.mobile.differenziaquila.business.domain;

import javax.persistence.*;
import java.sql.Date;

@Entity
@Table (name="recycling_sacks_requests")
public class RecyclingSackRequest implements java.io.Serializable{


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "id_recycling_sack", nullable = false)
    private RecyclingSack recyclingsack;

    @ManyToOne
    @JoinColumn(name = "id_user", nullable = false)
    private User user;

    @Column(name="amount", nullable = false)
    private int amount;

    @Column(name="date", nullable = false)
    private Date date;




    public Long getId() {return id;}

    public void setId(Long id) {this.id = id;}


    public RecyclingSack getRecyclingSack() {return recyclingsack;}

    public void setRecyclingSack(RecyclingSack recyclingSack) {this.recyclingsack = recyclingSack;}


    public User getUser() {return user;}

    public void setUser(User user) {this.user = user;}


    public int getAmount() {return amount;}

    public void setAmount(int amount) {this.amount = amount;}


    public Date getDate() {return date;}

    public void setDate(Date date) {this.date = date;}

}
