const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());
 
const db = mysql.createConnection({ host: 'localhost', user: 'root',  password: 'root', database: 'sb',});
db.connect(err => {  if (err) throw err;   console.log('Connected to MySQL'); });
 
//Register Page 
app.get('/register', (req, res) => {
  db.query('SELECT * FROM auth', (err, result) => {
    if (err) return res.send(err);
    res.json(result);
  });
});
app.post('/register', (req, res) => {
  const { username,email,password,role} = req.body;
  db.query('INSERT INTO auth (username,email,password,role) VALUES (?, ?, ?,?)', [username,email,password,role],(err, result) => {
      if (err) return res.send(err);
      res.json({ id: result.insertId, username,email,password,role });
    }
  );
});
app.put('/register/:id', (req, res) => {
  const { username,password,role} = req.body;
  db.query('UPDATE auth SET username = ?, password = ? , role = ?  WHERE id = ?', [username,password,role, req.params.id], err => {
      if (err) return res.send(err);
      res.sendStatus(200);
    }
  );
});
app.delete('/register/:id', (req, res) => {
  db.query('DELETE FROM auth WHERE id = ?', [req.params.id], err => {
    if (err) return res.send(err);
    res.sendStatus(200);
  });
});

 
//Login page
app.post('/login', (req, res) => {
  const { email, password ,role} = req.body;
  db.query(
    'SELECT * FROM auth WHERE email = ? AND password = ? AND role = ?',
    [email, password,role],
    (err, results) => {
      if (err) return res.status(500).send({ message: 'Server error' });
 
      if (results.length > 0) {
        res.status(200).send({ message: 'Login successful', user: results[0] });
      } else {
        res.status(401).send({ message: 'Wrong credentials' });
      }
    }
  );
});
 
 
 
//Service Center Page of Admin dashboard

// Get all service centers
app.get('/serviceCenters', (req, res) => {
  db.query('SELECT * FROM serviceCenter', (err, result) => {
    if (err) return res.status(500).send(err);
    res.json(result);
  });
});

// Add a new service center
app.post('/serviceCenters', (req, res) => {
  const { name, location, contact, rating, feedback } = req.body;
  db.query(
    'INSERT INTO serviceCenter (name, location, contact, rating, feedback) VALUES (?, ?, ?, ?, ?)',
    [name, location, contact, rating, feedback],
    (err, result) => {
      if (err) return res.status(500).send(err);
      res.json({ id: result.insertId, name, location, contact, rating, feedback });
    }
  );
});

// Update a service center
app.put('/serviceCenters/:id', (req, res) => {
  const { name, location, contact, rating, feedback } = req.body;
  db.query(
    'UPDATE serviceCenter SET name = ?, location = ?, contact = ?, rating = ?, feedback = ? WHERE serviceCenterId = ?',
    [name, location, contact, rating, feedback, req.params.id],
    (err) => {
      if (err) return res.status(500).send(err);
      res.sendStatus(200);
    }
  );
});

// Delete a service center
app.delete('/serviceCenters/:id', (req, res) => {
  db.query('DELETE FROM serviceCenter WHERE serviceCenterId = ?', [req.params.id], (err) => {
    if (err) return res.status(500).send(err);
    res.sendStatus(200);
  });
});

//serviceTypes

// Get all service types
app.get('/serviceTypes', (req, res) => {
  db.query('SELECT * FROM serviceType', (err, result) => {
    if (err) return res.status(500).send(err);
    res.json(result);
  });
});

// Add a new service type
app.post('/serviceTypes', (req, res) => {
  const { description, price, status, serviceCenterId } = req.body;
  db.query(
    'INSERT INTO serviceType (description, price, status, serviceCenterId) VALUES (?, ?, ?, ?)',
    [description, price, status, serviceCenterId],
    (err, result) => {
      if (err) return res.status(500).send(err);
      res.json({ id: result.insertId, description, price, status, serviceCenterId });
    }
  );
});

// Update a service type
app.put('/serviceTypes/:id', (req, res) => {
  const { description, price, status, serviceCenterId } = req.body;
  db.query(
    'UPDATE serviceType SET description = ?, price = ?, status = ?, serviceCenterId = ? WHERE serviceTypeId = ?',
    [description, price, status, serviceCenterId, req.params.id],
    (err) => {
      if (err) return res.status(500).send(err);
      res.sendStatus(200);
    }
  );
});

// Delete a service type
app.delete('/serviceTypes/:id', (req, res) => {
  db.query('DELETE FROM serviceType WHERE serviceTypeId = ?', [req.params.id], (err) => {
    if (err) return res.status(500).send(err);
    res.sendStatus(200);
  });
});

//Users end points 

// Get user by ID

app.get('/users', (req, res) => {
  db.query('SELECT * FROM users', (err, result) => {
    if (err) return res.status(500).send(err);
    res.json(result);
  });
});


app.get('/users/:userId', (req, res) => {
  db.query('SELECT * FROM users WHERE userId = ?', [req.params.userId], (err, result) => {
    if (err) return res.status(500).send(err);
    if (result.length === 0) return res.status(404).send('User not found');
    res.json(result);
  });
});


// Create a new user

app.post('/users', (req, res) => {
  const { userId, first_name, last_name, email, address, phone, status } = req.body;

  // Step 1: Validate userId and email against auth table
  db.query('SELECT * FROM auth WHERE id = ? AND email = ?', [userId, email], (err, result) => {
    if (err) return res.status(500).send({ message: 'Server error during validation' });

    if (result.length === 0) {
      return res.status(400).send({ message: 'Invalid userId or email. Please register first.' });
    }

    // Step 2: Insert into users table
    db.query(
      'INSERT INTO users (userId, first_name, last_name, email, address, phone, status) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [userId, first_name, last_name, email, address, phone, status],
      (err, insertResult) => {
        if (err) return res.status(500).send({ message: 'Error inserting user details' });
        res.status(201).json({ id: insertResult.insertId, ...req.body });
      }
    );
  });
});


// Update all user fields by ID
app.put('/users/:userId', (req, res) => {
  const { first_name, last_name, email, address, phone, status } = req.body;
  db.query(
    'UPDATE users SET first_name = ?, last_name = ?, email = ?, address = ?, phone = ?, status = ? WHERE userId = ?',
    [first_name, last_name, email , address, phone, status, req.params.userId],
    (err) => {
      if (err) return res.status(500).send(err);
      res.sendStatus(200);
    }
  );
});

// Patch user status by ID

app.patch('/users/:userId/status', (req, res) => {
  const { status } = req.body;
  db.query(
    'UPDATE users SET status = ? WHERE userId = ?',
    [status, req.params.userId],
    (err) => {
      if (err) return res.status(500).send(err);
      res.sendStatus(200);
    }
  );
});


// Delete user by ID
app.delete('/users/:userId', (req, res) => {
  db.query('DELETE FROM users WHERE userId = ?', [req.params.userId], (err) => {
    if (err) return res.status(500).send(err);
    res.sendStatus(200);
  });
});


app.listen(3001, () => { console.log('Server running on http://localhost:3001'); });



// app.listen(3001, '0.0.0.0', () => {
//   console.log('Server running on http://10.112.61.12:3001');
// });