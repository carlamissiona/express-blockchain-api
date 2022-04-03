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

app.get("/blockpulse/prices", async (req, res) => {
  const { rows } = await pool.query("SELECT * FROM BLOCKCHAIN_PULSE_PRICES");   
  console.log(rows);
  res.json({
    data: [
      {
        prices: rows
      }
    ],
    meta: {
      page: 'na'
    }
  });
  
});

app.post("/blockpulse/prices/create", async (req, res) => {
  const { rows } = await pool.query("INSERT INTO BLOCKCHAIN_PULSE_PRICES ('name',	'source',	'price', 'type') ($1, $2, $3, $4)', [name,source,price, type], )");   
  console.log(rows);
  res.json({
    data: [
      {
        prices: rows
      }
    ],
    meta: {
      page: 'na'
    }
  });
  
});
id	name	source	price	date_added	date_modified	type

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
