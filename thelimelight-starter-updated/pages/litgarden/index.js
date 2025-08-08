import Link from 'next/link';

export default function LitgardenHome(){
  return (
    <div className="container">
      <h1>Litgarden (Kids)</h1>
      <p>Stories and poems by children — colourful, playful section coming soon.</p>
      <Link href="/litgarden/submit">Submit your story / poem</Link>
    </div>
  )
}
