package it.univaq.disim.mobile.differenziaquila.web;

import it.univaq.disim.mobile.differenziaquila.business.DifferenziAquilaService;
import it.univaq.disim.mobile.differenziaquila.business.domain.RecyclingSack;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/recyclyngsack")
public class RecyclingSackController {

    @Autowired
    private DifferenziAquilaService service;

    @PostMapping ("/")
    public Response createRecyclingSack(@RequestBody RecyclingSack recyclingsack){
        service.createRecyclingSack(recyclingsack);
        return Response.DEFAULT_RESPONSE_OK;
    }

    @PutMapping("/{token}")
    public Response updateRecyclingSack(@RequestBody RecyclingSack recyclingsack, @PathVariable String token) {
        service.updateRecyclingSack(token, recyclingsack);
        return Response.DEFAULT_RESPONSE_OK;
    }

    @GetMapping ("/")
    public Response findAllRecyclingSacks(){
        List<RecyclingSack> recyclingsacks= service.findAllRecyclingSacks();
        Response<List<RecyclingSack>> response= new Response<>(true, "all recycling sacks");
        response.setData(recyclingsacks);
        return response;
    }

    @GetMapping ("/{id}")
    public Response findRecyclingSackById(@PathVariable(value="id") Long id){
        RecyclingSack recyclingsack= service.findRecyclingSackById(id);
        Response<RecyclingSack> response= new Response<>(true, "find recycling sack by id");
        response.setData(recyclingsack);
        return response;
    }

    @DeleteMapping ("/{token}/{id}")
    public Response deleteRecyclingSack(@PathVariable(value="token") String token,@PathVariable(value="id") Long id) {
        service.deleteRecyclingSack(token, id);
        Response<Object> response = new Response<>(true, "recycling sack deleted");
        return response;
    }
}
