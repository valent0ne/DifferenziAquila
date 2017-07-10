package it.univaq.disim.mobile.differenziaquila.web;

import it.univaq.disim.mobile.differenziaquila.business.DifferenziAquilaService;
import it.univaq.disim.mobile.differenziaquila.business.domain.RecyclingSackRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/recyclingsackrequest")
public class RecyclingSackRequestController {

    @Autowired
    private DifferenziAquilaService service;

    @PostMapping("/{token}/{id}")
    public Response createRecyclingSackRequest(@RequestBody RecyclingSackRequest r,
                                               @PathVariable(value = "token") String token,
                                               @PathVariable(value = "id") Long id) throws Exception {
        RecyclingSackRequest rsr = service.createRecyclingSackRequest(r, token, id);
        Response<RecyclingSackRequest> response = new Response<>(true, "recycling sacks request created");
        response.setData(rsr);
        return response;
    }
}
