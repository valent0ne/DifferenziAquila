package it.univaq.disim.mobile.differenziaquila.business.impl;

import it.univaq.disim.mobile.differenziaquila.business.domain.Calendar;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Date;
import java.util.List;

public interface CalendarRepository extends JpaRepository<Calendar,Long> {

    Calendar findOne(Long id);

    List<Calendar> findAll();

    List<Calendar> findCalendarsByDayGreaterThanEqualOrderByDay(Date date);

    List<Calendar> findCalendarsByDayGreaterThanEqualAndDayLessThanEqualOrderByDay(Date start, Date end);

}
