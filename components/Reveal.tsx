"use client";

import { motion, Variants } from "framer-motion";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  /** Scrub once when the element scrolls into view, then stay. */
  once?: boolean;
};

const variants: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: (custom: { delay: number; y: number }) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
      delay: custom.delay,
    },
  }),
};

/**
 * Fades + lifts its children into view on scroll.
 * Wrap any section/card with <Reveal>...</Reveal> to opt in.
 */
export default function Reveal({
  children,
  delay = 0,
  y = 24,
  className,
  once = true,
}: Props) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once, margin: "-80px" }}
      variants={variants}
      custom={{ delay, y }}
    >
      {children}
    </motion.div>
  );
}
