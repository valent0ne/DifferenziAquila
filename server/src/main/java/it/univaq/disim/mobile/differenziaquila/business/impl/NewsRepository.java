package it.univaq.disim.mobile.differenziaquila.business.impl;

import it.univaq.disim.mobile.differenziaquila.business.domain.News;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface NewsRepository extends JpaRepository<News, Long>{

    List<News> findAll();

    News findOne(Long id);

}
