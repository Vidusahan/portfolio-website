import { createFileRoute } from "@tanstack/react-router";
import { Cursor } from "@/components/Cursor";
import { SmoothScroll } from "@/components/SmoothScroll";
import { ScrollProgress } from "@/components/ScrollProgress";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Skills } from "@/components/Skills";
import { Projects } from "@/components/Projects";
import { Experience } from "@/components/Experience";
import { Certifications } from "@/components/Certifications";
import { Writing } from "@/components/Writing";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Alex Morgan — AI/ML Engineer · Agentic AI · MLOps" },
      {
        name: "description",
        content:
          "Portfolio of Alex Morgan — AI/ML engineer building agentic systems, MLOps platforms, and cloud-native infrastructure that scales.",
      },
      { property: "og:title", content: "Alex Morgan — AI/ML · Agentic · MLOps" },
      { property: "og:description", content: "Building intelligent systems that automate, scale, and evolve." },
      { property: "og:type", content: "website" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="noise relative min-h-screen bg-background text-foreground">
      <SmoothScroll />
      <Cursor />
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Certifications />
        <Writing />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
