import { motion, type MotionProps } from 'framer-motion';

// Define types for different HTML elements with motion props
type MotionDivProps = MotionProps & React.HTMLAttributes<HTMLDivElement> & any;
type MotionSpanProps = MotionProps & React.HTMLAttributes<HTMLSpanElement> & any;
type MotionH1Props = MotionProps & React.HTMLAttributes<HTMLHeadingElement> & any;
type MotionH2Props = MotionProps & React.HTMLAttributes<HTMLHeadingElement> & any;
type MotionPProps = MotionProps & React.HTMLAttributes<HTMLParagraphElement> & any;
type MotionAProps = MotionProps & React.AnchorHTMLAttributes<HTMLAnchorElement> & any;

// Export typed motion components
export const MotionDiv = motion.div;
export const MotionSpan = motion.span;
export const MotionH1 = motion.h1;
export const MotionH2 = motion.h2;
export const MotionP = motion.p;
export const MotionA = motion.a;
