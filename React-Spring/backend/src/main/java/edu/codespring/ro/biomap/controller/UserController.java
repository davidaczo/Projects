package edu.codespring.ro.biomap.controller;

import edu.codespring.ro.biomap.controller.exception.BadRequestException;
import edu.codespring.ro.biomap.controller.exception.NotFoundException;
import edu.codespring.ro.biomap.dto.incoming.CreationUserDto;
import edu.codespring.ro.biomap.dto.incoming.UpdateUserDto;
import edu.codespring.ro.biomap.dto.outgoing.UserDto;
import edu.codespring.ro.biomap.mapper.UserMapper;
import edu.codespring.ro.biomap.model.User;
import edu.codespring.ro.biomap.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@PreAuthorize("hasAuthority('SCIENTIST') or hasAuthority('ADMIN')")
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;
    private final UserMapper userMapper;

    @GetMapping("/{id}")
    public UserDto findById(@PathVariable("id") Integer id) throws NotFoundException {
        try {
            return userMapper.modelToDto(userService.findById(id));
        } catch (NotFoundException e) {
            throw e;
        }
    }

    @PostMapping
    public UserDto create(@Valid @RequestBody CreationUserDto creationUserDto) {
        User user = userMapper.creationDtoToModel(creationUserDto);
        try {
            user = userService.create(user);
        } catch (BadRequestException e) {
            throw e;
        }
        return userMapper.modelToDto(user);
    }

    // changed to make endpoints according to restful convention
    @PatchMapping("/{id}")
    public UserDto update(@PathVariable("id") Integer id, @RequestBody UpdateUserDto updateUserDto) {
        try {
            User user = userService.findById(id);
            user = userMapper.updateDtoToModel(updateUserDto, user);
            user = userService.update(user);
            return userMapper.modelToDto(user);
        } catch (NotFoundException e) {
            throw e;
        }
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable("id") Integer id) {
        userService.delete(id);
    }

    @GetMapping
    public List<UserDto> findAll() {
        return userMapper.modelsToDtos(userService.findAll());
    }

    @PreAuthorize("hasAuthority('SCIENTIST') or hasAuthority('USER') or hasAuthority('ADMIN')")
    @GetMapping("/username")
    public UserDto findByUsername(@RequestParam("username") String username) throws NotFoundException {
        try {
            return userMapper.modelToDto(userService.findByUsername(username));
        } catch (NotFoundException e) {
            throw e;
        }
    }

}
