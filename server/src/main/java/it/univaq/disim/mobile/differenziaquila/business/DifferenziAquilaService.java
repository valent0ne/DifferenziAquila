package it.univaq.disim.mobile.differenziaquila.business;

import it.univaq.disim.mobile.differenziaquila.business.domain.*;

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


    //START: RecyclingSack
    void createRecyclingSack(RecyclingSack recyclingsack);

    RecyclingSack updateRecyclingSack(String token, RecyclingSack recyclingsack);

    List<RecyclingSack> findAllRecyclingSacks();

    RecyclingSack findRecyclingSackById(Long id);

    void deleteRecyclingSack( String token,Long id);
    //END: RecyclingSack


    //START: WasteCategory
    void createWasteCategory(WasteCategory wastecategory);

    WasteCategory updateWasteCategory(String token, WasteCategory wastecategory);

    List<WasteCategory> findAllWasteCategories();

    WasteCategory findWasteCategoryById(Long id);

    void deleteWasteCategory( String token,Long id);
    //END: RecyclingSack

    //START: Calendar
    void createCalendar(Calendar calendar);

    Calendar updateCalendar(String token, Calendar calendar);

    List<Calendar> findAllCalendars();

    Calendar findCalendarById(Long id);

    void deleteCalendar( String token,Long id);
    //END: Calendar
}
