import axios from "axios";
import type { BookingDTO } from "../types/BookingDTO";

const BASE_URL = import.meta.env.VITE_BACKEND_URL;
const BOOKING_API = import.meta.env.VITE_BOOKING_API;

export const getAllBookings = async () => {
    return await axios.get(`${BASE_URL}${BOOKING_API}/all-bookings`);
}

export const createBooking = async (bookingDTO: BookingDTO) => {
    return await axios.post(`${BASE_URL}${BOOKING_API}/create`, bookingDTO);
}