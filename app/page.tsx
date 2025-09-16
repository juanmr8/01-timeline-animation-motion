'use client';
import { AnimationOptions, motion, motionValue } from 'motion/react';
import { useMotionTimeline } from './use-motion-timeline';


export const TRANSITION: AnimationOptions = {
  duration: 1.5,
  delay: 0.25,
  ease: [0.76, 0, 0.24, 1],
};

export default function Home() {
  const scope = useMotionTimeline([
    // Keyframe 1
    [
      ['.left-wall', { width: 'calc(50% - 200px)' }, { ...TRANSITION }],
      ['.right-wall', { width: 'calc(50% - 200px)' }, { ...TRANSITION }],
      ['.with-no-hidden', { x: '-10%' }, { ...TRANSITION }],
    ],
    // Keyframe 2
    [
      ['.left-wall-separator', { width: '50%' }, { ...TRANSITION }],
      ['.location', { x: '-100%' }, { ...TRANSITION }],
      ['.location-hidden', { x: '50%' }, { ...TRANSITION }],
      ['.with-no', { x: '155%' }, { ...TRANSITION }],
      ['.with-no-hidden', { x: '100%' }, { ...TRANSITION }],
      ['.limits', { x: '-105%' }, { ...TRANSITION }],
      ['.limits-hidden', { x: '0%' }, { ...TRANSITION }],
      ['.input-output', { x: '110%' }, { ...TRANSITION }],
      ['.input-output-hidden', { x: '50%' }, { ...TRANSITION }],
    ],

    // Keyframe 3
    [
      ['.left-wall-separator', { width: '100%' }, { ...TRANSITION }],
      ['.location', { right: '25%' }, { ...TRANSITION }],
    ],

    // Keyframe 4
    [
      ['.top-wall', { y: '-100%' }, { ...TRANSITION }],
      ['.left-wall ', { x: '-100%' }, { ...TRANSITION }],
      ['.bottom-wall', { y: '100%' }, { ...TRANSITION }],
      ['.right-wall', { x: '100%' }, { ...TRANSITION }],
    ],
  ]);

  return (
    <div ref={scope}>
      <div className='relative h-screen overflow-hidden text-[#252525] pointer-events-none'>
        <video
          src='/output.mp4'
          autoPlay
          muted
          loop
          className="video pointer-events-none"
        />
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-black/80 via-black/60 to-black/80 pointer-events-none" />
        <div className='wall-container relative h-full w-full'>
          <TopWall />
          <LeftWall />
          <BottomWall />
          <RightWall />
        </div>
      </div>
    </div>
  );
}

const RightWall = () => {
  return (
    <motion.div
      className='right-wall absolute top-0 h-full bg-white'
      style={{
        right: '0',
        width: 'calc(50% - 0px)',
      }}
    >
      <div className='px-4'>
        {/** Line 1 */}
        <motion.h1 className='create-title title text-right opacity-0'>
          Create
        </motion.h1>
        {/** Line 2 */}
        <motion.div
          style={{
            x: '105%',
          }}
          className='location-hidden'
        >
          <p className='subtitle relative h-[20px] w-full'>MA, ES</p>
        </motion.div>
        {/** Line 3 */}
        <motion.div className='with-no'>
          <motion.h1 className='title col-span-4'>With No</motion.h1>
        </motion.div>
        {/** Line 4 */}
        <motion.div style={{ x: '105%' }} className='limits-hidden'>
          <motion.h1 className='title'>Limits</motion.h1>
        </motion.div>
        {/** Line 5 */}
        <motion.div className='input-output' style={{ x: '50%' }}>
          <motion.p
            data-timeline-target=''
            className='subtitle col-span-2 col-start-9'
          >
            0 -&gt; 1
          </motion.p>
        </motion.div>
      </div>
    </motion.div>
  );
};

const BottomWall = () => {
  return (
    <motion.div
      className='bottom-wall absolute left-0 w-full bg-white'
      style={{
        bottom: '0', // Red box bottom edge
        height: 'calc(50% - 17rem)', // Distance from red box bottom to viewport bottom
      }}
    />
  );
};

const TopWall = () => {
  return (
    <motion.div
      // Top wall - covers from top of viewport to top of red box
      style={{
        y: 0,
        height: 'calc(50% - 17rem)', // Distance from viewport top to red box top
      }}
      className='top-wall absolute top-0 left-0 w-full bg-white'
    />
  );
};

const LeftWall = () => {
  return (
    <>
      <motion.div
        className='left-wall absolute top-0 left-0 h-full bg-white'
        style={{
          width: 'calc(50% - 0px)',
        }}
      >
        <div className='px-4'>
          {/** Line 1 */}
          <motion.div className='left-wall-separator' style={{ width: '100%' }}>
            <motion.h1 className='create-title title text-right'>
              Create
            </motion.h1>
            {/** Line 2 */}
            <motion.div className='location subtitle relative col-span-4 col-start-5 h-[20px] w-full self-end'>
              <motion.p
                style={{
                  right: '25%',
                }}
                className='absolute h-[fit-content]'
              >
                MA, ES
              </motion.p>
            </motion.div>
            {/** Line 3 */}
            <motion.div className='with-no-hidden'>
              <motion.h1 style={{ x: '-100%' }} className='title col-span-4'>
                With No
              </motion.h1>
            </motion.div>
            {/** Line 4 */}
            <motion.div
              style={{ x: '0%' }}
              className='limits pr-[128px] text-right'
            >
              <motion.h1 className='title'>Limits</motion.h1>
            </motion.div>
            {/** Line 5 */}
            <motion.div className='input-output-hidden' style={{ x: '-100%' }}>
              <motion.p
                data-timeline-target=''
                className='subtitle col-span-2 col-start-9'
              >
                0 -&gt; 1
              </motion.p>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </>
  );
};

{
  /* 
        </div>
        <div className='col-span-12 grid grid-cols-12'>

        </div>
        <div className='col-span-12 grid grid-cols-12 self-end'>
          <motion.p
            data-timeline-target='input-output'
            style={{ x: '-160%' }}
            className='subtitle col-span-2 col-start-2'
          >
            0 -&gt; 1
          </motion.p>
          <motion.p
            data-timeline-target='input-output-hidden'
            className='subtitle col-span-2 col-start-9'
            style={{ x: '0%' }}
          >
            0 -&gt; 1
          </motion.p>
        </div>
        <div className='col-span-12 grid grid-cols-12'>
          <motion.h1
            data-timeline-target='limits'
            className='title col-span-4 col-start-3'
          >
            Limits
          </motion.h1>{' '}
          {/* <motion.h1
            data-timeline-target='limits-hidden'
            style={{ x: '100%' }}
            className='title col-span-4 col-start-9'
          >
            Limits
          </motion.h1>
        </div>

        <div className='col-span-12 grid grid-cols-12 self-end'>
          <motion.p
            data-timeline-target='copyright'
            className='subtitle col-start-6'
          >
            © INC.
          </motion.p>
          <motion.p className='subtitle'>SINCE 1999</motion.p>
        </div>
      </div>
      <div className='pointer-events-none absolute inset-0 flex h-screen w-screen'>
        <motion.div
          data-timeline-target='bg'
          style={{ width: '0%', height: '75%' }}
          className='m-auto overflow-hidden rounded-lg'
        >
          <img
            className='inset-0 h-screen w-screen object-cover'
            src='/img2.jpg'
            alt='bg'
          />
        </motion.div>  */
}
