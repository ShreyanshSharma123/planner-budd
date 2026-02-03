import express from "express";
import pool from "../db/index.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const userId = 1;

    const subjectsResult = await pool.query(
      "SELECT COUNT(*) FROM subjects WHERE user_id = $1",
      [userId]
    );

    const completedTopicsResult = await pool.query(
      "SELECT COUNT(*) FROM planner_tasks WHERE user_id = $1 AND done = true",
      [userId]
    );

    const pendingTopicsResult = await pool.query(
      "SELECT COUNT(*) FROM planner_tasks WHERE user_id = $1 AND done = false",
      [userId]
    );

    const hoursResult = await pool.query(
      "SELECT COALESCE(SUM(hours), 0) FROM planner_tasks WHERE user_id = $1",
      [userId]
    );

    res.json({
      totalSubjects: Number(subjectsResult.rows[0].count),
      completedTopics: Number(completedTopicsResult.rows[0].count),
      pendingTopics: Number(pendingTopicsResult.rows[0].count),
      studyHours: Number(hoursResult.rows[0].sum)
    });
  } catch (err) {
    console.error("DASHBOARD ERROR:", err.message);
    res.status(500).json({ error: "Failed to load dashboard stats" });
  }
});

export default router;
