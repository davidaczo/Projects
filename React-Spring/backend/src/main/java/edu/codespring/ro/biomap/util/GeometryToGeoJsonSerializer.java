package edu.codespring.ro.biomap.util;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;
import org.locationtech.jts.geom.Geometry;

import java.io.IOException;

public class GeometryToGeoJsonSerializer extends JsonSerializer<Geometry> {

    @Override
    public void serialize(Geometry value, JsonGenerator gen, SerializerProvider serializers) throws IOException {
        StringBuilder jsonValue = new StringBuilder("{");
        try {
            jsonValue.append("\"type\":\"").append(value.getGeometryType());
            jsonValue.append("\", \"coordinates\": [");
            int n = value.getCoordinates().length;
            for (int i = 0; i < n; i++) {
                jsonValue.append(String.format("{ \"x\": %s, \"y\": %s }",
                        value.getCoordinates()[i].x, value.getCoordinates()[i].y));
                if (i != n - 1) {
                    jsonValue.append(", ");
                }
            }
            jsonValue.append("]}");
        } catch (Exception e) {
            throw new IOException();
        }

        gen.writeString(jsonValue.toString());
    }
}
