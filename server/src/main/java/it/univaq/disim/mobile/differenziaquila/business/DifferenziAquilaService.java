package it.univaq.disim.mobile.differenziaquila.business;

import it.univaq.disim.mobile.differenziaquila.business.domain.Session;
import it.univaq.disim.mobile.differenziaquila.business.domain.User;
import java.util.List;

public interface DifferenziAquilaService {

    Session login(String clientcode);

    void logout(String token);

    void createUser(User user);

    void updateUser(String token, User user);

}
