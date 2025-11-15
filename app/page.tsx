import { Nav } from '@/components/Nav'
import { Hero } from '@/components/Hero'
import { Benefits } from '@/components/Benefits'
import { HowItWorks } from '@/components/HowItWorks'
import { Testimonials } from '@/components/Testimonials'
import { FAQ } from '@/components/FAQ'
import { Footer } from '@/components/Footer'
import { AccessibilityToolbar } from '@/components/AccessibilityToolbar'

export const dynamic = 'force-dynamic'

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <Benefits />
      <HowItWorks />
      <Testimonials />
      <FAQ />
      <Footer />
      <AccessibilityToolbar />
    </main>
  )
}
