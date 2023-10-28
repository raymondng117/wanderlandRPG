const express = require('express');
const cors = require('cors'); // Import the cors module
const app = express();
const port = 3000;

// Enable CORS using the cors middleware
app.use(cors());

// Serve static files
app.use(express.static('public'));

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});