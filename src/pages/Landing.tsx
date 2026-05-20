import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import Hero from '../components/landing/Hero'
import Features from '../components/landing/Features'
import Subjects from '../components/landing/Subjects'
import HowItWorks from '../components/landing/HowItWorks'
import CTASection from '../components/landing/CTASection'

export default function Landing() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <Features />
      <Subjects />
      <HowItWorks />
      <CTASection />
      <Footer />
    </div>
  )
}
