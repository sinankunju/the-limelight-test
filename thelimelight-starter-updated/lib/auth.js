import { getServerSession } from 'next-auth/next';
import authOptions from '../pages/api/auth/[...nextauth]';

export async function requireAdminSession(ctx){
  const session = await getServerSession(ctx.req, ctx.res, authOptions);
  if(!session) {
    return { redirect: { destination: '/admin/signin', permanent: false } };
  }
  return { props: { session } };
}
