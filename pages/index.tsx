import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'
import Projects from '@/components/sections/Projects'
import Skills from '@/components/sections/Skills'
import Contact from '@/components/sections/Contact'
import ScrollToTop from '@/components/ui/ScrollToTop'
import ResumeChat from '@/components/ui/ResumeChat'
import { Analytics } from '@vercel/analytics/react'

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Projects />
      <Skills />
      <Contact />
      <ScrollToTop />
      <ResumeChat />
      <Analytics />
    </>
  )
}