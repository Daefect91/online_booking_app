package com.nickl.online_booking_app.service;

import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.nickl.online_booking_app.constants.EStatus;
import com.nickl.online_booking_app.dto.booking.BookingDTO;
import com.nickl.online_booking_app.entity.booking.Booking;
import com.nickl.online_booking_app.repo.BookingRepository;

@Service
public class BookingServiceImpl implements IBookingService {

    private BookingRepository bookingRepository;

    public BookingServiceImpl(BookingRepository bookingRepository)
    {
        this.bookingRepository = bookingRepository;
    }

    @Override
    public BookingDTO createBooking(BookingDTO bookingDTO) {
        Booking booking = convertToBooking(bookingDTO);
        booking.setBookingStatus(EStatus.ACTIVE.getStatusCd());
        booking = bookingRepository.save(booking);
        return convertToBookingDTO(booking);
    }

    @Override
    public BookingDTO getBooking(UUID bookingId) 
    {
        Booking booking = bookingRepository.findById(bookingId)
            .orElseThrow(() -> new RuntimeException("Booking not found for ID: " + bookingId));
        return convertToBookingDTO(booking);
    }

    @Override
    public List<BookingDTO> getAllBookings() 
    {
        List<Booking> bookingList = bookingRepository.findAll();
        return bookingList.stream()
            .map(this::convertToBookingDTO)
            .toList();
    }

    @Override
    public BookingDTO updateBooking(UUID bookingId, BookingDTO bookingDTO) 
    {
        Booking booking = bookingRepository.findById(bookingId)
            .orElseThrow(() -> new RuntimeException("Booking not found for ID: " + bookingId));
        
        booking.setCheckinDate(bookingDTO.getCheckinDate());
        booking.setCheckoutDate(bookingDTO.getCheckoutDate());
        booking.setFirstName(bookingDTO.getFirstName());
        booking.setSurname(bookingDTO.getSurname());
        booking.setRoomNum(bookingDTO.getRoomNum());

        booking = bookingRepository.save(booking);
        return convertToBookingDTO(booking);
    }

    @Override
    public String cancelBooking(UUID bookingId) 
    {
        Booking booking = bookingRepository.findById(bookingId)
            .orElseThrow(() -> new RuntimeException("Booking not found for ID: " + bookingId));
        
        booking.setBookingStatus(EStatus.CANCELLED.getStatusCd());
        bookingRepository.save(booking);
        return "Booking cancelled";
    }

    private Booking convertToBooking(BookingDTO bookingDTO)
    {
        return Booking.builder()
            .firstName(bookingDTO.getFirstName())
            .surname(bookingDTO.getSurname())
            .checkinDate(bookingDTO.getCheckinDate())
            .checkoutDate(bookingDTO.getCheckoutDate())
            .roomNum(bookingDTO.getRoomNum())
            .build();
    }

    private BookingDTO convertToBookingDTO(Booking booking)
    {
        return BookingDTO.builder()
            .bookingId(booking.getBookingId())
            .firstName(booking.getFirstName())
            .surname(booking.getSurname())
            .bookingStatus(EStatus.of(booking.getBookingStatus()).getStatusDescription())
            .checkinDate(booking.getCheckinDate())
            .checkoutDate(booking.getCheckoutDate())
            .roomNum(booking.getRoomNum())
            .build();
    }
}
