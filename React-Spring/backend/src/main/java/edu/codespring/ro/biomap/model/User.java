package edu.codespring.ro.biomap.model;

import com.sun.istack.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDate;

import javax.persistence.*;

@Entity
@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer userId;

    @Enumerated(EnumType.STRING)
    private Role role;

    @NotNull
    @Column(unique = true)
    private String username;

    private String firstName;

    private String lastName;

    @Column(unique = true)
    private String email;

    @NotNull
    private String password;

    private LocalDate dateOfBirth;

    private Boolean active;

}
