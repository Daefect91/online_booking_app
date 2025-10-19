package com.nickl.online_booking_app.service;

import java.util.List;
import java.util.UUID;

import com.nickl.online_booking_app.dto.booking.BookingDTO;

public interface IBookingService {
    
    BookingDTO createBooking(BookingDTO bookingDTO);

    BookingDTO getBooking(UUID bookingId);

    List<BookingDTO> getAllBookings();

    BookingDTO updateBooking(UUID bookingId, BookingDTO bookingDTO);

    String cancelBooking(UUID bookingId);
}
