'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { StoryCard } from './StoryCard';
import type { Story } from '@/types/story';

const containerVariants = {
  hidden: {},
  visible: {
    transition: { delayChildren: 0.12, staggerChildren: 0.08 },
  },
};

type Props = { stories: Story[] };

export function StoryGrid({ stories }: Props) {
  const prefersReduced = useReducedMotion();

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={prefersReduced ? {} : containerVariants}
      className="grid grid-cols-3 gap-5 pt-5"
    >
      {stories.map((story) => (
        <StoryCard key={story.id} story={story} />
      ))}
    </motion.div>
  );
}
