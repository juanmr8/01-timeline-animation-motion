'use client';
import { AnimationOptions, motion } from 'motion/react';
import { useMotionTimeline } from './use-motion-timeline';
import { useEffect } from 'react';
import {
  moveToLeftEdge,
  moveToTopEdge,
  clampToSafe,
  exitLeft,
  exitRight,
  exitTop,
  exitBottom,
  positionBelow,
  positionRightOf,
  positionLeftOf,
  getResponsiveValue,
} from './utils'; // Using simplified utils

export const TRANSITION: AnimationOptions = {
  duration: 1.5,
  delay: 0.25,
  ease: [0.76, 0, 0.24, 1],
};

export default function Home() {
  const measurementSelectors = [
    '.limits',
    '.location',
    '.input-output',
    '.location-hidden',
    '.create-title',
    '.with-no',
    '.limits-hidden',
    '.with-no-hidden',
    '.input-output-hidden',
    '.center-reference',
  ];

  const scope = useMotionTimeline(
    measurements => {
      // Responsive gap for walls
      const wallGap = getResponsiveValue(measurements, {
        mobile: '50px',
        tablet: '100px',
        desktop: '200px',
      });

      return [
        // Keyframe 1
        [
          [
            '.left-wall',
            { width: `calc(50% - ${wallGap})` },
            { ...TRANSITION },
          ],
          [
            '.right-wall',
            { width: `calc(50% - ${wallGap})` },
            { ...TRANSITION },
          ],
          [
            '.create-title',
            {
              x: positionLeftOf(
                measurements,
                '.center-reference',
                '.create-title',
                0
              ),
            },
            { ...TRANSITION },
          ],
          [
            '.with-no',
            { x: clampToSafe(measurements, '.create-title', 'right', 200) },
            { ...TRANSITION },
          ],
          [
            '.limits-hidden',
            { x: exitRight(measurements, '.limits-hidden', 0), opacity: 1 },
            { duration: 0 },
          ],
          [
            '.with-no-hidden',
            { x: exitLeft(measurements, '.with-no-hidden', 0), opacity: 1 },
            { duration: 0 },
          ],
        ],
        // Keyframe 2
        [
          [
            '.create-title',
            { x: moveToLeftEdge(measurements, '.create-title') },
            { ...TRANSITION },
          ],
          [
            '.with-no',
            { x: exitRight(measurements, '.create-title', 0) },
            { ...TRANSITION },
          ],
          [
            '.limits',
            { x: exitLeft(measurements, '.limits', 0) },
            { ...TRANSITION },
          ],
          [
            '.limits-hidden',
            {
              x: positionRightOf(
                measurements,
                '.center-reference',
                '.limits-hidden',
                200
              ),
            },
            { ...TRANSITION },
          ],
          [
            '.with-no-hidden',
            {
              x: positionLeftOf(
                measurements,
                '.center-reference',
                '.with-no-hidden',
                100
              ),
            },
            { ...TRANSITION },
          ],
          [
            '.input-output',
            { x: exitRight(measurements, '.input-output', 0) },
            { ...TRANSITION },
          ],
          [
            '.input-output-hidden',
            {
              x: positionLeftOf(
                measurements,
                '.center-reference',
                '.input-output-hidden',
                200
              ),
            },
            { ...TRANSITION },
          ],
          [
            '.location',
            { x: exitLeft(measurements, '.location', 0) },
            { ...TRANSITION },
          ],
          [
            '.location-hidden',
            { x: clampToSafe(measurements, '.location-hidden', 'left', 400) },
            { ...TRANSITION },
          ],
        ],
        // // Keyframe 3
        [
          [
            '.create-title',
            {
              x: positionLeftOf(
                measurements,
                '.center-reference',
                '.create-title'
              ),
            },
            { ...TRANSITION },
          ],
          [
            '.with-no-hidden',
            {
              x: moveToLeftEdge(measurements, '.with-no-hidden'),
            },
            { ...TRANSITION },
          ],
          [
            '.location-hidden',
            {
              x: exitRight(measurements, '.location-hidden', 50),
            },
            { ...TRANSITION },
          ],
          [
            '.location',
            {
              x: clampToSafe(measurements, '.location', 'right', 250),
            },
            { ...TRANSITION },
          ],
          [
            '.limits-hidden',
            {
              x: positionRightOf(
                measurements,
                '.center-reference',
                '.limits-hidden',
                32
              ),
            },
            { ...TRANSITION },
          ],
          [
            '.input-output-hidden',
            { x: exitLeft(measurements, '.input-output-hidden', 50) },
            { ...TRANSITION },
          ],
          [
            '.input-output',
            {
              x: positionRightOf(
                measurements,
                '.center-reference',
                '.input-output',
                64
              ),
            },
            { ...TRANSITION },
          ],
        ],
        // Keyframe 4
        [
          [
            '.create-title',
            { x: moveToLeftEdge(measurements, '.create-title') },
            { ...TRANSITION },
          ],
          [
            '.location',
            { x: exitLeft(measurements, '.location', 0) },
            { ...TRANSITION },
          ],
          [
            '.with-no-hidden',
            {
              y: positionBelow(
                measurements,
                '.create-title',
                '.with-no-hidden',
                -50
              ),
            },
            { ...TRANSITION },
          ],
          [
            '.limits-hidden',
            { y: moveToTopEdge(measurements, '.limits-hidden', 0) },
            { ...TRANSITION },
          ],
          [
            '.input-output',
            {
              x: positionRightOf(
                measurements,
                '.center-reference',
                '.input-output',
                32
              ),
            },
            { ...TRANSITION },
          ],
        ],
        // // Keyframe 5
        [
          [
            '.create-title',
            { y: exitTop(measurements, '.create-title', 0) },
            { ...TRANSITION },
          ],
          [
            '.with-no-hidden',
            {
              x: exitLeft(measurements, '.with-no-hidden', 0),
            },
            { ...TRANSITION },
          ],
          [
            '.limits-hidden',
            { y: exitTop(measurements, '.limits-hidden', 0) },
            { ...TRANSITION },
          ],
          [
            '.input-output',
            { y: exitBottom(measurements, '.input-output', 0) },
            { ...TRANSITION },
          ],
          ['.left-wall', { width: '0px' }, { ...TRANSITION, delay: 0.5 }],
          ['.right-wall', { width: '0px' }, { ...TRANSITION, delay: 0.5 }],
          ['.top-wall', { height: '0px' }, { ...TRANSITION, delay: 0.5 }],
          ['.bottom-wall', { height: '0px' }, { ...TRANSITION, delay: 0.5 }],
        ],
      ];
    },
    1,
    measurementSelectors
  );

  return (
    <div ref={scope}>
      <div className='pointer-events-none relative h-screen overflow-hidden text-[#252525]'>
        <video
          src='/output.mp4'
          autoPlay
          muted
          loop
          className='video pointer-events-none'
        />
        <div className='wall-container relative h-full w-full'>
          <TopWall />
          <LeftWall />
          <BottomWall />
          <RightWall />
          <CenterReference />
        </div>
        <div className='text-container absolute top-0 left-0 h-full w-full'>
          <LeftText />
          <RightText />
        </div>
      </div>
    </div>
  );
}

const RightText = () => {
  return (
    <motion.div className='right-text absolute top-0 right-0 h-full w-[50%]'>
      <motion.h1 className='title text-right opacity-0'>Create</motion.h1>

      <motion.div className='flex justify-end'>
        <motion.p
          style={{ x: '105%' }}
          className='subtitle location-hidden relative h-[20px]'
        >
          MA, ES
        </motion.p>
      </motion.div>

      <motion.div className='with-no'>
        <motion.h1 className='title col-span-4'>With No</motion.h1>
      </motion.div>

      <motion.div className=''>
        <motion.h1 style={{ opacity: 0 }} className='title limits-hidden'>
          Limits
        </motion.h1>
      </motion.div>

      <motion.div className='' style={{ x: '50%' }}>
        <motion.p className='subtitle input-output col-span-2 col-start-9'>
          0 -&gt; 1
        </motion.p>
      </motion.div>
    </motion.div>
  );
};

// Rest of your components remain the same...
const RightWall = () => {
  return (
    <motion.div
      className='right-wall absolute top-0 h-full bg-white'
      style={{
        right: '0',
        width: 'calc(50% - 0px)',
      }}
    />
  );
};

const BottomWall = () => {
  return (
    <motion.div
      className='bottom-wall absolute left-0 w-full bg-white'
      style={{
        bottom: '0',
        height: 'calc(50% - 17rem)',
      }}
    />
  );
};

const TopWall = () => {
  return (
    <motion.div
      style={{
        y: 0,
        height: 'calc(50% - 17rem)',
      }}
      className='top-wall absolute top-0 left-0 w-full bg-white'
    />
  );
};

const LeftText = () => {
  return (
    <motion.div className='left-text absolute top-0 left-0 h-full w-[50%]'>
      <div className='w-full'>
        <div className='flex justify-end'>
          <motion.h1 className='title create-title'>Create</motion.h1>
        </div>
        <div className='subtitle relative col-span-4 col-start-5 h-[20px] w-full self-end'>
          <motion.p style={{ x: '10rem' }} className='location h-[fit-content]'>
            MA, ES
          </motion.p>
        </div>
        <div>
          <motion.h1 style={{ opacity: 0 }} className='title with-no-hidden'>
            With No
          </motion.h1>
        </div>
        <motion.div style={{ x: '-50%' }} className='text-right'>
          <motion.h1 className='title limits'>Limits</motion.h1>
        </motion.div>

        <motion.div className=''>
          <motion.p
            style={{ x: '-100%' }}
            className='subtitle input-output-hidden'
          >
            0 -&gt; 1
          </motion.p>
        </motion.div>
      </div>
    </motion.div>
  );
};

const LeftWall = () => {
  return (
    <motion.div
      className='left-wall absolute top-0 left-0 h-full bg-white'
      style={{
        width: 'calc(50% - 0px)',
      }}
    />
  );
};

const CenterReference = () => {
  return (
    <motion.div
      className='center-reference pointer-events-none absolute bg-transparent'
      style={{
        top: 'calc(50% - 17rem)',
        left: 'calc(50% - 200px)', // Center it by calculating left edge position directly
        width: `400px`, // This will be updated by the timeline animation to match wallGap * 2
        height: '34rem', // 2 * 17rem = 34rem
      }}
    />
  );
};
