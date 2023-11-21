package edu.codespring.ro.biomap.repository;

import edu.codespring.ro.biomap.model.Country;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CountryRepository extends JpaRepository<Country, Integer> {

}
