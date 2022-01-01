const email = require("../config/email");
const nodemailer = require("nodemailer");
const hbs = require("nodemailer-express-handlebars");
const util = require("util");


var transport = nodemailer.createTransport({
    host: email.host,
    port: email.port,
    auth: {
      user: email.user,
      pass: email.pass
    }
  });

//Utilizando template de hablebars
transport.use('compile', hbs({
    viewEngine: {
    extName: '.handlebars',
    partialsDir: __dirname+'/../views/emails',
    layoutsDir: __dirname+'/../views/emails',
    defaultLayout: 'reset.handlebars',
   },
    viewPath : __dirname+'/../views/emails',
    extName : '.handlebars'
   }));

exports.enviar = async(opciones)=>{
    const opcionesEmail = {
        from: "devJobs <noreply@devjobs.com",
        to: opciones.usuario.email,
        subject: opciones.subject,
        template: opciones.archivo,
        context: {
            resetUrl: opciones.resetUrl
        }

    }
    const sendEmail =util.promisify(transport.sendMail, transport);
    return sendEmail.call(transport, opcionesEmail);
}