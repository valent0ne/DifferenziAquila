
package it.univaq.disim.mobile.differenziaquila.business.impl;

import com.sun.org.apache.bcel.internal.generic.NEW;
import it.univaq.disim.mobile.differenziaquila.business.DifferenziAquilaService;
import it.univaq.disim.mobile.differenziaquila.business.domain.News;
import it.univaq.disim.mobile.differenziaquila.business.domain.RecyclingSack;
import it.univaq.disim.mobile.differenziaquila.business.domain.Session;
import it.univaq.disim.mobile.differenziaquila.business.domain.User;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class DifferenziAquilaServiceImpl implements DifferenziAquilaService {

    @Autowired
    private SessionRepository sessionRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private NewsRepository newsRepository;

    @Autowired
    private RecyclingSackRepository recyclingsackRepository;

    @Override
    public Session login(String clientcode) {
        User user = userRepository.findByClientcode(clientcode);
        if (user != null) {
            Session session = new Session();
            session.setUser(user);
            session.setToken(Utility.generateToken());
            Session newSession = sessionRepository.save(session);
            return newSession;
        } else {
            return null;
        }
    }

    @Override
    public void logout(String token) {
        Session session = sessionRepository.findByToken(token);
        if (session != null) {
            sessionRepository.delete(session);
        }
    }

    //user

    @Override
    public void createUser(User user) {
        userRepository.save(user);
    }

    @Override
    public void updateUser(String token, User user) {
        Session session = sessionRepository.findByToken(token);
        if (session != null) {
            User oldUser = session.getUser();
            oldUser.setFirstname(user.getFirstname());
            oldUser.setLastname(user.getLastname());
            oldUser.setAddress(user.getAddress());
        }

    }

    //end user

    //news

    @Override
    public List<News> findAllNews() {
        return newsRepository.findAll();
    }

    @Override
    public void createNews(String token, News news) {
        Session session = sessionRepository.findByToken(token);
        if (session != null) {
            newsRepository.save(news);

        }
    }

    @Override
    public void deleteNews(String token, Long id) {
        Session session = sessionRepository.findByToken(token);
        if (session != null) {
            newsRepository.delete(id);
        }

    }

    @Override
    public News updateNews(String token, News newNews) {
        Session session = sessionRepository.findByToken(token);
        if (session != null) {
            News news = newsRepository.findOne(newNews.getId());
            if(news !=null){
                news.setTitle(newNews.getTitle());
                news.setBody(newNews.getBody());
                news.setDate(newNews.getDate());
                return news;
            }
        }
        return null;
    }

    @Override
    public News findNewsById(Long id){
        return newsRepository.findOne(id);
    }

    //end news


    //START: RecyclingSack
    @Override
    public void createRecyclingSack(RecyclingSack recyclingsack) {
        recyclingsackRepository.save(recyclingsack);
    }

    @Override
    public RecyclingSack updateRecyclingSack(String token, RecyclingSack newRecyclingsack) {
        Session session = sessionRepository.findByToken(token);
        if (session != null) {
           RecyclingSack recyclingsack= recyclingsackRepository.findOne(newRecyclingsack.getId());
           if (recyclingsack!=null){
               recyclingsack.setWastecategory(newRecyclingsack.getWastecategory());
               recyclingsack.setIcon(newRecyclingsack.getIcon());
               recyclingsack.setColor(newRecyclingsack.getColor());
               return recyclingsack;
           }
        }
        return null;
    }


    @Override
    public List<RecyclingSack> findAllRecyclingSacks(){
        return recyclingsackRepository.findAll();
    }

    @Override
    public RecyclingSack findRecyclingSackById(Long id){
        return recyclingsackRepository.findOne(id);
    }

    @Override
    public void deleteRecyclingSack(String token, Long id) {
        Session session = sessionRepository.findByToken(token);
        if (session != null) {
            recyclingsackRepository.delete(id);
            }
    }
    //END: RecyclingSack

}
