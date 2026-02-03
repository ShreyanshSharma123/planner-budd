import express from 'express';
import pool from  "../db/index.js";

const router = express.Router();
// post-topic
router.post("/", async (req, res) => {
    const { subjectId, name } = req.body;

    try {
        const result = await pool.query(
            "INSERT INTO topics (subject_id, name) VALUES ($1, $2) RETURNING *",
            [subjectId, name]
        );

        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to create topic" });
    }
});

// edit-topic
router.put("/:id",  async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    try {
        const result = await pool.query(
            "UPDATE topics SET name = $1 WHERE id = $2 RETURNING *",
            [name, id]
        );

        res.status(200).json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to update topic" });
    }
});

// delete-topic
router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query(
            "DELETE FROM topics WHERE id = $1 RETURNING *",
            [id]
        );

        res.status(200).json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to delete topic" });
    }
});

export default router;