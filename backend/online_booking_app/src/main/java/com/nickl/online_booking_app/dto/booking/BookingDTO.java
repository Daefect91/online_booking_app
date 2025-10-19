package com.nickl.online_booking_app.dto.booking;

import java.time.OffsetDateTime;
import java.util.UUID;

import org.springframework.format.annotation.DateTimeFormat;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BookingDTO {
    private UUID bookingId;

    private String bookingStatus;

    @NotBlank(message = "Bookings require a client first-name")
    private String firstName;
    
    @NotBlank(message = "Bookings require a client surname")
    private String surname;

    @NotNull(message = "Bookings require a room number")
    private Integer roomNum;
    
    @NotNull(message = "Bookings require a check-in date")
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
    private OffsetDateTime checkinDate;
    
    @NotNull(message = "Bookings require a check-out date")
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
    private OffsetDateTime checkoutDate;
}
