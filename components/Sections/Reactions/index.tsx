import React, { useEffect, useState } from 'react';
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
import useGetReactions from 'hooks/useGetReactions';
import useCreateReaction from 'hooks/useCreateReaction';

interface Props {
  slug: string;
}

export const EmojiReactions = ({ slug }: Props) => {
  const { data: reactions } = useGetReactions(`/blog/${slug}`);

  return (
    <div className="md:fixed bottom-4 md:bottom-[50%] md:translate-y-[50%] right-4 lg:right-10 xl:right-20 2xl:right-40">
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

      <div className=" p-2 md:p-4 rounded-md md:bg-white md:dark:bg-gray-800 md:border border-gray-200 dark:border-gray-400 flex md:flex-col gap-4 md:shadow-md">
        <AnimatedButton
          slug={slug}
          reaction={'thumbsup'}
          count={reactions?.thumbsup}
          icon={<ThumbsUp />}
        />

        <AnimatedButton
          slug={slug}
          reaction={'rockyou'}
          count={reactions?.rockyou}
          icon={<RockYou />}
        />

        <AnimatedButton
          slug={slug}
          reaction={'rocket'}
          count={reactions?.rocket}
          icon={<Rocket />}
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
  const { data, mutate } = useCreateReaction(`/blog/${slug}`, reaction, count + 1);
  return (
    <div className="flex flex-col items-center">
      <motion.button
        className="outline-none"
        whileTap={{ scale: 1.3, rotate: 18 }}
        onClick={() => mutate()}
      >
        {icon}
      </motion.button>
      <span className="text-sm mt-2">{count}</span>
    </div>
  );
};
