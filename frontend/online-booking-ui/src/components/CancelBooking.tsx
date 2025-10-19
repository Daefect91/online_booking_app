import { useState } from "react";
import type { BookingDTO } from "../types/BookingDTO";

interface CancelBookingProps {
  booking: BookingDTO | null;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (booking: BookingDTO) => void;
}

function CancelBooking({ booking, isOpen, onClose, onSubmit }: CancelBookingProps) {
  const [formData] = useState<BookingDTO>(booking!);
  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  return (
      <div className="fixed inset-0 z-50 overflow-y-auto">
        <div className="flex min-h-screen items-center justify-center px-4">
          <div
            className="fixed inset-0 bg-black opacity-50 transition-opacity"
            onClick={onClose}
          ></div>
  
          <div className="relative w-full max-w-2xl rounded-lg bg-white p-6 shadow-xl">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Cancel Booking</h3>
  
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex flex-col space-y-4">
                <div>
                  <p className="block text-sm font-medium text-gray-700 mb-1">
                    Are you sure you wish to cancel booking {booking?.bookingId} for {booking?.firstName} {booking?.surname}?
                  </p>
                </div>
              </div>
  
              <div className="flex justify-end gap-4 mt-6">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
                >
                  No
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Yes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
}

export default CancelBooking;
