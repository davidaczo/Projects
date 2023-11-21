package edu.codespring.ro.biomap.repository;

import edu.codespring.ro.biomap.dto.incoming.FilterObservationDto;
import edu.codespring.ro.biomap.model.Observation;
import edu.codespring.ro.biomap.util.WktBuilder;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.locationtech.jts.geom.Geometry;
import org.locationtech.jts.io.ParseException;
import org.locationtech.jts.io.WKTReader;
import org.springframework.stereotype.Repository;
import org.springframework.util.CollectionUtils;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Objects;
import javax.persistence.EntityManager;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Expression;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

@Repository
@RequiredArgsConstructor
@Slf4j
public class ObservationDao {

    private final EntityManager entityManager;
    private final WktBuilder wktBuilder;

    public List<Observation> filter(FilterObservationDto filterObservationDto) {
        CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();
        CriteriaQuery<Observation> observationCriteriaQuery = criteriaBuilder.createQuery(Observation.class);
        Root<Observation> root = observationCriteriaQuery.from(Observation.class);

        observationCriteriaQuery.select(root);

        Predicate speciesPredicate = null;
        Predicate datePredicate = null;
        Predicate geomPredicate = null;

        if (!CollectionUtils.isEmpty(filterObservationDto.getSpeciesList())) {
            List<Predicate> predicates = new ArrayList<>();
            for (String searchedName : filterObservationDto.getSpeciesList()) {
                predicates.add(
                        criteriaBuilder.or(
                            criteriaBuilder.equal(
                                root.get("species").get("nameCommon"),
                                searchedName
                            ),
                            criteriaBuilder.equal(
                                root.get("species").get("nameLatin"),
                                searchedName
                            )
                        )
                );
            }
            speciesPredicate = criteriaBuilder.or(predicates.toArray(new Predicate[] {}));
        }

        if (filterObservationDto.getDateFrom() != null && filterObservationDto.getDateTo() == null) {
            LocalDate date = filterObservationDto.getDateFrom();
            datePredicate = criteriaBuilder.equal(
              root.get("date"),
              filterObservationDto.getDateFrom()
            );
        } else if (filterObservationDto.getDateFrom() != null && filterObservationDto.getDateTo() != null) {
            datePredicate = criteriaBuilder.between(root.get("date"),
                    filterObservationDto.getDateFrom(), filterObservationDto.getDateTo());
        } else if (filterObservationDto.getMonthFrom() != null && filterObservationDto.getMonthTo() != null) {
            Expression<Boolean> exprFrom = criteriaBuilder.ge(
                    criteriaBuilder.function(
                            "DATE_PART",
                            Integer.class,
                            criteriaBuilder.literal("doy"),
                            root.get("date")
                    ),
                    filterObservationDto.getMonthFrom()
            );
            Expression<Boolean> exprTo = criteriaBuilder.le(
                    criteriaBuilder.function(
                            "DATE_PART",
                            Integer.class,
                            criteriaBuilder.literal("doy"),
                            root.get("date")
                    ),
                    filterObservationDto.getMonthTo()
            );
            /// we need to consider that we may get an interval like this --> december to march
            if (filterObservationDto.getMonthFrom() > filterObservationDto.getMonthTo()) {
                datePredicate = criteriaBuilder.or(exprFrom, exprTo);
            } else {
                datePredicate = criteriaBuilder.and(exprFrom, exprTo);
            }

        }

        if (filterObservationDto.getCoordinates() != null) {
            if (filterObservationDto.getCoordinates().size() == 2) {
                String point = wktBuilder.geometryToWktString("POINT", filterObservationDto.getCoordinates());
                Double radius = 0.0;
                if (filterObservationDto.getRadius() != null) {
                    radius = filterObservationDto.getRadius();
                }
                try {
                    Geometry geometry = new WKTReader().read(point);
                    geomPredicate = criteriaBuilder.isTrue(
                            criteriaBuilder.function(
                                    "ST_dwithin",
                                    Boolean.class,
                                    root.get("geometry"),
                                    criteriaBuilder.literal(geometry),
                                    criteriaBuilder.literal(radius)
                            )
                    );
                } catch (ParseException e) {
                    log.error(e.getMessage());
                }
            } else {
                String polygon = wktBuilder
                        .geometryToWktString("POLYGON", filterObservationDto.getCoordinates());
                try {
                    log.info(polygon);
                    Geometry geometry = new WKTReader().read(polygon);
                    geomPredicate = criteriaBuilder.isTrue(
                            criteriaBuilder.function(
                                    "ST_Contains",
                                    Boolean.class,
                                    criteriaBuilder.literal(geometry),
                                    root.get("geometry")
                            )
                    );
                } catch (ParseException e) {
                    log.error(e.getMessage());
                }
            }
        }

        Predicate finalPredicate;
        finalPredicate = mergePredicates(
                criteriaBuilder, Arrays.asList(speciesPredicate, datePredicate, geomPredicate)
        );
        if (finalPredicate != null) {
            observationCriteriaQuery.where(criteriaBuilder.and(
                    criteriaBuilder.isTrue(root.get("active")),
                    finalPredicate
                    )
            );
        } else {
            observationCriteriaQuery.where(criteriaBuilder.isTrue(root.get("active")));
        }

        return entityManager.createQuery(observationCriteriaQuery).getResultList();
    }

    public static Predicate mergePredicates(
            CriteriaBuilder criteriaBuilder,
            List<Predicate> predicates  // list parameter in case we want to add more filters down the line
    ) {
        Predicate truePredicate = criteriaBuilder.isTrue(criteriaBuilder.literal(true));
        return predicates.stream()
                .filter(Objects::nonNull)
                .reduce(truePredicate, (criteriaBuilder::and));
    }

}
