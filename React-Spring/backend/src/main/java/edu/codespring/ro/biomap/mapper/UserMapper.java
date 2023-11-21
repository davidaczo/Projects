package edu.codespring.ro.biomap.mapper;

import edu.codespring.ro.biomap.dto.incoming.CreationUserDto;
import edu.codespring.ro.biomap.dto.incoming.UpdateUserDto;
import edu.codespring.ro.biomap.dto.outgoing.UserDto;
import edu.codespring.ro.biomap.model.User;
import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;

import java.util.List;

@Mapper(componentModel = "spring")
public abstract class UserMapper {

    public abstract UserDto modelToDto(User user);

    public abstract List<UserDto> modelsToDtos(List<User> users);

    public abstract User creationDtoToModel(CreationUserDto creationUserDto);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    public abstract User updateDtoToModel(UpdateUserDto updateUserDto, @MappingTarget User user);

}
