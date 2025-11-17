import { motion } from "motion/react";
import { getLetterForNumber } from "@/lib/utils";

type BingoBall = {
	number: number;
	endAnimation: () => void;
};

export function BingoBall({ number, endAnimation }: BingoBall) {
	const letter = getLetterForNumber(number);
	return (
		<motion.div
			initial={{ opacity: 0, scale: 0 }}
			animate={{ opacity: 1, scale: 1 }}
			transition={{ duration: 1, ease: "easeInOut" }}
			exit={{ opacity: 0, scale: 0 }}
			onAnimationComplete={endAnimation}
			className="inset-0 pointer-events-none items-center justify-center z-50 absolute flex"
		>
			<div className="w-60 relative text-center flex justify-center">
				<img className="relative w-full" src="bingo-ball.png" alt="bingo ball number" />
				<div className="h-full w-full flex flex-col text-8xl font-bold text-gray-800 z-10 drop-shadow-lg absolute justify-center items-center px-[30px]">
					<span className="text-6xl">{letter}</span>
					{number}
				</div>
			</div>
		</motion.div>
	);
}
