"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Heart, Gift, Cake, Star, Sparkles, PartyPopper } from "lucide-react"

function calculateTimeLeft(targetDate) {
  const difference = targetDate - new Date()
  let timeLeft = {}

  if (difference > 0) {
    timeLeft = {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    }
  }

  return timeLeft
}

export default function Countdown({ targetDate, onCountdownEnd }) {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(targetDate))
  const [isGameActive, setIsGameActive] = useState(false)
  const [hasWon, setHasWon] = useState(false)
  const [score, setScore] = useState(0)
  const [balloons, setBalloons] = useState([])

  useEffect(() => {
    const timer = setTimeout(() => {
      const updated = calculateTimeLeft(targetDate)

      setTimeLeft(updated)
      if (!updated || Object.keys(updated).length <= 0) {
        onCountdownEnd()
      }
    }, 1000)

    return () => clearTimeout(timer)
  }, [timeLeft, targetDate])

  // Balloon Game Logic
  useEffect(() => {
    if (!isGameActive || hasWon) return;

    const addBalloon = () => {
      const colors = ["bg-red-400", "bg-blue-400", "bg-green-400", "bg-yellow-400", "bg-pink-400"];
      const newBalloon = {
        id: Date.now() + Math.random(),
        x: Math.random() * 80 + 10, // Random x position between 10% and 90%
        color: colors[Math.floor(Math.random() * colors.length)],
      };
      setBalloons((prev) => [...prev, newBalloon]);
    };

    const interval = setInterval(addBalloon, 1500); // Add a new balloon every 1.5 seconds

    return () => clearInterval(interval);
  }, [isGameActive, hasWon]);

  // Check for winning condition
  useEffect(() => {
    if (score > 19) {
      setHasWon(true);
      setIsGameActive(false);
    }
  }, [score]);

  const handleBalloonClick = (id) => {
    setScore((prev) => prev + 1);
    setBalloons((prev) => prev.filter((balloon) => balloon.id !== id));
  };

  const startGame = () => {
    setIsGameActive(true);
    setHasWon(false);
    setScore(0);
    setBalloons([]);
  };

  const icons = [
    <Heart key="heart" className="text-pink-500/90 fill-pink-500/20 w-6 h-6" />,
    <Gift key="gift" className="text-purple-500/90 w-6 h-6" />,
    <Cake key="cake" className="text-pink-500/90 w-6 h-6" />,
    <Star key="star" className="text-yellow-400/90 fill-yellow-400/20 w-6 h-6" />,
  ]

  return (
    <div className="flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background Video */}
      <video
        autoPlay
        loop
        
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0 opacity-80"
        src="/your-file.mp4"
      />

      {/* Overlay to ensure text readability */}
      <div className="absolute inset-0 bg-black/20 z-0" />

      {/* Floating sparkles background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-yellow-300/50"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              fontSize: `${Math.random() * 10 + 10}px`,
            }}
            animate={{
              y: [0, -100],
              x: [0, (Math.random() - 0.5) * 50],
              opacity: [0, 1, 0],
              rotate: [0, 180],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "linear",
            }}
          >
            ✨
          </motion.div>
        ))}
      </div>

      {/* Updated Heading */}
      <motion.h1
        className="text-3xl md:text-4xl font-bold text-center min-h-20 sm:min-h-11 mb-8 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-600 z-20"
        initial={{ scale: 0.95, y: 20 }}
        animate={{ 
          scale: [1, 1.03, 1],
          y: 0
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut",
        }}
      >
        Until Birthday Comes, Keep Watching This
      </motion.h1>

      <div className="flex flex-wrap justify-center gap-5 mb-10 z-20">
        {Object.keys(timeLeft).length > 0 ? (
          Object.entries(timeLeft).map(([unit, value], index) => (
            <motion.div
              key={unit}
              className="glass-card rounded-2xl p-6 w-28 h-28 flex flex-col items-center justify-center relative overflow-hidden"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ 
                scale: 1.05, 
                boxShadow: "0 0 20px rgba(244, 114, 182, 0.4)"
              }}
            >
              {/* Inner glow */}
              <div className="absolute inset-0 rounded-2xl pointer-events-none" 
                style={{
                  background: 'radial-gradient(circle at center, rgba(244, 114, 182, 0.15) 0%, transparent 70%)'
                }} 
              />
              
              <div className="text-3xl font-bold text-white">
                {value}
              </div>
              <div className="text-sm font-medium text-white capitalize mt-1">
                {unit}
              </div>
              <motion.div
                className="mt-2"
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 10, -10, 0]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  delay: index * 0.3
                }}
              >
                {icons[index % icons.length]}
              </motion.div>
            </motion.div>
          ))
        ) : (
          <motion.p 
            className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-600"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1.1 }}
            transition={{ 
              duration: 0.5,
              repeat: Infinity,
              repeatType: "mirror"
            }}
          >
            It's time!
          </motion.p>
        )}
      </div>

      <motion.div
        className="text-center max-w-md mx-auto glass-card rounded-2xl p-6 relative overflow-hidden mb-6 z-20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        {/* Inner glow */}
        <div className="absolute inset-0 rounded-2xl pointer-events-none" 
          style={{
            background: 'radial-gradient(circle at center, rgba(168, 85, 247, 0.1) 0%, transparent 70%)'
          }} 
        />
        
        <p className="text-lg font-medium text-purple-800/90 mb-4 leading-relaxed">
          Just a little more... A small gift for my favorite person ❤️
        </p>

        <div className="flex justify-center space-x-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <motion.div
              key={i}
              className="w-3 h-3 rounded-full bg-pink-500/80"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.7, 1, 0.7],
                y: [0, -5, 0]
              }}
              transition={{
                duration: 1.5,
                repeat: Number.POSITIVE_INFINITY,
                delay: i * 0.3,
              }}
            />
          ))}
        </div>
      </motion.div>

      {/* Start Game Button */}
      <motion.div
        className="mt-6 z-20"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.7, type: "spring", stiffness: 300, damping: 20 }}
      >
        <motion.button
          onClick={startGame}
          className="glow-button rounded-full text-white font-bold py-4 px-8 flex items-center gap-3 relative overflow-hidden group"
          whileTap={{ scale: 0.95 }}
          animate={{
            y: [0, -5, 0],
            scale: [1, 1.05, 1],
            rotate: [0, 2, -2, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <PartyPopper className="w-6 h-6 animate-pulse" />
          <span className="text-lg tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">
            Play Catch the Balloons!
          </span>
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

      {/* Game Overlay */}
      <AnimatePresence>
        {isGameActive && !hasWon && (
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex flex-col items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Score Display */}
            <motion.div
              className="absolute top-8 text-white text-2xl font-bold"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Score: {score}
            </motion.div>

            {/* Note to Score 20 */}
            <motion.div
              className="absolute top-16 glass-card rounded-xl p-4 max-w-xs text-center"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <p className="text-sm text-purple-200">
                Score 20 points to win the prize! 🎁
              </p>
            </motion.div>

            {/* Balloons */}
            {balloons.map((balloon) => (
              <motion.div
                key={balloon.id}
                className={`absolute ${balloon.color} rounded-full cursor-pointer flex items-center justify-center`}
                style={{
                  left: `${balloon.x}%`,
                  width: 50,
                  height: 70,
                  bottom: 0,
                }}
                animate={{
                  y: -window.innerHeight - 100, // Move to top of screen and beyond
                  rotate: [0, 10, -10, 0],
                }}
                transition={{
                  duration: 5,
                  ease: "linear",
                  onComplete: () => {
                    setBalloons((prev) => prev.filter((b) => b.id !== balloon.id));
                  },
                }}
                onClick={() => handleBalloonClick(balloon.id)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <PartyPopper className="w-8 h-8 text-white" />
              </motion.div>
            ))}

            {/* Close Button */}
            <motion.button
              onClick={() => setIsGameActive(false)}
              className="absolute bottom-8 glow-button rounded-full text-white font-bold py-4 px-8 flex items-center gap-3 relative overflow-hidden group"
              whileTap={{ scale: 0.95 }}
              animate={{
                y: [0, -5, 0],
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <span className="text-lg tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">
                Close Game
              </span>
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
        )}
      </AnimatePresence>

      {/* Scoreboard Overlay */}
      <AnimatePresence>
        {hasWon && (
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex flex-col items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="glass-card rounded-3xl p-8 max-w-md w-full text-center"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <motion.h2
                className="text-3xl font-bold text-pink-600 mb-4"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                You Have Won! 🎉
              </motion.h2>
              <p className="text-xl text-white mb-4">Final Score: {score}</p>

              {/* Photo */}
              <motion.div
                className="mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <img
                  src="https://images.unsplash.com/photo-1617299129819-74d32d76d0e6?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60"
                  alt="Celebratory photo"
                  className="rounded-2xl w-full max-w-xs mx-auto shadow-lg"
                />
              </motion.div>

              {/* Note */}
              <motion.div
                className="bg-white/10 p-4 rounded-2xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <p className="text-lg text-purple-200">
                  Amazing job, Golu Bunty! You're already a winner in my heart, but now you've conquered this game too! Here's a little sneak peek of the joy awaiting you on your special day—let's make it unforgettable! 💕
                </p>
              </motion.div>

              {/* Close Button */}
              <motion.button
                onClick={() => setHasWon(false)}
                className="mt-6 glow-button rounded-full text-white font-bold py-4 px-8 flex items-center gap-3 relative overflow-hidden group mx-auto"
                whileTap={{ scale: 0.95 }}
                animate={{
                  y: [0, -5, 0],
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <span className="text-lg tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">
                  Back to Countdown
                </span>
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
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx global>{`
        .glass-card {
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.1) 100%);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          box-shadow: 
            0 8px 32px rgba(0, 0, 0, 0.1),
            0 0 15px rgba(244, 114, 182, 0.2);
          transition: all 0.3s ease;
        }
        
        .glass-card:hover {
          transform: translateY(-3px);
          box-shadow: 
            0 12px 40px rgba(0, 0, 0, 0.15),
            0 0 25px rgba(244, 114, 182, 0.3);
        }

        .glow-button {
          background: linear-gradient(135deg, #f472b6 0%, #a855f7 100%);
          box-shadow: 
            0 4px 15px rgba(244, 114, 182, 0.5),
            0 0 20px rgba(168, 85, 247, 0.3);
          transition: all 0.3s ease;
        }

        .glow-button:hover {
          transform: translateY(-2px);
          box-shadow: 
            0 6px 20px rgba(244, 114, 182, 0.7),
            0 0 25px rgba(168, 85, 247, 0.5);
        }

        .glow-button:active {
          transform: translateY(1px);
          box-shadow: 
            0 2px 10px rgba(244, 114, 182, 0.3),
            0 0 15px rgba(168, 85, 247, 0.2);
        }

        .glow-button .group:hover .bg-white/10 {
          opacity: 0.2;
        }
      `}</style>
    </div>
  )
}