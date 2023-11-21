package edu.codespring.ro.biomap.dto.outgoing;

import lombok.Data;

@Data
public class SpeciesDto {
    private final Integer speciesId;

    private final String nameLatin;

    private final String nameCommon;

}
