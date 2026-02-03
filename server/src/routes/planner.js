import express from "express";
import pool from "../db/index.js";

const router = express.Router();

/**
 * ADD TO PLANNER
 */
router.post("/", async (req, res) => {
  const { subjectId, topicId, hours } = req.body;

  try {
    const result = await pool.query(
      `
      INSERT INTO planner_tasks (user_id, subject_id, topic_id, hours)
      VALUES ($1, $2, $3, $4)
      RETURNING *
      `,
      [1, subjectId, topicId, hours ?? 1],
    );

    res.status(201).json(result.rows[0]);
    console.log("ADD PLANNER RESULT:", result.rows[0]);
  } catch (err) {
    console.error("ADD PLANNER ERROR:", err.message);
    res.status(500).json({ error: err.message });
  }
});

/**
 * GET PLANNER
 */
router.get("/", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT
        pt.id,
        pt.hours,
        pt.done,
        s.name AS subject_name,
        t.name AS topic_name
      FROM planner_tasks pt
      JOIN subjects s ON s.id = pt.subject_id
      JOIN topics t ON t.id = pt.topic_id
      WHERE pt.user_id = 1
      ORDER BY pt.id DESC
    `);

    res.json(result.rows);
  } catch (err) {
    console.error("FETCH PLANNER ERROR:", err.message);
    res.status(500).json({ error: err.message });
  }
});

/**
 * TOGGLE DONE
 */
router.patch("/:id/toggle", async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      `
      UPDATE planner_tasks
      SET done = NOT done
      WHERE id = $1
      RETURNING *
      `,
      [id],
    );

    res.json(result.rows[0]);
  } catch (err) {
    console.error("TOGGLE ERROR:", err.message);
    res.status(500).json({ error: err.message });
  }
});

/**
 * UPDATE HOURS
 */
router.patch("/:id/hours", async (req, res) => {
  const { id } = req.params;
  const { hours } = req.body;

  try {
    const result = await pool.query(
      `
      UPDATE planner_tasks
      SET hours = $1
      WHERE id = $2
      RETURNING *
      `,
      [hours, id],
    );

    res.json(result.rows[0]);
  } catch (err) {
    console.error("UPDATE HOURS ERROR:", err.message);
    res.status(500).json({ error: err.message });
  }
});

export default router;
