package it.univaq.disim.mobile.differenziaquila.business.impl;

import it.univaq.disim.mobile.differenziaquila.business.domain.Session;
import it.univaq.disim.mobile.differenziaquila.business.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SessionRepository extends JpaRepository<Session, Long> {

    List<Session> findAllByUser(User u);

    Session findByToken(String token);

}
