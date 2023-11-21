package edu.codespring.ro.biomap.repository;

import edu.codespring.ro.biomap.model.Location;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface LocationRepository extends JpaRepository<Location, Integer> {

    List<Location> findLocationsByActiveIsTrue();

}
