package it.univaq.disim.mobile.differenziaquila.web;

import it.univaq.disim.mobile.differenziaquila.business.DifferenziAquilaService;
import it.univaq.disim.mobile.differenziaquila.business.domain.Calendar;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/api/calendar")
public class CalendarController {

    @Autowired
    private DifferenziAquilaService service;

    @PostMapping("/{token}")
    public Response createCalendar(@RequestBody Calendar calendar, @PathVariable(value = "token") String token)throws Exception{
        service.createCalendar(token, calendar);
        Response<Calendar> response=new Response<>(true, "calendar creared");
        response.setData(calendar);
        return response;
    }

    @PutMapping("/{token}/{id}")
    public Response updateCalendar(@RequestBody Calendar calendar, @PathVariable(value="token") String token, @PathVariable(value="id") Long id) throws Exception{
        calendar.setId(id);
        Calendar c=service.updateCalendar(token, calendar);
        Response<Calendar> response=new Response<>(true, "calendar updated");
        response.setData(c);
        return response;
    }


    @GetMapping("/after/{date}")
    public Response findAllCalendarsAfterDate( @PathVariable(value="date") String date) throws Exception{
        DateFormat df = new SimpleDateFormat("yyyy-MM-dd");
        List<Calendar> calendars= service.findAllCalendarsAfterDate(df.parse(date));
        Response<List<Calendar>> response= new Response<>(true, "all calendars after "+date);
        response.setData(calendars);
        return response;
    }

    @GetMapping("/from/{start}/to/{end}")
    public Response findAllCalendarsBetween( @PathVariable(value="start") String start, @PathVariable(value="end") String end) throws Exception{
        DateFormat df = new SimpleDateFormat("yyyy-MM-dd");
        List<Calendar> calendars= service.findAllCalendarsBetween(df.parse(start), df.parse(end));
        Response<List<Calendar>> response= new Response<>(true, "all calendars between "+start+" and "+end);
        response.setData(calendars);
        return response;
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
        Response<Calendar> response= new Response<>(true, "calendar by id");
        response.setData(calendar);
        return response;
    }

    @DeleteMapping ("/{token}/{id}")
    public Response deleteCalendar(@PathVariable(value="token") String token,@PathVariable(value="id") Long id)throws Exception {
        service.deleteCalendar(token, id);
        Response<Object> response = new Response<>(true, "calendar deleted");
        return response;
    }
}
