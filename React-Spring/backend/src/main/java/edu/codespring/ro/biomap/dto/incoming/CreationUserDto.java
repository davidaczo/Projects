package edu.codespring.ro.biomap.dto.incoming;

import edu.codespring.ro.biomap.model.Role;
import lombok.Data;

import java.time.LocalDate;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Data
public class CreationUserDto {

    @NotNull
    private Role role;

    @NotEmpty
    @Size(min = 3, max = 100)
    private String username;

    @NotEmpty
    @Size(min = 2)
    private String firstName;

    @NotEmpty
    @Size(min = 2)
    private String lastName;

    @NotEmpty
    @Email
    private String email;

    @NotEmpty
    private String password;

    @NotNull
    private LocalDate dateOfBirth;

}
