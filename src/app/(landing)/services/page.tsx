import React from 'react'
import { Certifications, Hero, ServiceComparison, ServiceDetails, ServiceProcess, UserSuccess } from './_sections'
import { CTA } from '../home/_sections'

export default function Page() {
  return (
    <main>
        <Hero/>
        <ServiceDetails/>
        <ServiceComparison/>
        <ServiceProcess/>
        <CTA/>
        <Certifications/>
        <UserSuccess/>
    </main>
  )
}
