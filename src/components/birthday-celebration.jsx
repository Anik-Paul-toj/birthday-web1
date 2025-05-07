"use client"

import { useState, useEffect, useRef } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Heart, Sparkles, Gift, Cake, Volume2, PartyPopper, X, ChevronLeft, ChevronRight } from "lucide-react"

export default function BirthdayCelebration() {
  const [isCardOpen, setIsCardOpen] = useState(false)
  const [isGameActive, setIsGameActive] = useState(false)
  const [hasWon, setHasWon] = useState(false)
  const [score, setScore] = useState(0)
  const [balloons, setBalloons] = useState([])
  const [isGalleryOpen, setIsGalleryOpen] = useState(false)
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0)
  const [currentImageDimensions, setCurrentImageDimensions] = useState({ width: 0, height: 0 })
  const audioRef = useRef(null)
  const imageRef = useRef(null)

  const playVoiceMessage = () => {
    if (audioRef.current) {
      audioRef.current.volume = 0.5;
      audioRef.current.play().catch((e) => {
        console.log("Voice message playback error:", e)
      })
    }
  }

  // Photo Gallery Data (Local Files)
  const photos = [
    "/images/memory-1.jpg",
    "/images/memory-2.jpg",
    "/images/memory-3.jpg",
    "/images/memory-4.jpg",
    "/images/memory-5.jpg",
    "/images/memory-6.jpg",
    "/images/memory-7.jpg",
    "/images/memory-8.jpg",
    "/images/memory-9.jpg",
    "/images/memory-10.jpg",
    "/images/memory-11.jpg",
    "/images/memory-12.jpg",
    "/images/memory-13.jpg",
    "/images/memory-14.jpg",
    "/images/memory-15.jpg",
    "/images/memory-16.jpg",
    "/images/memory-17.jpg",
    "/images/memory-18.jpg",
    "/images/memory-19.jpg",
    "/images/memory-20.jpg",
  ]

  // Update image dimensions when image loads or changes
  const handleImageLoad = () => {
    if (imageRef.current) {
      setCurrentImageDimensions({
        width: imageRef.current.naturalWidth,
        height: imageRef.current.naturalHeight
      });
    }
  }

  // Update dimensions when photo changes
  useEffect(() => {
    if (isGalleryOpen && imageRef.current && imageRef.current.complete) {
      handleImageLoad();
    }
  }, [currentPhotoIndex, isGalleryOpen]);

  // Preload the current image and adjacent images for smoother transitions
  useEffect(() => {
    if (isGalleryOpen) {
      // Preload current image
      const img = new Image();
      img.src = photos[currentPhotoIndex];
      
      // Preload next image
      const nextIndex = (currentPhotoIndex + 1) % photos.length;
      const nextImg = new Image();
      nextImg.src = photos[nextIndex];
      
      // Preload previous image
      const prevIndex = (currentPhotoIndex - 1 + photos.length) % photos.length;
      const prevImg = new Image();
      prevImg.src = photos[prevIndex];
    }
  }, [currentPhotoIndex, isGalleryOpen, photos]);

  // Swipe Handlers for Carousel
  const handleSwipe = (direction) => {
    if (direction === "left") {
      setCurrentPhotoIndex((prev) => (prev + 1) % photos.length);
    } else if (direction === "right") {
      setCurrentPhotoIndex((prev) => (prev - 1 + photos.length) % photos.length);
    }
  }

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

  return (
    <div className="flex flex-col items-center relative">
      <motion.div
        initial={{ scale: 0, rotate: -10 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 20,
          delay: 0.3,
        }}
        className="relative mb-2"
      >
        <h1 className="text-4xl sm:text-5xl font-bold text-center text-pink-600 mb-2">Happy Birthday!</h1>
        <div className="flex justify-center gap-3">
          <Cake className="w-8 h-8 text-pink-500" />
          <Sparkles className="w-8 h-8 text-yellow-500" />
          <Heart className="w-8 h-8 text-pink-500" />
        </div>
        <h3 className="text-2xl sm:text-3xl font-bold text-center text-pink-600 mt-2">Golu Bunty</h3>
      </motion.div>

      <motion.div
        className="w-full max-w-md mx-auto my-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <div
          className={`relative cursor-pointer transition-all duration-700 ease-in-out transform ${isCardOpen ? "rotate-0" : "rotate-2"}`}
          onClick={() => setIsCardOpen(!isCardOpen)}
        >
          <div
            className={`bg-gradient-to-r from-pink-400 to-purple-500 rounded-3xl p-14 sm:p-10 shadow-lg transition-all duration-700 transform ${isCardOpen ? "scale-95" : "scale-100"}`}
          >
            <div className="absolute top-2 right-2">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              >
                <Sparkles className="w-6 h-6 text-yellow-200" />
              </motion.div>
            </div>

            <div className="text-center text-white">
              <p className="text-lg font-medium mb-4">Tap to {isCardOpen ? "close" : "open"} your card</p>
              <div className="flex justify-center">
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 5, 0, -5, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                  }}
                >
                  <Gift className="w-14 h-14 text-white" />
                </motion.div>
              </div>
            </div>
          </div>

          <AnimatePresence>
            {isCardOpen && (
              <motion.div
                className="absolute inset-0 bg-white max-[350px]:-top-6 max-[350px]:min-h-[275px] rounded-3xl p-4 shadow-xl shadow-rose-100 flex flex-col items-center justify-center"
                initial={{ rotate: 2, rotateX: -90, opacity: 0 }}
                animate={{
                  rotate: isCardOpen ? 0 : 2,
                  rotateX: isCardOpen ? 0 : -90,
                  opacity: isCardOpen ? 1 : 0,
                  zIndex: isCardOpen ? 10 : -1,
                }}
                exit={{ rotateX: -90, opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="text-center">
                  <p className="text-purple-700 mb-2">
                    Just wanted to remind you—you're my favorite person. My days are better, smiles are wider, and life is sweeter because of you.
                  </p>
                  <p className="text-pink-600 font-medium">I hope your birthday is full of love, magic, and everything that makes you smile 💖</p>
                  <div className="flex justify-center">
                    <motion.div
                      animate={{
                        scale: [1, 1.2, 1],
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Number.POSITIVE_INFINITY,
                      }}
                    >
                      <Heart className="w-8 h-8 stroke-none fill-rose-500" />
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      <motion.div
        className="w-full max-w-md mt-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <div className="text-center">
          <p className="text-lg text-purple-700 mb-4">
            May every wish you make today come true. You deserve the world, and I'll always be here to remind you of that.
          </p>
          <div className="flex justify-center items-center gap-2">
            <p className="text-pink-600 font-medium">Let's always stay like this... together, forever 🫶</p>
          </div>
        </div>
      </motion.div>

      {/* Voice Message Playback Button */}
      <motion.div
        className="mt-6"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.2, type: "spring", stiffness: 300, damping: 20 }}
      >
        <motion.button
          onClick={playVoiceMessage}
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
          <Volume2 className="w-6 h-6 animate-pulse" />
          <span className="text-lg tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">
            Hear My Message
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

      {/* Start Game Button */}
      <motion.div
        className="mt-6"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.4, type: "spring", stiffness: 300, damping: 20 }}
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

      {/* View Memories Button */}
      <motion.div
        className="mt-6"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.6, type: "spring", stiffness: 300, damping: 20 }}
      >
        <motion.button
          onClick={() => setIsGalleryOpen(true)}
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
          <Sparkles className="w-6 h-6 animate-pulse" />
          <span className="text-lg tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">
            View Memories
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
                  src="/images/winner-photo.jpg"
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
                  Congratulations, Golu Bunty! You're amazing, and I'm so proud of you for winning this game! Here's a little memory to celebrate your special day—let's make more unforgettable moments together! 💕
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
                  Back to Celebration
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

      {/* Photo Gallery Modal */}
      <AnimatePresence>
        {isGalleryOpen && (
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex flex-col items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="glass-card rounded-3xl p-6 max-w-[90vw] max-h-[90vh] w-auto h-auto text-center relative flex flex-col items-center"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              {/* Carousel Container - Dynamically sized based on image ratio */}
              <div className="relative flex justify-center items-center overflow-hidden" 
                   style={{
                     minHeight: '200px',
                     maxHeight: '70vh',
                     minWidth: '200px',
                     maxWidth: '80vw',
                     aspect: currentImageDimensions.width && currentImageDimensions.height ? 
                       `${currentImageDimensions.width} / ${currentImageDimensions.height}` : 'auto'
                   }}>
                <motion.div
                  className="w-full h-full relative"
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  onDragEnd={(e, { offset, velocity }) => {
                    if (offset.x < -50 || velocity.x < -500) {
                      handleSwipe("left");
                    } else if (offset.x > 50 || velocity.x > 500) {
                      handleSwipe("right");
                    }
                  }}
                >
                  <motion.img
                    ref={imageRef}
                    key={currentPhotoIndex}
                    src={photos[currentPhotoIndex]}
                    alt={`Memory ${currentPhotoIndex + 1}`}
                    className="w-full h-full object-contain rounded-2xl"
                    initial={{ x: 300, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -300, opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    onLoad={handleImageLoad}
                    onError={(e) => {
                      console.log("Image error, using fallback");
                      e.target.src = "/images/fallback.jpg";
                    }}
                  />
                </motion.div>
                
                {/* Left Arrow Button */}
                <motion.button
                  onClick={() => handleSwipe("right")}
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 rounded-full text-white p-2 flex items-center justify-center"
                  whileTap={{ scale: 0.95 }}
                  animate={{
                    x: [0, -5, 0],
                    scale: [1, 1.05, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <ChevronLeft className="w-6 h-6" />
                </motion.button>

                {/* Right Arrow Button */}
                <motion.button
                  onClick={() => handleSwipe("left")}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 rounded-full text-white p-2 flex items-center justify-center"
                  whileTap={{ scale: 0.95 }}
                  animate={{
                    x: [0, 5, 0],
                    scale: [1, 1.05, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <ChevronRight className="w-6 h-6" />
                </motion.button>
              </div>

              {/* Photo Counter */}
              <div className="mt-4 text-white">
                {currentPhotoIndex + 1} / {photos.length}
              </div>

              {/* Close Button */}
              <motion.button
                onClick={() => setIsGalleryOpen(false)}
                className="mt-6 glow-button rounded-full text-white font-bold py-2 px-4 flex items-center gap-2 relative overflow-hidden group mx-auto"
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
                <X className="w-5 h-5" />
                <span className="text-sm tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">
                  Close Memories
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

      <audio ref={audioRef} src="/voice-message.mp3" preload="auto" />
    </div>
  )
}