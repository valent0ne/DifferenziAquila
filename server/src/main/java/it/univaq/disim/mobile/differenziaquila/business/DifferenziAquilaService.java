package it.univaq.disim.mobile.differenziaquila.business;

import it.univaq.disim.mobile.differenziaquila.business.domain.*;

import java.util.Date;
import java.util.List;

public interface DifferenziAquilaService {


    Session login(String clientcode)throws Exception;

    void logout(String token)throws Exception;

    //user
    User createUser(User user);

    User updateUser(String token, User user)throws Exception;

    //end user

    //recyclingsackrequest
    RecyclingSackRequest createRecyclingSackRequest(RecyclingSackRequest rsr, String token, Long id) throws Exception;
    //end recyclingsackrequest

    //recyclingsackrequest
    SpecialWasteRequest createSpecialWasteRequest(SpecialWasteRequest swr, String token, Long id) throws Exception;
    //end recyclingsackrequest

    //news
    List<News> findAllNews();

    News createNews(String token, News news) throws Exception;

    void deleteNews(String token, Long id)throws Exception;

    News updateNews (String token, News newNews)throws Exception;

    News findNewsById(Long id);
    //end news

    //RecyclingSack
    RecyclingSack createRecyclingSack(String token, RecyclingSack recyclingsack)throws Exception;

    RecyclingSack updateRecyclingSack(String token, RecyclingSack recyclingsack)throws Exception;

    List<RecyclingSack> findAllRecyclingSacks();

    RecyclingSack findRecyclingSackById(Long id);

    void deleteRecyclingSack( String token,Long id)throws Exception;

    //END: RecyclingSack


    //START: WasteCategory
    WasteCategory createWasteCategory(String token, WasteCategory wastecategory)throws Exception;

    WasteCategory updateWasteCategory(String token, WasteCategory wastecategory)throws Exception;

    List<WasteCategory> findAllWasteCategories();

    WasteCategory findWasteCategoryById(Long id);

    void deleteWasteCategory( String token,Long id)throws Exception;
    //END: RecyclingSack

    //START: Calendar
    Calendar createCalendar(String token, Calendar calendar)throws Exception;

    Calendar updateCalendar(String token, Calendar calendar)throws Exception;

    List<Calendar> findAllCalendars();

    List<Calendar> findAllCalendarsAfterDate(Date d) throws Exception;

    List<Calendar> findAllCalendarsBetween(Date start, Date end) throws Exception;

    Calendar findCalendarById(Long id);

    void deleteCalendar( String token,Long id)throws Exception;
    //END: Calendar


    //SpecialWaste
    SpecialWaste createSpecialWaste(String token, SpecialWaste specialwaste)throws Exception;

    SpecialWaste updateSpecialWaste(String token, SpecialWaste specialwaste)throws Exception;

    List<SpecialWaste> findAllSpecialWastes();

    SpecialWaste findSpecialWasteById(Long id);

    void deleteSpecialWaste(String token, Long id)throws Exception;
    //end SpecialWaste

    //collectionPoint
    CollectionPoint createCollectionPoint(String token, CollectionPoint collectionPoint)throws Exception;

    CollectionPoint updateCollectionPoint(String token, CollectionPoint collectionPoint)throws Exception;

    List<CollectionPoint> findAllCollectionPoints();

    CollectionPoint findCollectionPointById(Long id);

    void deleteCollectionPoint(String token, Long id)throws Exception;
    //end collectionPoint

}
