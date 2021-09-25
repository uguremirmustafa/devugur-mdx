import * as React from 'react';
import { motion, AnimationProps } from 'framer-motion';

const animation: AnimationProps = {
  animate: {
    y: ['2rem', '4rem', '10rem'],
    width: ['5.2rem', '5rem', '5.2rem'],
    height: ['4.8rem', '5rem', '4.8rem'],
    transition: {
      duration: 0.8,
      yoyo: Infinity,
      ease: 'easeIn',
    },
  },
};

const JumpingBall = () => {
  return (
    <div className="h-80 bg-gradient-to-t from-red-100 to-red-50 dark:from-blue-100 dark:to-blue-50 relative p-10 rounded-md my-4">
      <motion.span
        {...animation}
        className="h-10 w-10 rounded-full bg-red-400 dark:bg-blue-400 block mx-auto relative top-10 shadow-lg border dark:border-blue-200"
      />
    </div>
  );
};
export default JumpingBall;
