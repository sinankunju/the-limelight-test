import Link from 'next/link';
import prisma from '../lib/prisma';

export default function Home({ featured, latest }) {
  return (
    <div className="container">
      <header className="header">
        <h1>The Limelight</h1>
        <nav className="nav">
          <Link href="/articles">Articles</Link>
          <Link href="/literature">Literature</Link>
          <Link href="/litgarden">Litgarden</Link>
          <Link href="/admin">Admin</Link>
        </nav>
      </header>

      <section style={{marginTop:24}}>
        <h2>Featured</h2>
        <div className="article-list">
          {featured.map(a => (
            <article key={a.id} className="card">
              <h3><Link href={`/articles/${a.category}/${a.slug}`}>{a.title}</Link></h3>
              <p>{a.excerpt}</p>
            </article>
          ))}
        </div>
      </section>

      <section style={{marginTop:32}}>
        <h2>Latest</h2>
        <div className="article-list">
          {latest.map(a => (
            <article key={a.id} className="card">
              <h3><Link href={`/articles/${a.category}/${a.slug}`}>{a.title}</Link></h3>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

export async function getServerSideProps(){
  // Simple queries via Prisma
  const featured = await prisma.article.findMany({
    where: { is_featured: true, status: 'published' },
    orderBy: { publish_date: 'desc' },
    take: 5
  });
  const latest = await prisma.article.findMany({
    where: { status: 'published' },
    orderBy: { publish_date: 'desc' },
    take: 10
  });
  return { props: { featured: JSON.parse(JSON.stringify(featured)), latest: JSON.parse(JSON.stringify(latest)) } };
}
