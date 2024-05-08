const nodemailer = require( 'nodemailer' )

const sendEmail = ( { email, subject, html } ) => {
    const transporter = nodemailer.createTransport( {
        service: "gmail",
        port: 465,
        secure: true,
        auth: {
            user: process.env.emailUser,
            pass: process.env.emailPass,
        },
    } );

    const receiver = {
        from: "<Blogify@gmail.com>",
        to: email,
        subject: subject,
        html: html,
        text: "Forget password"

    }

    transporter.sendMail( receiver, ( err, emailResponse ) => {
        if ( err ) throw err;
    } )

}

module.exports = { sendEmail }