package it.univaq.disim.mobile.differenziaquila.business.impl;


import it.univaq.disim.mobile.differenziaquila.business.domain.RecyclingSack;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RecyclingSackRepository  extends JpaRepository<RecyclingSack,Long>{

    RecyclingSack findById(Long id);

    List<RecyclingSack> findAll();
}
