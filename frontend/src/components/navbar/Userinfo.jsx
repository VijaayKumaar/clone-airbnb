
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Footer from '../footer/Footer';
import "./Userinfo.css";

import { Link } from 'react-router-dom';

const Reservations = () => {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    fetchReservations();
  }, []);

  const fetchReservations = async () => {
    try {
      const response = await axios.get('http://localhost:8800/reservations');
      const reservationsData = response.data;
      setReservations(reservationsData);
    } catch (error) {
      console.error('Error fetching reservations:', error);
    }
  };

  const handleDeleteReservation = async (reservationId) => {
    try {
      await axios.delete(`http://localhost:8800/reservations/${reservationId}`);
      fetchReservations();
    } catch (error) {
      console.error('Error deleting reservation:', error);
    }
  };

  return (
    <>
        <Link to="/">
      <h2 className='back-home'>
        <img 
         src='https://files.prokerala.com/news/photos/imgs/1024/airbnb-logo-653256.jpg' style={{width:"50px"}} /></h2>
      </Link>
      
      <div className="reservations-container">
        <div className="reservations">
        <span className="logo" style={{position:'relative', alignItems:"center"}}>
          <Link to="/">
            <img
              src="https://hello.pricelabs.co/wp-content/uploads/2021/04/Airbnb-Logo.png"
              style={{ width: "130px" }}
              alt="Airbnb Logo"
            />
            </Link>
          </span> 
          <h2 className="reservations-title">Reservations</h2>
          
     
          {reservations.map((reservation) => (
            <div key={reservation._id} className="reservation-item">
              <p className="reservation-name">Name: {reservation.name}</p>
              <p className="reservation-email">Email: {reservation.email}</p>
              <p className="reservation-date">Date: {reservation.date}</p>
              <button
                className="delete-button"
                onClick={() => handleDeleteReservation(reservation._id)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default Reservations;
