import express from 'express';

const router = express.Router();

// Example educator-specific route
router.get("/", (req, res) => {
  res.send("Educator route");
});

export default router;