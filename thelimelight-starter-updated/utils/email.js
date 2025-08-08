// utils/email.js
export async function sendEmail(to, subject, html) {
  console.log(`Email sending disabled for testing:
  To: ${to}
  Subject: ${subject}
  Body: ${html}`);
  return true;
}
