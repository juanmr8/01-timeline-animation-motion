"use client";
import {motion} from "motion/react";
import { useAnimate, usePresence } from "framer-motion"
import { useEffect, useRef } from "react";
import { timeline } from "@/app/utils";
import { div } from "framer-motion/client";

export default function Home() {
	const [scope, animate] = useAnimate();
	const [isPresent, safeToRemove] = usePresence();
	const elementRefs = useRef<any>(new Map());
	useEffect(() => {
		if (isPresent) {
			void timeline(animate, elementRefs);
		}
	}, [isPresent, animate]);
  return (
	<div ref={scope}>
<div  className="grid grid-cols-12 grid-rows-6 relative h-screen overflow-hidden
	text-[#252525] px-[32px] py-[32px]">{/*  */}
		<div className=" col-span-12 grid grid-cols-12">
			<motion.h1 ref={el => elementRefs.current.set('create', el!)}
 className="title col-start-4 col-span-4">
				Create
			</motion.h1>
		</div>
		<div className="col-span-12 grid grid-cols-12">
			<motion.p ref={el => elementRefs.current.set('location', el!)} className="subtitle col-span-4 col-start-5 self-end">MA, ES</motion.p>
			<motion.p ref={el => elementRefs.current.set('location-hidden', el!)} className="subtitle col-start-9 col-span-4 self-end" style={{ x: "120%" }}>MA, ES</motion.p>
		</div>
		<div className="col-span-12 grid grid-cols-12">
			<motion.h1 ref={el => elementRefs.current.set('with-no-hidden', el!)} style={{ x: "-120%" }} className="title col-span-4">With No</motion.h1>
			<motion.h1 ref={el => elementRefs.current.set('with-no', el!)} className="title col-span-4 col-start-7">With No</motion.h1>
		</div>
		<div className="col-span-12 grid grid-cols-12 self-end" >
			<motion.p ref={el => elementRefs.current.set('input-output', el!)} style={{ x: "-160%"}} className="subtitle col-start-2 col-span-2">0 -&gt; 1</motion.p>
			<motion.p ref={el => elementRefs.current.set('input-output-hidden', el!)} className="subtitle col-start-9 col-span-2" style={{ x: "0%" }}>0 -&gt; 1</motion.p>
		</div>
		<div className="col-span-12 grid grid-cols-12">
			<motion.h1 ref={el => elementRefs.current.set('limits', el!)} className="title col-start-3 col-span-4">Limits</motion.h1> {/*  */}
			<motion.h1 ref={el => elementRefs.current.set('limits-hidden', el!)} style={{ x: "100%" }} className="title col-start-9 col-span-4">Limits</motion.h1>
		</div>

		<div className="col-span-12 grid grid-cols-12 self-end">
			<motion.p ref={el => elementRefs.current.set('copyright', el!)} className="subtitle col-start-6">© INC.</motion.p>
			<motion.p className="subtitle">SINCE 1999</motion.p>
		</div>

    </div>
	<div className="absolute w-screen h-screen inset-0 flex  pointer-events-none">
			<motion.div ref={el => elementRefs.current.set('bg', el!)} style={{ width: "0%", height: "75%" }} className="overflow-hidden m-auto rounded-lg"><img className=" inset-0 w-screen h-screen object-cover" src="/img2.jpg" alt="bg" /></motion.div>
		</div>
	</div>

  );
}
