'use client'

import { Features } from "./components/Home/Features"
import { IntroSection } from "./components/Home/IntroSection"
import Markets from "./components/Home/Markets"
import { SecureSection } from "./components/Home/SecureSection"
import { StepsSection } from "./components/Home/StepsSection"
import TopMarquee from "./components/Home/WhyWeb3"


export default function Home() {
  return (
    <>
      <IntroSection />
      <StepsSection />
      <Markets />
      <TopMarquee />
      <Features />
      <SecureSection  />
    </>
  )
}
