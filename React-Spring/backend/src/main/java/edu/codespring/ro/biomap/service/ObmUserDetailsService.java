package edu.codespring.ro.biomap.service;

import edu.codespring.ro.biomap.model.ObmUserDetails;
import edu.codespring.ro.biomap.model.User;
import edu.codespring.ro.biomap.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class ObmUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findUserByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User Not Found with username: " + username));
        return ObmUserDetails.build(user);
    }

    public Boolean existsByUsername(String username) throws UsernameNotFoundException {
        return userRepository.existsByUsername(username);
    }
}
