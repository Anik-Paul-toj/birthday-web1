"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Star, Gift, Sparkles, Music, Heart, PartyPopper } from "lucide-react"

export default function BirthdayTreasureHunt({ onComplete }) {
  const [currentClue, setCurrentClue] = useState(0)
  const [showingSequence, setShowingSequence] = useState(true)
  const [colorSequence, setColorSequence] = useState([])
  const [giftPosition, setGiftPosition] = useState(15)
  const [riddleAnswer, setRiddleAnswer] = useState("")
  const [messagePieces, setMessagePieces] = useState([])
  const [showConfetti, setShowConfetti] = useState(false)
  const [selectedBubbles, setSelectedBubbles] = useState([])
  const [selectedColors, setSelectedColors] = useState([])
  const [timeLeft, setTimeLeft] = useState(60)
  const [timerActive, setTimerActive] = useState(false)
  const [shake, setShake] = useState(false)
  const [hints, setHints] = useState(3)
  const [showHint, setShowHint] = useState(false)

  // Generate random sequence and gift position when component mounts
  useEffect(() => {
    generateRandomColorSequence();
    setGiftPosition(Math.floor(Math.random() * 16));
  }, []);
  
  // Reset state and regenerate random elements when changing clues
  useEffect(() => {
    setSelectedColors([]);
    setSelectedBubbles([]);
    setRiddleAnswer("");
    setShowingSequence(true);
    setTimeLeft(60);
    setTimerActive(false);
    
    if (currentClue === 1) {
      generateRandomColorSequence();
    }
    if (currentClue === 2) {
      setGiftPosition(Math.floor(Math.random() * 16));
    }
  }, [currentClue]);

  const generateRandomColorSequence = () => {
    const newSequence = [];
    for (let i = 0; i < 4; i++) {
      newSequence.push(Math.floor(Math.random() * 4));
    }
    setColorSequence(newSequence);
  };

  useEffect(() => {
    let interval;
    if (timerActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prevTime => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setTimerActive(false);
      setCurrentClue(currentClue);
      setTimeLeft(60);
    }
    return () => clearInterval(interval);
  }, [timerActive, timeLeft, currentClue]);
  
  useEffect(() => {
    if (currentClue === 1 && showingSequence) {
      const timer = setTimeout(() => {
        setShowingSequence(false);
      }, 5000);
      
      return () => {
        clearTimeout(timer);
      };
    }
  }, [currentClue, showingSequence, colorSequence]);

  const triggerShake = () => {
    setShake(true);
    setTimeout(() => setShake(false), 500);
  };

  const useHint = () => {
    if (hints > 0) {
      setHints(prev => prev - 1);
      setShowHint(true);
      setTimeout(() => setShowHint(false), 5000);
    }
  };

  const randomColors = [
    "bg-pink-400", "bg-blue-400", "bg-green-400", 
    "bg-purple-400", "bg-yellow-400", "bg-red-400"
  ];

  const clues = [
    {
      text: "Find the balloon with a star on it!",
      hint: "Look for something yellow!",
      component: (
        <div className="flex flex-wrap justify-center gap-4 mt-6">
          {[...Array(9)].map((_, i) => (
            <motion.div
              key={i}
              className={`w-14 h-14 rounded-full cursor-pointer flex items-center justify-center ${
                i === 4 ? "bg-yellow-400" : randomColors[Math.floor(Math.random() * randomColors.length)]
              }`}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => {
                if (i === 4) {
                  setMessagePieces(prev => [...prev, "You are"]);
                  setCurrentClue(1);
                  setShowConfetti(true);
                  setTimeout(() => setShowConfetti(false), 2000);
                } else {
                  triggerShake();
                }
              }}
              animate={{
                y: [0, -10, 0],
                rotate: [0, 5, -5, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
                delay: i * 0.1
              }}
            >
              {i === 4 ? <Star className="w-6 h-6 text-white" /> : <div className="w-3 h-3 bg-white rounded-full" />}
            </motion.div>
          ))}
        </div>
      ),
    },
    
    {
      text: "Remember this color sequence!",
      hint: "Watch carefully! Each time the pattern will be different.",
      component: (
        <div className="mt-6 flex flex-col items-center">
          {showingSequence && (
            <div className="mb-6">
              <motion.p
                className="text-white mb-4 text-lg font-bold"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                Remember this sequence...
              </motion.p>
              
              <div className="flex justify-center gap-4">
                {colorSequence.map((colorIndex, i) => {
                  const colors = ["bg-red-500", "bg-blue-500", "bg-green-500", "bg-yellow-500"];
                  return (
                    <motion.div 
                      key={i} 
                      className={`w-16 h-16 rounded-lg ${colors[colorIndex]} flex items-center justify-center`}
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ 
                        scale: [0.8, 1.1, 1],
                        opacity: 1,
                      }}
                      transition={{ 
                        delay: i * 0.5,
                        duration: 0.5
                      }}
                    >
                      <span className="text-white font-bold text-xl">{i+1}</span>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          )}
          
          <AnimatePresence>
            {!showingSequence && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full"
              >
                <motion.p
                  className="text-white mb-4 text-lg font-bold"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  Now repeat the sequence!
                </motion.p>
                <div className="grid grid-cols-2 gap-4">
                  {["bg-red-500", "bg-blue-500", "bg-green-500", "bg-yellow-500"].map((color, i) => (
                    <motion.div
                      key={i}
                      className={`${color} w-20 h-20 rounded-lg cursor-pointer`}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => {
                        try {
                          const audio = new Audio();
                          audio.volume = 0.3;
                          audio.src = `data:audio/wav;base64,UklGRl9vT19XQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YU${btoa((i+1)*100)}`;
                          audio.play().catch(e => console.log("Audio play error:", e));
                        } catch (e) {}
                        
                        const newSelected = [...selectedColors, i];
                        setSelectedColors(newSelected);
                        
                        if (newSelected.length === colorSequence.length) {
                          if (newSelected.every((val, idx) => val === colorSequence[idx])) {
                            setMessagePieces(prev => [...prev, "amazing"]);
                            setCurrentClue(2);
                            setShowConfetti(true);
                            setTimeout(() => setShowConfetti(false), 2000);
                          } else {
                            triggerShake();
                            setTimeout(() => setSelectedColors([]), 500);
                          }
                        }
                      }}
                      animate={
                        selectedColors.includes(i) && selectedColors[selectedColors.length - 1] === i
                          ? { scale: [1, 1.2, 1], boxShadow: ["0 0 0 rgba(255,255,255,0)", "0 0 15px rgba(255,255,255,0.5)", "0 0 0 rgba(255,255,255,0)"] } 
                          : {}
                      }
                      transition={{ duration: 0.3 }}
                    />
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          
          {!showingSequence && (
            <>
              <motion.div
                className="flex mt-4 gap-2 justify-center"
                animate={shake ? { x: [-10, 10, -10, 10, 0] } : {}}
                transition={{ duration: 0.4 }}
              >
                {[0, 1, 2, 3].map((_, i) => (
                  <div 
                    key={i} 
                    className={`w-3 h-3 rounded-full ${
                      selectedColors.length > i 
                        ? "bg-white" 
                        : "bg-white/30"
                    }`}
                  />
                ))}
              </motion.div>
              <motion.button
                onClick={() => setSelectedColors([])}
                className="mt-4 bg-white/20 hover:bg-white/30 rounded-full text-white font-bold py-1 px-6"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Reset
              </motion.button>
            </>
          )}
        </div>
      ),
    },
    
    {
      text: "Pop the bubbles to find the hidden gift! You have 60 seconds.",
      hint: "Keep popping! The gift could be anywhere.",
      component: (
        <div className="relative mt-6">
          <motion.div 
            className="grid grid-cols-4 gap-3"
            animate={shake ? { x: [-10, 10, -10, 10, 0] } : {}}
            transition={{ duration: 0.4 }}
          >
            {[...Array(16)].map((_, i) => (
              <motion.div
                key={i}
                className={`w-14 h-14 rounded-full bg-blue-300/70 cursor-pointer flex items-center justify-center`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.8 }}
                animate={{
                  scale: selectedBubbles.includes(i) ? 0 : 1,
                  opacity: selectedBubbles.includes(i) ? 0 : 1,
                }}
                onClick={() => {
                  if (!timerActive) setTimerActive(true);
                  if (!selectedBubbles.includes(i)) {
                    setSelectedBubbles(prev => [...prev, i]);
                    if (i === giftPosition) {
                      setMessagePieces(prev => [...prev, "and special!"]);
                      setCurrentClue(3);
                      setTimerActive(false);
                      setShowConfetti(true);
                      setTimeout(() => setShowConfetti(false), 2000);
                    }
                  }
                }}
              >
                {i === giftPosition && selectedBubbles.includes(i) && (
                  <Gift className="w-6 h-6 text-purple-500" />
                )}
              </motion.div>
            ))}
          </motion.div>
          
          <div className="mt-4 flex items-center justify-center">
            <motion.div 
              className="text-white font-mono text-lg"
              animate={timeLeft < 10 ? { scale: [1, 1.2, 1], color: ["#fff", "#ef4444", "#fff"] } : {}}
              transition={{ duration: 0.5, repeat: timeLeft < 10 ? Infinity : 0 }}
            >
              Time: {timeLeft}s
            </motion.div>
          </div>
        </div>
      ),
    },
    
    {
      text: "Answer this riddle: What has a neck but no head?",
      hint: "It's something you wear...",
      component: (
        <div className="mt-6 flex flex-col items-center">
          <motion.div 
            className="w-full"
            animate={shake ? { x: [-10, 10, -10, 10, 0] } : {}}
            transition={{ duration: 0.4 }}
          >
            <input
              type="text"
              value={riddleAnswer}
              onChange={(e) => setRiddleAnswer(e.target.value)}
              className="p-2 rounded-lg w-full bg-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-pink-500"
              placeholder="Type your answer..."
            />
            <motion.button
              onClick={() => {
                if (riddleAnswer.toLowerCase().trim() === "bottle" || 
                    riddleAnswer.toLowerCase().trim() === "a bottle" ||
                    riddleAnswer.toLowerCase().trim() === "shirt" || 
                    riddleAnswer.toLowerCase().trim() === "a shirt") {
                  setMessagePieces(prev => [...prev, "Happy Birthday!"]);
                  setShowConfetti(true);
                  setTimeout(() => {
                    onComplete();
                  }, 2000);
                } else {
                  triggerShake();
                  setRiddleAnswer("");
                }
              }}
              className="mt-4 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 rounded-full text-white font-bold py-2 px-6 w-full"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Submit
            </motion.button>
          </motion.div>
        </div>
      ),
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center text-center p-4 relative min-h-screen pb-24">
      {/* Progress indicator */}
      <div className="w-full max-w-md mb-6 bg-white/10 rounded-full h-2.5 mt-4">
        <div 
          className="bg-gradient-to-r from-pink-500 to-purple-500 h-2.5 rounded-full" 
          style={{ width: `${(currentClue / clues.length) * 100}%` }}
        ></div>
      </div>
      
      {/* Clue number */}
      <motion.div 
        className="absolute top-4 left-4 bg-pink-500 rounded-full w-8 h-8 flex items-center justify-center text-white font-bold"
        initial={{ scale: 0 }}
        animate={{ scale: 1, rotate: [0, 10, 0] }}
        transition={{ duration: 0.5 }}
      >
        {currentClue + 1}
      </motion.div>
      
      {/* Hints system */}
      <div className="absolute top-4 right-4 flex items-center">
        <motion.button
          disabled={hints === 0}
          onClick={useHint}
          className={`text-white font-bold text-sm px-3 py-1 rounded-full flex items-center ${
            hints > 0 ? 'bg-purple-500 hover:bg-purple-600' : 'bg-gray-500 cursor-not-allowed'
          }`}
          whileHover={hints > 0 ? { scale: 1.05 } : {}}
          whileTap={hints > 0 ? { scale: 0.95 } : {}}
        >
          <Sparkles className="w-4 h-4 mr-1" /> Hint ({hints})
        </motion.button>
      </div>
      
      {/* Hint message */}
      <AnimatePresence>
        {showHint && (
          <motion.div 
            className="absolute top-12 right-4 bg-purple-600 text-white p-2 rounded-lg max-w-xs"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            {clues[currentClue].hint}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main content area with proper spacing */}
      <div className="flex-1 flex flex-col items-center justify-center w-full max-w-md px-4">
        {/* Clue Text */}
        <motion.div
          className="bg-white/10 p-4 rounded-lg w-full mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.p
            className="text-white text-lg"
            key={currentClue}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {clues[currentClue].text}
          </motion.p>
        </motion.div>

        {/* Clue Component */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentClue}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5 }}
          >
            {clues[currentClue].component}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Revealed Message Pieces with proper spacing */}
      <div className="w-full max-w-md px-4 mb-4">
        <div className="p-4 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg">
          <AnimatePresence>
            {messagePieces.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-wrap justify-center gap-2 min-h-[3rem]"
              >
                {messagePieces.map((piece, i) => (
                  <motion.p
                    key={i}
                    className="text-white text-xl font-semibold"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 * i, duration: 0.5 }}
                  >
                    {piece} {i < messagePieces.length - 1 && <span>•</span>}
                  </motion.p>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Confetti effect */}
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              initial={{ 
                top: "50%", 
                left: "50%",
                width: Math.random() * 10 + 5,
                height: Math.random() * 10 + 5,
                backgroundColor: ["#ff0080", "#7928ca", "#0070f3", "#ff4d4d", "#ffcc00"][Math.floor(Math.random() * 5)]
              }}
              animate={{ 
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                opacity: [1, 0],
                rotate: [0, 360],
              }}
              transition={{ duration: 1.5 }}
            />
          ))}
        </div>
      )}
      
      {/* Party icons at the bottom with fixed position */}
      <div className="fixed bottom-4 left-0 right-0 flex justify-center">
        <div className="flex space-x-6 text-white/30">
          <div className="w-6 h-6 rounded-full bg-pink-400" />
          <Heart className="w-6 h-6" />
          <Music className="w-6 h-6" />
          <PartyPopper className="w-6 h-6" />
          <Star className="w-6 h-6" />
        </div>
      </div>
    </div>
  );
}