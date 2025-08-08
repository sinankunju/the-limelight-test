import prisma from '../../lib/prisma';

export default async function handler(req, res){
  if(req.method === 'GET'){
    const { category, sub, q, page = 1 } = req.query;
    const where = { status: 'published' };
    if(category) where.category = category;
    if(sub) where.subcategory = sub;
    const items = await prisma.article.findMany({
      where,
      orderBy: { publish_date: 'desc' },
      take: 20,
      skip: (Number(page)-1)*20
    });
    res.json(items);
  } else {
    res.status(405).end();
  }
}
