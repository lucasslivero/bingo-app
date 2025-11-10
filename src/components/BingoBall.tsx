import BingoBallImage from "@/assets/bingo-ball.png";

type BingoBall = {
	number: number;
};

export function BingoBall({ number }: BingoBall) {
	return (
		<div className="inset-0 pointer-events-none items-center justify-center z-50 absolute flex">
			<div className="w-60 relative text-center flex justify-center">
				<img className="relative w-full" src={BingoBallImage} alt="bingo ball number" />
				<div className="h-full w-full flex text-8xl font-bold text-gray-800 z-10 drop-shadow-lg absolute justify-center items-center px-[30px]">
					{number}
				</div>
			</div>
		</div>
	);
}
