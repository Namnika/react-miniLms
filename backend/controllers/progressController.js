const Progress = require('../models/Progress');

// Mark course as completed
exports.markAsCompleted = async (req, res) => {
  try {
    const { userId, courseId } = req.body;

    const progress = await Progress.findOneAndUpdate(
      { user: userId, course: courseId },
      { status: 'Completed', updatedAt: Date.now() },
      { new: true, upsert: true } // upsert creates new doc if not found
    );

    res.status(200).json({ message: 'Course marked as completed', progress });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Get progress for a user & course
exports.getProgress = async (req, res) => {
  try {
    const { userId, courseId } = req.params;

    const progress = await Progress.findOne({ user: userId, course: courseId });

    if (!progress) {
      return res.status(404).json({ message: 'No progress found' });
    }

    res.status(200).json({ progress });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};
