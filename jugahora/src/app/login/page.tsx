'use client'

import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { LogIn } from 'lucide-react'
import Image from 'next/image'

export default function PaginaInicioSesion() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const manejarEnvio = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      console.log('Iniciando proceso de login...');
      const respuesta = await fetch('/api/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
        credentials: 'include',
      })

      console.log('Respuesta recibida:', respuesta.status);

      if (respuesta.ok) {
        console.log('Login exitoso, redirigiendo...');
        router.replace('/menu')
      } else {
        const datos = await respuesta.json()
        console.error('Error en la autenticación:', datos.error);
        setError(datos.error || 'Ocurrió un error durante el inicio de sesión')
      }
    } catch (error) {
      console.error('Error de inicio de sesión:', error)
      setError('Ocurrió un error inesperado. Por favor, intenta de nuevo.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-100 p-4">
      <Link href="/" className="mb-8 text-2xl font-bold flex items-center">
        <Image src='/logo.svg' alt="JugáHora Logo" width={32} height={32} />
        JugáHora
      </Link>
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Iniciar sesión</CardTitle>
          <p className="text-center text-gray-500">Ingresa tus credenciales para acceder</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={manejarEnvio} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Correo electrónico</Label>
              <Input 
                id="email"
                type="email" 
                placeholder="tu@email.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Contraseña</Label>
              <Input 
                id="password"
                type="password" 
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>
            {error && <p className="text-red-500 text-center">{error}</p>}
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>Iniciando sesión...</>
              ) : (
                <>
                  <LogIn className="mr-2 h-4 w-4" /> Iniciar sesión
                </>
              )}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <Link href="/recuperar-contrasena" className="text-sm text-green-600 hover:underline text-center">
            ¿Olvidaste tu contraseña?
          </Link>
          <p className="text-sm text-gray-500 text-center">
            ¿No tienes una cuenta? 
            <Link href="/registro" className="text-green-600 hover:underline"> Regístrate</Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}