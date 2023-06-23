// models/reservation.js

import mongoose from 'mongoose';

const reservationSchema = new mongoose.Schema({
  date: {
    type: Array,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },

   name: {
      type: String,
      required: true,
    },

});



const Reservationinfo = mongoose.model('Reservation', reservationSchema);

export default Reservationinfo;
