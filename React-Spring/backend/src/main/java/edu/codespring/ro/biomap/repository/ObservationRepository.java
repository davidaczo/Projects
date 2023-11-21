package edu.codespring.ro.biomap.repository;

import edu.codespring.ro.biomap.model.Observation;
import edu.codespring.ro.biomap.model.Species;
import edu.codespring.ro.biomap.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ObservationRepository extends JpaRepository<Observation, Integer> {

    List<Observation> findObservationsByActiveIsTrue();

    List<Observation> findObservationsByUploaderAndActiveIsTrue(User user);

}
