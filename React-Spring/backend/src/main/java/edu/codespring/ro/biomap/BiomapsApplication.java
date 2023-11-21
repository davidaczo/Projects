package edu.codespring.ro.biomap;

import edu.codespring.ro.biomap.repository.UserRepository;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
public class BiomapsApplication {

    public static void main(String[] args) {
        SpringApplication.run(BiomapsApplication.class, args);
    }

}
