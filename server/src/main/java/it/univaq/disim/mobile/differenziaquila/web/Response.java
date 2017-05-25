package it.univaq.disim.mobile.differenziaquila.web;

public class Response<R> {

    public static final Response<Object> DEFAULT_RESPONSE_OK = new Response<>(true, "OK");
    public static final Response<Object> DEFAULT_RESPONSE_KO = new Response<>(true, "KO");

    private boolean result;
    private R data;
    private String message;

    public Response() {
    }

    public Response(boolean esit, String message) {
        this.result = esit;
        this.message = message;
    }

    public boolean isResult() {
        return result;
    }

    public void setResult(boolean result) {
        this.result = result;
    }

    public R getData() {
        return data;
    }

    public void setData(R data) {
        this.data = data;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

}
