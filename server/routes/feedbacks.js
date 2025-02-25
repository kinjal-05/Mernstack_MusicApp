const router = require("express").Router();

const Feedback = require('../models/Feedback');



// GET all feedback entries
router.get("/getAll", async (req, res) => {
  try {
    const feedbacks = await Feedback.find().sort({ createdAt: 1 }); // Fetch all feedback sorted by creation date
    if (feedbacks.length > 0) {
      res.status(200).send({ success: true, data: feedbacks });
    } else {
      res.status(200).send({ success: true, msg: "No Feedback Found" });
    }
  } catch (error) {
    res.status(500).send({ success: false, msg: "Error fetching feedback", error });
  }
});

// GET one feedback entry by ID
router.get("/getOne/:feedbackId", async (req, res) => {
  try {
    const feedback = await Feedback.findById(req.params.feedbackId); // Find feedback by ID
    if (feedback) {
      res.status(200).send({ success: true, data: feedback });
    } else {
      res.status(404).send({ success: false, msg: "Feedback not found" });
    }
  } catch (error) {
    res.status(500).send({ success: false, msg: "Error fetching feedback", error });
  }
});

// POST - Create new feedback entry
router.post("/save", async (req, res) => {
  const newFeedback = new Feedback({
    name: req.body.name,
    email: req.body.email,
    message: req.body.message,
  });

  try {
    const savedFeedback = await newFeedback.save(); // Save the feedback
    res.status(200).send({ success: true, data: savedFeedback });
  } catch (error) {
    res.status(400).send({ success: false, msg: error.message });
  }
});

// PUT - Update an existing feedback entry by ID
router.put("/update/:feedbackId", async (req, res) => {
  try {
    const updatedFeedback = await Feedback.findByIdAndUpdate(
      req.params.feedbackId,
      {
        name: req.body.name,
        email: req.body.email,
        message: req.body.message,
      },
      { new: true, runValidators: true } // Returns the updated document
    );

    if (updatedFeedback) {
      res.status(200).send({ success: true, data: updatedFeedback });
    } else {
      res.status(404).send({ success: false, msg: "Feedback not found" });
    }
  } catch (error) {
    res.status(400).send({ success: false, msg: error.message });
  }
});

// DELETE - Delete a feedback entry by ID
router.delete("/delete/:feedbackId", async (req, res) => {
  try {
    const result = await Feedback.findByIdAndDelete(req.params.feedbackId); // Delete by ID
    if (result) {
      res.status(200).send({ success: true, msg: "Feedback deleted successfully" });
    } else {
      res.status(404).send({ success: false, msg: "Feedback not found" });
    }
  } catch (error) {
    res.status(500).send({ success: false, msg: "Error deleting feedback", error });
  }
});

module.exports = router;
