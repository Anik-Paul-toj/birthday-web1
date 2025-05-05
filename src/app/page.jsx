"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Countdown from "@/components/countdown"
import BirthdayCelebration from "@/components/birthday-celebration"
import Confetti from "@/components/confetti"
import FloatingHearts from "@/components/floating-hearts"
import Loader from "@/components/Loader"
import VirtualCandleBlowing from "@/components/VirtualCandleBlowing"
import BirthdayTreasureHunt from "@/components/BirthdayTreasureHunt"
import { MoveRight, Sparkles, Music, PauseCircle, PlayCircle } from "lucide-react"

export default function Home() {
  const [isBirthday, setIsBirthday] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [bubbles, setBubbles] = useState([])
  const [showForYouBtn, setShowForYouBtn] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [showCandleBlowing, setShowCandleBlowing] = useState(false)
  const [showTreasureHunt, setShowTreasureHunt] = useState(false)
  const birthdayDate = new Date("May 6, 2025")
  const audioRef = useRef(null)

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false)
    }, 1500)
  }, [])

  const startTreasureHunt = () => {
    setShowForYouBtn(false)
    setShowTreasureHunt(true)
  }

  const startCandleBlowing = () => {
    setShowTreasureHunt(false)
    setShowCandleBlowing(true)
    if (audioRef.current) {
      audioRef.current.volume = 0.5
      audioRef.current.play().catch((e) => {
        console.log("Autoplay prevented, user interaction needed", e)
      })
      setIsPlaying(true)
    }
  }

  const startCelebration = () => {
    setShowCandleBlowing(false)
    setIsBirthday(true)
  }

  const togglePlayMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play().catch((e) => {
          console.log("Play prevented, user interaction needed", e)
        })
      }
      setIsPlaying(!isPlaying)
    }
  }

  useEffect(() => {
    const generated = Array.from({ length: 30 }).map(() => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      color: ["bg-pink-400/70", "bg-purple-400/70", "bg-yellow-400/70", "bg-cyan-400/70", "bg-lime-400/70"][Math.floor(Math.random() * 5)],
      size: 12 + Math.floor(Math.random() * 15),
      duration: 4 + Math.random() * 5,
      delay: Math.random() * 5,
      opacity: [0.6, 1, 0.6],
      scale: [1, 1.3, 1]
    }))
    setBubbles(generated)
  }, [])

  if (isLoading) {
    return <Loader />
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 overflow-hidden font-poppins bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-indigo-900/20 to-pink-900/20 animate-gradient-bg">
      {/* Enhanced Animated Background */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;4
        00;500;600;700;800&display=swap');
        
        :root {
          --color-primary: 236 72 153;
          --color-secondary: 168 85 247;
          --color-accent: 244 114 182;
        }
        
        .font-poppins {
          font-family: 'Poppins', sans-serif;
        }
        
        @keyframes gradient-bg {
          0% { background-position: 0% 0%; }
          50% { background-position: 100% 100%; }
          100% { background-position: 0% 0%; }
        }
        
        .animate-gradient-bg {
          background-size: 400% 400%;
          animation: gradient-bg 20s ease infinite;
        }
        
        .glass-card {
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.05) 100%);
          backdrop-filter: blur(16px) saturate(180%);
          -webkit-backdrop-filter: blur(16px) saturate(180%);
          border: 1px solid rgba(255, 255, 255, 0.18);
          box-shadow: 
            0 8px 32px 0 rgba(0, 0, 0, 0.1),
            0 0 20px 0 rgba(255, 105, 180, 0.2),
            inset 0 0 20px 0 rgba(255, 255, 255, 0.1);
          transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        
        .glass-card:hover {
          transform: translateY(-8px) rotateX(3deg) rotateY(3deg);
          box-shadow: 
            0 12px 40px 0 rgba(0, 0, 0, 0.15),
            0 0 30px 0 rgba(255, 105, 180, 0.4),
            inset 0 0 30px 0 rgba(255, 255, 255, 0.15);
        }
        
        .glow-button {
          background: linear-gradient(45deg, 
            rgb(var(--color-accent)) 0%, 
            rgb(var(--color-secondary)) 50%, 
            rgb(var(--color-primary)) 100%);
          border: 2px solid rgba(255, 255, 255, 0.3);
          box-shadow: 
            0 4px 15px -5px rgba(var(--color-primary), 0.7),
            0 0 20px 0 rgba(255, 255, 255, 0.3) inset;
          position: relative;
          overflow: hidden;
          z-index: 1;
        }
        
        .glow-button::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, 
            transparent, 
            rgba(255, 255, 255, 0.2), 
            transparent);
          transition: 0.5s;
          z-index: -1;
        }
        
        .glow-button:hover::before {
          left: 100%;
        }
        
        .glow-button:hover {
          box-shadow: 
            0 8px 25px -5px rgba(var(--color-primary), 0.9),
            0 0 30px 0 rgba(255, 255, 255, 0.4) inset;
          transform: translateY(-2px);
        }
        
        .glow-button:active {
          transform: translateY(1px);
        }
        
        .bubble {
          filter: drop-shadow(0 5px 5px rgba(0, 0, 0, 0.1));
          will-change: transform;
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-40px) rotate(5deg); }
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 0.7; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.2); }
        }
        
        .sparkle {
          position: absolute;
          background: white;
          border-radius: 50%;
          pointer-events: none;
          z-index: 10;
        }
      `}</style>

      {isBirthday && <Confetti />}
      <FloatingHearts />

      {/* Sparkles effect on mouse move */}
      {typeof window !== 'undefined' && (
        <script dangerouslySetInnerHTML={{
          __html: `
            document.addEventListener('mousemove', function(e) {
              const sparkle = document.createElement('div');
              sparkle.className = 'sparkle';
              sparkle.style.left = e.pageX + 'px';
              sparkle.style.top = e.pageY + 'px';
              
              const size = Math.random() * 10 + 5;
              sparkle.style.width = size + 'px';
              sparkle.style.height = size + 'px';
              
              sparkle.style.opacity = 0.8;
              sparkle.style.transform = 'translate(-50%, -50%)';
              
              document.body.appendChild(sparkle);
              
              setTimeout(() => {
                sparkle.style.opacity = 0;
                sparkle.style.transform = 'translate(-50%, -50%) scale(2)';
                setTimeout(() => {
                  sparkle.remove();
                }, 300);
              }, 500);
            });
          `
        }} />
      )}

      {/* Music Play Button */}
      <motion.div
        className="absolute top-8 right-8 z-20"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        <motion.button
          onClick={togglePlayMusic}
          className="glow-button rounded-full text-white font-bold py-3 px-6 flex items-center gap-2 text-sm relative overflow-hidden group"
          whileTap={{ scale: 0.95 }}
        >
          {isPlaying ? 
            <PauseCircle className="w-5 h-5" /> : 
            <PlayCircle className="w-5 h-5" />
          }
          <span className="tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">
            {isPlaying ? "Pause Music" : "Play Music"}
          </span>
          <Music className="w-5 h-5 stroke-2" />
          
          {/* Button shine effect */}
          <motion.div 
            className="absolute inset-0 bg-white/10"
            initial={{ x: -100 }}
            animate={{ x: 200 }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatDelay: 2
            }}
          />
        </motion.button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.2, 0.8, 0.3, 1] }}
        className="relative z-10 w-full max-w-2xl mx-auto"
      >
        <motion.div
          className="glass-card rounded-3xl p-10 relative overflow-hidden"
          initial={{ scale: 0.95, rotate: -1 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ 
            type: "spring", 
            stiffness: 300, 
            damping: 20,
            delay: 0.2
          }}
        >
          {/* Inner glow effect */}
          <div className="absolute inset-0 rounded-3xl pointer-events-none" 
            style={{
              background: 'radial-gradient(circle at center, rgba(244, 114, 182, 0.15) 0%, transparent 70%)'
            }} 
          />
          
          <AnimatePresence mode="wait">
            {isBirthday ? (
              <BirthdayCelebration key="celebration" />
            ) : showCandleBlowing ? (
              <VirtualCandleBlowing key="candle-blowing" onComplete={startCelebration} />
            ) : showTreasureHunt ? (
              <BirthdayTreasureHunt key="treasure-hunt" onComplete={startCandleBlowing} />
            ) : (
              <Countdown key="countdown" targetDate={birthdayDate} onCountdownEnd={() => setShowForYouBtn(true)} />
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>

      {showForYouBtn && (
        <motion.div
          key="start-button"
          className="flex flex-col items-center justify-center mt-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ 
            duration: 0.7,
            ease: [0.2, 0.8, 0.3, 1]
          }}
        >
          <motion.button
            onClick={startTreasureHunt}
            className="glow-button rounded-full text-white font-bold py-5 px-10 flex items-center gap-3 text-xl relative overflow-hidden group"
            whileTap={{ scale: 0.95 }}
            animate={{
              y: [0, -8, 0],
              scale: [1, 1.05, 1],
              rotate: [0, 2, -2, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Sparkles className="w-6 h-6 animate-pulse" />
            <span className="text-xl tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">
              For You
            </span>
            <MoveRight className="w-6 h-6 stroke-2 group-hover:translate-x-1 transition-transform" />
            
            {/* Button shine effect */}
            <motion.div 
              className="absolute inset-0 bg-white/10"
              initial={{ x: -100 }}
              animate={{ x: 200 }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatDelay: 2
              }}
            />
          </motion.button>
          
          <motion.p 
            className="text-white/70 mt-4 text-sm font-light tracking-wide"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Click to start the treasure hunt!
          </motion.p>
        </motion.div>
      )}

      <audio ref={audioRef} src="/birthday.mp3" preload="auto" loop />

      {/* Enhanced Decorative Bubbles */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 overflow-hidden">
        {bubbles.map((bubble, i) => (
          <motion.div
            key={i}
            className="absolute bubble"
            style={{ left: bubble.left, top: bubble.top }}
            animate={{
              y: [0, -50, 0],
              scale: bubble.scale,
              rotate: [0, 20, -20, 0],
              opacity: bubble.opacity
            }}
            transition={{
              duration: bubble.duration,
              repeat: Infinity,
              delay: bubble.delay,
              ease: "easeInOut",
            }}
          >
            <div
              className={`rounded-full ${bubble.color} opacity-80 mix-blend-screen`}
              style={{ 
                width: `${bubble.size}px`, 
                height: `${bubble.size}px`,
                boxShadow: `0 0 ${bubble.size/2}px ${bubble.size/3}px rgba(255, 255, 255, 0.1)`
              }}
            />
          </motion.div>
        ))}
      </div>
      
      {/* Subtle background grid */}
      <div className="fixed inset-0 z-0 opacity-10 pointer-events-none" 
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255,255,255,0.3) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.3) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }}
      />
    </main>
  )
}