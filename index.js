import  express  from "express";
import bodyParser from 'body-parser';
import mysql from'mysql';
import userRoutes from './routes/users.js';
import productRoutes from './routes/products.js';
import categorieRoutes from './routes/categories.js';
// Create a MySQL database connection
const db = mysql.createConnection({
    host: 'localhost:3306',
    user: 'sogedi',
    password: '******',
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

const app = express();
const PORT = 5000;

app.use(bodyParser.json());

app.use('/produits', userRoutes);
app.use('/categories', categorieRoutes);

app.get('/', (req, res)=> {
    db.query('SELECT * FROM users', (err, results) => {
        if (err) {
          console.error('Error querying the database: ' + err.stack);
          res.status(500).json({ error: 'Database error' });
          return;
        }
        res.json(results);
      })
}
);

app.get('/', (req, res)=> {
  db.query('SELECT * FROM categories', (err, results) => {
      if (err) {
        console.error('Error querying the database: ' + err.stack);
        res.status(500).json({ error: 'Database error' });
        return;
      }
      res.json(results);
    })
}
);

app.use('/', productRoutes);

app.get('/', (req, res)=> {
  db.query('SELECT * FROM products', (err, results) => {
      if (err) {
        console.error('Error querying the database: ' + err.stack);
        res.status(500).json({ error: 'Database error' });
        return;
      }
      res.json(results);
    })
}
);


app.all("*", (req, res) =>res.send("You've tried reaching a route that doesn't exist."));


app.listen(PORT, () => console.log(`server run on port :http://localhost:${PORT}`));
