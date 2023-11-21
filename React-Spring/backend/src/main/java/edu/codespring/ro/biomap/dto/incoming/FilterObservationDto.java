package edu.codespring.ro.biomap.dto.incoming;

import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;
import java.util.List;

@Data
public class FilterObservationDto {

    private List<String> speciesList;

    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
    private LocalDate dateFrom;

    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
    private LocalDate dateTo;

    private Integer monthFrom;

    private Integer monthTo;

    // this field is either a polygon or a point with two coordinates and a radius
    private List<Double> coordinates;

    private Double radius;

}
