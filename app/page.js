'use client'
import Image from 'next/image'
import LoginPage from './(auth)/login/page'
import Link from 'next/link'

export default function Home() {
  return (
    <main>
      {/* <LoginPage /> */}
      <Link href="/login" className='btn btn-primary btn-sm'>
        Login
      </Link>
    </main>
  )
}
