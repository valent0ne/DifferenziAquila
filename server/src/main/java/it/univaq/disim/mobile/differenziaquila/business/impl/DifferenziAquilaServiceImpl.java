
package it.univaq.disim.mobile.differenziaquila.business.impl;

import it.univaq.disim.mobile.differenziaquila.business.DifferenziAquilaService;
import it.univaq.disim.mobile.differenziaquila.business.domain.*;

import java.util.*;

import it.univaq.disim.mobile.differenziaquila.business.domain.Calendar;
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
    private RecyclingSackRequestRepository recyclingsackrequestRepository;

    @Autowired
    private SpecialWasteRequestRepository specialwasterequestRepository;

    @Autowired
    private WasteCategoryRepository wastecategoryRepository;

    @Autowired
    private CalendarRepository calendarRepository;

    @Autowired
    private SpecialWasteRepository specialwasteRepository;

    @Autowired
    private CollectionPointRepository collectionPointRepository;

    @Override
    public Session login(String clientcode) throws Exception {
        User user = userRepository.findByClientcode(clientcode);
        if (user != null) {
            Session session = new Session();
            session.setUser(user);
            session.setToken(Utility.generateToken());
            Session newSession = sessionRepository.save(session);
            return newSession;
        }
        throw new Exception("unauthorized");
    }

    @Override
    public void logout(String token) throws Exception{
        List<Session> sessions = sessionRepository.findAllByUser(sessionRepository.findByToken(token).getUser());
        if (sessions.size()>0) {
            sessionRepository.delete(sessions);
            return;
        }
        throw new Exception("unauthorized");
    }



    //user




    @Override
    public User createUser(User user) {
        return userRepository.save(user);
    }

    @Override
    public User updateUser(String token, User user) throws Exception{
        Session session = sessionRepository.findByToken(token);
        if (session != null) {
            User oldUser = session.getUser();
            oldUser.setFirstname(user.getFirstname());
            oldUser.setLastname(user.getLastname());
            oldUser.setAddress(user.getAddress());
            return oldUser;
        }
        throw new Exception("unauthorized");
    }

    //end user

    //recyclingsackrequest
    @Override
    public RecyclingSackRequest createRecyclingSackRequest(RecyclingSackRequest rsr, String token, Long id) throws Exception{
        Session session = sessionRepository.findByToken(token);
        if (session != null) {
            User user = session.getUser();
            rsr.setUser(user);
            rsr.setRecyclingSack(recyclingsackRepository.findOne(id));
            return recyclingsackrequestRepository.save(rsr);
        }
        throw new Exception("unauthorized");
    }
    //end recyclingsackrequest

    //specialwasterequest
    @Override
    public SpecialWasteRequest createSpecialWasteRequest(SpecialWasteRequest swr, String token, Long id) throws Exception{
        Session session = sessionRepository.findByToken(token);
        if (session != null) {
            User user = session.getUser();
            swr.setUser(user);
            swr.setSpecialwaste(specialwasteRepository.findOne(id));
            return specialwasterequestRepository.save(swr);
        }
        throw new Exception("unauthorized");
    }
    //end specialwasterequest


    //news

    @Override
    public List<News> findAllNews() {
        return newsRepository.findAll();
    }

    @Override
    public News createNews(String token, News news) throws Exception {
        Session session = sessionRepository.findByToken(token);
        if (session != null) {
            return newsRepository.save(news);
        }
        throw new Exception("unauthorized");
    }

    @Override
    public void deleteNews(String token, Long id) throws Exception{
        Session session = sessionRepository.findByToken(token);
        if (session != null) {
            newsRepository.delete(id);
            return;
        }
        throw new Exception("unauthorized");
    }

    @Override
    public News updateNews(String token, News newNews) throws Exception{
        Session session = sessionRepository.findByToken(token);
        if (session != null) {
            News news = newsRepository.findOne(newNews.getId());
            if(news !=null){
                news.setTitle(newNews.getTitle());
                news.setBody(newNews.getBody());
                news.setDate(newNews.getDate());
                return news;
            }
            throw new Exception("news not found");
        }
        throw new Exception("unauthorized");
    }

    @Override
    public News findNewsById(Long id){
        return newsRepository.findOne(id);
    }

    //end ews


    //RecyclingSack
    @Override
    public RecyclingSack createRecyclingSack(String token, RecyclingSack recyclingsack) throws Exception{
        Session session = sessionRepository.findByToken(token);
        if(session!=null) {
            return recyclingsackRepository.save(recyclingsack);
        }
        throw new Exception("unauthorized");
    }

    @Override
    public RecyclingSack updateRecyclingSack(String token, RecyclingSack newRecyclingsack) throws Exception{
        Session session = sessionRepository.findByToken(token);
        if (session != null) {
           RecyclingSack recyclingsack= recyclingsackRepository.findOne(newRecyclingsack.getId());
           if (recyclingsack!=null){
               recyclingsack.setWastecategory(newRecyclingsack.getWastecategory());
               recyclingsack.setIcon(newRecyclingsack.getIcon());
               recyclingsack.setColor(newRecyclingsack.getColor());
               return recyclingsack;
           }
            throw new Exception("recycling sack not found");
        }
        throw new Exception("unauthorized");
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
    public void deleteRecyclingSack(String token, Long id) throws Exception{
        Session session = sessionRepository.findByToken(token);
        if (session != null) {
            recyclingsackRepository.delete(id);
            return;
            }
        throw new Exception("unauthorized");
    }
    //end RecyclingSack

    //SpecialWaste
    @Override
    public SpecialWaste createSpecialWaste(String token, SpecialWaste specialwaste) throws Exception{
        Session session = sessionRepository.findByToken(token);
        if(session!=null) {
            return specialwasteRepository.save(specialwaste);
        }
        throw new Exception("unauthorized");
    }

    @Override
    public SpecialWaste updateSpecialWaste(String token, SpecialWaste newSpecialwaste) throws Exception{
        Session session = sessionRepository.findByToken(token);
        if (session != null) {
            SpecialWaste specialwaste= specialwasteRepository.findOne(newSpecialwaste.getId());
            if (specialwaste!=null){
                specialwaste.setDescription(newSpecialwaste.getDescription());
                specialwaste.setName(newSpecialwaste.getName());
                return specialwaste;
            }
            throw new Exception("special waste not found");
        }
        throw new Exception("unauthorized");
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
    public void deleteSpecialWaste(String token, Long id) throws Exception{
        Session session = sessionRepository.findByToken(token);
        if (session != null) {
            specialwasteRepository.delete(id);
            return;
        }
        throw new Exception("unauthorized");
    }
    //end SpecialWaste

    //collectionPoint
    @Override
    public CollectionPoint createCollectionPoint(String token, CollectionPoint collectionPoint)throws Exception{
        Session session = sessionRepository.findByToken(token);
        if(session!=null) {
            return collectionPointRepository.save(collectionPoint);
        }
        throw new Exception("unauthorized");
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
    public void deleteCollectionPoint(String token, Long id)throws Exception{
        Session session =sessionRepository.findByToken(token);
        if(session!=null){
            collectionPointRepository.delete(id);
            return;
        }
        throw new Exception("unauthorized");
    }

    @Override
    public CollectionPoint updateCollectionPoint(String token, CollectionPoint newCollectionpoint)throws Exception{
        Session session = sessionRepository.findByToken(token);
        if (session != null) {
            CollectionPoint collectionPoint= collectionPointRepository.findOne(newCollectionpoint.getId());
            if (collectionPoint!=null){
                collectionPoint.setLatitude(newCollectionpoint.getLatitude());
                collectionPoint.setLongitude(newCollectionpoint.getLongitude());
                collectionPoint.setSpecialwaste(newCollectionpoint.getSpecialwaste());
                return collectionPoint;
            }
            throw new Exception("collection point not found");
        }
        throw new Exception("unauthorized");
    }

    //end collectionPoint

    //START: Calendar
    @Override
    public Calendar createCalendar(String token, Calendar calendar)throws Exception {
        Session session = sessionRepository.findByToken(token);
        if(session!=null) {
            return calendarRepository.save(calendar);
        }
        throw new Exception("unauthorized");
    }

    @Override
    public Calendar updateCalendar(String token, Calendar newCalendar) throws Exception{
        Session session = sessionRepository.findByToken(token);
        if (session != null) {
            Calendar calendar=calendarRepository.findOne(newCalendar.getId());
            if (calendar!=null){
                calendar.setWastecategory(newCalendar.getWastecategory());
                calendar.setDay(newCalendar.getDay());
                return calendar;
            }
            throw new Exception("calendar not found");
        }
        throw new Exception("unauthorized");
    }


    @Override
    public List<Calendar> findAllCalendars(){
        return calendarRepository.findAll();
    }

    @Override
    public List<Calendar> findAllCalendarsAfterDate(Date d) throws Exception{
        System.out.println(d);
        return calendarRepository.findCalendarsByDayGreaterThanEqualOrderByDay(d);

    }

    @Override
    public List<Calendar> findAllCalendarsBetween(Date start, Date end) throws Exception{
        return calendarRepository.findCalendarsByDayGreaterThanEqualAndDayLessThanEqualOrderByDay(start, end);

    }

    @Override
    public Calendar findCalendarById(Long id){
        return calendarRepository.findOne(id);
    }

    @Override
    public void deleteCalendar(String token, Long id) throws Exception{
        Session session = sessionRepository.findByToken(token);
        if (session != null) {
            calendarRepository.delete(id);
            return;
        }
        throw new Exception("unauthorized");
    }
    //END: Calendar


    //START:WasteCategory
    @Override
    public WasteCategory createWasteCategory(String token, WasteCategory wastecategory) throws Exception{
        Session session = sessionRepository.findByToken(token);
        if(session!=null) {
            return wastecategoryRepository.save(wastecategory);
        }
        throw new Exception("unauthorized");
    }

    @Override
    public WasteCategory updateWasteCategory(String token, WasteCategory newWasteCategory) throws Exception{
        Session session = sessionRepository.findByToken(token);
        if (session != null) {
            WasteCategory wastecategory= wastecategoryRepository.findOne(newWasteCategory.getId());
            if (wastecategory!=null){
                wastecategory.setDescription(newWasteCategory.getDescription());
                wastecategory.setIcon(newWasteCategory.getIcon());
                wastecategory.setName(newWasteCategory.getName());
                return wastecategory;
            }
            throw new Exception("waste category not found");
        }
        throw new Exception("unauthorized");
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
    public void deleteWasteCategory(String token, Long id) throws Exception{
        Session session = sessionRepository.findByToken(token);
        if (session != null) {
            wastecategoryRepository.delete(id);
            return;
        }
        throw new Exception("unauthorized");
    }
    //END: WsateCategory

}
