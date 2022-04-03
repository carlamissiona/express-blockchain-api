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
   p=req.body;
     console.log(p);
   name_crypto= p.name;
   description_crypto =p.description;
   price_crypto=p.price;
   type_crypto=p.type;
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
  u=req.body;  console.log(u);
   name_user = u.name;
   email = u.email;
   password = u.email;
   recovery = u.recovery;
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
