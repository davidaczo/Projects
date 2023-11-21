package edu.codespring.ro.biomap.util;

import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class WktBuilder {

    public String geometryToWktString(String type, List<Double> coordinates) {
        StringBuilder wkt = new StringBuilder(type + "(");
        if ("POLYGON".equals(type)) {
            wkt.append("(");
        }
        int n = coordinates.size();
        for (int i = 0; i < n - 1; i += 2) {
            wkt.append(coordinates.get(i).toString()).append(" ").append(coordinates.get(i + 1).toString());
            if (i < n - 2) {
                wkt.append(",");
            } else {
                wkt.append(")");
                if ("POLYGON".equals(type)) {
                    wkt.append(")");
                }
            }
        }
        return wkt.toString();
    }

}
