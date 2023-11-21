package edu.codespring.ro.biomap.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

public class ObmUserDetails implements UserDetails {

    private final Integer id;
    private final String username;
    @JsonIgnore
    private final String password;
    private final String email;
    private Boolean active;
    private final Collection<? extends GrantedAuthority> authorities;

    public ObmUserDetails(Integer id, String username, String password, String email, Boolean active,
                          Collection<? extends GrantedAuthority> authorities) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.email = email;
        this.active = active;
        this.authorities = authorities;
    }

    public static ObmUserDetails build(User user) {
        List<GrantedAuthority> authorities = Stream.of(user.getRole())
                .map(role -> new SimpleGrantedAuthority(role.name()))
                .collect(Collectors.toList());

        return new ObmUserDetails(
                user.getUserId(),
                user.getUsername(),
                user.getPassword(),
                user.getEmail(),
                true,
                authorities);
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    public Integer getId() {
        return id;
    }

    public String getEmail() {
        return email;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return username;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
