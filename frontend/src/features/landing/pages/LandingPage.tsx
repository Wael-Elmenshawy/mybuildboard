import Header from "@/components/layout/Header/Header";
import Footer from "@/components/layout/Footer/Footer";

import Hero from "../components/Hero/Hero";
import Features from "../components/Features/Features";
import PortfolioPreview from "../components/PortfolioPreview/PortfolioPreview";
import Testimonials from "../components/Testimonials/Testimonials";

function LandingPage() {
  return (
    <>
      <Header />

      <main>
        <Hero />

        <Features />

        <PortfolioPreview />

        <Testimonials />
      </main>

      <Footer />
    </>
  );
}

export default LandingPage;
