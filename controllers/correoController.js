const {request, response} = require('express');
const nodeMailer = require('nodemailer');


const sendEmail = (req=request, resp=response) => {
    let body = req.body;
    let email = '';

    let config = nodeMailer.createTransport({
        host:'smtp-relay.gmail.com',
        post:587,
        auth:{
            user:'***@gmail.com',
            pass:'***'
        }
    })
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


    const options ={
    from: body.email,
    subject: body.subject,
    to: email,
    nombre: body.nombre,
    telefono: body.telefono, 
    text: emailBody
};

config.sendMail(options,function(error, result){
    if (error) return resp.json({ok:false, msg:error});
    return resp.json({
        ok:true,
        msg:result
    });
    })
}


module.exports = {
    sendEmail
}