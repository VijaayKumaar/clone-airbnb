// // Import necessary dependencies and models
// import express from 'express';
// import Reservation from '../models/Reservation';

// // Create a new router instance
// const router = express.Router();

// // POST route to handle room reservation
// router.post('/', async (req, res) => {
//   const { roomId, userId, startDate, endDate } = req.body;

//   try {
//     // Create a new reservation
//     const reservation = new Reservation({
//       roomId,
//       userId,
//       startDate,
//       endDate,
//     });

//     // Save the reservation to the database
//     await reservation.save();

//     res.json({ message: 'Reservation successful', reservation });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Server error' });
//   }
// });

// // Export the router
// // export default router;
// import express from 'express';
// import Reservation from '../models/Reservation.js';

// const router = express.Router();

// router.put('/:roomId', async (req, res) => {
//   const { roomId } = req.params;
//   const { dates } = req.body;

//   try {
//     // Perform reservation logic here
//     // Create a new reservation record in the database
//     const reservationinfo = new Reservation({
//       roomId,
//       dates,
//     });
//     await reservationinfo.save();

//     res.status(200).json({ message: 'Reservation successful' });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Reservation failed' });
//   }
// });

// export default router;

import express from 'express';
import Reservation from '../../models/Reservation';

const router = express.Router();

// POST /api/reservations
router.post('/api/reservations', async (req, res) => {
  try {
    const { dates, city } = req.body;

    // Create a new reservation document
    const reservation = new Reservation({
      dates,
      city,
    });

    // Save the reservation to the database
    await reservation.save();

    console.log('Saved reservation:', reservation);

    res.status(200).json({ message: 'Reservation saved successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to save reservation' });
  }
});

export default router;
