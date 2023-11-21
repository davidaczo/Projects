package edu.codespring.ro.biomap.security;

import edu.codespring.ro.biomap.service.ObmUserDetailsService;
import edu.codespring.ro.biomap.util.JwtUtil;
import edu.codespring.ro.biomap.util.ProjectConstants;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;
import java.util.Objects;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Slf4j
@Component
public class AuthFilter extends OncePerRequestFilter {

    @Autowired
    private ObmUserDetailsService obmUserDetailsService;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private ProjectConstants projectConstants;

    @Override
    protected void doFilterInternal(
            HttpServletRequest request, HttpServletResponse response, FilterChain filterChain
    ) throws ServletException, IOException {
        if (request.getRequestURI().equals("/login")) {
            filterChain.doFilter(request,response);
            return;
        }

        if (request.getCookies() != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            List<Cookie> cookies = Arrays.asList(request.getCookies());
            Cookie tempCookie = cookies.stream()
                    .filter(cookie -> cookie.getName().equals(
                            projectConstants.getCookieName())).findFirst().orElse(null);
            if (tempCookie != null) {
                String jwt = tempCookie.getValue();
                String username = jwtUtil.extractUsername(jwt);

                if (username != null) {

                    if (obmUserDetailsService.existsByUsername(username)) {
                        UserDetails userDetails = obmUserDetailsService.loadUserByUsername(username);
                        if (jwtUtil.validateToken(jwt)) {
                            UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken =
                                    new UsernamePasswordAuthenticationToken(
                                            userDetails, null, userDetails.getAuthorities()
                                    );
                            usernamePasswordAuthenticationToken
                                    .setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                            SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);
                        }
                    }
                }
            }

        }
        filterChain.doFilter(request, response);
    }
}
