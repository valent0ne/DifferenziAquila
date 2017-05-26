package it.univaq.disim.mobile.differenziaquila.business.impl;

import it.univaq.disim.mobile.differenziaquila.business.domain.CollectionPoint;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public interface CollectionPointRepository extends JpaRepository<CollectionPoint, Long> {

    List<CollectionPoint> findAll();


    CollectionPoint findOne(Long id);

}
