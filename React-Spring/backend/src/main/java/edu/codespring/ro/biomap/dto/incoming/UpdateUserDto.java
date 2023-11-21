package edu.codespring.ro.biomap.dto.incoming;

import com.sun.istack.NotNull;
import edu.codespring.ro.biomap.model.Role;
import lombok.Data;

import java.time.LocalDate;

@Data
public class UpdateUserDto {

    private Role role;

    private String firstName;

    private String lastName;

    private String email;

    private LocalDate dateOfBirth;

}
