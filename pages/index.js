import Image from 'next/image'
import { Inter } from 'next/font/google'
import Navbar from '@/components/Navbar'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main>
      <Navbar/>
    <div>
      <h1>Hello World welcome to my website</h1>
    </div>
    </main>
  )
}
