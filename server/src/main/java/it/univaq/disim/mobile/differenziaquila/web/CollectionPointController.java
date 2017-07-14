package it.univaq.disim.mobile.differenziaquila.web;

import it.univaq.disim.mobile.differenziaquila.business.DifferenziAquilaService;
import it.univaq.disim.mobile.differenziaquila.business.domain.CollectionPoint;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


import java.util.List;

@RestController
@RequestMapping("/api/collectionpoint")
public class CollectionPointController {

    @Autowired
    private DifferenziAquilaService service;


    @GetMapping("/")
    public Response findAllCalendars(){
        List<CollectionPoint> cps= service.findAllCollectionPoints();
        Response<List<CollectionPoint>> response= new Response<>(true, "all calendars");
        response.setData(cps);
        return response;
    }

}
