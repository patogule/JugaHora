import { NextResponse } from 'next/server';

export async function GET() {
  // Crear la respuesta y borrar la cookie estableciéndola con maxAge = 0 y expirando la cookie
  const response = NextResponse.redirect(new URL('/', 'http://localhost:3000')); // Redirige a la página principal

  response.cookies.set('token', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 0, // Esto elimina la cookie
    sameSite: 'strict',
    path: '/', // Asegurarse de que el path coincida
  });

  return response;
}
