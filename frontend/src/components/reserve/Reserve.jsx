

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import "./reserve.css";

const Reserve = ({ setOpen, hotelId }) => {
  const [selectedRooms, setSelectedRooms] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [date, setDate] = useState('');
  const [roomsData, setRoomsData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRoomsData = async () => {
      try {
        const response = await axios.get(`/hotels/room/${hotelId}`);
        setRoomsData(response.data);
      } catch (error) {
        console.error('Error fetching rooms data:', error);
      }
    };

    fetchRoomsData();
  }, [hotelId]);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // Validate the form data
    if (!name || !email || !date) {
      alert('Please fill in all the fields');
      return;
    }

    // Create the reservation object
    const reservation = {
      name,
      email,
      date,
      selectedRooms
    };

    try {
      // Send the reservation data to the server
      await axios.post('http://localhost:8800/reservations', reservation);

      // Reset the form fields
      setName('');
      setEmail('');
      setDate('');

      alert('Reservation saved successfully!');
      setOpen(false);
      navigate("/");
    } catch (error) {
      console.error('Error saving reservation:', error);
      alert('Failed to save reservation. Please try again.');
    }
  };

  const handleSelect = (e) => {
    const checked = e.target.checked;
    const value = e.target.value;
    setSelectedRooms(
      checked
        ? [...selectedRooms, value]
        : selectedRooms.filter((item) => item !== value)
    );
  };

  return (
    <div className="reserve">
      <div className="rContainer">
        <FontAwesomeIcon
          icon={faCircleXmark}
          className="rClose"
          onClick={() => setOpen(false)}
        />
        <span>    <h2>Reservation Form</h2></span>
        <form className="reserveForm" onSubmit={handleFormSubmit}>
          <div className="formGroup">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
            />
          </div>

          <div className="formGroup">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </div>

          <div className="formGroup">
            <label htmlFor="date">Date:</label>
            <input
              type="date"
              id="date"
              value={date}
              onChange={(event) => setDate(event.target.value)}
              required
            />
          </div>

          {roomsData.map((item) => (
            <div className="rItem" key={item._id}>
              <div className="rItemInfo">
                <div className="rTitle">{item.title}</div>
                <div className="rDesc">{item.desc}</div>
                <div className="rMax">
                  Max people: <b>{item.maxPeople}</b>
                </div>
                <div className="rPrice">{item.price}</div>
              </div>
              <div className="rSelectRooms">
                {item.roomNumbers.map((roomNumber) => (
                  <div className="room" key={roomNumber._id}>
                    <label>{roomNumber.number}</label>
                    <input
                      type="checkbox"
                      value={roomNumber._id}
                      onChange={handleSelect}
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}

          <button type="submit">Reserve Now!</button>
        </form>
      </div>
    </div>
  );
};

export default Reserve;
