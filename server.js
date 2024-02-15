const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const port = 10000;

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(bodyParser.urlencoded({ extended: true }));

// Read the HTML form
const formHTML = fs.readFileSync('form1.html', 'utf8');

// Serve the HTML form
app.get('/', (req, res) => {
  res.send(formHTML);
});

// Handle form submission
app.post('/', (req, res) => {
  const formData = req.body;
  const additionalDataHTML = `
    <p>Votre Nom de famille est : ${formData.name}</p>
    <p>Votre Spécialité est : ${formData.speciality}</p>
  `;
  const responseHTML = `
    ${formHTML.replace('</div>', `
      ${additionalDataHTML}</div>`)}
  `;
  res.send(responseHTML);
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Server running at http://0.0.0.0:${port}/`);
});

