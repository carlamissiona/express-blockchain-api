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
  const { rows } = await pool.query("SELECT * FROM BLOCKCHAIN_PULSE_USER");
   
  console.log(rows);
  res.json({
    data: [
      {
        users: rows
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
