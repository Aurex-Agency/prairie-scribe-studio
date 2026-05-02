import { lazy, Suspense } from "react";
import { Nav } from "@/components/steward/Nav";
import { Hero } from "@/components/steward/Hero";

const Stewardship = lazy(() => import("@/components/steward/Stewardship").then(m => ({ default: m.Stewardship })));
const Guests = lazy(() => import("@/components/steward/Guests").then(m => ({ default: m.Guests })));
const Timeline = lazy(() => import("@/components/steward/Timeline").then(m => ({ default: m.Timeline })));
const Episodes = lazy(() => import("@/components/steward/Episodes").then(m => ({ default: m.Episodes })));
const Host = lazy(() => import("@/components/steward/Host").then(m => ({ default: m.Host })));
const Questions = lazy(() => import("@/components/steward/Questions").then(m => ({ default: m.Questions })));
const Contact = lazy(() => import("@/components/steward/Contact").then(m => ({ default: m.Contact })));
const Footer = lazy(() => import("@/components/steward/Footer").then(m => ({ default: m.Footer })));
const MobileBar = lazy(() => import("@/components/steward/MobileBar").then(m => ({ default: m.MobileBar })));

const Index = () => {
  return (
    <main className="min-h-screen bg-background">
      <Nav />
      <Hero />
      <Suspense fallback={null}>
        <Stewardship />
        <Guests />
        <Timeline />
        <Episodes />
        <Host />
        <Questions />
        <Contact />
        <Footer />
        <MobileBar />
      </Suspense>
    </main>
  );
};

export default Index;
