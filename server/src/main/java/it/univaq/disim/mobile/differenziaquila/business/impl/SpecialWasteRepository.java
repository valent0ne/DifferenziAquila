package it.univaq.disim.mobile.differenziaquila.business.impl;

import it.univaq.disim.mobile.differenziaquila.business.domain.SpecialWaste;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SpecialWasteRepository extends JpaRepository<SpecialWaste, Long> {

    SpecialWaste findOne(Long id);

    List<SpecialWaste> findAll();
}
