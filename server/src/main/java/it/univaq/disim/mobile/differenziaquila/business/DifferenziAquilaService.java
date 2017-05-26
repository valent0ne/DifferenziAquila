package it.univaq.disim.mobile.differenziaquila.business;

import it.univaq.disim.mobile.differenziaquila.business.domain.*;

import java.util.List;

public interface DifferenziAquilaService {


    Session login(String clientcode);

    void logout(String token);

    //user
    void createUser(User user);

    void updateUser(String token, User user);
    //end user

    //news
    List<News> findAllNews();

    News createNews(String token, News news);

    void deleteNews(String token, Long id);

    News updateNews (String token, News newNews);

    News findNewsById(Long id);
    //end news

    //RecyclingSack
    RecyclingSack createRecyclingSack(String token, RecyclingSack recyclingsack);

    RecyclingSack updateRecyclingSack(String token, RecyclingSack recyclingsack);

    List<RecyclingSack> findAllRecyclingSacks();

    RecyclingSack findRecyclingSackById(Long id);

    void deleteRecyclingSack( String token,Long id);

    //END: RecyclingSack


    //START: WasteCategory
    WasteCategory createWasteCategory(String token, WasteCategory wastecategory);

    WasteCategory updateWasteCategory(String token, WasteCategory wastecategory);

    List<WasteCategory> findAllWasteCategories();

    WasteCategory findWasteCategoryById(Long id);

    void deleteWasteCategory( String token,Long id);
    //END: RecyclingSack

    //START: Calendar
    Calendar createCalendar(String token, Calendar calendar);

    Calendar updateCalendar(String token, Calendar calendar);

    List<Calendar> findAllCalendars();

    Calendar findCalendarById(Long id);

    void deleteCalendar( String token,Long id);
    //END: Calendar


    //SpecialWaste
    SpecialWaste createSpecialWaste(String token, SpecialWaste specialwaste);

    SpecialWaste updateSpecialWaste(String token, SpecialWaste specialwaste);

    List<SpecialWaste> findAllSpecialWastes();

    SpecialWaste findSpecialWasteById(Long id);

    void deleteSpecialWaste(String token, Long id);
    //end SpecialWaste

    //collectionPoint
    CollectionPoint createCollectionPoint(String token, CollectionPoint collectionPoint);

    CollectionPoint updateCollectionPoint(String token, CollectionPoint collectionPoint);

    List<CollectionPoint> findAllCollectionPoints();

    CollectionPoint findCollectionPointById(Long id);

    void deleteCollectionPoint(String token, Long id);
    //end collectionPoint

}
