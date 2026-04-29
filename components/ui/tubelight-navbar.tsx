"use client"

import { useState, useEffect } from "react"
import { motion } from "motion/react"
import { Home, User, Briefcase, Code, BookOpen, Mail, type LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface NavItem {
  name: string
  icon: LucideIcon
  href: string
}

const navItems: NavItem[] = [
  { name: "Home", icon: Home, href: "#home" },
  { name: "About", icon: User, href: "#about" },
  { name: "Experience", icon: Briefcase, href: "#experience" },
  { name: "Skills", icon: Code, href: "#skills" },
  { name: "Projects", icon: Briefcase, href: "#projects" },
  { name: "Blog", icon: BookOpen, href: "#blog" },
  { name: "Contact", icon: Mail, href: "#contact" },
]

function MagneticNavItem({ 
  item, 
  isActive, 
  onClick, 
  isMobile 
}: { 
  item: NavItem, 
  isActive: boolean, 
  onClick: () => void, 
  isMobile: boolean 
}) {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const Icon = item.icon

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (isMobile) return
    const { clientX, clientY } = e
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect()
    const x = (clientX - (left + width / 2)) * 0.2 // 20% magnetic pull
    const y = (clientY - (top + height / 2)) * 0.2
    setPosition({ x, y })
  }

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 })
  }

  return (
    <motion.a
      href={item.href}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className={cn(
        "relative flex items-center gap-2 px-3 md:px-4 py-2 rounded-full text-sm font-medium transition-colors duration-300",
        isActive
          ? "text-slate-950"
          : "text-slate-400 hover:text-slate-200"
      )}
    >
      {isActive && (
        <motion.div
          layoutId="tubelight"
          className="absolute inset-0 rounded-full bg-white"
          style={{
            boxShadow:
              "0 0 20px rgba(255,255,255,0.5), 0 0 40px rgba(255,255,255,0.3), 0 0 60px rgba(255,255,255,0.1)",
          }}
          transition={{
            type: "spring",
            stiffness: 350,
            damping: 30,
          }}
        />
      )}
      {/* Active Cyan Dot Indicator */}
      {isActive && (
        <motion.div
          layoutId="active-dot"
          className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]"
          transition={{ type: "spring", stiffness: 350, damping: 30 }}
        />
      )}
      <span className="relative z-10 flex items-center gap-2">
        <Icon className="w-4 h-4" />
        {!isMobile && <span>{item.name}</span>}
      </span>
    </motion.a>
  )
}

export function NavBar() {
  const [activeTab, setActiveTab] = useState(navItems[0].name)
  const [isMobile, setIsMobile] = useState(false)

  // Track active section via IntersectionObserver — fires once per genuine
  // section threshold crossing, not on every scroll tick. The previous scroll
  // listener could flip activeTab dozens of times per second on fast scroll,
  // making the layoutId pill chase a moving target.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting)
        if (visible.length === 0) return
        const closestToTop = visible.reduce((acc, e) =>
          e.boundingClientRect.top < acc.boundingClientRect.top ? e : acc,
        )
        const item = navItems.find((n) => n.href === `#${closestToTop.target.id}`)
        if (item) setActiveTab(item.name)
      },
      // Trigger band: 200px from viewport top down to viewport mid.
      // A section becomes "active" when its top enters this band.
      { rootMargin: "-200px 0px -50% 0px", threshold: 0 },
    )

    navItems.forEach((item) => {
      const el = document.querySelector(item.href)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  return (
    <nav
      className={cn(
        "fixed z-50",
        isMobile
          ? "bottom-6 left-1/2 -translate-x-1/2"
          : "top-6 left-1/2 -translate-x-1/2"
      )}
    >
      <div className="flex items-center gap-1 md:gap-2 bg-foreground/5 backdrop-blur-2xl border border-foreground/10 py-2 px-2 rounded-full shadow-2xl shadow-black/20 dark:shadow-black/50">
        {navItems.map((item) => (
          <MagneticNavItem 
            key={item.name} 
            item={item} 
            isActive={activeTab === item.name} 
            onClick={() => setActiveTab(item.name)} 
            isMobile={isMobile} 
          />
        ))}
      </div>
    </nav>
  )
}
