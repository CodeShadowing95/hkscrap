import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import mysql from 'mysql';

import { scrapeFromURL } from './detectURL.js';
import { hashPassword } from './hash.js';

const app = express();

dotenv.config();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'stage_db',
});

db.connect((err) => {
  if (err) {
    console.log('Error connecting to MySQL: ' + err.message);
    return;
  }
  console.log('Connected to MySQL database');
});

const port = process.env.PORT || 8000;

// ************************************ API request authenticated user ********************************************** //
app.post('/login', (req, res) => {
  const sql = "SELECT nom, prenom, email, avatar, role, pays FROM user WHERE `email` = ? AND `motdepasse` = ?";
  const { password } = req.body;
  const hashedPassword = hashPassword(password);
  db.query(sql, [req.body.email_username, hashedPassword], (err, data) => {
    if(err) return res.json("Error: " + err);
    
    if(data.length > 0) {
      return res.status(200).json(data);
    } else {
      return res.status(400).json("No such user");
    }
  })
})
// *******************************************************************************************************


// ************************************ API requests for the scraped datas ********************************************** //
app.get('/all', async (req, res) => {
  const sql = 'SELECT * FROM dataoverview'
  db.query(sql, (err, data) => {
    if(err){
      console.error('Error fetching data: ', err);
      res.status(500).json({ error: 'An error occurred while fetching data' });
      return;
    }

    if(data.length >= 0) {
      return res.status(200).json(data);
    }
  })
})

app.get('/recentDatas', async (req, res) => {
  const sql = 'SELECT * FROM dataoverview ORDER BY do_id DESC LIMIT 10'
  db.query(sql, (err, data) => {
    if(err){
      console.error('Error fetching data: ', err);
      res.status(500).json({ error: 'An error occurred while fetching data' });
      return;
    }

    if(data.length >= 0) {
      return res.status(200).json(data);
    }
  })
})
// *******************************************************************************************************


// ************************************ API requests for users ********************************************** //
app.get('/get-users', async (req, res) => {
  const sql = `SELECT * FROM user WHERE user_id NOT LIKE ${process.env.ADMIN_ID}`;
  try {
    db.query(sql, (err, rows) => {
      if(err){
        console.error('Error fetching data: ', err);
        res.status(500).json({ error: 'An error occurred while fetching data' });
        return;
      }

      if(rows.length >= 0) {
        return res.status(200).json({ data: rows });
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
    if(err) return res.json("Error: " + err);

    if(data.length > 0) {
      return res.status(200).json(data);
    } else {
      return res.status(400).json("User ID not found");
    }
  })
})

app.post('/new-user', async (req, res) => {
  const sql = "INSERT INTO user (nom, prenom, email, telephone, motdepasse, role, pays) VALUES (?, ?, ?, ?, ?, ?, ?)"
  const { lastname, firstname, email, telephone, country } = req.body;
  const userData = req.body;
  const role = "Utilisateur";
  const motdepasse = hashPassword("qsd")
  const values = [lastname, firstname, email, telephone, motdepasse, role, country]
  try {
    db.query(sql, values, (err, data) => {
      if (err) return res.json(err);

      const newUser = {...userData, role}
      res.status(201).json(newUser);
    })
  } catch (error) {
    console.log("Error with the query: " + error);
  }
})

app.delete('/delete/:id', async (req, res) => {
  const sql = `DELETE FROM user WHERE user_id = ? AND user_id <> ${process.env.ADMIN_ID}`;
  const id = req.params.id;

  db.query(sql, [id], (err) => {
    if (err) return res.json(err);

    res.status(204).send();
  })
})
// *******************************************************************************************************


// ************************************ API requests for datas ********************************************** //
app.post('/scrape', async (req, res) => {
  try {
    const { url } = req.body;
    console.log('Received request:', req.body);
    
    const datas = await scrapeFromURL(url);

    res.status(200).json({ data: datas });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred while scraping data', details: error.message });
  }
})

app.post('/store-scraped-data', async (req, res) => {
  const sql = 'INSERT INTO dataoverview (user_id, label, website, start_date, exec_time, lignes, results) VALUES (?, ?, ?, ?, ?, ?, ?)';
  const { userId, label, website, startDate, execTime, lines, resultsFile } = req.body;
  const values = [userId, label, website, startDate, execTime, lines, resultsFile];
  try {
    db.query(sql, values, (err) => {
      if(err) return res.json("Error: " + err);

      return res.status(200).json({ message: "Success" });
    })
  } catch (error) {
    console.error("Erreur lors de l'enregistrement", error);
  }
})
// *******************************************************************************************************


app.listen(port, () => {
  console.log('Server running on port ' + port);
})