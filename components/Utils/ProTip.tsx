import React from 'react';
import { motion } from 'framer-motion';

interface Props {
  tip: string;
}

const variants = {
  animate: {
    x: [0, 10],
    // y: [-5, 5],
    transition: {
      x: {
        yoyo: Infinity,
        duration: 1,
      },
      //   y: {
      //     yoyo: Infinity,
      //     duration: 0.2,
      //   },
    },
  },
};

const ProTip = (props: Props) => {
  return (
    <div className="p-4 mt-8 mb-4 border border-red-400 dark:border-gray-500 rounded-sm relative bg-gradient-to-br from-red-50 to-red-100 dark:from-gray-700 dark:to-gray-900">
      <motion.h5
        variants={variants}
        // initial="initial"
        animate="animate"
        className="w-max absolute -left-2 -top-6 bg-red-100 dark:bg-blue-100 py-1 px-2 text-red-600 dark:text-blue-900 rounded-sm border border-red-400 dark:border-gray-500 text-sm shadow-md"
      >
        Pro Tip
      </motion.h5>
      <p className="mt-6 text-sm dark:text-white">{props.tip}</p>
    </div>
  );
};
export default ProTip;
