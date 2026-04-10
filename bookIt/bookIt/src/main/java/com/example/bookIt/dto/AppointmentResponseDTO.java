package com.example.bookIt.dto;

import com.example.bookIt.entity.enums.AppointmentStatus;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalTime;

@Data
@Builder
public class AppointmentResponseDTO {
    private Long id;
    private String clientName;
    private String clientEmail;
    private LocalDate date;
    private LocalTime time;
    private AppointmentStatus status;
    private ServiceResponseDTO service;
}
