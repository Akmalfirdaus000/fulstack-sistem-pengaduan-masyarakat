import React from 'react'
import { ContactMap, CTA, Features, Hero, HowItWorksSection, LatestNews, PartnersAndSupport, StatisticsSection, Testimonials } from './_sections'
import Navbar from '@/components/navbar-publick/navbar'

export default function Page() {
  return (
    <main>
      <Navbar/>
        <Hero/>
        <PartnersAndSupport/>
        <Features/>
        <StatisticsSection/>
        <Testimonials/>
        <HowItWorksSection/>
        <CTA/>
        <LatestNews/>
        <ContactMap/>
    </main>
  )
}
