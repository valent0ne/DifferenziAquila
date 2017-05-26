package it.univaq.disim.mobile.differenziaquila.web;

import it.univaq.disim.mobile.differenziaquila.business.DifferenziAquilaService;
import it.univaq.disim.mobile.differenziaquila.business.domain.News;
import it.univaq.disim.mobile.differenziaquila.business.domain.SpecialWaste;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/specialwaste")
public class SpecialWasteController {

    @Autowired
    private DifferenziAquilaService service;


    @PostMapping("/{token}")
    public Response createSpecialWaste(@RequestBody SpecialWaste specialwaste, @PathVariable(value = "token") String token) {
        service.createSpecialWaste(token, specialwaste);
        Response<SpecialWaste> response = new Response<>(true, "special waste created ");
        response.setData(specialwaste);
        return  response;
    }

    @PutMapping("/{token}")
    public Response updateSpecialWaste(@RequestBody SpecialWaste specialwaste, @PathVariable(value="token") String token, @PathVariable(value="id") Long id) {
        specialwaste.setId(id);
        SpecialWaste s = service.updateSpecialWaste(token, specialwaste);
        Response<SpecialWaste> response = new Response<>(true, "special waste updated");
        response.setData(s);
        return  response;
    }

    @GetMapping("/")
    public Response findAllSpecialWastes() {
        List<SpecialWaste> specialwastes = service.findAllSpecialWastes();
        Response<List<SpecialWaste>> response = new Response<>(true, "all recycling sacks");
        response.setData(specialwastes);
        return response;
    }

    @GetMapping("/{id}")
    public Response findSpecialWasteById(@PathVariable(value = "id") Long id) {
        SpecialWaste specialwaste = service.findSpecialWasteById(id);
        Response<SpecialWaste> response = new Response<>(true, "recycling sack by id");
        response.setData(specialwaste);
        return response;
    }

    @DeleteMapping("/{token}/{id}")
    public Response deleteSpecialWaste(@PathVariable(value = "token") String token, @PathVariable(value = "id") Long id) {
        service.deleteSpecialWaste(token, id);
        Response<Object> response = new Response<>(true, "recycling sack deleted");
        return response;
    }


}
