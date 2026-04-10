package com.example.bookIt.service;

import com.example.bookIt.dto.ServiceResponseDTO;
import com.example.bookIt.entity.ServiceEntity;
import com.example.bookIt.repository.ServiceRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class ServiceService {

    private final ServiceRepository serviceRepository;

    public List<ServiceResponseDTO> findAll() {
        log.info("Fetching all services");
        return serviceRepository.findAll().stream()
                .map(this::toDTO)
                .toList();
    }

    public ServiceResponseDTO toDTO(ServiceEntity entity) {
        return ServiceResponseDTO.builder()
                .id(entity.getId())
                .name(entity.getName())
                .description(entity.getDescription())
                .durationMinutes(entity.getDurationMinutes())
                .build();
    }

    /** Seed inicial: solo inserta si la tabla está vacía */
    @Bean
    public CommandLineRunner seedServices() {
        return args -> {
            if (serviceRepository.count() == 0) {
                log.info("Seeding initial services...");
                serviceRepository.saveAll(List.of(
                        ServiceEntity.builder().name("Consulta General").description("Consulta médica general de 30 minutos").durationMinutes(30).build(),
                        ServiceEntity.builder().name("Asesoría Legal").description("Sesión de asesoría legal con abogado").durationMinutes(60).build(),
                        ServiceEntity.builder().name("Corte de Cabello").description("Corte y estilizado de cabello").durationMinutes(45).build(),
                        ServiceEntity.builder().name("Sesión de Fisioterapia").description("Sesión de fisioterapia y rehabilitación").durationMinutes(50).build()
                ));
                log.info("Services seeded successfully");
            }
        };
    }
}
