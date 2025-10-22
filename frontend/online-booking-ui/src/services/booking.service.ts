import axios from "axios";
import type { BookingDTO } from "../types/BookingDTO";

const BASE_URL = import.meta.env.VITE_BACKEND_URL;
const BOOKING_API = import.meta.env.VITE_BOOKING_API;

export const getAllBookings = async () => {
    return await axios.get(`${BASE_URL}${BOOKING_API}/all-bookings`);
}

export const createBooking = async (bookingDTO: BookingDTO | null) => {
    return await axios.post(`${BASE_URL}${BOOKING_API}/create`, bookingDTO);
}

export const updateBooking = async (bookingId: string | undefined, bookingDTO: BookingDTO | null) => {
  return await axios.put(
    `${BASE_URL}${BOOKING_API}/update/${bookingId}`,
    bookingDTO
  );
};

export const cancelBooking = async (bookingId: string | undefined) => {
  return await axios.put(`${BASE_URL}${BOOKING_API}/cancel/${bookingId}`);
};