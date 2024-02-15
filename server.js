const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 10000;

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(bodyParser.urlencoded({ extended: true }));

// Serve the HTML form
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/form1.html');
});

// Handle form submission
app.post('/', (req, res) => {
  const formData = req.body;
  res.send(`
    <p>Votre Nom est : ${formData.name}</p>
    <p>Votre Age est : ${formData.age}</p>
    <p>Votre Spécialité est : ${formData.speciality}</p>
    <p>Votre E-mail est : ${formData.email}</p>
  `);
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Server running at http://0.0.0.0:${port}/`);
});

