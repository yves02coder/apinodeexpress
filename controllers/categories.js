import mysql from 'mysql';

let categories = [];
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



export const getCategories = (req, res) => {
  db.query('SELECT * FROM categories', (err, results) => {
      if (err) {
        console.error('Error querying the database: ' + err.stack);
        res.status(500).json({ error: 'Database error' });
        return;
      }
      res.json(results);
    })

  //res.send(results);
}



export const createCategories = (req, res) => {   
  const newCategories = req.body;
  db.query('INSERT INTO categories SET ?', newCategories, (err, result) => {
      if (err) {
        console.error('Error inserting categories: ' + err.stack);
        res.status(500).json({ error: 'Database error' });
        return;
      }
      res.json({ message: 'Categories created successfully', categorieId: result.insertId });
    });
};


export const getCategorie = (req, res) => {
  const categoriesId = req.params.id;

  db.query('SELECT * FROM categories WHERE id = ?', categoriesId, (err, results) => {
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



export const deleteCategorie = (req, res) => { 
  console.log(`categorie with id ${req.params.id} has been deleted`);
  
  categories = categories.filter((categorie) => categorie.id !== req.params.id);
};




export const updateCategories =  (req,res) => {
  const categoriesId = req.params.id;
const updatedCategorie = req.body;

db.query('UPDATE categories SET ? WHERE id = ?', [updatedCategorie, categoriesId], (err, result) => {
  if (err) {
    console.error('Error updating categories: ' + err.stack);
    res.status(500).json({ error: 'Database error' });
    return;
  }

  if (result.affectedRows === 0) {
    res.status(404).json({ error: 'Produit'

    })
  }})
  

};