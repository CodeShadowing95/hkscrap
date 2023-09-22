import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import mysql from "mysql";

import { scrapeFromURL } from "./detectURL.js";
import { hashPassword, generateSalt, validatePassword, generateTempId } from "./hash.js";

const app = express();

dotenv.config();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  // host: process.env.MYSQL_HOST,
  host: "localhost",
  // user: process.env.MYSQL_USER,
  user: "root",
  // password: process.env.MYSQL_PASSWORD,
  password: "",
  // database: process.env.MYSQL_DATABASE,
  database: "stage_db",
  // port: process.env.MYSQL_PORT,
  port: "3306",
});

db.connect((err) => {
  if (err) {
    console.log("Error connecting to MySQL: " + err.message);
    return;
  }
  console.log("Connected to MySQL database");
});

const port = process.env.PORT || 8000;


// ***************************************************************** API requests for the scraped datas *****************************************************************
app.get("/all", async (req, res) => {
  const sql = "SELECT * FROM dataoverview";
  db.query(sql, (err, data) => {
    if (err) {
      console.error("Error fetching data: ", err);
      res.status(500).json({ error: "An error occurred while fetching data" });
      return;
    }

    if (data.length >= 0) {
      return res.status(200).json(data);
    }
  });
});

app.get("/recentDatas", async (req, res) => {
  const sql = "SELECT * FROM dataoverview ORDER BY do_id DESC LIMIT 10";
  db.query(sql, (err, data) => {
    if (err) {
      console.error("Error fetching data: ", err);
      res.status(500).json({ error: "An error occurred while fetching data" });
      return;
    }

    if (data.length >= 0) {
      return res.status(200).json(data);
    }
  });
});
// **********************************************************************************************************************************************************

// ***************************************************************** API requests for users *****************************************************************
app.post("/login", async (req, res) => {
  const sql =
  // "SELECT nom, prenom, email, avatar, role, pays, telephone, motdepasse FROM user WHERE `email` = ?";
    "SELECT nom, prenom, email, avatar, role, pays, telephone, motdepasse FROM user WHERE email = ?";
  const { password } = req.body;

  db.query(sql, [req.body.email_username], async (err, data) => {
    if (err) {
      return res.status(400).json("Error: " + err);
    }

    if (data.length > 0) {
      if (data[0].role == "ModÃ©rateur" || data[0].role == "Modérateur") {
        return res.status(200).json(data);
      }

      const validPassword = await validatePassword(
        password,
        data[0].motdepasse
      );

      if (validPassword) {
        return res.status(200).json(data);
      } else {
        return res.status(400).json("Email or password are incorrect");
      }
    } else {
      return res.status(400).json("No such password");
    }
  });
});

app.post("/register", async (req, res) => {
  const sql =
    "INSERT INTO user (prenom, email, motdepasse, role) VALUES (?, ?, ?, ?)";
  const { email, password } = req.body;
  const role = "Utilisateur";
  const randomId = generateTempId();
  const prenom = "user_" + randomId;
  const values = [
    prenom,
    email,
    password,
    role,
  ];
  try {
    db.query(sql, values, (err, data) => {
      if (err) return res.json(err);

      res.status(200).json({ message: 'Login successful' });
    });
  } catch (error) {
    console.log("Error encountered: " + error);
  }
});

app.get("/get-users", async (req, res) => {
  const sql = `SELECT * FROM user WHERE user_id NOT LIKE ${process.env.ADMIN_ID}`;
  try {
    db.query(sql, (err, rows) => {
      if (err) {
        console.error("Error fetching data: ", err);
        res
          .status(500)
          .json({ error: "An error occurred while fetching data" });
        return;
      }

      if (rows.length >= 0) {
        return res.status(200).json({ data: rows });
      }
    });
  } catch (error) {
    console.error("Query is not executed: ", error);
  }
});

app.get('/count-users', async (req, res) => {
  const sql = `SELECT COUNT(*) AS countUsers FROM user WHERE user_id <> ${process.env.ADMIN_ID}`;
  try {
    db.query(sql, (err, data) => {
      if(err){
        console.error('Error fetching data: ', err);
        res.status(500).json({ error: 'An error occurred while fetching data' });
        return;
      }

      if(data) {
        return res.status(200).json(data);
      }
    })
  } catch (error) {
    console.error("Query is not executed: ", error);
  }
})

app.get('/count-scraped-datas', async (req, res) => {
  const sql = 'SELECT SUM(LIGNES) AS totalDatas FROM dataoverview';
  try {
    db.query(sql, (err, data) => {
      if(err){
        console.error('Error fetching data: ', err);
        res.status(500).json({ error: 'An error occurred while fetching data' });
        return;
      }

      if(data) {
        return res.status(200).json(data);
      }
    })
  } catch (error) {
    console.error("Query is not executed: ", error);
  }
})

app.post('/get-user-id', async (req, res) => {
  const sql = 'SELECT user_id from user WHERE nom = ? AND prenom = ?'
  const { nom, prenom } = req.body;
  const values = [nom, prenom];
  db.query(sql, values, (err, data) => {
    if (err) return res.json("Error: " + err);

    if (data.length > 0) {
      return res.status(200).json(data);
    } else {
      return res.status(400).json("User ID not found");
    }
  });
});

app.post("/new-user", async (req, res) => {
  const sql =
    "INSERT INTO user (nom, prenom, email, telephone, motdepasse, role, pays) VALUES (?, ?, ?, ?, ?, ?, ?)";
  const { lastname, firstname, email, telephone, country } = req.body;
  const userData = req.body;
  const role = "Utilisateur";
  let salt = await generateSalt();
  const motdepasse = await hashPassword("qsd", salt);
  const values = [
    lastname,
    firstname,
    email,
    telephone,
    motdepasse,
    role,
    country,
  ];
  try {
    db.query(sql, values, (err, data) => {
      if (err) return res.json(err);

      const newUser = { ...userData, role };
      res.status(201).json(newUser);
    });
  } catch (error) {
    console.log("Error encountered: " + error);
  }
});

app.put("/edit-profile/:id", async (req, res) => {
  const userId = req.params.id;
  const { lastname, firstname, email, phone, country } = req.body;
  const values = [lastname, firstname, email, phone, country, userId];

  const sql =
    "UPDATE user SET nom=?, prenom=?, email=?, telephone=?, pays=? WHERE user_id=?";
  try {
    db.query(sql, values, (err, result) => {
      if (err) return res.json(err);

      const updatedProfile = req.body;
      res.status(201).send(updatedProfile);
    });
  } catch (error) {
    console.log("Error encountered: " + error);
  }
});

app.delete("/delete/:id", async (req, res) => {
  const sql = `DELETE FROM user WHERE user_id = ? AND user_id <> ${process.env.ADMIN_ID}`;
  const id = req.params.id;

  db.query(sql, [id], (err) => {
    if (err) return res.json(err);

    res.status(204).send();
  });
});
// **********************************************************************************************************************************************************

// ***************************************************************** API requests for datas *****************************************************************
app.post("/scrape", async (req, res) => {
  try {
    const { url } = req.body;
    // console.log('Received request:', req.body);
    
    const datas = await scrapeFromURL(url);

    res.status(200).json({ data: datas });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      error: "An error occurred while scraping data",
      details: error.message,
    });
  }
});

app.post("/store-scraped-data", async (req, res) => {
  const sql =
    "INSERT INTO dataoverview (user_id, label, website, start_date, exec_time, lignes, results) VALUES (?, ?, ?, ?, ?, ?, ?)";
  const { userId, label, website, startDate, execTime, lines, resultsFile } =
    req.body;
  const values = [
    userId,
    label,
    website,
    startDate,
    execTime,
    lines,
    resultsFile,
  ];
  try {
    db.query(sql, values, (err) => {
      if (err) return res.json("Error: " + err);

      return res.status(200).json({ message: "Success" });
    });
  } catch (error) {
    console.error("Erreur lors de l'enregistrement", error);
  }
})

app.post('/scrapes-count-by-site', async (req, res) => {
  const sql = "SELECT COUNT(*) AS counter FROM dataoverview WHERE website = ?";
  const { website } = req.body;
  const values = [website];
  try {
    db.query(sql, values, (err, data) => {
      if(err){
        console.error('Error fetching data: ', err);
        res.status(500).json({ error: 'An error occurred while fetching data' });
        return;
      }
      
      if(data) {
        return res.status(200).json(data);
      }
    })
  } catch (error) {
    console.error("Error", error);
  }
})
// **********************************************************************************************************************************************************

app.listen(port, () => {
  console.log("Server running on port " + port);
});
