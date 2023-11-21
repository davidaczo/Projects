package edu.codespring.ro.biomap.model;

import com.sun.istack.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import org.locationtech.jts.geom.Geometry;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

import javax.persistence.*;

@Entity
@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "observation")
public class Observation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer observationId;

    @NotNull
    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "speciesId")
    private Species species;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "userId")
    private User uploader;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "locationId")
    private Location location;

    @OneToMany
    @JoinColumn(name = "observationId")
    private List<File> file;

    @Enumerated(EnumType.STRING)
    private Developement development;

    private LocalDate date;

    private LocalTime time;

    private Geometry geometry;

    @Enumerated(EnumType.STRING)
    private Status status;

    private String comment;

    private Integer number;

    private Boolean active;

}
