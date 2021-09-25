import React, { useContext, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ThumbsUp } from '@components/Svgs/ThumbsUp';
import { RockYou } from '@components/Svgs/RockYou';
import { Party } from '@components/Svgs/Party';
import { Rocket } from '@components/Svgs/Rocket';
import { RedHeart } from '@components/Svgs/RedHeart';
import { Twitter } from '@components/Svgs/Twitter';
import { Github } from '@components/Svgs/Github';
import { Instagram } from '@components/Svgs/Instagram';
import { LinkedIn } from '@components/Svgs/LinkedIn';
import useGetPostReactions from 'hooks/useGetPostReactions';
import useCreateReaction from 'hooks/useCreateReaction';
import useSound from 'use-sound';
import { AppContext } from '@context/AppContext';
const like = require('../../../public/sound/like.mp3');
const wow = require('../../../public/sound/wow.mp3');
const bird = require('../../../public/sound/bird.mp3');
const rocket = require('../../../public/sound/rocket.mp3');
const confetti = require('../../../public/sound/confetti-bomb.mp3');
import ConfettiGenerator from 'confetti-js';

interface Props {
  slug: string;
}

export const EmojiReactions = ({ slug }: Props) => {
  const { data: reactions } = useGetPostReactions(`/blog/${slug}`);

  return (
    <div className="fixed bottom-4 lg:bottom-[50%] lg:translate-y-[50%] left-4 lg:left-10 xl:left-20 2xl:left-40">
      <div className="hidden lg:flex mb-10 flex-col items-center">
        <img src="/me.png" className="w-16 rounded-full mb-2" alt="" />
        <p className="text-xs">Uğur</p>
        <p className="text-xs">Emirmustafa</p>
        <div className="h-px w-full bg-gray-100 my-2"></div>
        <div className="grid grid-cols-2 gap-2">
          <a target="_blank" rel="noreferrer" href="https://twitter.com/uguremirmustafa">
            <Twitter size="sm" />
          </a>
          <a target="_blank" rel="noreferrer" href="https://github.com/uguremirmustafa">
            <Github size="sm" />
          </a>
          <a target="_blank" rel="noreferrer" href="https://instagram.com/uguremirmustafa">
            <Instagram size="sm" />
          </a>
          <a
            target="_blank"
            rel="noreferrer"
            href="https://www.linkedin.com/in/u%C4%9Fur-emirmustafao%C4%9Flu-09047b14a/"
          >
            <LinkedIn size="sm" />
          </a>
        </div>
      </div>

      <div className=" p-2 md:p-4 rounded-md bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-400 flex lg:flex-col gap-4 md:shadow-md">
        <AnimatedButton
          slug={slug}
          reaction={'thumbsup'}
          count={reactions?.thumbsup}
          icon={<ThumbsUp />}
        />

        <AnimatedButton
          slug={slug}
          reaction={'rocket'}
          count={reactions?.rocket}
          icon={<Rocket />}
        />
        <AnimatedButton
          slug={slug}
          reaction={'rockyou'}
          count={reactions?.rockyou}
          icon={<RockYou />}
        />
        <AnimatedButton slug={slug} reaction={'party'} count={reactions?.party} icon={<Party />} />
        <AnimatedButton
          slug={slug}
          reaction={'heart'}
          count={reactions?.heart}
          icon={<RedHeart />}
        />
      </div>
    </div>
  );
};

const AnimatedButton = ({ count = 0, reaction, slug, icon }) => {
  const { state } = useContext(AppContext);
  const { data, mutate } = useCreateReaction(`/blog/${slug}`, reaction, count + 1);
  const soundSettings = state.sound;
  const [likeSound] = useSound(like, soundSettings);
  const [confettiSound] = useSound(confetti, soundSettings);
  const [wowSound] = useSound(wow, soundSettings);
  const [rocketSound] = useSound(rocket, soundSettings);
  const [birdSound] = useSound(bird, soundSettings);

  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const patlat = () => {
    const canvas = document.getElementById('body');
    if (mounted) {
      const conf = new ConfettiGenerator({ target: 'body' });
      canvas.classList.remove('hidden');
      conf.render();
      setTimeout(() => {
        conf.clear();
        canvas.classList.add('hidden');
      }, 4000);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <motion.button
        className="outline-none"
        whileHover={{
          scale: reaction === 'rocket' ? 2 : 1.2,
          rotate: 2,
          transition: { type: 'spring' },
          transformOrigin: 'left bottom',
        }}
        onClick={() => {
          mutate();
          if (reaction === 'thumbsup') {
            birdSound();
          }
          if (reaction === 'heart') {
            likeSound();
          }
          if (reaction === 'party') {
            confettiSound();
            patlat();
          }
          if (reaction === 'rocket') {
            rocketSound();
          }
          if (reaction === 'rockyou') {
            wowSound();
          }
        }}
      >
        {icon}
      </motion.button>
      <span className="font-bold text-xs lg:text-sm mt-px lg:mt-2">{count}</span>
    </div>
  );
};
