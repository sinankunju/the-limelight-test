import prisma from '../../../lib/prisma';

export default function ArticlePage({ article }) {
  if(!article) return <div className="container"><p>Article not found</p></div>
  return (
    <div className="container">
      <header className="header"><h1>{article.title}</h1></header>
      <p><strong>{article.byline}</strong> — {new Date(article.publish_date).toLocaleDateString()}</p>
      <article dangerouslySetInnerHTML={{__html: article.content}} />
      <hr />
      <section>
        <h3>Related</h3>
        {/* Related posts would be loaded here */}
      </section>
      <section>
        <h3>Comments</h3>
        {/* Comment UI placeholder */}
      </section>
    </div>
  )
}

export async function getServerSideProps({ params }){
  const { category, slug } = params;
  const article = await prisma.article.findFirst({
    where: { slug, category, status: 'published' }
  });
  return { props: { article: article ? JSON.parse(JSON.stringify(article)) : null } };
}
