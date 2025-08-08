import Link from 'next/link';
import prisma from '../../lib/prisma';
import { requireAdminSession } from '../../lib/auth';

export default function Admin({ pending }) {
  return (
    <div className="container">
      <header className="header">
        <h1>Admin — The Limelight</h1>
      </header>
      <section>
        <h2>Pending Litgarden Submissions</h2>
        <ul>
          {pending.map(p => <li key={p.id}>{p.submitter_name} — {p.type} — <Link href={`/admin/litgarden/${p.id}`}>view</Link></li>)}
        </ul>
      </section>
      <section style={{marginTop:24}}>
        <h2>Quick Links</h2>
        <ul>
          <li><Link href="/admin/new-article">Create Article</Link></li>
          <li><Link href="/admin/media">Media Library</Link></li>
          <li><Link href="/admin/comments">Comments</Link></li>
        </ul>
      </section>
    </div>
  )
}

export async function getServerSideProps(ctx){
  const auth = await requireAdminSession(ctx);
  if(auth.redirect) return auth;
  const pending = await prisma.litgardenSubmission.findMany({ where: { status: 'pending' }, orderBy: { submitted_at: 'desc' }, take: 20 });
  return { props: { pending: JSON.parse(JSON.stringify(pending)) } };
}
