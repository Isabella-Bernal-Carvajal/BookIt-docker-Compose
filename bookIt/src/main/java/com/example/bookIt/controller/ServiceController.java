package com.example.bookIt.controller;

import com.example.bookIt.dto.ServiceResponseDTO;
import com.example.bookIt.service.ServiceService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/services")
@RequiredArgsConstructor
public class ServiceController {

    private final ServiceService serviceService;

    @GetMapping
    public ResponseEntity<List<ServiceResponseDTO>> getAll() {
        return ResponseEntity.ok(serviceService.findAll());
    }
}
