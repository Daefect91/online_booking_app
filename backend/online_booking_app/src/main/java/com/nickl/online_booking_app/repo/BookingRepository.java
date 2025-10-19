package com.nickl.online_booking_app.repo;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.nickl.online_booking_app.entity.booking.Booking;

public interface BookingRepository extends JpaRepository<Booking, UUID>{

}
