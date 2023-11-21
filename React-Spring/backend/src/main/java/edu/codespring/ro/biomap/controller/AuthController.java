package edu.codespring.ro.biomap.controller;

import edu.codespring.ro.biomap.controller.exception.BadRequestException;
import edu.codespring.ro.biomap.dto.incoming.RequestAuthentificationDto;
import edu.codespring.ro.biomap.service.ObmUserDetailsService;
import edu.codespring.ro.biomap.util.JwtUtil;
import edu.codespring.ro.biomap.util.ProjectConstants;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private ObmUserDetailsService obmUserDetailsService;

    @Autowired
    private Environment environment;

    @Autowired
    private ProjectConstants projectConstants;

    @PostMapping("/login")
    public void authenticateUser(@RequestBody RequestAuthentificationDto authentificationDto,
                                   HttpServletResponse response) {
        log.info(authentificationDto.toString());
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            authentificationDto.getUsername(),
                            authentificationDto.getPassword()
                    )
            );
        } catch (AuthenticationException e) {
            throw new BadRequestException("Wrong username or password!");
        }

        UserDetails userDetails = obmUserDetailsService.loadUserByUsername(authentificationDto.getUsername());

        jwtUtil.generateSecret(20);
        String jwt = jwtUtil.generateToken(userDetails);
        Cookie cookie = new Cookie(projectConstants.getCookieName(), jwt);
        cookie.setMaxAge(60 * 60);
        cookie.setHttpOnly(true);
        cookie.setSecure(!environment.getActiveProfiles()[0].equals("dev"));
        response.addCookie(cookie);
    }

}
