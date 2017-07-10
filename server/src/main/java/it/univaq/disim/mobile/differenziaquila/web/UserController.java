package it.univaq.disim.mobile.differenziaquila.web;

import it.univaq.disim.mobile.differenziaquila.business.DifferenziAquilaService;
import it.univaq.disim.mobile.differenziaquila.business.domain.RecyclingSackRequest;
import it.univaq.disim.mobile.differenziaquila.business.domain.Session;
import it.univaq.disim.mobile.differenziaquila.business.domain.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class UserController {

    @Autowired
    private DifferenziAquilaService service;


    @PostMapping("/login")
    public Response login(@RequestBody User u) throws Exception {
        Session session = service.login(u.getClientcode());
        if (session != null) {
            Response<Login> result = new Response<>(true, Response.DEFAULT_RESPONSE_OK.getMessage());
            Login login = new Login();
            login.setToken(session.getToken());
            login.setClientcode(session.getUser().getClientcode());
            login.setFirstname(session.getUser().getFirstname());
            login.setLastname(session.getUser().getLastname());
            login.setAddress(session.getUser().getAddress());
            result.setData(login);
            return result;
        } else {
            return Response.DEFAULT_RESPONSE_KO;
        }

    }

    @GetMapping("/logout/{token}")
    public Response logout(@PathVariable(value = "token") String token) throws Exception {
        service.logout(token);
        return Response.DEFAULT_RESPONSE_OK;
    }

    @PostMapping("/users")
    public Response createUser(@RequestBody User user) {
        service.createUser(user);
        Response<User> response = new Response<>(true, "user created");
        response.setData(user);
        return response;
    }

    @PutMapping("/users/{token}")
    public Response updateUser(@RequestBody User user, @PathVariable(value = "token") String token) throws Exception {
        User newUser = service.updateUser(token, user);
        Response<User> response = new Response<>(true, "user updated");
        response.setData(newUser);
        return response;
    }
}
