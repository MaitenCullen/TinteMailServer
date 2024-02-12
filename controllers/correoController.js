const {request, response} = require('express');
const nodeMailer = require('nodemailer');


const sendEmail = (req=request, resp=response) => {
    let body = req.body;
    let email = process.env.EMAIL; 
    

    let config = nodeMailer.createTransport({
        host:'smtp.gmail.com',
        post:465,
        secure: true,
        auth:{
            user:email,
            pass:process.env.password
        }
    })

    const transporter = nodeMailer.createTransport(config);
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
        return resp.json({ ok: false, msg: error.message });
    }
    console.log('Correo enviado: ' + info.response);
    return resp.json({ ok: true, msg: 'Correo enviado exitosamente' });
});
};

module.exports = {
sendEmail
};
