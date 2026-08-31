import { Hero } from "@/components/sections/hero";
import { Stats } from "@/components/sections/stats";
import { About } from "@/components/sections/about";
import { Experience } from "@/components/sections/experience";
import { Services } from "@/components/sections/services";
import { Skills } from "@/components/sections/skills";
import { FeaturedVentures } from "@/components/sections/featured-ventures";
import { PortfolioGrid } from "@/components/sections/portfolio-grid";
import { Testimonials } from "@/components/sections/testimonials";
import { Contact } from "@/components/sections/contact";
import { Footer } from "@/components/sections/footer";
import { Chatbot } from "@/components/ui/chatbot";

export default function Home() {
  return (
    <>
      <Hero />
      <Stats />
      <About />
      <Experience />
      <Services />
      <Skills />
      <FeaturedVentures />
      <PortfolioGrid />
      <Testimonials />
      <Contact />
      <Footer />
      <Chatbot />
    </>
  );
}
