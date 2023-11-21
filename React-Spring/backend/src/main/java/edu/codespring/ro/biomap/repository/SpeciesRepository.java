package edu.codespring.ro.biomap.repository;

import edu.codespring.ro.biomap.model.Species;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Collection;
import java.util.List;

public interface SpeciesRepository extends JpaRepository<Species, Integer> {
    
    @Query(value = "SELECT s.nameCommon from Species s where lower(s.nameCommon) like lower(concat(:search, '%') )")
    public List<String> findSpeciesByNameCommonStartingWith(@Param("search") String search);

    @Query(value = "SELECT s.nameLatin from Species s where lower(s.nameLatin) like lower(concat(:search, '%') )")
    public List<String> findSpeciesByNameLatinStartingWith(@Param("search") String search);

    @Query(value = "SELECT s from Species s where lower(s.nameCommon) like lower(concat(:search, '%') )")
    public List<Species> findAllSpeciesByNameCommon(@Param("search") String search);

}
