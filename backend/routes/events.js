const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');
const Event = require('../models/Event');
const Club = require('../models/Club');

// @route   GET api/events
// @desc    Get all events
// @access  Public
router.get('/', async (req, res) => {
  try {
    const events = await Event.find().sort({ date: 1 });
    res.json(events);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/events
// @desc    Create an event
// @access  Private (Club Admin or Site Admin)
router.post(
  '/',
  [
    auth,
    [
      check('title', 'Title is required').not().isEmpty(),
      check('description', 'Description is required').not().isEmpty(),
      check('date', 'Date is required').not().isEmpty(),
      check('club', 'Club ID is required').not().isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, description, date, location, club } = req.body;

    try {
      // Check if user is admin or club admin
      const clubObj = await Club.findById(club);
      if (!clubObj) {
        return res.status(404).json({ msg: 'Club not found' });
      }

      if (req.user.role !== 'admin' && clubObj.admin.toString() !== req.user.id) {
        return res.status(401).json({ msg: 'Not authorized' });
      }

      const event = new Event({
        title,
        description,
        date,
        location,
        club,
        createdBy: req.user.id
      });

      await event.save();
      res.json(event);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   PUT api/events/:id
// @desc    Update an event
// @access  Private (Club Admin or Site Admin)
router.put('/:id', auth, async (req, res) => {
  const { title, description, date, location } = req.body;

  try {
    let event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ msg: 'Event not found' });
    }

    // Check if user is admin or club admin
    const club = await Club.findById(event.club);
    if (req.user.role !== 'admin' && club.admin.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    event = await Event.findByIdAndUpdate(
      req.params.id,
      { $set: { title, description, date, location } },
      { new: true }
    );

    res.json(event);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   DELETE api/events/:id
// @desc    Delete an event
// @access  Private (Club Admin or Site Admin)
router.delete('/:id', auth, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ msg: 'Event not found' });
    }

    // Check if user is admin or club admin
    const club = await Club.findById(event.club);
    if (req.user.role !== 'admin' && club.admin.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    await event.remove();
    res.json({ msg: 'Event removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
