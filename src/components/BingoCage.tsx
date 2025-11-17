import { AnimatePresence } from "motion/react";
import { type Dispatch, type SetStateAction, useEffect, useRef, useState } from "react";
import { BALL_ANIMATION_DURATION, VIDEO_ANIMATION_DURATION } from "@/lib/constants";
import { cn, sleep } from "@/lib/utils";
import { BingoBall } from "./BingoBall";

type BingoSpin = {
	spinning: boolean;
	number: number;
	setSpinning: Dispatch<SetStateAction<boolean>>;
	speakNumber: (number: number) => void;
	updateDrawnList: (number: number) => void;
};

export default function BingoCage({
	spinning,
	setSpinning,
	number,
	speakNumber,
	updateDrawnList,
}: BingoSpin) {
	const videoRef = useRef<HTMLVideoElement>(null);
	const [showBall, setShowBall] = useState(false);

	async function handleBallAnimationEnd() {
		await sleep(BALL_ANIMATION_DURATION);
		setSpinning(false);
		setShowBall(false);
	}

	useEffect(() => {
		if (videoRef.current) {
			videoRef.current.currentTime = 0;
			if (spinning) {
				videoRef.current.play();
				setTimeout(() => {
					setShowBall(true);
					speakNumber(number);
					updateDrawnList(number);
					if (videoRef.current) {
						videoRef.current.pause();
					}
				}, VIDEO_ANIMATION_DURATION);
			} else {
				videoRef.current.pause();
			}
		}
	}, [spinning, number, speakNumber, updateDrawnList]);

	return (
		<div className="relative w-full h-48">
			<video
				ref={videoRef}
				src="bingo-cage.mp4"
				loop
				muted={showBall}
				playsInline
				className={cn(
					"w-full h-full object-contain transition-opacity duration-500 opacity-100 rounded-4xl",
					showBall && "opacity-30",
				)}
			/>
			<AnimatePresence>
				{showBall && <BingoBall endAnimation={handleBallAnimationEnd} number={number} />}
			</AnimatePresence>
		</div>
	);
}
