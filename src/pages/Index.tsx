import { Nav } from "@/components/steward/Nav";
import { Hero } from "@/components/steward/Hero";
import { Episodes } from "@/components/steward/Episodes";
import { Story } from "@/components/steward/Story";
import { Community } from "@/components/steward/Community";
import { Footer } from "@/components/steward/Footer";
import { MobileBar } from "@/components/steward/MobileBar";

const Index = () => {
  return (
    <main className="min-h-screen bg-background">
      <Nav />
      <Hero />
      <Episodes />
      <Story />
      <Community />
      <Footer />
      <MobileBar />
    </main>
  );
};

export default Index;
