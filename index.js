const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const nodeMailer = require('nodemailer');

const PORT = process.env.PORT || 80;

const corsOptions = {
    origin: '*', // Permite cualquier origen
    methods: 'GET, POST, PUT, DELETE, OPTIONS', // Permite todos los métodos HTTP
    allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept', // Cabeceras permitidas
  };
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(cors(corsOptions));
  
function requestController(req, res){
    console.log('hola')
    res.send('hola nodejs')
}
app.post('/send', sendEmail);

   app.use((req, res, next) => {
      res.header("Access-Control-Allow-Origin", "*");
     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
 });

 const server = https.createServer(requestController)
 app.get("/", (req, res) => {
     const htmlResponse = `
     <html>
         <head>
             <title>Probando</title>
         </head>
         <body>
             <h1>Hola</h1>
         </body>
     </html>
     `;
     res.send(htmlResponse);
 })
 

 app.listen(PORT, () => {
    console.log('Escuchando en el puerto ' + PORT);
});