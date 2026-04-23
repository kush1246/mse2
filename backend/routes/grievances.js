const express = require('express');
const Grievance = require('../models/Grievance');
const auth = require('../middleware/auth');
const router = express.Router();

// POST /api/grievances - Submit grievance
router.post('/', auth, async (req, res) => {
  try {
    const { title, description, category } = req.body;

    // Validation
    if (!title || !description || !category) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    if (!['Academic', 'Hostel', 'Transport', 'Other'].includes(category)) {
      return res.status(400).json({ message: 'Invalid category' });
    }

    // Create new grievance
    const grievance = new Grievance({
      title,
      description,
      category,
      student: req.student._id
    });

    await grievance.save();
    await grievance.populate('student', 'name email');

    res.status(201).json({
      message: 'Grievance submitted successfully',
      grievance
    });
  } catch (error) {
    console.error('Submit grievance error:', error);
    res.status(500).json({ message: 'Server error while submitting grievance' });
  }
});

// GET /api/grievances - View all grievances for logged-in student
router.get('/', auth, async (req, res) => {
  try {
    const grievances = await Grievance.find({ student: req.student._id })
      .populate('student', 'name email')
      .sort({ date: -1 });

    res.json(grievances);
  } catch (error) {
    console.error('Get grievances error:', error);
    res.status(500).json({ message: 'Server error while fetching grievances' });
  }
});

// GET /api/grievances/search?title=xyz - Search grievance
router.get('/search', auth, async (req, res) => {
  try {
    const { title } = req.query;

    if (!title) {
      return res.status(400).json({ message: 'Search title is required' });
    }

    const grievances = await Grievance.find({
      student: req.student._id,
      title: { $regex: title, $options: 'i' }
    })
      .populate('student', 'name email')
      .sort({ date: -1 });

    res.json(grievances);
  } catch (error) {
    console.error('Search grievance error:', error);
    res.status(500).json({ message: 'Server error while searching grievances' });
  }
});

// GET /api/grievances/:id - View grievance by ID
router.get('/:id', auth, async (req, res) => {
  try {
    const grievance = await Grievance.findById(req.params.id)
      .populate('student', 'name email');

    if (!grievance) {
      return res.status(404).json({ message: 'Grievance not found' });
    }

    // Check if the grievance belongs to the logged-in student
    if (grievance.student._id.toString() !== req.student._id.toString()) {
      return res.status(403).json({ message: 'Access denied' });
    }

    res.json(grievance);
  } catch (error) {
    console.error('Get grievance error:', error);
    res.status(500).json({ message: 'Server error while fetching grievance' });
  }
});

// PUT /api/grievances/:id - Update grievance
router.put('/:id', auth, async (req, res) => {
  try {
    const { title, description, category, status } = req.body;

    const grievance = await Grievance.findById(req.params.id);
    if (!grievance) {
      return res.status(404).json({ message: 'Grievance not found' });
    }

    // Check if the grievance belongs to the logged-in student
    if (grievance.student.toString() !== req.student._id.toString()) {
      return res.status(403).json({ message: 'Access denied' });
    }

    // Update fields
    if (title) grievance.title = title;
    if (description) grievance.description = description;
    if (category && ['Academic', 'Hostel', 'Transport', 'Other'].includes(category)) {
      grievance.category = category;
    }
    if (status && ['Pending', 'Resolved'].includes(status)) {
      grievance.status = status;
    }

    await grievance.save();
    await grievance.populate('student', 'name email');

    res.json({
      message: 'Grievance updated successfully',
      grievance
    });
  } catch (error) {
    console.error('Update grievance error:', error);
    res.status(500).json({ message: 'Server error while updating grievance' });
  }
});

// DELETE /api/grievances/:id - Delete grievance
router.delete('/:id', auth, async (req, res) => {
  try {
    const grievance = await Grievance.findById(req.params.id);
    if (!grievance) {
      return res.status(404).json({ message: 'Grievance not found' });
    }

    // Check if the grievance belongs to the logged-in student
    if (grievance.student.toString() !== req.student._id.toString()) {
      return res.status(403).json({ message: 'Access denied' });
    }

    await Grievance.findByIdAndDelete(req.params.id);

    res.json({ message: 'Grievance deleted successfully' });
  } catch (error) {
    console.error('Delete grievance error:', error);
    res.status(500).json({ message: 'Server error while deleting grievance' });
  }
});

module.exports = router;
