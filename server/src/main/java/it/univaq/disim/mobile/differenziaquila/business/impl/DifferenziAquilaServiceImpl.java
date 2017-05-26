
package it.univaq.disim.mobile.differenziaquila.business.impl;

import com.sun.org.apache.bcel.internal.generic.NEW;
import it.univaq.disim.mobile.differenziaquila.business.DifferenziAquilaService;
import it.univaq.disim.mobile.differenziaquila.business.domain.*;

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

    @Autowired
    private WasteCategoryRepository wastecategoryRepository;

    @Autowired
    private CalendarRepository calendarRepository;

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



    //START:WasteCategory
    @Override
    public void createWasteCategory(WasteCategory wastecategory) {
        wastecategoryRepository.save(wastecategory);
    }

    @Override
    public WasteCategory updateWasteCategory(String token, WasteCategory newWasteCategory) {
        Session session = sessionRepository.findByToken(token);
        if (session != null) {
            WasteCategory wastecategory= wastecategoryRepository.findOne(newWasteCategory.getId());
            if (wastecategory!=null){
                wastecategory.setDescription(newWasteCategory.getDescription());
                wastecategory.setIcon(newWasteCategory.getIcon());
                wastecategory.setName(newWasteCategory.getName());
                return wastecategory;
            }
        }
        return null;
    }


    @Override
    public List<WasteCategory> findAllWasteCategories(){
        return wastecategoryRepository.findAll();
    }

    @Override
    public WasteCategory findWasteCategoryById(Long id){
        return wastecategoryRepository.findOne(id);
    }

    @Override
    public void deleteWasteCategory(String token, Long id) {
        Session session = sessionRepository.findByToken(token);
        if (session != null) {
            wastecategoryRepository.delete(id);
        }
    }
    //END: WsateCategory


    //START: Calendar
    @Override
    public void createCalendar(Calendar calendar) {
        calendarRepository.save(calendar);
    }

    @Override
    public Calendar updateCalendar(String token, Calendar newCalendar) {
        Session session = sessionRepository.findByToken(token);
        if (session != null) {
            Calendar calendar= calendarRepository.findOne(newCalendar.getId());
            if (calendar!=null){
                calendar.setWastecategory(newCalendar.getWastecategory());
                calendar.setDay(newCalendar.getDay());
                return calendar;
            }
        }
        return null;
    }


    @Override
    public List<Calendar> findAllCalendars(){
        return calendarRepository.findAll();
    }

    @Override
    public Calendar findCalendarById(Long id){
        return calendarRepository.findOne(id);
    }

    @Override
    public void deleteCalendar(String token, Long id) {
        Session session = sessionRepository.findByToken(token);
        if (session != null) {
            calendarRepository.delete(id);
        }
    }
    //END: Calendar
}
