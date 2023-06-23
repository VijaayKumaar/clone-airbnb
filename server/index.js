

// ..................................................

import express from "express";
import mongoose from "mongoose";
import authRoute from "./routes/auth.js";
import hotelsRoute from "./routes/hotels.js";
import roomsRoute from "./routes/rooms.js";
import cookieParser from "cookie-parser";
import usersRoute from "./routes/users.js";
import cors from "cors";
import Reservation from "./models/userreservation.js"
import User from "./models/User.js";


const app = express();
const port = 8800;

app.use(cors());
app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/hotels", hotelsRoute);
app.use("/api/rooms", roomsRoute);
app.use("/api/users", usersRoute);


app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

mongoose.connect('mongodb+srv://vijay:vijay@cluster0.nrnyweo.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

const UserSchema = new mongoose.Schema({
  username: String,
  password: String,
});

app.post('/api/register', async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(409).json({ message: 'Username already exists' });
    }

    const newUser = new User({ username, password });

    await newUser.save();
    res.json({ message: 'User saved successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

app.post('/api/login', async (req, res, next) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    const isPasswordValid = password === user.password;
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    res.json({ message: 'Login successful', user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});



app.post('/reservations', async (req, res) => {
  try {
    const { name, email, date } = req.body;

    const reservation = new Reservation({ name, email, date });

    await reservation.save();

    res.status(201).json({ message: 'Reservation saved successfully!' });
  } catch (error) {
    console.error('Error saving reservation:', error);
    res.status(500).json({ error: 'An error occurred while saving the reservation.' });
  }
});

app.get('/reservations', async (req, res) => {
  try {
    const reservations = await Reservation.find();
    console.log(reservations); // Display reservations in the console
    res.json(reservations);
  } catch (error) {
    console.error('Error fetching reservations:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

app.delete('/reservations/:id', async (req, res) => {
  try {
    const { id } = req.params;

    await Reservation.findByIdAndDelete(id);

    res.json({ message: 'Reservation deleted successfully!' });
  } catch (error) {
    console.error('Error deleting reservation:', error);
    res.status(500).json({ error: 'An error occurred while deleting the reservation.' });
  }
});



app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
