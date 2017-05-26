package it.univaq.disim.mobile.differenziaquila.web;

import it.univaq.disim.mobile.differenziaquila.business.DifferenziAquilaService;
import it.univaq.disim.mobile.differenziaquila.business.domain.News;
import it.univaq.disim.mobile.differenziaquila.business.domain.Session;
import it.univaq.disim.mobile.differenziaquila.business.domain.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/api/news")
public class NewsController {

    @Autowired
    private DifferenziAquilaService service;

    @GetMapping("/")
    public Response findAllNews() {
        List<News> news = service.findAllNews();
        Response<List<News>> response = new Response<>(true, "all news");
        response.setData(news);
        return response;

    }

    @PostMapping("/{token}")
    public Response createNews(@RequestBody News news, @PathVariable String token) {
        service.createNews(token, news);
        return Response.DEFAULT_RESPONSE_OK;
    }

    @PutMapping("/{token}/{id}")
    public Response updateNews(@PathVariable(value = "token") String token, @PathVariable(value = "id") Long id, @RequestBody News news) {
        news.setId(id);
        News newNews = service.updateNews(token, news);
        Response<News> response = new Response<>(true, "news updated");
        response.setData(newNews);
        return response;
    }

    @DeleteMapping("/{token}/{id}")
    public Response deleteNews(@PathVariable(value = "token") String token, @PathVariable(value = "id") Long id) {
        service.deleteNews(token, id);
        Response<Object> response = new Response<>(true, "news deleted");
        return response;
    }

    @GetMapping("/{id}")
    public Response findNewsById(@PathVariable Long id){
        News news = service.findNewsById(id);
        Response<News> response = new Response<>(true, "news by id");
        response.setData(news);
        return response;
    }


}
