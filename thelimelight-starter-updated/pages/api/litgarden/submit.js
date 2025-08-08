import formidable from 'formidable';
import fs from 'fs';
import prisma from '../../../lib/prisma';
import { sendSubmissionReceivedEmail } from '../../../utils/email';

export const config = {
  api: {
    bodyParser: false
  }
};

export default async function handler(req, res){
  if(req.method !== 'POST') return res.status(405).end();
  const form = formidable({ multiples: false, maxFileSize: 5 * 1024 * 1024 }); // 5MB
  form.parse(req, async (err, fields, files) => {
    if(err) {
      console.error(err);
      return res.status(500).json({ error: 'Form parse error' });
    }
    try {
      const record = await prisma.litgardenSubmission.create({
        data:{
          submitter_name: fields.name || 'Anonymous',
          age: fields.age ? parseInt(fields.age) : null,
          class: fields.class || null,
          email: fields.email || '',
          type: fields.type || 'story',
          text: fields.text || null,
          // file_url & image_url: placeholder — integrate storage provider (Supabase/S3) here
        }
      });
      // send confirmation email (implemented in utils/email)
      try { await sendSubmissionReceivedEmail(record.email, record.submitter_name); } catch(e){ console.warn('Email failed', e) }
      return res.status(200).json({ ok: true });
    } catch(e){
      console.error(e);
      return res.status(500).json({ error: 'DB error' });
    }
  });
}
