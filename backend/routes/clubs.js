const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');
const Club = require('../models/Club');

// @route   GET api/clubs
// @desc    Get all clubs
// @access  Public
router.get('/', async (req, res) => {
  try {
    const clubs = await Club.find().sort({ name: 1 });
    res.json(clubs);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/clubs
// @desc    Create or update a club
// @access  Private (Admin only)
router.post(
  '/',
  [
    auth,
    [
      check('name', 'Name is required').not().isEmpty(),
      check('description', 'Description is required').not().isEmpty(),
      check('category', 'Category is required').not().isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, description, category, meetingTimes, contactEmail, website } = req.body;

    try {
      // Check if user is admin
      if (req.user.role !== 'admin') {
        return res.status(401).json({ msg: 'Not authorized' });
      }

      let club = await Club.findOne({ name });

      if (club) {
        // Update existing club
        club = await Club.findOneAndUpdate(
          { name },
          { $set: { description, category, meetingTimes, contactEmail, website } },
          { new: true }
        );
        return res.json(club);
      }

      // Create new club
      club = new Club({
        name,
        description,
        category,
        meetingTimes,
        contactEmail,
        website
      });

      await club.save();
      res.json(club);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   DELETE api/clubs/:id
// @desc    Delete a club
// @access  Private (Admin only)
router.delete('/:id', auth, async (req, res) => {
  try {
    // Check if user is admin
    if (req.user.role !== 'admin') {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    const club = await Club.findById(req.params.id);

    if (!club) {
      return res.status(404).json({ msg: 'Club not found' });
    }

    await club.remove();
    res.json({ msg: 'Club removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
