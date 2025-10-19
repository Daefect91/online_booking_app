import { useEffect, useState } from "react"
import { cancelBooking, getAllBookings, updateBooking } from "../services/booking.service"
import type { BookingDTO } from "../types/BookingDTO";
import EditBooking from "./EditBooking";
import CancelBooking from "./CancelBooking";

function Home() {
  const [bookings, setBookings] = useState<BookingDTO[]>([]);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [bookingToEdit, setBookingToEdit] = useState<BookingDTO | null>(null);

  const [isCancelDialogOpen, setIsCancelDialogOpen] = useState(false);
  const [bookingToCancel, setBookingToCancel] = useState<BookingDTO | null>(null);

  useEffect(() => {
      getBookings();
  }, []);

  const getBookings = () => {
    getAllBookings()
      .then(response => {
        console.log("resonse = ", response.data);
        setBookings(response.data);
      })
      .catch(error => {
        console.log("error = ", error)
      });
  };

  const handleEditBooking = (booking: BookingDTO) => {
    setBookingToEdit(booking);
    setIsEditDialogOpen(true);
  };

  const handleOnCloseEditDialog = () => {
    setBookingToEdit(null);
    setIsEditDialogOpen(false);
  };

  const handleOnCloseCancelDialog = () => {
    setBookingToCancel(null);
    setIsCancelDialogOpen(false);
  };

  const handleUpdateBooking = (updatedBooking: BookingDTO) => {
    updateBooking(updatedBooking.bookingId, updatedBooking)
      .then(response => {
        console.log("Update booking response = ", response);
        getBookings();
        handleOnCloseEditDialog();
      })
      .catch(error => {
        console.log("Error updating booking : ", error);
      });
  };

  const handleCancelBooking = (booking: BookingDTO) => {
    setBookingToCancel(booking);
    setIsCancelDialogOpen(true);
  };

  const handleBookingCancelConfirmed = (cancelledBooking: BookingDTO) => {
    cancelBooking(cancelledBooking.bookingId)
      .then(response => {
        console.log("Cancel booking response = ", response);
        getBookings();
        handleOnCloseCancelDialog();
      })
      .catch(error => {
        console.log("Error cancelling booking : ", error);
      });
  };

  return (
    <>
      <h1 className="text-center mt-10 text-3xl font-bold">List of Bookings</h1>
      <div className="container mt-10 space-y-4">
        <div className="flex flex-row space-x-4 flex-wrap justify-center items-center gap-y-4">
          {bookings.map((booking) => (
            <div
              key={booking.bookingId}
              className="bg-gray-100 p-4 rounded-md flex flex-col justify-self-start"
            >
              <h2 className="text-lg font-bold">{booking.bookingId}</h2>
              <p className="text-sm">
                <strong>Guest</strong>: {booking.firstName} {booking.surname}
              </p>
              <p className="text-sm">
                <strong>Dates</strong>: {booking.checkinDate} - {booking.checkoutDate}
              </p>
              <p className="text-sm">
                <strong>Room Number</strong>: {booking.roomNum}
              </p>
              <p className="text-sm">
                <strong>Status</strong>: {booking.bookingStatus}
              </p>
              <div className="flex my-2">
                <button
                  className="flex-1 bg-yellow-600 text-white py-1 px-1 mr-2 rounded-md"
                  onClick={() => handleEditBooking(booking)}
                >
                  Edit
                </button>
                <button
                  className="flex-1 bg-red-600 text-white py-1 px-1 rounded-md"
                  onClick={() => handleCancelBooking(booking)}
                >
                  Cancel
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {bookingToEdit && (
        <EditBooking
          booking={bookingToEdit}
          isOpen={isEditDialogOpen}
          onClose={handleOnCloseEditDialog}
          onSubmit={handleUpdateBooking}
        />
      )}

      {bookingToCancel && (
        <CancelBooking 
          booking={bookingToCancel}
          isOpen={isCancelDialogOpen}
          onClose={handleOnCloseCancelDialog}
          onSubmit={handleBookingCancelConfirmed}
        />
      )}
    </>
  );
}

export default Home