const express = require('express');
const app = express();
let cors = require('cors');
const bodyparser = require('body-parser');
const https = require('https');
let send = require('./controllers/correoController');
const PORT = process.env.PORT || '80';


//  app.use(cors());
// const corsOptions = {
//     origin: '*', // Permite cualquier origen
//     methods: 'GET, POST, PUT, DELETE, OPTIONS', // Permite todos los métodos HTTP
//     allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept', // Cabeceras permitidas
//   };

app.use(bodyparser.json({ extended: true }));
app.use(bodyparser.urlencoded({ extended: true }));
app.use(cors());
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
  


function requestController(req, res){
    console.log('hola')
    res.send('hola nodejs')
}

app.post('/send', send.sendEmail);
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

app.listen(PORT, ()=> {
    console.log('escuchando' + PORT)
})
