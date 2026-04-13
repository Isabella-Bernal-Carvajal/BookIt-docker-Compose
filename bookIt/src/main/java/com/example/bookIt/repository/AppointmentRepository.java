package com.example.bookIt.repository;

import com.example.bookIt.entity.Appointment;
import com.example.bookIt.entity.enums.AppointmentStatus;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AppointmentRepository extends JpaRepository<Appointment, Long> {

    @Query("SELECT a FROM Appointment a JOIN FETCH a.service")
    List<Appointment> findAllWithService();

    @Query("SELECT a FROM Appointment a JOIN FETCH a.service WHERE a.status = :status")
    List<Appointment> findByStatusWithService(@Param("status") AppointmentStatus status);
}
