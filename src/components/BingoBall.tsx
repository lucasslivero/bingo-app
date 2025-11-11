import BingoBallImage from "@/assets/bingo-ball.png";
import { getLetterForNumber } from "@/lib/utils";

type BingoBall = {
	number: number;
};

export function BingoBall({ number }: BingoBall) {
	const letter = getLetterForNumber(number);
	return (
		<div className="inset-0 pointer-events-none items-center justify-center z-50 absolute flex">
			<div className="w-60 relative text-center flex justify-center">
				<img className="relative w-full" src={BingoBallImage} alt="bingo ball number" />
				<div className="h-full w-full flex flex-col text-8xl font-bold text-gray-800 z-10 drop-shadow-lg absolute justify-center items-center px-[30px]">
					<span className="text-6xl">{letter}</span>
					{number}
				</div>
			</div>
		</div>
	);
}
