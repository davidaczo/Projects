package edu.codespring.ro.biomap.service;

import edu.codespring.ro.biomap.controller.exception.BadRequestException;
import edu.codespring.ro.biomap.controller.exception.NotFoundException;
import edu.codespring.ro.biomap.model.User;
import edu.codespring.ro.biomap.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@RequiredArgsConstructor
@Service
public class UserService {

    private final UserRepository userRepository;

    public User create(User user) {
        if (userRepository.findUserByUsername(user.getUsername()) == null
                && userRepository.findUserByEmail(user.getEmail()) == null) {
            user.setActive(true);
            return userRepository.save(user);
        } else {
            throw new BadRequestException("Username or email already exists!");
        }
    }

    public User update(User user) {
        return userRepository.save(user);
    }

    public void delete(Integer id) {
        if (userRepository.existsById(id)) {
            User user = userRepository.getById(id);
            user.setActive(false);
            userRepository.save(user);
        }
    }

    public List<User> findAll() {
        return userRepository.findUsersByActiveIsTrue();
    }

    public User findById(Integer id) {
        if (userRepository.existsById(id)) {
            User user = userRepository.getById(id);
            if (user.getActive()) {
                return user;
            } else {
                throw new NotFoundException();
            }
        } else {
            throw new NotFoundException();
        }
    }

    public User findByUsername(String username) {
        if (userRepository.existsByUsername(username)) {
            User user = userRepository.findUserByUsername(username).orElseThrow(NotFoundException::new);
            if (user.getActive()) {
                return user;
            } else {
                throw new NotFoundException();
            }
        } else {
            throw new NotFoundException();
        }
    }

}
