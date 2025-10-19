import { useState } from "react";
import type { BookingDTO } from "../types/BookingDTO";
import { DayPicker, type DateRange } from "react-day-picker";

interface EditBookingProps {
  booking: BookingDTO | null;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (booking: BookingDTO) => void;
}

function EditBooking({ booking, isOpen, onClose, onSubmit }: EditBookingProps) {
  const [formData, setFormData] = useState<BookingDTO>(booking!);
  const [selected, setSelected] = useState<DateRange | undefined>({
    from: booking?.checkinDate as Date | undefined,
    to: booking?.checkoutDate as Date | undefined,
  });
  if (!isOpen) return null;

  const handleFormDataChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    formData.checkinDate = selected?.from as unknown as string;
    formData.checkoutDate = selected?.to as unknown as string;
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
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Edit Booking</h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Booking ID
                </label>
                <input
                  type="text"
                  name="bookingId"
                  value={formData.bookingId}
                  readOnly
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleFormDataChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Surname
                  </label>
                  <input
                    type="text"
                    name="surname"
                    value={formData.surname}
                    onChange={handleFormDataChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Room Number
                  </label>
                  <input
                    type="number"
                    name="roomNum"
                    value={formData.roomNum}
                    min="0"
                    onChange={handleFormDataChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>

                <div className="pt-5 border-t border-gray-200 dark:border-gray-800 flex sm:flex-row flex-col sm:space-x-5 rtl:space-x-reverse">
                  <DayPicker
                    animate
                    min={1}
                    mode="range"
                    selected={selected}
                    onSelect={setSelected}
                    required
                    disabled={{ before: new Date() }}
                    timeZone="Africa/Johannesburg"
                    weekStartsOn={1}
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-4 mt-6">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditBooking;
