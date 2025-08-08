import prisma from '../../../../../lib/prisma';

export default async function handler(req, res){
  if(req.method !== 'POST') return res.status(405).end();
  const { id } = req.query;
  await prisma.comment.update({ where: { id }, data: { status: 'approved' } });
  return res.redirect('/admin/comments');
}
