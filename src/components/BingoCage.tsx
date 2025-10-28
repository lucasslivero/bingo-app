import BingoVideo from "@/assets/bingo-2.mp4";
import { cn } from "@/lib/utils";
import { type Dispatch, type SetStateAction, useEffect, useRef, useState } from "react";
import { BingoBall } from "./BingoBall";

type BingoSpin = {
	spinning: boolean;
	number: number;
	setSpinning: Dispatch<SetStateAction<boolean>>;
};

export default function BingoCage({ spinning, setSpinning, number }: BingoSpin) {
	const videoRef = useRef<HTMLVideoElement>(null);
	const [showBall, setShowBall] = useState(false);
	function handleBallAnimationEnd() {
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
				}, 200);
			} else {
				videoRef.current.pause();
			}
		}
	}, [spinning]);

	return (
		<div className="relative w-full h-48">
			<video
				ref={videoRef}
				src={BingoVideo}
				loop
				muted
				playsInline
				className={cn(
					"w-full h-full object-contain transition-opacity duration-500 opacity-100",
					showBall && "opacity-10",
				)}
			/>
			{showBall && <BingoBall number={number} onAnimationEnd={handleBallAnimationEnd} />}
		</div>
	);
}
