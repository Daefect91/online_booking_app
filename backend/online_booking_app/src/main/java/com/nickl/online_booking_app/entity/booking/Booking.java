package com.nickl.online_booking_app.entity.booking;

import java.time.OffsetDateTime;
import java.util.UUID;

import org.springframework.format.annotation.DateTimeFormat;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "booking", schema = "public")
public class Booking {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID bookingId;

    @Column(nullable = false)
    @NotNull(message = "Bookings require a status")
    private Integer bookingStatus;

    @Column(nullable = false)
    @NotNull(message = "Bookings require a room number")
    private Integer roomNum;

    @Column(nullable = false)
    @NotBlank(message = "Bookings require a client first-name")
    private String firstName;
    
    @Column(nullable = false)
    @NotBlank(message = "Bookings require a client surname")
    private String surname;
    
    @Column(nullable = false)
    @NotNull(message = "Bookings require a check-in date")
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
    private OffsetDateTime checkinDate;
    
    @Column(nullable = false)
    @NotNull(message = "Bookings require a check-out date")
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
    private OffsetDateTime checkoutDate;
}
