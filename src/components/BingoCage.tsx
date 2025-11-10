import {
	type Dispatch,
	type SetStateAction,
	useCallback,
	useEffect,
	useRef,
	useState,
} from "react";
import BingoVideo from "@/assets/bingo-cage.mp4";
import { cn } from "@/lib/utils";
import { BingoBall } from "./BingoBall";

type BingoSpin = {
	spinning: boolean;
	number: number;
	setSpinning: Dispatch<SetStateAction<boolean>>;
	speakNumber: (number: number) => void;
};

export default function BingoCage({ spinning, setSpinning, number, speakNumber }: BingoSpin) {
	const videoRef = useRef<HTMLVideoElement>(null);
	const [showBall, setShowBall] = useState(false);

	const handleBallAnimationEnd = useCallback(() => {
		setSpinning(false);
		setShowBall(false);
	}, [setSpinning]);

	useEffect(() => {
		if (videoRef.current) {
			videoRef.current.currentTime = 0;
			if (spinning) {
				videoRef.current.play();
				setTimeout(() => {
					setShowBall(true);
					speakNumber(number);
					setTimeout(() => handleBallAnimationEnd(), 1500);
				}, 2500);
			} else {
				videoRef.current.pause();
			}
		}
	}, [spinning, handleBallAnimationEnd, speakNumber, number]);

	return (
		<div className="relative w-full h-48">
			<video
				ref={videoRef}
				src={BingoVideo}
				loop
				muted={showBall}
				playsInline
				className={cn(
					"w-full h-full object-contain transition-opacity duration-500 opacity-100 rounded-4xl",
					showBall && "opacity-30",
				)}
			/>
			{showBall && <BingoBall number={number} />}
		</div>
	);
}
