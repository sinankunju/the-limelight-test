import formidable from 'formidable';
import fs from 'fs';
import { supabase } from '../../../lib/supabase';

export const config = { api: { bodyParser: false } };

export default async function handler(req, res){
  if(req.method !== 'POST') return res.status(405).end();
  const form = formidable({ multiples: false, maxFileSize: 5 * 1024 * 1024 });
  form.parse(req, async (err, fields, files) => {
    if(err) return res.status(500).json({ error: 'parse error' });
    const file = files.file;
    if(!file) return res.status(400).json({ error: 'no file' });
    const data = fs.readFileSync(file.filepath);
    const filename = `${Date.now()}-${file.originalFilename}`;
    // Upload to Supabase
    try {
      const { data: uploadData, error } = await supabase.storage.from('media').upload(filename, data, { contentType: file.mimetype });
      if(error) {
        console.error('supabase upload err', error);
        return res.status(500).json({ error: 'upload failed' });
      }
      const publicUrl = supabase.storage.from('media').getPublicUrl(uploadData.path).publicURL;
      return res.json({ url: publicUrl });
    } catch(e){
      console.error(e);
      return res.status(500).json({ error: 'server' });
    }
  });
}
