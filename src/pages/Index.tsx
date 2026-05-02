import { Nav } from "@/components/steward/Nav";
import { Hero } from "@/components/steward/Hero";
import { Stewardship } from "@/components/steward/Stewardship";
import { Guests } from "@/components/steward/Guests";
import { Timeline } from "@/components/steward/Timeline";
import { Episodes } from "@/components/steward/Episodes";
import { Host } from "@/components/steward/Host";
import { Questions } from "@/components/steward/Questions";
import { Contact } from "@/components/steward/Contact";
import { Footer } from "@/components/steward/Footer";
import { MobileBar } from "@/components/steward/MobileBar";

const Index = () => {
  return (
    <main className="min-h-screen bg-background">
      <Nav />
      <Hero />
      <Stewardship />
      <Guests />
      <Timeline />
      <Episodes />
      <Host />
      <Questions />
      <Contact />
      <Footer />
      <MobileBar />
    </main>
  );
};

export default Index;
