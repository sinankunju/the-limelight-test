import prisma from '../../lib/prisma';
import { requireAdminSession } from '../../lib/auth';

export default function CommentsAdmin({ comments }) {
  return (
    <div className="container">
      <h1>Comments — Moderation</h1>
      <ul>
        {comments.map(c => (
          <li key={c.id}>
            <strong>{c.author_name}</strong> on {c.article_id}
            <p>{c.content}</p>
            <form method="post" action={`/api/admin/comments/${c.id}/approve`} style={{display:'inline'}}><button type="submit">Approve</button></form>
            <form method="post" action={`/api/admin/comments/${c.id}/reject`} style={{display:'inline'}}><button type="submit">Reject</button></form>
          </li>
        ))}
      </ul>
    </div>
  )
}

export async function getServerSideProps(ctx){
  const auth = await requireAdminSession(ctx);
  if(auth.redirect) return auth;
  const comments = await prisma.comment.findMany({ where: { status: 'pending' }, orderBy: { created_at: 'desc' }, take: 100 });
  return { props: { comments: JSON.parse(JSON.stringify(comments)) } };
}
