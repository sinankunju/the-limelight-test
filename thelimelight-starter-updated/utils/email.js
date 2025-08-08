import nodemailer from 'nodemailer';

const {
  GMAIL_CLIENT_ID, GMAIL_CLIENT_SECRET, GMAIL_REFRESH_TOKEN, GMAIL_FROM
} = process.env;

// Simple Nodemailer setup — for production use OAuth2 and handle token refresh properly.
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    type: 'OAuth2',
    user: GMAIL_FROM,
    clientId: GMAIL_CLIENT_ID,
    clientSecret: GMAIL_CLIENT_SECRET,
    refreshToken: GMAIL_REFRESH_TOKEN
  }
});

export async function sendSubmissionReceivedEmail(to, name){
  if(!to) return;
  const mail = {
    from: GMAIL_FROM,
    to,
    subject: 'Limelight — submission received',
    text: `Dear ${name || 'Contributor'},\n\nThanks for your submission to Litgarden. We'll review it and notify you if it's published.\n\n— The Limelight Team`
  };
  return transporter.sendMail(mail);
}

export async function sendPublicationEmail(to, name, url){
  if(!to) return;
  const mail = {
    from: GMAIL_FROM,
    to,
    subject: 'Your submission has been published!',
    text: `Dear ${name || 'Contributor'},\n\nCongrats — your submission is now live: ${url}\n\n— The Limelight Team`
  };
  return transporter.sendMail(mail);
}
