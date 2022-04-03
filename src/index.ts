import bodyParser from "body-parser";
import express from "express";
import pg from "pg";   

// Connect to the database using the DATABASE_URL environment
//   variable injected by Railway
const pool = new pg.Pool();

const app = express();
const port = process.env.PORT || 3333;

app.use(bodyParser.json());
app.use(bodyParser.raw({ type: "application/vnd.custom-type" }));
app.use(bodyParser.text({ type: "text/html" }));

app.get("/blockpulse/users", async (req, res) => {
  const { q } = await pool.query("SELECT * FROM BLOCKCHAIN_PULSE_USER");
  // res.send(`Hello, World! The time from the DB `);
  console.log(q.rows);
  res.json({
    data: [
      {
        quote: 'Not invited',
        author: 'Invader',
        data: q.rows
      }
    ],
    meta: {
      page: 'na'
    }
  });
  
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
