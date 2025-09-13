
export const TRANSITION = {
	duration: 1.5,
	delay: 0.25,
	ease: [0.76, 0, 0.24, 1],
}

export const ANIMATIONS = [
	{
		name: 'keyframe-1',
		animations: [{
			target: 'create',
			animation: {
				x: '-25%',
				y: 0,
			}
		},
		{
			target: 'input-output',
			animation: {
				x: '0%',
			}
		},
		{
			target: 'input-output-hidden',
			animation: {
				x: '300%',
			}
		},
		{
			target: 'location',
			animation: {
				x: '-125%',
			}
		},
		{
			target: 'location-hidden',
			animation: {
				x: '0%',
			}
		},
		{
			target: 'with-no-hidden',
			animation: {
				x: '0%',
			}
		},
		{
			target: 'with-no',
			animation: {
				x: '155%',
			}
		},
		{
			target: 'bg',
			animation: {
				width: '25%',
			}
		},
		{
			target: 'limits',
			animation: {
				x: '-120%',
			}
		},
		{
			target: 'limits-hidden',
			animation: {
				x: '-0%',
			}
		},
		{
			// target: 'with-no-hidden',
			// animation: {
			// 	x: '0%',
			// }
		},
		{
			target: 'limits',
			animation: {
				y: 0,
			}
		}]
	},
	{
		name: 'keyframe-2',
		animations: [
			{
			target: 'create',
			animation: {
				x: '-75%'
			}
		},
		{
			target: 'with-no-hidden',
			animation: {
				y: '-75%'
			}
		},
		{
			target: 'location-hidden',
			animation: {
				y: 'calc(-100vh / 5 * 1)'
			}
		}
	]
	}, {
		name: 'keyframe-3',
		animations: [
			{
				target: 'bg',
				animation: {
					height: '100%',
					width: '100%'
			}}
		]
	}
]
/** Utility fucntion to animate an element */
export async function animateElement(animate: any, element: HTMLElement, animation: any, transition?: any) {
	await animate(element, animation, transition = TRANSITION);
}

/** This one executes animations at the same time  */
export async function executeKeyframe(animate: any, elements: any, animations: any) {
	const executableAnimations = animations.map((animation: any) => {
		if (animation.target) {
			return animateElement(animate, elements.current.get(animation.target), animation.animation, TRANSITION);
		}
		return Promise.resolve();
	})
	await Promise.all(executableAnimations);
}

/** Execute keyframes sequentially (one after another) */
export async function timeline(animate: any, elements: any, animations = ANIMATIONS)
{
    for (const keyframe of animations) {
		await executeKeyframe(animate, elements, keyframe.animations);
	}
}
