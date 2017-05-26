package it.univaq.disim.mobile.differenziaquila.business.impl;


import it.univaq.disim.mobile.differenziaquila.business.domain.WasteCategory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface WasteCategoryRepository extends JpaRepository<WasteCategory,Long>{

    WasteCategory findOne(Long id);

    List<WasteCategory> findAll();
}
