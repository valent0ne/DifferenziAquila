package it.univaq.disim.mobile.differenziaquila.web;

import it.univaq.disim.mobile.differenziaquila.business.DifferenziAquilaService;
import it.univaq.disim.mobile.differenziaquila.business.domain.SpecialWasteRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/specialwasterequest")
public class SpecialWasteRequestController {

    @Autowired
    private DifferenziAquilaService service;

    @PostMapping("/{token}/{id}")
    public Response createSpecialWasteRequest(@RequestBody SpecialWasteRequest s,
                                               @PathVariable(value = "token") String token,
                                               @PathVariable(value = "id") Long id) throws Exception {
        SpecialWasteRequest swr = service.createSpecialWasteRequest(s, token, id);
        Response<SpecialWasteRequest> response = new Response<>(true, "special waste request created");
        response.setData(swr);
        return response;
    }
}
