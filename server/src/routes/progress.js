import express from 'express';
import pool from  "../db/index.js";

const router = express.Router();

// is page pe sirf stats of progress chahiye

router.get("/", async (req, res) => {
    try {
        const result=await pool.query(
             `SELECT
  COUNT(*) AS total_tasks,

  COUNT(*) FILTER (WHERE done = true) AS completed_tasks,
  COUNT(*) FILTER (WHERE done = false) AS pending_tasks,

  COALESCE(SUM(hours), 0) AS total_hours,

  COALESCE(SUM(hours) FILTER (WHERE done = true), 0) AS completed_hours,
  COALESCE(SUM(hours) FILTER (WHERE done = false), 0) AS pending_hours,

  CASE
    WHEN SUM(hours) = 0 THEN 0
    ELSE ROUND(
      (SUM(hours) FILTER (WHERE done = true) * 100.0) / SUM(hours)
    )
  END AS progress_percentage

FROM planner_tasks
WHERE user_id = 1`
        );
        res.status(200).json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch progress stats" });
    }
});

export default router;