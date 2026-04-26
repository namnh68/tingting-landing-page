import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { SocialProof } from "@/components/social-proof";
import { HowItWorks } from "@/components/how-it-works";
import { Comparison } from "@/components/comparison";
import { Testimonials } from "@/components/testimonials";
import { FeedbackScreenshots } from "@/components/feedback-screenshots";
import { FAQ } from "@/components/faq";
import { Promotion } from "@/components/promotion";
import { CTAFinal } from "@/components/cta-final";
import { Footer } from "@/components/footer";
import { StickyCtaBar } from "@/components/sticky-cta";

export default function Home() {
  return (
    <>
      <Header />
      <main className="pb-20 md:pb-0">
        <Hero />
        <SocialProof />
        <HowItWorks />
        <Comparison />
        <Testimonials />
        <FeedbackScreenshots />
        <FAQ />
        <Promotion />
        <CTAFinal />
      </main>
      <Footer />
      <StickyCtaBar />
    </>
  );
}
