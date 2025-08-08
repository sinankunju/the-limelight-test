import prisma from '../../../../../lib/prisma';
import { sendPublicationEmail } from '../../../../../utils/email';

export default async function handler(req, res){
  if(req.method !== 'POST') return res.status(405).end();
  const { id } = req.query;
  try {
    // fetch
    const sub = await prisma.litgardenSubmission.findUnique({ where: { id } });
    if(!sub) return res.status(404).json({ error: 'not found' });
    // create an article in a 'litgarden' category (admin can edit later)
    const slug = `litgarden-${Date.now()}`;
    const article = await prisma.article.create({
      data:{
        title: `${sub.submitter_name} — ${sub.type}`,
        subtitle: null,
        byline: sub.submitter_name,
        class_issue: null,
        category: 'litgarden',
        subcategory: sub.type,
        excerpt: sub.text?.slice(0,200),
        content: sub.text || '',
        status: 'published',
        publish_date: new Date(),
        tags: [],
        is_featured: false
      }
    });
    await prisma.litgardenSubmission.update({ where:{ id }, data:{ status: 'approved' } });
    // send publication email
    try { await sendPublicationEmail(sub.email, sub.submitter_name, `/litgarden/${article.id}`); } catch(e){ console.warn('email failed', e) }
    return res.redirect('/admin');
  } catch(e){
    console.error(e);
    return res.status(500).json({ error: 'server error' });
  }
}
