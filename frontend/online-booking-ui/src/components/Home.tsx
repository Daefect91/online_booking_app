import { useEffect, useState } from "react";
import {
  cancelBooking,
  getAllBookings,
  updateBooking,
} from "../services/booking.service";
import type { BookingDTO } from "../types/BookingDTO";
import EditBooking from "./EditBooking";
import CancelBooking from "./CancelBooking";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import TablePagination from "@mui/material/TablePagination";
import TextField from "@mui/material/TextField";
import Box from '@mui/material/Box';

function Home() {
  const [bookings, setBookings] = useState<BookingDTO[]>([]);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [bookingToEdit, setBookingToEdit] = useState<BookingDTO | null>(null);
  const [filterText, setFilterText] = useState("");

  const [isCancelDialogOpen, setIsCancelDialogOpen] = useState(false);
  const [bookingToCancel, setBookingToCancel] = useState<BookingDTO | null>(
    null
  );

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterText(event.target.value);
    setPage(0);
  };

  const filteredBookings = bookings.filter(booking => 
    booking.firstName.toLowerCase().includes(filterText.toLowerCase()) ||
    booking.surname.toLowerCase().includes(filterText.toLowerCase()) ||
    booking.bookingStatus?.toLowerCase().includes(filterText.toLowerCase()) ||
    booking.checkinDate.includes(filterText) || 
    booking.checkoutDate.includes(filterText) || 
    booking.roomNum.toString().includes(filterText)
  );

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    getBookings();
  }, []);

  const getBookings = () => {
    getAllBookings()
      .then((response) => {
        console.log("resonse = ", response.data);
        setBookings(response.data);
      })
      .catch((error) => {
        console.log("error = ", error);
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
      .then((response) => {
        console.log("Update booking response = ", response);
        getBookings();
        handleOnCloseEditDialog();
      })
      .catch((error) => {
        console.log("Error updating booking : ", error);
      });
  };

  const handleCancelBooking = (booking: BookingDTO) => {
    setBookingToCancel(booking);
    setIsCancelDialogOpen(true);
  };

  const handleBookingCancelConfirmed = (cancelledBooking: BookingDTO) => {
    cancelBooking(cancelledBooking.bookingId)
      .then((response) => {
        console.log("Cancel booking response = ", response);
        getBookings();
        handleOnCloseCancelDialog();
      })
      .catch((error) => {
        console.log("Error cancelling booking : ", error);
      });
  };

  return (
    <>
      <h1 className="text-center mt-10 text-3xl font-bold">List of Bookings</h1>
      <TableContainer component={Paper}>
        <Box 
            display="flex" 
            justifyContent="flex-end" 
            paddingRight="15px" 
            paddingTop="15px"
        >
          <TextField
            label="Search"
            variant="outlined"
            value={filterText}
            onChange={handleFilterChange}
          >

          </TextField>
        </Box>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Guest Name</TableCell>
              <TableCell>Room</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Check-in Date</TableCell>
              <TableCell>Check-out Date</TableCell>
              <TableCell> </TableCell>
              <TableCell> </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredBookings.map((booking) => (
              <TableRow
                key={booking.bookingId}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {booking.firstName} {booking.surname}
                </TableCell>
                <TableCell align="right">{booking.roomNum}</TableCell>
                <TableCell>{booking.bookingStatus}</TableCell>
                <TableCell>{booking.checkinDate}</TableCell>
                <TableCell>{booking.checkoutDate}</TableCell>
                <TableCell align="right">
                  <Button 
                    variant="contained" 
                    size="small" 
                    startIcon={<EditIcon/>}
                    onClick={() => handleEditBooking(booking)}>
                      Edit
                  </Button>
                </TableCell>
                <TableCell align="right">
                  <Button 
                    variant="contained" 
                    size="small"
                    color="error"
                    startIcon={<DeleteIcon/>}
                    onClick={() => handleCancelBooking(booking)}>
                      Cancel
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={bookings.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

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

export default Home;
