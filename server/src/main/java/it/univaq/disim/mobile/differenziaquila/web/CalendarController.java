package it.univaq.disim.mobile.differenziaquila.web;

import it.univaq.disim.mobile.differenziaquila.business.DifferenziAquilaService;
import it.univaq.disim.mobile.differenziaquila.business.domain.Calendar;
import it.univaq.disim.mobile.differenziaquila.business.domain.WasteCategory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/calendar")
public class CalendarController {

    @Autowired
    private DifferenziAquilaService service;

    @PostMapping("/")
    public Response createCalendar(@RequestBody Calendar calendar){
        service.createCalendar(calendar);
        return Response.DEFAULT_RESPONSE_OK;
    }

    @PutMapping("/{token}")
    public Response updateCalendar(@RequestBody Calendar calendar, @PathVariable String token) {
        service.updateCalendar(token, calendar);
        return Response.DEFAULT_RESPONSE_OK;
    }

    @GetMapping("/")
    public Response findAllCalendars(){
        List<Calendar> calendars= service.findAllCalendars();
        Response<List<Calendar>> response= new Response<>(true, "all calendars");
        response.setData(calendars);
        return response;
    }

    @GetMapping ("/{id}")
    public Response findCalendarById(@PathVariable(value="id") Long id){
        Calendar calendar= service.findCalendarById(id);
        Response<Calendar> response= new Response<>(true, "find calendar by id");
        response.setData(calendar);
        return response;
    }

    @DeleteMapping ("/{token}/{id}")
    public Response deleteCalendar(@PathVariable(value="token") String token,@PathVariable(value="id") Long id) {
        service.deleteCalendar(token, id);
        Response<Object> response = new Response<>(true, "calendar deleted");
        return response;
    }
}
