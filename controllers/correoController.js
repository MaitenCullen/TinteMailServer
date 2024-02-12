const {request, response} = require('express');
const nodeMailer = require('nodemailer');


const sendEmail = (req,res) => {
    let body = req.body;
    let email = process.env.EMAIL; 
    

    const transporter = nodeMailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587, // Puerto correcto para TLS
        secure: false, // Habilitar STARTTLS
        auth: {
            user: email,
            pass: process.env.PASSWORD // Asegúrate de que la variable de entorno sea PASSWORD
        }
    });

   
 const emailBody = `
    Nombre: ${body.nombre}
    \n
    Consulta: ${body.subject}
    \n
    Teléfono: ${body.telefono}
    \n
    Mensaje: ${body.mensaje}
    \n
  `;


  const mailOptions = {
    from: body.email,
    to: email,
    subject: body.subject,
    text: emailBody
};

transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        console.log(error);
        return res.status(500).json({ ok: false, msg: error.message });
    }
    console.log('Correo enviado: ' + info.response);
    return res.status(200).json({ ok: true, msg: 'Correo enviado exitosamente' });
});
}
module.exports = {
sendEmail
};
