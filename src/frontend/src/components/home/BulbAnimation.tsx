import { motion } from "motion/react";

const INFINITY = Number.POSITIVE_INFINITY;

export function BulbAnimation() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.7 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.7, delay: 0.55, ease: [0.34, 1.56, 0.64, 1] }}
      className="flex justify-center mt-14"
      data-ocid="hero.bulb_animation"
    >
      <div className="relative flex items-center justify-center">
        {/* Outer glow ring — blue */}
        <motion.div
          animate={{ scale: [1, 1.18, 1], opacity: [0.35, 0.6, 0.35] }}
          transition={{ duration: 2.4, repeat: INFINITY, ease: "easeInOut" }}
          className="absolute w-40 h-40 rounded-full"
          style={{
            background:
              "radial-gradient(circle, oklch(0.45 0.16 264 / 0.20), transparent 70%)",
          }}
        />
        {/* Mid ring — blue border pulse */}
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.45, 0.85, 0.45] }}
          transition={{
            duration: 2.4,
            repeat: INFINITY,
            ease: "easeInOut",
            delay: 0.35,
          }}
          className="absolute w-26 h-26 rounded-full border border-primary/30"
          style={{
            width: "6.5rem",
            height: "6.5rem",
            background:
              "radial-gradient(circle, oklch(0.45 0.16 264 / 0.09), transparent 70%)",
          }}
        />
        {/* Inner container */}
        <div className="relative z-10 w-20 h-20 rounded-full bg-card border border-primary/35 flex items-center justify-center surface-elevated">
          <svg
            width="40"
            height="40"
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <defs>
              <filter
                id="bulb-glow-blue"
                x="-50%"
                y="-50%"
                width="200%"
                height="200%"
              >
                <feGaussianBlur stdDeviation="2" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            {/* Bulb body — blue */}
            <motion.path
              d="M20 6C14.477 6 10 10.477 10 16c0 3.6 1.8 6.77 4.5 8.68V28h11v-3.32C28.2 22.77 30 19.6 30 16c0-5.523-4.477-10-10-10z"
              fill="oklch(0.45 0.16 264 / 0.85)"
              filter="url(#bulb-glow-blue)"
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{
                duration: 2.2,
                repeat: INFINITY,
                ease: "easeInOut",
              }}
            />
            {/* Base lines — blue */}
            <line
              x1="15"
              y1="30"
              x2="25"
              y2="30"
              stroke="oklch(0.45 0.16 264)"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <line
              x1="16"
              y1="33"
              x2="24"
              y2="33"
              stroke="oklch(0.45 0.16 264)"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            {/* Shine lines — gold accent */}
            <motion.line
              x1="33"
              y1="8"
              x2="36"
              y2="5"
              stroke="oklch(0.62 0.19 60)"
              strokeWidth="1.5"
              strokeLinecap="round"
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 2.2, repeat: INFINITY, delay: 0.4 }}
            />
            <motion.line
              x1="36"
              y1="16"
              x2="40"
              y2="16"
              stroke="oklch(0.62 0.19 60)"
              strokeWidth="1.5"
              strokeLinecap="round"
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 2.2, repeat: INFINITY, delay: 0.7 }}
            />
            <motion.line
              x1="7"
              y1="8"
              x2="4"
              y2="5"
              stroke="oklch(0.62 0.19 60)"
              strokeWidth="1.5"
              strokeLinecap="round"
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 2.2, repeat: INFINITY, delay: 0.55 }}
            />
            <motion.line
              x1="4"
              y1="16"
              x2="0"
              y2="16"
              stroke="oklch(0.62 0.19 60)"
              strokeWidth="1.5"
              strokeLinecap="round"
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 2.2, repeat: INFINITY, delay: 0.9 }}
            />
          </svg>
        </div>
      </div>
    </motion.div>
  );
}
