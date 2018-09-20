const nodemailer = require('nodemailer');

var Mailer = function(emailid, subject, mail_body)
{
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'pdevs2018@gmail.com',
            pass: 'pdevs@123'
        }
    });

    mailOptions = {
        from: 'pdevs2018@gmail.com',
        to: emailid,
        subject: subject,
        html : mail_body
    };
    return transporter.sendMail(mailOptions).then(function(result){
        return { success: "Signup", message: "Verification email has been sent." };
    }).catch(function(error){
        return Promise.reject({ error:"Signup", message:"Unable to send email." });
    });
}

module.exports = Mailer;