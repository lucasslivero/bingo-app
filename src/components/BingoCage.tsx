import { AnimatePresence } from "motion/react";
import {
	type Dispatch,
	type SetStateAction,
	memo,
	useEffect,
	useRef,
	useState,
} from "react";
import { VIDEO_ANIMATION_DURATION } from "@/lib/constants";
import { cn, speakNumber } from "@/lib/utils";
import { BingoBall } from "./BingoBall";

type BingoSpin = {
	spinning: boolean;
	number: number;
	setSpinning: Dispatch<SetStateAction<boolean>>;
	updateDrawnList: (number: number) => void;
};

function BingoCage({
	spinning,
	setSpinning,
	number,
	updateDrawnList,
}: BingoSpin) {
	const videoRef = useRef<HTMLVideoElement>(null);
	const [showBall, setShowBall] = useState(false);

	async function handleBallAnimationEnd(isExit: boolean) {
		console.log(isExit)
		if (isExit) {
			setSpinning(false);
		} else {
			await speakNumber(number);
			setShowBall(false);
		}
	}

	useEffect(() => {
		async function run() {
			if (videoRef.current) {
			videoRef.current.currentTime = 0;
			if (spinning) {
				videoRef.current.play();
				setTimeout(async () => {
					setShowBall(true);
					updateDrawnList(number);
					if (videoRef.current) {
						videoRef.current.pause();
					}
				}, VIDEO_ANIMATION_DURATION);
			} else {
				videoRef.current.pause();
			}
		}
		}
		run();
	}, [spinning, number]);

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

export default memo(BingoCage);
