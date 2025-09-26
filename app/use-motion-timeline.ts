import { ElementOrSelector, useAnimate } from 'framer-motion';
import { DOMKeyframesDefinition } from 'motion/react';
import { AnimationOptions } from 'motion/react';
import { useLayoutEffect, useRef } from 'react';
import { useEffect } from 'react';

type AnimateParams = [
  ElementOrSelector,
  DOMKeyframesDefinition,
  (AnimationOptions | undefined)?,
];

type Animation = AnimateParams | Animation[];

export const useMotionTimeline = (
	keyframes: (measurements: Map<string, DOMRect>) => Animation[],
	count: number = 1,
	measurementSelectors: string[] = []
  ) => {
	const mounted = useRef(true);
	const measurements = useRef<Map<string, DOMRect>>(new Map());
	const [scope, animate] = useAnimate();

	const takeMeasurements = () => {
	  const viewport = {
		width: window.innerWidth,
		height: window.innerHeight
	  };

	  // Always include viewport measurements
	  measurements.current.set('viewport', {
		top: 0,
		left: 0,
		right: viewport.width,
		bottom: viewport.height,
		width: viewport.width,
		height: viewport.height,
		x: 0,
		y: 0,
		toJSON: () => ({})
	  } as DOMRect);

	  measurementSelectors.forEach(selector => {
		const element = scope.current?.querySelector(selector);
		if (element) {
		  measurements.current.set(selector, element.getBoundingClientRect());
		}
	  });
	};

	useEffect(() => {
	  mounted.current = true;
	  takeMeasurements();
	  const animationKeyframes = keyframes(measurements.current);
	  handleAnimate(animationKeyframes);


	  return () => {
		mounted.current = false;
	  };
	}, []);

	// Rest of your animation logic...
	const processAnimation = async (animation: Animation) => {
	  if (Array.isArray(animation[0])) {
		await Promise.all(
		  animation.map(async a => {
			await processAnimation(a as Animation);
		  })
		);
	  } else {
		await animate(...(animation as AnimateParams));
	  }
	};

	const handleAnimate = async (animationKeyframes: Animation[]) => {
	  for (let i = 0; i < count; i++) {
		for (const animation of animationKeyframes) {
		  if (!mounted.current) return;
		  await processAnimation(animation);
		}
	  }
	};

	return scope;
  };
