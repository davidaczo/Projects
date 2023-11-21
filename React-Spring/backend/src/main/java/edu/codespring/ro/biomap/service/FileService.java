package edu.codespring.ro.biomap.service;

import edu.codespring.ro.biomap.controller.exception.NotFoundException;
import edu.codespring.ro.biomap.model.File;
import edu.codespring.ro.biomap.repository.FileRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@RequiredArgsConstructor
@Service
public class FileService {

    private final FileRepository fileRepository;

    public File create(File file) {
        return fileRepository.save(file);
    }

    public File update(File file) {
        return fileRepository.save(file);
    }

    public void delete(File file) {
        fileRepository.delete(file);
    }

    public List<File> findAll() {
        return fileRepository.findAll();
    }

    public File findById(Integer id) {
        if (fileRepository.existsById(id)) {
            return fileRepository.getById(id);
        } else {
            throw new NotFoundException(id);
        }
    }

}
