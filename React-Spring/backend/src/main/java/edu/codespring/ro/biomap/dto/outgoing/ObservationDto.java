package edu.codespring.ro.biomap.dto.outgoing;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import edu.codespring.ro.biomap.model.Developement;
import edu.codespring.ro.biomap.model.File;
import edu.codespring.ro.biomap.model.Location;
import edu.codespring.ro.biomap.model.Species;
import edu.codespring.ro.biomap.model.Status;
import edu.codespring.ro.biomap.model.User;
import edu.codespring.ro.biomap.util.GeometryToGeoJsonSerializer;
import lombok.Data;
import org.locationtech.jts.geom.Geometry;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Data
public class ObservationDto {
    private Integer observationId;

    private Species species;

    private User uploader;

    private Location location;

    private List<File> file;

    private Developement development;

    private LocalDate date;

    private LocalTime time;

    @JsonSerialize(using = GeometryToGeoJsonSerializer.class)
    private Geometry geometry;

    private Status status;

    private Developement developement;

    private String comment;

    private Integer number;

}
