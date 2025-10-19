import { useState } from "react";
import { useNavigate } from "react-router";
import { DayPicker, type DateRange } from "react-day-picker";
import "react-day-picker/style.css";
import type { BookingDTO } from "../types/BookingDTO";
import { createBooking } from "../services/booking.service";

function CreateBooking() {
  const navigate = useNavigate();
  const [bookingDTO, setBookingDTO] = useState<BookingDTO | null>(null);
  const [selected, setSelected] = useState<DateRange | undefined>();
  const [formData, setFormData] = useState({
    firstName: "",
    surname: "",
    roomNum: "",
  });

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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const submitData = new FormData(e.currentTarget);
    console.log("Form Data = ", submitData);
    setBookingDTO({
      firstName: submitData.get("firstName") as string,
      surname: submitData.get("surname") as string,
      roomNum: parseInt(submitData.get("roomNum") as string),
      checkinDate: selected?.from as unknown as string,
      checkoutDate: selected?.to as unknown as string,
    });

    createBooking(bookingDTO)
      .then((response) => {
        console.log("Create booking response = ", response);
        handleReset();
        navigate("/");
      })
      .catch((error) => {
        console.log("Error creating booking : ", error);
      });
  };

  const handleReset = () => {
    setFormData({
      firstName: "",
      surname: "",
      roomNum: "",
    });
    setSelected(undefined);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-500 to-indigo-500 px-8 py-6">
            <h1 className="text-3xl font-extrabold text-white text-center">
              Create New Booking
            </h1>
            <p className="text-blue-100 text-center mt-2">
              Enter the details of the new booking to add to the calendar
            </p>
          </div>

          <form onSubmit={handleSubmit} className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-6">
                <div>
                  <label className="text-sm font-semibold text-gray-700 block mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleFormDataChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2
            focus:ring-blue-500 focus:border-transparent transition duration-200"
                    placeholder="Enter guest first name"
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-700 block mb-2">
                    Surname
                  </label>
                  <input
                    type="text"
                    name="surname"
                    value={formData.surname}
                    onChange={handleFormDataChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2
            focus:ring-blue-500 focus:border-transparent transition duration-200"
                    placeholder="Enter guest surname"
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-700 block mb-2">
                    Room Number
                  </label>
                  <input
                    type="number"
                    name="roomNum"
                    value={formData.roomNum}
                    onChange={handleFormDataChange}
                    min="0"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2
              focus:ring-blue-500 focus:border-transparent transition duration-200"
                    placeholder="0"
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
                  weekStartsOn={1} />
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-200 flex justify-end space-x-4">
              <button
                type="button"
                onClick={handleReset}
                className="px-6 py-3 border border-gray-300 rounded-xl text-gray-700 font-medium
        hover:bg-gray-50 transition duration-200 shadow-sm"
              >
                Reset Form
              </button>
              <button
                type="submit"
                className="px-8 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl text-white font-medium
        hover:from-blue-400 hover:to-indigo-400 transition duration-200 shadow-md"
              >
                Create Booking
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateBooking;
