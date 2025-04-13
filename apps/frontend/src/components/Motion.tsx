import { motion, type MotionProps } from 'motion/react';

// Define types for different HTML elements with motion props
type MotionDivProps = MotionProps & React.HTMLAttributes<HTMLDivElement> & any;
type MotionSpanProps = MotionProps & React.HTMLAttributes<HTMLSpanElement> & any;
type MotionH1Props = MotionProps & React.HTMLAttributes<HTMLHeadingElement> & any;
type MotionH2Props = MotionProps & React.HTMLAttributes<HTMLHeadingElement> & any;
type MotionPProps = MotionProps & React.HTMLAttributes<HTMLParagraphElement> & any;
type MotionAProps = MotionProps & React.AnchorHTMLAttributes<HTMLAnchorElement> & any;

// Export typed motion components
export const MotionDiv: MotionDivProps = motion.div;
export const MotionSpan: MotionSpanProps = motion.span;
export const MotionH1: MotionH1Props = motion.h1;
export const MotionH2: MotionH2Props = motion.h2;
export const MotionP: MotionPProps = motion.p;
export const MotionA: MotionAProps = motion.a;
