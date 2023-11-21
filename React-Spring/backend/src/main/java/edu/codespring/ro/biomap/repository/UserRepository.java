package edu.codespring.ro.biomap.repository;

import edu.codespring.ro.biomap.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Integer> {

    List<User> findUsersByActiveIsTrue();

    User findUserByEmail(String email);

    Optional<User> findUserByUsername(String username);

    Boolean existsByUsername(String username);

}
