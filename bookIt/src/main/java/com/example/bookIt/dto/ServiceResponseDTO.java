package com.example.bookIt.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ServiceResponseDTO {
    private Long id;
    private String name;
    private String description;
    private Integer durationMinutes;
}
