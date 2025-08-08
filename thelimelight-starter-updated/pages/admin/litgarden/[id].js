// import prisma from '../../../../lib/prisma';
// import { sendPublicationEmail } from '../../../../utils/email';

export default function View({ submission }) {
  if(!submission) return <div className="container"><p>Not found</p></div>
  return (
    <div className="container">
      <h1>Submission by {submission.submitter_name}</h1>
      <p>Type: {submission.type} — Age: {submission.age}</p>
      <pre style={{whiteSpace:'pre-wrap'}}>{submission.text}</pre>
      <form method="post" action={`/api/admin/litgarden/${submission.id}/approve`}>
        <button type="submit">Approve & Publish</button>
      </form>
    </div>
  )
}

export async function getServerSideProps({ params }){
  const id = params.id;
 // const submission = await prisma.litgardenSubmission.findUnique({ where: { id } });
  return { props: { submission: submission ? JSON.parse(JSON.stringify(submission)) : null } };
}
