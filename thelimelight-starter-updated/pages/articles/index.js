import prisma from '../../lib/prisma';
import Link from 'next/link';

export default function Articles({ list }) {
  return (
    <div className="container">
      <h1>Articles</h1>
      <div className="article-list">
        {list.map(a => (
          <div key={a.id} className="card">
            <h3><Link href={`/articles/${a.category}/${a.slug}`}>{a.title}</Link></h3>
            <p>{a.excerpt}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export async function getServerSideProps(){
  const list = await prisma.article.findMany({
    where: { status: 'published' },
    orderBy: { publish_date: 'desc' },
    take: 50
  });
  return { props: { list: JSON.parse(JSON.stringify(list)) } };
}
