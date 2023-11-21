package edu.codespring.ro.biomap.dto.outgoing;

import edu.codespring.ro.biomap.model.Role;
import lombok.Data;

import java.time.LocalDate;

@Data
public class UserDto {
    private Integer userId;

    private Role role;

    private String username;

    private String firstName;

    private String lastName;

    private String email;

    private LocalDate dateOfBirth;

    private Boolean active;

}
