"use client"
import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "motion/react"

export function InitialLoader() {
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (sessionStorage.getItem("seenIntro") === "1") return
    setLoading(true)
    sessionStorage.setItem("seenIntro", "1")
    const timer = setTimeout(() => {
      setLoading(false)
    }, 2000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, filter: "blur(10px)" }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[10000] flex items-center justify-center bg-background"
        >
          <div className="flex flex-col items-center gap-8">
            {/* Minimalist AI visual */}
            <motion.div 
              animate={{ 
                scale: [1, 1.1, 1],
                opacity: [0.6, 1, 0.6]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="w-16 h-16 rounded-full border border-cyan-500/20 flex items-center justify-center relative"
            >
              <div className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.8)]" />
              <div className="absolute inset-[-10px] rounded-full border border-cyan-500/10 animate-[spin_4s_linear_infinite]" style={{ borderTopColor: 'transparent', borderBottomColor: 'transparent' }} />
              <div className="absolute inset-[-20px] rounded-full border border-violet-500/10 animate-[spin_6s_linear_infinite_reverse]" style={{ borderLeftColor: 'transparent', borderRightColor: 'transparent' }} />
            </motion.div>
            
            <div className="space-y-4 text-center">
              <motion.h2 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-foreground tracking-[0.4em] font-mono text-xs uppercase"
              >
                Initializing AI Systems
              </motion.h2>
              <div className="w-56 h-px bg-foreground/10 relative overflow-hidden rounded-full">
                <motion.div
                  initial={{ x: "-100%" }}
                  animate={{ x: "200%" }}
                  transition={{ 
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "linear",
                    repeatDelay: 0.5
                  }}
                  className="absolute inset-0 w-1/3 bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
                />
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
