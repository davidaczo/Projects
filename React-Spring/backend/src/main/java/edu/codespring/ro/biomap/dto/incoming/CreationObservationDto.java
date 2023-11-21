package edu.codespring.ro.biomap.dto.incoming;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import edu.codespring.ro.biomap.model.*;
import edu.codespring.ro.biomap.util.GeometryToGeoJsonSerializer;
import lombok.Data;
import org.locationtech.jts.geom.Geometry;
import org.springframework.format.annotation.DateTimeFormat;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Data
public class CreationObservationDto {
    @NotNull
    private Integer speciesId;

    @NotNull
    private Integer uploaderId;

    private Integer locationId;

    private List<Integer> fileIds = null;

    @NotNull
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
    private LocalDate date;

    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
    private LocalTime time;

    @NotEmpty
    private String geometry;

    private Developement developement;

    private Status status;

    private String comment;

    private Integer number;

}
