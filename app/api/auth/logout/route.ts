import { NextResponse } from 'next/server';
import { serialize } from 'cookie';

export async function POST() {
  const expiredCookie = serialize('token', '', {
    httpOnly: true,
    path: '/',
    maxAge: 0,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
  });

  const res = NextResponse.json({ message: 'Logged out' });
  res.headers.set('Set-Cookie', expiredCookie);
  return res;
}
