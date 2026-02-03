import express from "express";
import pool from "../db/index.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    console.log("Fetching subjects and topics for user_id 1");
    const subjectsResult = await pool.query(
      "SELECT * FROM subjects WHERE user_id = 1"
    );

    const topicsResult = await pool.query(` SELECT
        t.id,
        t.name,
        t.subject_id,
        COALESCE(pt.done, false) AS done
      FROM topics t
      LEFT JOIN planner_tasks pt
        ON pt.topic_id = t.id
        AND pt.user_id = 1`);

    const subjects = subjectsResult.rows.map((subject) => ({
      ...subject,
      topics: topicsResult.rows.filter((t) => t.subject_id === subject.id),
    }));

    res.json(subjects);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/", async (req, res) => {
  const { name } = req.body;

  try {
    const result = await pool.query(
      "INSERT INTO subjects (user_id, name) VALUES (1, $1) RETURNING *",
      [name],
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("GET /subjects ERROR:", err);
    res.status(500).json({ error: "Failed to create subject" });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await pool.query("DELETE FROM subjects WHERE id = $1 AND user_id = 1", [
      id,
    ]);

    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete subject" });
  }
});

export default router;
