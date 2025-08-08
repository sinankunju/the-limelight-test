import prisma from '../../../lib/prisma';

// NOTE: protect this endpoint with auth (NextAuth) in production
export default async function handler(req, res){
  if(req.method === 'POST'){
    const body = req.body;
    try {
      const art = await prisma.article.create({
        data:{
          title: body.title,
          slug: body.slug,
          subtitle: body.subtitle || null,
          byline: body.byline || null,
          class_issue: body.class_issue || null,
          category: body.category || 'articles',
          subcategory: body.subcategory || null,
          excerpt: body.excerpt || null,
          content: body.content || '',
          status: 'published',
          publish_date: new Date(),
          tags: body.tags || [],
          seo_title: body.seo_title || null,
          seo_description: body.seo_description || null,
          canonical_url: body.canonical_url || null
        }
      });
      res.json({ ok:true, id: art.id });
    } catch(e){
      console.error(e);
      res.status(500).json({ error: 'db error' });
    }
  } else {
    res.status(405).end();
  }
}
