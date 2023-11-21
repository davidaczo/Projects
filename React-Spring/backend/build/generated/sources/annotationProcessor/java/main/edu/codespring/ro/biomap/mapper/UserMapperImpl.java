package edu.codespring.ro.biomap.mapper;

import edu.codespring.ro.biomap.dto.incoming.CreationUserDto;
import edu.codespring.ro.biomap.dto.incoming.UpdateUserDto;
import edu.codespring.ro.biomap.dto.outgoing.UserDto;
import edu.codespring.ro.biomap.model.User;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2023-05-18T10:54:08+0300",
    comments = "version: 1.4.2.Final, compiler: IncrementalProcessingEnvironment from gradle-language-java-7.1.1.jar, environment: Java 16.0.2 (Amazon.com Inc.)"
)
@Component
public class UserMapperImpl extends UserMapper {

    @Override
    public UserDto modelToDto(User user) {
        if ( user == null ) {
            return null;
        }

        UserDto userDto = new UserDto();

        userDto.setUserId( user.getUserId() );
        userDto.setRole( user.getRole() );
        userDto.setUsername( user.getUsername() );
        userDto.setFirstName( user.getFirstName() );
        userDto.setLastName( user.getLastName() );
        userDto.setEmail( user.getEmail() );
        userDto.setDateOfBirth( user.getDateOfBirth() );
        userDto.setActive( user.getActive() );

        return userDto;
    }

    @Override
    public List<UserDto> modelsToDtos(List<User> users) {
        if ( users == null ) {
            return null;
        }

        List<UserDto> list = new ArrayList<UserDto>( users.size() );
        for ( User user : users ) {
            list.add( modelToDto( user ) );
        }

        return list;
    }

    @Override
    public User creationDtoToModel(CreationUserDto creationUserDto) {
        if ( creationUserDto == null ) {
            return null;
        }

        User user = new User();

        user.setRole( creationUserDto.getRole() );
        user.setUsername( creationUserDto.getUsername() );
        user.setFirstName( creationUserDto.getFirstName() );
        user.setLastName( creationUserDto.getLastName() );
        user.setEmail( creationUserDto.getEmail() );
        user.setPassword( creationUserDto.getPassword() );
        user.setDateOfBirth( creationUserDto.getDateOfBirth() );

        return user;
    }

    @Override
    public User updateDtoToModel(UpdateUserDto updateUserDto, User user) {
        if ( updateUserDto == null ) {
            return null;
        }

        if ( updateUserDto.getRole() != null ) {
            user.setRole( updateUserDto.getRole() );
        }
        if ( updateUserDto.getFirstName() != null ) {
            user.setFirstName( updateUserDto.getFirstName() );
        }
        if ( updateUserDto.getLastName() != null ) {
            user.setLastName( updateUserDto.getLastName() );
        }
        if ( updateUserDto.getEmail() != null ) {
            user.setEmail( updateUserDto.getEmail() );
        }
        if ( updateUserDto.getDateOfBirth() != null ) {
            user.setDateOfBirth( updateUserDto.getDateOfBirth() );
        }

        return user;
    }
}
