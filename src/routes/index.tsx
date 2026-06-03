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
import { Education } from "@/components/Education";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Vidusahan Perera — AI/ML Engineer" },
      {
        name: "description",
        content:
          "Portfolio of Vidusahan Perera — AI/ML engineer building agentic systems, MLOps platforms, and cloud-native infrastructure that scales.",
      },
      { property: "og:title", content: "Vidusahan Perera — AI/ML Engineer" },
      { property: "og:description", content: "Engineering intelligent systems that turn research into reality." },
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
        <Education />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
