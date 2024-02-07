// Ce programme est écrit en JavaScript
//,en utilisant Node.js pour créer un
// serveur HTTP et gérer les requêtes
// GET et POST.




// Importation des modules requis
const http = require('http');
const fs = require('fs');

// Lecture du fichier HTML du formulaire
const formHTML = fs.readFileSync('form1.html', 'utf8');

// Création du serveur HTTP
const server = http.createServer((req, res) => {
  if (req.method === 'GET') {
    // Servir le formulaire en cas de requête GET
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(formHTML);
  } else if (req.method === 'POST') {
    // Gérer les données du formulaire en cas de requête POST
    let body = '';
    req.on('data', (chunk) => {
      body += chunk;
    });

    req.on('end', () => {
      // Répondre avec les données reçues ainsi que le formulaire
      res.writeHead(200, { 'Content-Type': 'text/html' });
      if (body.trim() !== '') {
        // Si des données sont présentes dans le corps de la requête, les afficher dans la div
        const formData = parseFormData(body);
        res.end(`
          ${formHTML.replace('</div>', `<p>Votre Nom est : ${formData.name}</p>
                                          <p>Votre Age est : ${formData.age}</p>
                                          <p>Votre Spécialité est : ${formData.speciality}</p>
                                          <p>Votre E-mail est : ${formData.email}</p></div>`)}
        `);
      } else {
        // Si le corps de la requête est vide, afficher uniquement le formulaire
        res.end(formHTML);
      }
    });
  }
});

// Fonction pour analyser les données du formulaire
function parseFormData(formData) {
  const parsedData = {};
  formData.split('&').forEach((pair) => {
    const [key, value] = pair.split('=');
    parsedData[decodeURIComponent(key)] = decodeURIComponent(value.replace(/\+/g, ' '));
  });
  return parsedData;
}

// Port sur lequel le serveur écoutera
const port = 3000;
server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
