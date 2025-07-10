import dotenv from "dotenv";
import pg from "pg";

dotenv.config(); // load .env

const { Client } = pg;

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

client.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err.stack);
    process.exit(1);
  } else {
    console.log("Connected to the database.");
  }
});

/**
 * Executes a SQL query with optional parameters.
 * @param {string} sql - The SQL query string. Use $1, $2, etc. as placeholders.
 * @param {(string|number)[]} [params=[]] - Parameters to substitute into the query.
 * @returns {Promise<Object[]>} - Array of result rows.
 */
export function executeQuery(sql, params = []) {
  return new Promise((resolve, reject) => {
    client.query(sql, params, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result.rows);
      }
    });
  });
}
