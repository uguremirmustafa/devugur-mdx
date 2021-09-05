import { AppContext } from '@context/AppContext';
import { motion } from 'framer-motion';
import React, { useContext, useEffect, useState } from 'react';
import useSound from 'use-sound';
const mute = require('../../public/sound/off.mp3');
const on = require('../../public/sound/on.mp3');

interface Props {}

export const Mute = (props: Props) => {
  const { state, dispatch } = useContext(AppContext);
  const [disableSound] = useSound(mute, state.sound);
  const [enableSound] = useSound(on, { volume: 0.25 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <motion.button
      onClick={() => {
        if (state.sound.soundEnabled) {
          dispatch({ type: 'SOUND_ON' });
          disableSound();
        } else {
          dispatch({ type: 'SOUND_OFF' });
          enableSound();
        }
      }}
      className="p-1 border-gray-900 dark:border-white rounded-lg outline-none w-8 h-8 flex justify-center items-center"
      whileTap={{
        rotate: [30, -30, 20, -20, 10, -10, 0],
        transition: { duration: 1, ease: 'easeInOut' },
      }}
      animate={{ rotate: 0 }}
    >
      {mounted && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          stroke="currentColor"
          className="w-6 h-6 text-gray-800 dark:text-gray-200"
        >
          {!state.sound.soundEnabled ? (
            <path d="M5.889 16H2a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1h3.889l5.294-4.332a.5.5 0 0 1 .817.387v15.89a.5.5 0 0 1-.817.387L5.89 16zm14.525-4l3.536 3.536-1.414 1.414L19 13.414l-3.536 3.536-1.414-1.414L17.586 12 14.05 8.464l1.414-1.414L19 10.586l3.536-3.536 1.414 1.414L20.414 12z" />
          ) : (
            <path d="M5.889 16H2a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1h3.889l5.294-4.332a.5.5 0 0 1 .817.387v15.89a.5.5 0 0 1-.817.387L5.89 16zm13.517 4.134l-1.416-1.416A8.978 8.978 0 0 0 21 12a8.982 8.982 0 0 0-3.304-6.968l1.42-1.42A10.976 10.976 0 0 1 23 12c0 3.223-1.386 6.122-3.594 8.134zm-3.543-3.543l-1.422-1.422A3.993 3.993 0 0 0 16 12c0-1.43-.75-2.685-1.88-3.392l1.439-1.439A5.991 5.991 0 0 1 18 12c0 1.842-.83 3.49-2.137 4.591z" />
          )}
        </svg>
      )}
    </motion.button>
  );
};
