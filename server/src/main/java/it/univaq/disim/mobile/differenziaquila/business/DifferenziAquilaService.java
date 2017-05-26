package it.univaq.disim.mobile.differenziaquila.business;

import it.univaq.disim.mobile.differenziaquila.business.domain.News;
import it.univaq.disim.mobile.differenziaquila.business.domain.Session;
import it.univaq.disim.mobile.differenziaquila.business.domain.User;
import java.util.List;

public interface DifferenziAquilaService {


    Session login(String clientcode);

    void logout(String token);

    //user
    void createUser(User user);

    void updateUser(String token, User user);
    //user

    //news
    List<News> findAllNews();

    void createNews(String token, News news);

    void deleteNews(String token, Long id);

    News updateNews (String token, News newNews);

    News findNewsById(Long id);
    //news

}
