import { getCsrfToken } from 'next-auth/react';

export default function SignIn({ csrfToken }) {
  return (
    <div className="container">
      <h1>Admin Sign In</h1>
      <form method="post" action="/api/auth/callback/credentials">
        <input name="csrfToken" type="hidden" defaultValue={csrfToken}/>
        <div><label>Email<input name="email" type="email" required /></label></div>
        <div><label>Password<input name="password" type="password" required /></label></div>
        <button type="submit">Sign in</button>
      </form>
    </div>
  );
}

export async function getServerSideProps(context){
  return { props: { csrfToken: await getCsrfToken(context) } };
}
