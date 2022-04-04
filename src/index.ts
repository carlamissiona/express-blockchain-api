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
  const { rows } = await pool.query("SELECT * FROM BLOCKPULSE_USER");   
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
  const { rows } = await pool.query("SELECT * FROM BLOCKPULSE_PRICE");   
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
  console.log(req);
   if (!req.body) {
    console.log('No price is provided');
  }
  let p=req.body;
     console.log(p);
  const name_crypto= p.name;
   const description_crypto =p.description;
  const price_crypto=p.price;
  const type_crypto=p.type;
  const { rows } = await pool.query("INSERT INTO BLOCKPULSE_PRICE ('name',	'description',	'price', 'type') ($1, $2, $3, $4)', [name_crypto,description_crypto,price_crypto, type_crypto], )");   
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

app.post("/blockpulse/users/create", async (req, res) => {
   if (!req.body) {
    console.log('No user is provided');
  }
  console.log(req);
  let u=req.body;  console.log(u);
  const name_user = u.name;
  const email = u.email;
  const password = u.email;
 const  recovery = u.recovery;
  const { rows } = await pool.query("INSERT INTO BLOCKPULSE_USER ('name',	'email',	'password', 'recovery') ($1, $2, $3, $4)', [name_user,email,password, recovery], )");   
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
