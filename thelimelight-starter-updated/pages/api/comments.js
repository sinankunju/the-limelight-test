import prisma from '../../lib/prisma';

export default async function handler(req, res){
  if(req.method === 'POST'){
    const { article_id, author_name, author_email, content, parent_id } = req.body;
    if(!article_id || !content) return res.status(400).json({ error: 'missing' });
    const c = await prisma.comment.create({
      data: { article_id, author_name: author_name || 'Guest', author_email: author_email || null, content, parent_id: parent_id || null, status: 'pending' }
    });
    res.json({ ok: true, id: c.id });
  } else if(req.method === 'GET'){
    const { article_id } = req.query;
    if(!article_id) return res.status(400).json({ error: 'missing' });
    const list = await prisma.comment.findMany({ where: { article_id, status: 'approved' }, orderBy: { created_at: 'asc' } });
    res.json(list);
  } else {
    res.status(405).end();
  }
}
