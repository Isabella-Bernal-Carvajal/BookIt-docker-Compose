package com.example.bookIt.dto;

import com.example.bookIt.entity.enums.AppointmentStatus;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class AppointmentStatusUpdateDTO {
    @NotNull(message = "El nuevo estado es obligatorio")
    private AppointmentStatus status;
}
