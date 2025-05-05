"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Cake, Sparkles } from "lucide-react"

export default function VirtualCandleBlowing({ onComplete }) {
  const [candles, setCandles] = useState([
    { id: 1, lit: true },
    { id: 2, lit: true },
    { id: 3, lit: true },
    { id: 4, lit: true },
    { id: 5, lit: true },
  ])
  const [isBlowing, setIsBlowing] = useState(false)
  const audioRef = useRef(null)

  // Check if all candles are extinguished
  useEffect(() => {
    const allExtinguished = candles.every(candle => !candle.lit)
    if (allExtinguished) {
      // Play cheer sound
      if (audioRef.current) {
        audioRef.current.volume = 0.5
        audioRef.current.play().catch((e) => {
          console.log("Cheer sound playback error:", e)
        })
      }
      // Delay transition to BirthdayCelebration to allow cheer sound to play
      setTimeout(() => {
        onComplete()
      }, 2000) // 2-second delay to hear the cheer
    }
  }, [candles, onComplete])

  const handleBlow = (candleId) => {
    setIsBlowing(true)
    setCandles(candles.map(candle =>
      candle.id === candleId ? { ...candle, lit: false } : candle
    ))
    setTimeout(() => setIsBlowing(false), 300) // Reset blowing state after animation
  }

  return (
    <div className="flex flex-col items-center justify-center relative">
      {/* Instruction */}
      <motion.p
        className="text-white text-lg mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Click or drag on the candles to blow them out!
      </motion.p>

      {/* Cake and Candles */}
      <motion.div
        className="relative flex flex-col items-center"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        {/* Cake */}
        <Cake className="w-24 h-24 text-pink-500" />

        {/* Candles */}
        <div className="absolute top-2 flex space-x-1">
          {candles.map(candle => (
            <motion.div
              key={candle.id}
              className="relative w-2 h-6 bg-yellow-200 rounded-t-sm cursor-pointer"
              onClick={() => handleBlow(candle.id)}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={() => handleBlow(candle.id)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Candle Wick */}
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-0.5 h-1 bg-gray-600"></div>

              {/* Flame */}
              <AnimatePresence>
                {candle.lit && (
                  <motion.div
                    className="absolute top-[-5px] left-1/2 transform -translate-x-1/2"
                    initial={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.div
                      className="w-3 h-4 bg-orange-400 rounded-full"
                      animate={{
                        scale: [1, 1.2, 1],
                        y: [0, -1, 0],
                        opacity: isBlowing ? [1, 0.5, 0] : [1, 0.8, 1],
                      }}
                      transition={{
                        duration: 0.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      <div className="absolute inset-0 bg-yellow-300 rounded-full scale-50"></div>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Sparkles for celebration */}
        <AnimatePresence>
          {candles.every(candle => !candle.lit) && (
            <motion.div
              className="absolute inset-0 flex justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Sparkles className="w-12 h-12 text-yellow-400 animate-pulse" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <audio ref={audioRef} src="/cheer.mp3" preload="auto" />
    </div>
  )
}