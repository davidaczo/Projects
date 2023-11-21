package edu.codespring.ro.biomap.repository;

import edu.codespring.ro.biomap.model.File;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FileRepository extends JpaRepository<File, Integer> {
}
