package edu.codespring.ro.biomap.dto.incoming;

import edu.codespring.ro.biomap.model.*;
import lombok.Data;

import java.util.List;

@Data
public class UpdateObservationDto {
    private Integer speciesId;

    private Integer locationId;

    private List<Integer> fileIds;

    private String development;

    private Status status;

    private String comment;

    private Integer number;

}
