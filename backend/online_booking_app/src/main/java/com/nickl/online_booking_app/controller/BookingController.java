package com.nickl.online_booking_app.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nickl.online_booking_app.dto.booking.BookingDTO;
import com.nickl.online_booking_app.service.IBookingService;

import java.util.List;
import java.util.UUID;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;



@RestController
@RequestMapping("/api/bookings")
@CrossOrigin
public class BookingController {
    private final IBookingService bookingService;

    public BookingController(IBookingService bookingService)
    {
        this.bookingService = bookingService;
    }

    @PostMapping("/create")
    public ResponseEntity<BookingDTO> createBooking(@RequestBody BookingDTO bookingDTO) {
        BookingDTO result = bookingService.createBooking(bookingDTO);
        if (result.getBookingId() != null) 
        {
            return ResponseEntity.status(HttpStatus.CREATED).body(result);
        }
        else
        {
            return ResponseEntity.status(HttpStatus.UNPROCESSABLE_ENTITY).body(null);
        }
    }

    @PutMapping("/update/{bookingId}")
    public ResponseEntity<BookingDTO> updateBooking(@PathVariable UUID bookingId, @RequestBody BookingDTO bookingDTO) 
    {
        return ResponseEntity.ok(bookingService.updateBooking(bookingId, bookingDTO));
    }

    @PutMapping("cancel/{bookingId}")
    public ResponseEntity<String> cancelBooking(@PathVariable UUID bookingId) 
    {
        return ResponseEntity.ok(bookingService.cancelBooking(bookingId));
    }

    @GetMapping("/all-bookings")
    public ResponseEntity<List<BookingDTO>> getAllBookings() {
        return ResponseEntity.ok(bookingService.getAllBookings());
    }
    
    @GetMapping("/find/{bookingId}")
    public ResponseEntity<BookingDTO> getBookingById(@PathVariable UUID bookingId) {
        return ResponseEntity.ok(bookingService.getBooking(bookingId));
    }
    
}
