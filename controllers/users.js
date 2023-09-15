import { v4 as uuid } from 'uuid';
import mysql from 'mysql';
let users = [];
// Create a MySQL database connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'php-react',
  });

// Connect to the database
db.connect((err) => {
    if (err) {
      console.error('Error connecting to the database: ' + err.stack);
      return;
    }
    console.log('Connected to MySQL database as ID ' + db.threadId);
  });

export const getUsers = (req, res) => {
    db.query('SELECT * FROM users', (err, results) => {
        if (err) {
          console.error('Error querying the database: ' + err.stack);
          res.status(500).json({ error: 'Database error' });
          return;
        }
        res.json(results);
      })

    //res.send(results);
}



export const createUser = (req, res) => {   
    const newUser = req.body;
    db.query('INSERT INTO users SET ?', newUser, (err, result) => {
        if (err) {
          console.error('Error inserting user: ' + err.stack);
          res.status(500).json({ error: 'Database error' });
          return;
        }
        res.json({ message: 'User created successfully', userId: result.insertId });
      });
};


export const getUser = (req, res) => {
    const userId = req.params.id;

    db.query('SELECT * FROM users WHERE id = ?', userId, (err, results) => {
      if (err) {
        console.error('Error querying the database: ' + err.stack);
        res.status(500).json({ error: 'Database error' });
        return;
      }
  
      if (results.length === 0) {
        res.status(404).json({ error: 'User not found' });
        return;
      }
  
      res.json(results[0]);
    });
};


export const deleteUser = (req, res) => { 
    console.log(`user with id ${req.params.id} has been deleted`);
    
    users = users.filter((user) => user.id !== req.params.id);
};


export const updateUser =  (req,res) => {
    const userId = req.params.id;
  const updatedUser = req.body;

  db.query('UPDATE users SET ? WHERE id = ?', [updatedUser, userId], (err, result) => {
    if (err) {
      console.error('Error updating user: ' + err.stack);
      res.status(500).json({ error: 'Database error' });
      return;
    }

    if (result.affectedRows === 0) {
      res.status(404).json({ error: 'User'

      })
    }})
    
 
};
