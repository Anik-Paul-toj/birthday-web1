import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Heart, Sparkles, Star } from "lucide-react"

function Loader() {
  const [randomPositions, setRandomPositions] = useState([]);

  useEffect(() => {
    const positions = Array.from({ length: 30 }).map(() => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 4 + Math.random() * 8,
      delay: Math.random() * 3,
      duration: 3 + Math.random() * 4
    }));
    setRandomPositions(positions);
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-pink-100/80 via-purple-100/80 to-rose-100/80 overflow-hidden">
      {/* Floating background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        {randomPositions.map((position, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${position.x}%`,
              top: `${position.y}%`,
              width: `${position.size}px`,
              height: `${position.size}px`,
            }}
            animate={{
              y: [0, -40, 0],
              x: [0, Math.random() * 30 - 15, 0],
              rotate: [0, Math.random() * 360],
              scale: [1, 1.3, 1],
              opacity: [0.7, 1, 0.7]
            }}
            transition={{
              duration: position.duration,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
              ease: "easeInOut",
              delay: position.delay,
            }}
          >
            {i % 6 === 0 ? (
              <Star className="w-full h-full text-yellow-400/80 fill-yellow-200/50 drop-shadow-sm" />
            ) : i % 6 === 1 ? (
              <Sparkles className="w-full h-full text-purple-400/80 drop-shadow-sm" />
            ) : (
              <Heart className={`w-full h-full ${i % 3 === 0
                  ? "text-rose-400/80"
                  : i % 3 === 1
                    ? "text-pink-500/80"
                    : "text-purple-400/80"
                } ${i % 2 === 0 ? "fill-pink-200/50" : "fill-purple-200/50"} drop-shadow-sm`}
              />
            )}
          </motion.div>
        ))}
      </div>

      {/* Main loading card */}
      <motion.div
        className="relative z-10 glass-card rounded-3xl p-10 flex flex-col items-center max-w-sm mx-auto"
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ duration: 0.7, type: 'spring' }}
      >
        {/* Inner glow */}
        <div className="absolute inset-0 rounded-3xl pointer-events-none" 
          style={{
            background: 'radial-gradient(circle at center, rgba(244, 114, 182, 0.2) 0%, transparent 70%)'
          }} 
        />
        
        {/* Bouncing hearts */}
        <div className="flex justify-center space-x-4 mb-8">
          {Array.from({ length: 3 }).map((_, i) => (
            <motion.div
              key={i}
              animate={{
                y: [0, -20, 0],
                scale: [1, 1.3, 1],
                rotate: [0, 10, -10, 0]
              }}
              transition={{
                duration: 1.5,
                repeat: Number.POSITIVE_INFINITY,
                delay: i * 0.2,
              }}
            >
              <Heart
                className={`w-10 h-10 ${i === 0
                  ? "text-rose-500/90 fill-rose-300/40"
                  : i === 1
                    ? "text-pink-500/90 fill-pink-300/40"
                    : "text-purple-500/90 fill-purple-300/40"
                  } drop-shadow-md`}
              />
            </motion.div>
          ))}
        </div>

        <motion.p
          className="text-2xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-pink-600 to-purple-600 mb-6"
          animate={{
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 2.5,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut"
          }}
        >
          Preparing Something Special...
        </motion.p>

        {/* Animated emojis */}
        <div className="flex justify-center space-x-5 mt-6">
          {["🎂", "✨", "🎁", "💖", "🎈"].map((emoji, i) => (
            <motion.span
              key={i}
              className="text-2xl"
              animate={{
                rotate: [0, 15, -15, 0],
                scale: [1, 1.3, 1],
                y: [0, -10, 0],
              }}
              transition={{
                duration: 2.5,
                repeat: Number.POSITIVE_INFINITY,
                delay: i * 0.15,
              }}
            >
              {emoji}
            </motion.span>
          ))}
        </div>

        {/* Loading dots */}
        <div className="flex justify-center space-x-3 mt-8">
          {Array.from({ length: 3 }).map((_, i) => (
            <motion.div
              key={i}
              className="w-3 h-3 rounded-full bg-gradient-to-r from-pink-500 to-purple-500"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.6, 1, 0.6],
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

      <style jsx global>{`
        .glass-card {
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.25) 0%, rgba(255, 255, 255, 0.15) 100%);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          box-shadow: 
            0 8px 32px rgba(0, 0, 0, 0.1),
            0 0 20px rgba(244, 114, 182, 0.2),
            inset 0 0 20px rgba(255, 255, 255, 0.1);
          transition: all 0.3s ease;
        }
        
        .glass-card:hover {
          transform: translateY(-5px);
          box-shadow: 
            0 12px 40px rgba(0, 0, 0, 0.15),
            0 0 30px rgba(244, 114, 182, 0.3),
            inset 0 0 30px rgba(255, 255, 255, 0.15);
        }
      `}</style>
    </div>
  )
}

export default Loader