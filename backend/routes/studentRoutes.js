import express from 'express';

const router = express.Router();

// Example student-specific route
router.get("/", (req, res) => {
  res.send("Student route");
});

export default router;