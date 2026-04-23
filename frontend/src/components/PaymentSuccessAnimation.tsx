"use client";

import { motion, type Variants } from "framer-motion";
import { useEffect } from "react";
import confetti from "canvas-confetti";

interface PaymentSuccessAnimationProps {
  onComplete?: () => void;
  className?: string;
}

const containerVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20,
      staggerChildren: 0.1,
    },
  },
};

const circleVariants: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: "easeInOut",
    },
  },
};

const checkVariants: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: "easeOut",
      delay: 0.3,
    },
  },
};

export function PaymentSuccessAnimation({ onComplete, className = "" }: PaymentSuccessAnimationProps) {
  useEffect(() => {
    // Fire brand-themed confetti
    const duration = 2000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval: NodeJS.Timeout = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        clearInterval(interval);
        onComplete?.();
        return;
      }

      const particleCount = 20 * (timeLeft / duration);
      
      // Use Pluto theme colors: steel blue, ice blue, and deep navy
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        colors: ["#4A6FA5", "#B8D4E8", "#0D1B2E"],
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        colors: ["#4A6FA5", "#B8D4E8", "#0D1B2E"],
      });
    }, 250);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div
      className={`flex flex-col items-center justify-center gap-4 ${className}`}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="relative h-24 w-24">
        {/* Animated Background Pulse */}
        <motion.div
          className="absolute inset-0 rounded-full bg-[var(--pluto-100)]"
          initial={{ scale: 0 }}
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        />
        
        <svg
          viewBox="0 0 100 100"
          className="relative h-full w-full drop-shadow-[0_0_8px_rgba(74,111,165,0.3)]"
        >
          {/* Circle Outline */}
          <motion.circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="var(--pluto-500)"
            strokeWidth="6"
            strokeLinecap="round"
            variants={circleVariants}
          />
          
          {/* Checkmark */}
          <motion.path
            d="M30 50L45 65L70 35"
            fill="none"
            stroke="var(--pluto-500)"
            strokeWidth="8"
            strokeLinecap="round"
            strokeLinejoin="round"
            variants={checkVariants}
          />
        </svg>
      </div>
      
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <h3 className="text-lg font-bold text-[var(--pluto-800)]">Payment Secured</h3>
        <p className="text-sm text-[var(--pluto-600)]">Transaction verified on Stellar</p>
      </motion.div>
    </motion.div>
  );
}
