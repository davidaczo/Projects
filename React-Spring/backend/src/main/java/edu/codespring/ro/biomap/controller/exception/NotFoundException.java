package edu.codespring.ro.biomap.controller.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class NotFoundException extends RuntimeException {

    Integer requestedId;

    public NotFoundException() {
        super();
    }

    public NotFoundException(Integer id) {
        super();
        requestedId = id;
    }

    public Integer getRequestedId() {
        return requestedId;
    }
}
