'use client'

import { Features } from "./components/Home/Features"
import { IntroSection } from "./components/Home/IntroSection"
import Markets from "./components/Home/Markets"
import { SecureSection } from "./components/Home/SecureSection"
import { StepsSection } from "./components/Home/StepsSection"
import TopMarquee from "./components/Home/WhyWeb3"
import Navbar from "./components/Navbar"


export default function Home() {
  return (
    <>
      <Navbar />
      <IntroSection />
      <StepsSection />
      <Markets />
      <TopMarquee />
      <Features />
      <SecureSection />
    </>
  )
}
