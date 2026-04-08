"use client";

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { FaPencil, FaTrash } from "react-icons/fa6";
import { Draggable } from "gsap/all";
import { Check } from "lucide-react";
import { ImCancelCircle } from "react-icons/im";

gsap.registerPlugin(Draggable);

let openedItem: HTMLDivElement | null = null;

export default function List({ name }: { name: string }) {

	const steps = [
		"TODO",
		"INPROGRESS",
		"DONE"
	]

	const draggableRef = useRef<Draggable[] | null>(null);
	const [showUpdate, setShowUpdate] = useState(false);
	const wrapperRef = useRef<HTMLDivElement>(null);
	const contentRef = useRef<HTMLDivElement>(null);
	const menuRef = useRef<HTMLDivElement>(null);
	const updateDivRef = useRef<HTMLDivElement>(null);
	const editRef = useRef<HTMLButtonElement>(null);
	const deleteRef = useRef<HTMLButtonElement>(null);	
	const validateRef = useRef<HTMLButtonElement>(null);	
	const [update, setUpdate] = useState(false)
	const [currentStep, setCurrentStep] = useState(steps[0]);
	

	const handleSteps = (current: typeof steps[number]) => {
		if (update) return;
		const index = steps.indexOf(current);
		const next = steps[(index + 1) % steps.length];
		setCurrentStep(next);
	};

	const maxDrag = 120;

	useEffect(() => {

		const wrapper = wrapperRef.current;
  		if (!wrapper) return;

		if (!contentRef.current) return;

		
			draggableRef.current = Draggable.create(contentRef.current, {
				type: "x",
				bounds: { minX: -maxDrag, maxX: 0 },
				edgeResistance: 0.8,
				inertia: true,
				minimumMovement: 8,

				onDrag() {
					if (update) return;
					const progress = Math.abs(this.x) / maxDrag;

					gsap.set(editRef.current, {
						scale: 0.6 + progress * 0.4,
						opacity: 0 + progress * 0.5
					});

					gsap.set(deleteRef.current, {
						scale: 0.6 + progress * 0.4,
						opacity: 0 + progress * 0.5
					});

					gsap.set(contentRef.current, {
						scaleY: 1 - progress * 0.05
					});

				},

				onDragEnd() {
				const shouldOpen = Math.abs(this.x) > maxDrag * 0.35;
				const targetX = shouldOpen ? -maxDrag : 0;

				gsap.to(contentRef.current, {
					x: targetX,
					scaleY: 1,
					duration: 0.35,
					ease: "power3.out"
				});

				const targetScale = shouldOpen ? 1 : 0;
				const targetOpacity = shouldOpen ? 1 : 0;

				gsap.to([editRef.current, deleteRef.current], {
					scale: targetScale,
					opacity: targetOpacity,
					duration: 0.25
				});
				}
			});
		

		const open = () => {
			if (update) return;

			gsap.to(contentRef.current, {
				x: -maxDrag,
				duration: 0.35,
				ease: "power3.out"
			});

			gsap.to([editRef.current, deleteRef.current], {
				scale: 1,
				opacity: 1,
				duration: 0.25,
				stagger: 0.05
			});
		};

			const close = () => {
			gsap.to(contentRef.current, {
				x: 0,
				duration: 0.35,
				ease: "power3.out"
			});

			gsap.to([editRef.current, deleteRef.current], {
				scale: 0.6,
				opacity: 0,
				duration: 0.25
			});
		};

		if (window.matchMedia("(hover: hover)").matches) {
			wrapper.addEventListener("mouseenter", open);
			wrapper.addEventListener("mouseleave", close);
		}


		return () => {
			draggableRef.current?.[0].kill();
			wrapper.removeEventListener("mouseenter", open);
    		wrapper.removeEventListener("mouseleave", close);
		}

	}, [update]);

	useEffect(() => {
		if (!draggableRef.current) return;

		if (update) {
			draggableRef.current[0].disable();
		} else {
			draggableRef.current[0].enable();
		}
	}, [update]);

	useEffect(() => {
		if (!update) return;

		gsap.to(contentRef.current, {
			x: 0,
			scaleY: 1,
			duration: 0.3,
			ease: "power3.out"
		});

		gsap.to([editRef.current, deleteRef.current], {
			scale: 0,
			duration: 0.2
		});

		if (!updateDivRef.current?.children) return;

		gsap.fromTo(updateDivRef.current?.children, 
			{ scale: 0 },
			{ scale: 1, duration: 0.5, ease: "elastic.inOut", stagger: 0.2 }
		)


	}, [update]);

	const closeUpdate = () => {
		if (!updateDivRef.current) return;

		gsap.to(updateDivRef.current.children, {
			scale: 0,
			duration: 0.25,
			stagger: 0.1,
			onComplete: () => {
			setShowUpdate(false);
			setUpdate(false);
			}
		});
	};

	return (

		<div
			ref={wrapperRef}
			className="relative w-[90vw] xl:w-[40vw] lg:max-w-2xl h-15 rounded-4xl cursor-pointer"
		>
			{/* svg */}
			<svg className="hidden">
				<filter id="displacementFilter">
					<feTurbulence type="turbulence" 
						baseFrequency="0.01" 
						numOctaves="0.001" 
						result="turbulence" />
			
					<feDisplacementMap in="SourceGraphic"
						in2="turbulence"    
									scale="50" xChannelSelector="R" yChannelSelector="G" />
				</filter>
			</svg>


			{/* MENU */}
			<div
				ref={menuRef}
				className="absolute gap-2 top-0 right-0 h-full flex items-center"
			>
				<button
					ref={editRef}
					onClick={() => {
						setShowUpdate(!showUpdate);
						setUpdate(!update);
					}}
					className="w-12 h-12 bg-orange-400 opacity-0 rounded-full flex items-center justify-center shadow-lg shadow-gray-900"
				>
					<FaPencil className="w-5 h-5" />
				</button>

				<button
					ref={deleteRef}
					className="w-12 h-12 bg-red-500 opacity-0 rounded-full flex items-center justify-center shadow-lg shadow-gray-900"
				>
					<FaTrash className="w-5 h-5" />
				</button>
			</div>

			{/* CONTENT */}
			{/* <div
				ref={contentRef}
				
				onClick={() => handleSteps(currentStep)}
				className={`relative h-full flex items-center pl-5 bg-linear-to-r ${currentStep === "INPROGRESS" ? "from-gray-300/50 to-yellow-400" : currentStep === "DONE" ? "from-gray-300/50 to-green-400" : "from-gray-300/50 to-gray-400"} cursor-pointer rounded-3xl shadow-lg shadow-gray-800`}
				className={`
					relative h-full flex items-center pl-5
					rounded-3xl
					${currentStep === "INPROGRESS" ? "bg-yellow-300/40" : currentStep === "DONE" ? "bg-green-300/40" : "bg-white/20"}
					backdrop-blur-[2px]
					backdrop-brightness-110
					border border-white/30
					shadow-xl shadow-black/40
				`}
			> */}
			<div
				ref={contentRef}
				onClick={() => handleSteps(currentStep)}
				className={`
				relative h-full flex items-center pl-5
				cursor-pointer rounded-[28px]
				overflow-hidden
				${currentStep === "INPROGRESS" ? "bg-yellow-300/40" : currentStep === "DONE" ? "bg-green-300/40" : "bg-white/50"}
				border border-white/30
				backdrop-blur-[2px] backdrop-brightness-110
				transition-opacity duration-300
				drop-shadow-[-8px_-10px_46px_rgba(0,0,0,0.35)]
				liquid-glass
				`}
			>
				{!update ? (
					<p className="text-gray-900 text-xl line-clamp-1 font-semibold">{name}</p>
				) : (
					<input className="text-xl focus:outline-none" type="text" value={name} />
				)}
				
			</div>
			{showUpdate && (
				<div
				 	ref={updateDivRef}
					className="absolute z-2000 gap-2 top-0 right-2 h-full flex items-center"
				>
					<button
						onClick={() => closeUpdate()}
						className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center shadow-lg shadow-gray-900"
					>
						<ImCancelCircle className="w-5 h-5" />
					</button>
					<button
						ref={validateRef}
						className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center shadow-lg shadow-gray-900"
					>
						<Check className="w-5 h-5" />
					</button>
				</div>
			)}
		</div>
	);
}