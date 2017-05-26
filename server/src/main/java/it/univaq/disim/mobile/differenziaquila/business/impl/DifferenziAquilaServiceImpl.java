
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

    @Autowired
    private SpecialWasteRepository specialwasteRepository;

    @Autowired
    private CollectionPointRepository collectionPointRepository;

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
    public News createNews(String token, News news) {
        Session session = sessionRepository.findByToken(token);
        if (session != null) {
            return newsRepository.save(news);
        }
        return null;
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

    //end ews


    //RecyclingSack
    @Override
    public RecyclingSack createRecyclingSack(String token, RecyclingSack recyclingsack) {
        Session session = sessionRepository.findByToken(token);
        if(session!=null) {
            return recyclingsackRepository.save(recyclingsack);
        }
        return null;
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
    //end RecyclingSack

    //SpecialWaste
    @Override
    public SpecialWaste createSpecialWaste(String token, SpecialWaste specialwaste) {
        Session session = sessionRepository.findByToken(token);
        if(session!=null) {
            return specialwasteRepository.save(specialwaste);
        }
        return null;
    }

    @Override
    public SpecialWaste updateSpecialWaste(String token, SpecialWaste newSpecialwaste) {
        Session session = sessionRepository.findByToken(token);
        if (session != null) {
            SpecialWaste specialwaste= specialwasteRepository.findOne(newSpecialwaste.getId());
            if (specialwaste!=null){
                specialwaste.setDescription(newSpecialwaste.getDescription());
                specialwaste.setName(newSpecialwaste.getName());
                return specialwaste;
            }
        }
        return null;
    }


    @Override
    public List<SpecialWaste> findAllSpecialWastes(){
        return specialwasteRepository.findAll();
    }

    @Override
    public SpecialWaste findSpecialWasteById(Long id){
        return specialwasteRepository.findOne(id);
    }

    @Override
    public void deleteSpecialWaste(String token, Long id) {
        Session session = sessionRepository.findByToken(token);
        if (session != null) {
            specialwasteRepository.delete(id);
        }
    }
    //end SpecialWaste

    //collectionPoint
    @Override
    public CollectionPoint createCollectionPoint(String token, CollectionPoint collectionPoint){
        Session session = sessionRepository.findByToken(token);
        if(session!=null) {
            return collectionPointRepository.save(collectionPoint);
        }
        return null;
    }

    @Override
    public List<CollectionPoint> findAllCollectionPoints(){
        return collectionPointRepository.findAll();
    }

    @Override
    public CollectionPoint findCollectionPointById(Long id){
        return collectionPointRepository.findOne(id);
    }

    @Override
    public void deleteCollectionPoint(String token, Long id){
        Session session =sessionRepository.findByToken(token);
        if(session!=null){
            collectionPointRepository.delete(id);
        }
    }

    @Override
    public CollectionPoint updateCollectionPoint(String token, CollectionPoint newCollectionpoint){
        Session session = sessionRepository.findByToken(token);
        if (session != null) {
            CollectionPoint collectionPoint= collectionPointRepository.findOne(newCollectionpoint.getId());
            if (collectionPoint!=null){
                collectionPoint.setLatitude(newCollectionpoint.getLatitude());
                collectionPoint.setLongitude(newCollectionpoint.getLongitude());
                collectionPoint.setSpecialwaste(newCollectionpoint.getSpecialwaste());
                return collectionPoint;
            }
        }
        return null;
    }

    //end collectionPoint

    //START: Calendar
    @Override
    public Calendar createCalendar(String token, Calendar calendar) {
        Session session = sessionRepository.findByToken(token);
        if(session!=null) {
            return calendarRepository.save(calendar);
        }
        return null;
    }

    @Override
    public Calendar updateCalendar(String token, Calendar newCalendar) {
        Session session = sessionRepository.findByToken(token);
        if (session != null) {
            Calendar calendar=calendarRepository.findOne(newCalendar.getId());
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


    //START:WasteCategory
    @Override
    public WasteCategory createWasteCategory(String token, WasteCategory wastecategory) {
        Session session = sessionRepository.findByToken(token);
        if(session!=null) {
            return wastecategoryRepository.save(wastecategory);
        }
        return null;
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


}
