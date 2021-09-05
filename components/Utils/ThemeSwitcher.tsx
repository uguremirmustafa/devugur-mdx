import { useTheme } from 'next-themes';
import React, { useContext, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import useSound from 'use-sound';
import { AppContext } from '@context/AppContext';
const sound = require('../../public/sound/switch.mp3');
interface Props {}

export const ThemeSwitcher = (props: Props) => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const { state } = useContext(AppContext);
  // After mounting, we have access to the theme
  useEffect(() => setMounted(true), []);

  let isDark = theme === 'dark';
  const [playActive] = useSound(sound, state.sound);

  return (
    <motion.button
      onClick={() => {
        setTheme(isDark ? 'light' : 'dark'), playActive();
      }}
      className="p-1 border-gray-900 dark:border-white rounded-lg outline-none w-8 h-8 flex justify-center items-center"
      whileTap={{
        rotate: [30, -30, 20, -20, 10, -10, 0],
        transition: { duration: 1, ease: 'easeInOut' },
      }}
    >
      {mounted && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          stroke="currentColor"
          className="w-6 h-6 text-gray-800 dark:text-gray-200"
        >
          {isDark ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
            />
          )}
        </svg>
      )}
    </motion.button>
  );
};
