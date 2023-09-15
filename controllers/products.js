import mysql from 'mysql';
let produits = [];
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



export const getProduit = (req, res) => {
  db.query('SELECT * FROM products', (err, results) => {
      if (err) {
        console.error('Error querying the database: ' + err.stack);
        res.status(500).json({ error: 'Database error' });
        return;
      }
      res.json(results);
    })

  //res.send(results);
}



export const createProduit = (req, res) => {   
  const newProduits = req.body;
  db.query('INSERT INTO products SET ?', newProduits, (err, result) => {
      if (err) {
        console.error('Error inserting user: ' + err.stack);
        res.status(500).json({ error: 'Database error' });
        return;
      }
      res.json({ message: 'User created successfully', userId: result.insertId });
    });
};


export const getProduits = (req, res) => {
  const produitsId = req.params.id;

  db.query('SELECT * FROM products WHERE id = ?', produitsId, (err, results) => {
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



export const deleteProduit = (req, res) => { 
  console.log(`produit with id ${req.params.id} has been deleted`);
  
  produits = produits.filter((produit) => produit.id !== req.params.id);
};




export const updateProduit =  (req,res) => {
  const produitId = req.params.id;
const updatedProduit = req.body;

db.query('UPDATE products SET ? WHERE id = ?', [updatedProduit, produitId], (err, result) => {
  if (err) {
    console.error('Error updating user: ' + err.stack);
    res.status(500).json({ error: 'Database error' });
    return;
  }

  if (result.affectedRows === 0) {
    res.status(404).json({ error: 'Produit'

    })
  }})
  

};