"use client";
import { useState } from "react";
import { SectionLabel } from "./SectionLabel";
import { Reveal } from "./Reveal";
import { MagneticButton } from "./MagneticButton";
import { Github, Linkedin, Mail, MapPin, Twitter, Send } from "lucide-react";

export function Contact() {
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => { setSending(false); setSent(true); }, 1200);
  };

  return (
    <section id="contact" className="relative py-32">
      <div className="mesh-blob h-[600px] w-[600px] bg-cyan -top-32 right-0 opacity-25" />
      <div className="mesh-blob h-[400px] w-[400px] bg-violet bottom-0 left-0 opacity-25" />

      <div className="relative mx-auto max-w-[1400px] px-6 md:px-10">
        <SectionLabel number="07" title="CONTACT" />

        <Reveal>
          <h3 className="font-display text-5xl font-bold leading-[0.95] tracking-tight md:text-7xl lg:text-[8rem]">
            Let's build something <span className="text-gradient">extraordinary.</span>
          </h3>
        </Reveal>

        <div className="mt-20 grid gap-12 lg:grid-cols-[1fr_1.2fr]">
          <Reveal>
            <div className="space-y-8">
              <div>
                <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Email</div>
                <a href="mailto:vidusahanperera31@gmail.com" className="mt-2 block font-display text-2xl font-bold hover:text-cyan md:text-3xl">
                  vidusahanperera31@gmail.com
                </a>
              </div>
              <div>
                <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Location</div>
                <div className="mt-2 flex items-center gap-2 font-display text-2xl font-bold md:text-3xl">
                  <MapPin className="h-5 w-5 text-cyan" />
                  Jaela, Sri Lanka
                </div>
              </div>
              <div>
                <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-4">Find me</div>
                <div className="flex flex-wrap gap-3">
                  {[
                    { Icon: Github, label: "GitHub", href: "https://github.com/Vidusahan" },
                    { Icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com/in/vidusahan-perera-9738681b1" },
                    { Icon: Mail, label: "Email", href: "mailto:vidusahanperera31@gmail.com" },
                  ].map(({ Icon, label, href }) => (
                    <a key={label} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noopener noreferrer" : undefined} className="glass group flex items-center gap-2 rounded-full px-4 py-2 font-mono text-xs uppercase tracking-widest hover:border-cyan/40 hover:text-cyan">
                      <Icon className="h-4 w-4" />
                      {label}
                    </a>
                  ))}
                </div>
              </div>

              <div className="glass rounded-2xl p-6">
                <div className="font-mono text-[11px] text-green">
                  <span className="mr-2 inline-block h-2 w-2 rounded-full bg-green animate-pulse" />
                  OPEN TO OPPORTUNITIES
                </div>
                <p className="mt-3 text-sm text-muted-foreground">
                  Currently open to new opportunities, collaborations, and projects in AI, ML, and Software Engineering.
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={200}>
            <form onSubmit={submit} className="glass rounded-3xl p-8 md:p-10">
              <div className="grid gap-5 md:grid-cols-2">
                <Field label="Name" name="name" />
                <Field label="Email" name="email" type="email" />
              </div>
              <div className="mt-5">
                <Field label="Subject" name="subject" />
              </div>
              <div className="mt-5">
                <Field label="Message" name="message" textarea />
              </div>
              <div className="mt-8 flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                  {sent ? "✓ message transmitted" : "— I reply within 24h"}
                </span>
                <MagneticButton>
                  <span className="inline-flex items-center gap-3 rounded-full bg-cyan px-6 py-3.5 font-mono text-xs uppercase tracking-widest text-background glow-cyan">
                    {sending ? "Sending..." : sent ? "Sent ✓" : "Send Message"}
                    {!sending && !sent && <Send className="h-3.5 w-3.5" />}
                  </span>
                </MagneticButton>
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Field({ label, name, type = "text", textarea }: { label: string; name: string; type?: string; textarea?: boolean }) {
  const cls =
    "peer w-full rounded-xl border border-border bg-background/40 px-4 py-3.5 text-foreground outline-none transition-all placeholder-transparent focus:border-cyan focus:bg-background/70 focus:shadow-[0_0_30px_-10px_#00d4ff]";
  return (
    <label className="relative block">
      {textarea ? (
        <textarea name={name} placeholder={label} rows={5} required className={cls} />
      ) : (
        <input name={name} type={type} placeholder={label} required className={cls} />
      )}
      <span className="pointer-events-none absolute left-3 -top-2 bg-background px-1.5 font-mono text-[10px] uppercase tracking-widest text-cyan">
        {label}
      </span>
    </label>
  );
}
