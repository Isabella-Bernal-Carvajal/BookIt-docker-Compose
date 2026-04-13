package com.example.bookIt.service;

import com.example.bookIt.dto.AppointmentRequestDTO;
import com.example.bookIt.dto.AppointmentResponseDTO;
import com.example.bookIt.dto.AppointmentStatusUpdateDTO;
import com.example.bookIt.entity.Appointment;
import com.example.bookIt.entity.ServiceEntity;
import com.example.bookIt.entity.enums.AppointmentStatus;
import com.example.bookIt.exception.BusinessRuleException;
import com.example.bookIt.exception.ResourceNotFoundException;
import com.example.bookIt.repository.AppointmentRepository;
import lombok.RequiredArgsConstructor;
import com.example.bookIt.repository.ServiceRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class AppointmentService {

    private final AppointmentRepository appointmentRepository;
    private final ServiceRepository serviceRepository;
    private final ServiceService serviceService;

    /** GET /appointments (con filtro opcional por estado) */
    @Transactional(readOnly = true)
    public List<AppointmentResponseDTO> findAll(AppointmentStatus status) {
        List<Appointment> appointments;
        if (status != null) {
            log.info("Fetching appointments with status={}", status);
            appointments = appointmentRepository.findByStatusWithService(status);
        } else {
            log.info("Fetching all appointments");
            appointments = appointmentRepository.findAllWithService();
        }
        return appointments.stream().map(this::toDTO).toList();
    }

    /** POST /appointments */
    @Transactional
    public AppointmentResponseDTO create(AppointmentRequestDTO dto) {
        // Regla 1: el servicio debe existir
        ServiceEntity service = serviceRepository.findById(dto.getServiceId())
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Servicio no encontrado con id: " + dto.getServiceId()));

        // Regla 7: la combinación fecha+hora debe ser en el futuro
        LocalDateTime appointmentDateTime = LocalDateTime.of(dto.getDate(), dto.getTime());
        if (!appointmentDateTime.isAfter(LocalDateTime.now())) {
            throw new BusinessRuleException("La fecha y hora de la cita deben ser en el futuro");
        }

        // Regla 3: estado inicial siempre PENDING
        Appointment appointment = Appointment.builder()
                .clientName(dto.getClientName())
                .clientEmail(dto.getClientEmail())
                .date(dto.getDate())
                .time(dto.getTime())
                .status(AppointmentStatus.PENDING)
                .service(service)
                .build();

        Appointment saved = appointmentRepository.save(appointment);
        log.info("Appointment created: id={}, client={}", saved.getId(), saved.getClientName());
        return toDTO(saved);
    }

    /** PATCH /appointments/{id}/status */
    @Transactional
    public AppointmentResponseDTO updateStatus(Long id, AppointmentStatusUpdateDTO dto) {
        Appointment appointment = appointmentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Cita no encontrada con id: " + id));

        AppointmentStatus current = appointment.getStatus();
        AppointmentStatus next = dto.getStatus();

        // Regla 4: CANCELLED → DONE no permitido
        if (current == AppointmentStatus.CANCELLED && next == AppointmentStatus.DONE) {
            throw new BusinessRuleException("Una cita CANCELADA no puede pasar a DONE");
        }

        // Regla 5: DONE → CANCELLED no permitido
        if (current == AppointmentStatus.DONE && next == AppointmentStatus.CANCELLED) {
            throw new BusinessRuleException("Una cita completada (DONE) no puede ser CANCELADA");
        }

        // Evitar transición al mismo estado
        if (current == next) {
            throw new BusinessRuleException("La cita ya tiene el estado: " + current);
        }

        appointment.setStatus(next);
        Appointment updated = appointmentRepository.save(appointment);
        log.info("Appointment id={} status changed: {} → {}", id, current, next);
        return toDTO(updated);
    }

    /** DELETE /appointments/{id} */
    @Transactional
    public void delete(Long id) {
        Appointment appointment = appointmentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Cita no encontrada con id: " + id));

        // Cambiar a CANCELLED en lugar de borrado físico para preservar historial
        if (appointment.getStatus() == AppointmentStatus.DONE) {
            throw new BusinessRuleException("Una cita completada (DONE) no puede ser eliminada");
        }

        appointment.setStatus(AppointmentStatus.CANCELLED);
        appointmentRepository.save(appointment);
        log.info("Appointment id={} cancelled via DELETE", id);
    }

    private AppointmentResponseDTO toDTO(Appointment appointment) {
        return AppointmentResponseDTO.builder()
                .id(appointment.getId())
                .clientName(appointment.getClientName())
                .clientEmail(appointment.getClientEmail())
                .date(appointment.getDate())
                .time(appointment.getTime())
                .status(appointment.getStatus())
                .service(serviceService.toDTO(appointment.getService()))
                .build();
    }
}
