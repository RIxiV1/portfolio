"use client"

import { NavBar } from "@/components/ui/tubelight-navbar"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import { Cursor } from "@/components/ui/inverted-cursor"
import { SpecialText } from "@/components/ui/special-text"
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button"
import { FileText, GraduationCap, Briefcase } from "lucide-react"
import { ContactForm } from "@/components/ui/contact-form"
import { FadeUp } from "@/components/ui/fade-up"
import { Spotlight } from "@/components/ui/spotlight"
import { GlassCard } from "@/components/ui/glass-card"
import { siteConfig } from "@/data/site"
import { EtheralShadow } from "@/components/ui/etheral-shadow"
import { SkillsMarquee } from "@/components/ui/marquee"
import { DisplayCards } from "@/components/ui/display-cards"
import { PulseBeamsDemo } from "@/components/ui/pulse-beams"
import { AnimatedTabs } from "@/components/ui/animated-tabs"

export default function PortfolioPage() {
  return (
    <main className="relative min-h-screen text-foreground overflow-x-hidden transition-colors duration-500">
      {/* Background Layer - Fixed and Persistent */}
      <div className="fixed inset-0 -z-50 bg-background transition-colors duration-500">
        <EtheralShadow 
          animation={{ scale: 50, speed: 20 }}
          noise={{ opacity: 0.2, scale: 1.0 }}
          sizing="fill"
          title=""
          className="opacity-30"
        />
      </div>

      {/* Custom Cursor - Desktop Only */}
      <Cursor size={60} />

      {/* Navigation */}
      <NavBar />

      {/* Theme Toggle - Fixed Position */}
      <div className="fixed top-6 right-6 z-50">
        <ThemeToggle />
      </div>

      {/* 1. HERO Section */}
      <section id="home" className="relative min-h-svh flex items-center justify-center">
        <div className="text-center z-10 space-y-6">
          <div className="relative inline-block">
          <h1 className="text-7xl md:text-8xl lg:text-[10rem] font-extrabold tracking-tighter leading-none bg-clip-text text-transparent bg-gradient-to-b from-foreground via-foreground/90 to-slate-400 drop-shadow-2xl cursor-default">
              Shaik Mohammed Suhaib
            </h1>
          </div>
          <p className="text-slate-400 text-lg md:text-xl font-light tracking-[0.6em] md:tracking-[0.8em] uppercase opacity-80">
            Product Engineering <span className="text-cyan-500/50 mx-2">·</span> AI Systems
          </p>
        </div>
      </section>

      {/* Glassmorphic Container for the rest of the content */}
      <div className="relative space-y-32 pb-32">
        
        {/* 2. ABOUT Section */}
        <section id="about" className="px-4 scroll-mt-32">
          <FadeUp>
            <Spotlight>
              <GlassCard className="max-w-5xl mx-auto p-12 md:p-16 shadow-2xl relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-violet-500/5 opacity-50 dark:opacity-30" />
                
                <div className="relative z-10">
                  <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
                    <SpecialText inView>About Me</SpecialText>
                  </h2>
                  <div className="grid md:grid-cols-2 gap-16 items-center">
                    <div className="space-y-8">
                      <p className="text-xl text-foreground font-light leading-relaxed">
                        {`I'm an IT student focused on building AI-powered systems and real-world products.`}
                      </p>
                      <p className="text-muted-foreground leading-relaxed text-lg">
                        Currently exploring agentic AI, recommendation systems, and web-based AI tools — combining product thinking with engineering to turn ideas into functional, user-focused applications.
                      </p>
                      <div className="flex gap-6 pt-6">
                        {siteConfig.socials.map(({ label, href }) => (
                          <a
                            key={label}
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`Visit my ${label} profile`}
                            className="text-cyan-400 hover:text-white transition-all duration-300 border-b border-transparent hover:border-cyan-400 pb-1 font-mono text-sm uppercase tracking-wider"
                          >
                            {label}
                          </a>
                        ))}
                      </div>
                    </div>
                    <div className="relative group/card">
                      <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500/30 to-violet-500/30 rounded-2xl blur-3xl opacity-20 group-hover/card:opacity-40 transition-opacity duration-500" />
                      <div className="relative bg-foreground/8 border border-foreground/15 backdrop-blur-2xl rounded-3xl p-8 space-y-6 shadow-xl transition-transform duration-500 group-hover/card:-translate-y-2">
                        <div className="flex items-center gap-3 text-sm text-cyan-500 dark:text-cyan-400 font-mono">
                          <span className="w-2 h-2 bg-cyan-500 dark:bg-cyan-400 rounded-full animate-pulse shadow-[0_0_10px_rgba(34,211,238,0.8)]" />
                          Status: Open to Work
                        </div>
                        <div className="space-y-4">
                          <p className="text-foreground/80 flex justify-between"><span className="text-muted-foreground font-mono uppercase text-xs">Location</span> India</p>
                          <p className="text-foreground/80 flex justify-between"><span className="text-muted-foreground font-mono uppercase text-xs">Focus</span> AI Systems, Full Stack</p>
                          <p className="text-foreground/80 flex justify-between truncate gap-4"><span className="text-muted-foreground font-mono uppercase text-xs shrink-0">Email</span> shaiksuhaib360@gmail.com</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </GlassCard>
            </Spotlight>
          </FadeUp>
        </section>

        {/* 2.5 EDUCATION & EXPERIENCE Section */}
        <section id="experience" className="px-4 scroll-mt-32">
          <FadeUp>
            <div className="max-w-5xl mx-auto space-y-12">
              <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
                <SpecialText inView>Education & Experience</SpecialText>
              </h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                {/* Education */}
                <GlassCard className="p-8 md:p-10 shadow-xl space-y-8">
                  <div className="flex items-center gap-4 text-cyan-500">
                    <GraduationCap className="w-8 h-8" />
                    <h3 className="text-2xl font-bold text-foreground">Education</h3>
                  </div>
                  <div className="space-y-6">
                    <div className="relative pl-6 border-l border-cyan-500/30">
                      <div className="absolute left-[-5px] top-2 w-2 h-2 rounded-full bg-cyan-500 shadow-[0_0_10px_rgba(34,211,238,0.8)]" />
                      <h4 className="font-bold text-lg text-foreground">B.Tech in Information Technology</h4>
                      <p className="text-muted-foreground text-sm font-mono mt-1">2024 — 2028</p>
                      <p className="text-foreground/70 mt-3 text-sm leading-relaxed">
                        Vel Tech Rangarajan Dr. Sagunthala R&D Institute of Science and Technology, Chennai. Core focus on AI, algorithms, and intelligent systems development.
                      </p>
                    </div>
                  </div>
                </GlassCard>

                {/* Experience / Projects Highlights */}
                <GlassCard className="p-8 md:p-10 shadow-xl space-y-8">
                  <div className="flex items-center gap-4 text-violet-500">
                    <Briefcase className="w-8 h-8" />
                    <h3 className="text-2xl font-bold text-foreground">Experience</h3>
                  </div>
                  <div className="space-y-6">
                    <div className="relative pl-6 border-l border-violet-500/30">
                      <div className="absolute left-[-5px] top-2 w-2 h-2 rounded-full bg-violet-500 shadow-[0_0_10px_rgba(139,92,246,0.8)]" />
                      <h4 className="font-bold text-lg text-foreground">Independent Developer & AI Researcher</h4>
                      <p className="text-muted-foreground text-sm font-mono mt-1">2024 — Present</p>
                      <p className="text-foreground/70 mt-3 text-sm leading-relaxed">
                        Building agentic AI tools and recommendation systems. Focused on turning complex math into functional, user-centric software.
                      </p>
                    </div>
                  </div>
                </GlassCard>
              </div>
            </div>
          </FadeUp>
        </section>

        {/* 3. SKILLS Section with Lamp */}
        <section id="skills" className="relative px-4 scroll-mt-32">
          <FadeUp>
            <div className="max-w-6xl mx-auto backdrop-blur-2xl bg-foreground/[0.02] border border-foreground/10 border-t-foreground/20 rounded-[2.5rem] py-20 overflow-hidden shadow-inner">
              <h2 className="text-4xl font-bold text-center mb-16">
                <SpecialText inView>Skills & Technologies</SpecialText>
              </h2>
              <div className="relative">
                <div className="absolute left-0 top-0 w-32 h-full bg-gradient-to-r from-background/80 to-transparent z-10" />
                <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-background/80 to-transparent z-10" />
                <SkillsMarquee />
              </div>
            </div>
          </FadeUp>
        </section>

        {/* 4. PROJECTS Section */}
        <section id="projects" className="px-4 scroll-mt-32">
          <FadeUp>
            <GlassCard className="max-w-6xl mx-auto p-12 md:p-16 shadow-2xl relative">
              <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
                <SpecialText inView>Featured Projects</SpecialText>
              </h2>
              
              <div className="flex justify-center mb-20">
                <DisplayCards />
              </div>

              <div className="relative">
                <div className="absolute -inset-10 bg-cyan-500/5 blur-[100px] opacity-20 pointer-events-none" />
                <AnimatedTabs />
              </div>
            </GlassCard>
          </FadeUp>
        </section>

        {/* 5. LEARNING PATH Section */}
        <section id="blog" className="px-4 scroll-mt-32">
          <FadeUp>
            <GlassCard className="max-w-6xl mx-auto p-12 md:p-16 shadow-2xl">
              <h2 className="text-4xl font-bold text-center mb-16">
                <SpecialText inView>Learning Path & Research</SpecialText>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {siteConfig.learningPath.map((blog) => (
                <a
                  key={blog.title}
                  href={blog.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative rounded-2xl border border-foreground/10 border-t-foreground/20 bg-white/40 dark:bg-foreground/5 p-8 backdrop-blur-xl hover:bg-white/60 dark:hover:bg-foreground/10 hover:border-cyan-400/30 hover:border-t-cyan-400/50 transition-all duration-500 overflow-hidden shadow-xl shadow-black/5 dark:shadow-none"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-[10px] font-mono font-bold tracking-[0.2em] text-cyan-600 dark:text-cyan-400 border border-cyan-400/30 rounded-full px-3 py-1 uppercase">
                      {blog.tag}
                    </span>
                    <span className="text-xs text-muted-foreground font-mono tracking-tighter">{blog.date}</span>
                  </div>
                  <h3 className="text-xl font-bold text-foreground group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors leading-tight">
                    {blog.title}
                  </h3>
                  <p className="mt-4 text-sm text-slate-600 dark:text-muted-foreground leading-relaxed font-normal">
                    {blog.description}
                  </p>
                  <div className="mt-6 flex items-center gap-2 text-xs font-mono text-cyan-600 dark:text-cyan-400 uppercase tracking-widest opacity-0 group-hover:opacity-100 translate-x-[-10px] group-hover:translate-x-0 transition-all duration-300">
                    Read Now <span className="text-lg">→</span>
                  </div>
                </a>
              ))}
            </div>
          </GlassCard>
        </FadeUp>
      </section>

        {/* 6. CONTACT Section */}
        <section id="contact" className="px-4 scroll-mt-32">
          <FadeUp>
            <Spotlight color="rgba(139, 92, 246, 0.05)">
              <div className="max-w-6xl mx-auto space-y-16">
                <h2 className="text-4xl md:text-5xl font-bold text-center">
                  <SpecialText inView>Get In Touch</SpecialText>
                </h2>
                
                <div className="grid lg:grid-cols-2 gap-12 items-start">
                  <GlassCard className="shadow-2xl relative overflow-hidden group h-full flex items-center justify-center min-h-[400px]">
                    <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/5 to-transparent opacity-30" />
                    <PulseBeamsDemo />
                  </GlassCard>
                  <ContactForm />
                </div>
              </div>
            </Spotlight>
          </FadeUp>
        </section>

        {/* 7. RESUME Section */}
        <section id="resume" className="flex flex-col items-center justify-center py-20 -mt-12">
          <div className="relative group">
            <div className="absolute -inset-4 bg-cyan-400/20 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <a
              href="https://drive.google.com/file/d/1ZaHawnbNC8nFV-uir2fsXjMqfoUzO4YJ/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="relative block"
            >
              <InteractiveHoverButton text="Download Resume" />
            </a>
          </div>
          <p className="text-slate-500 text-[10px] mt-6 flex items-center gap-2 font-mono uppercase tracking-[0.3em]">
            <FileText className="w-3 h-3 text-cyan-400" />
            Format: PDF 2026
          </p>
        </section>
      </div>

      {/* Footer */}
      <footer className="w-full relative py-12 backdrop-blur-xl border-t border-foreground/10 bg-foreground/5 dark:bg-black/20 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent shadow-[0_0_15px_rgba(34,211,238,0.5)]" />
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground font-mono text-xs tracking-[0.2em] uppercase mb-4">
            Built for the Future
          </p>
          <p className="text-foreground/40 font-mono text-[10px] tracking-[0.3em] uppercase">
            © {new Date().getFullYear()} Shaik Mohammed Suhaib
          </p>
        </div>
      </footer>
    </main>
  )
}
