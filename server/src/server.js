import dotenv from "dotenv";
dotenv.config();

console.log("ENV CHECK:", {
  DB_PASSWORD: process.env.DB_PASSWORD,
  TYPE: typeof process.env.DB_PASSWORD,
});

import app from "./app.js";
import './db/index.js';

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
