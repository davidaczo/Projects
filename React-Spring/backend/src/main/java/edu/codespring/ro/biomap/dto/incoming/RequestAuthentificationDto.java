package edu.codespring.ro.biomap.dto.incoming;

import lombok.Data;

@Data
public class RequestAuthentificationDto {
    private String username;
    private String password;
}
