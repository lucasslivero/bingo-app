import { useState } from "react";
import { toast } from "sonner";
import { BingoBoard } from "./components/BingoBoard";
import BingoCage from "./components/BingoCage";
import { Header } from "./components/Header";
import { ResetButton } from "./components/ResetButton";
import { Button } from "./components/ui/Button";
import { Input } from "./components/ui/Input";
import { BALL_ANIMATION_DURATION, VIDEO_ANIMATION_DURATION } from "./lib/constants";
import { getLetterForNumber } from "./lib/utils";

function speakNumber(n: number) {
	if ("speechSynthesis" in window) {
		const letter = getLetterForNumber(n);
		window.speechSynthesis.speak(new window.SpeechSynthesisUtterance(letter));
		window.speechSynthesis.speak(new window.SpeechSynthesisUtterance(`${n}`));
	}
}

function App() {
	const [maxNumber, setMaxNumber] = useState(90);
	const [spinning, setSpinning] = useState(false);
	const [currentDrawn, setCurrentDraw] = useState(-1);
	const [latestNumbers, setLatestNumbers] = useState<number[]>([]);
	const [drawnNumbers, setDrawnNumbers] = useState<Set<number>>(new Set());

	function resetGame() {
		setLatestNumbers([]);
		setSpinning(false);
		setDrawnNumbers(new Set());
	}

	function drawNumber() {
		if (spinning) return;
		if (drawnNumbers.size === maxNumber) {
			toast.warning("Todos os números já foram sorteados!");
			return;
		}
		setSpinning(true);
		let n: number;
		do {
			n = Math.floor(Math.random() * maxNumber) + 1;
		} while (drawnNumbers.has(n));
		setCurrentDraw(n);
		setTimeout(() => {
			setDrawnNumbers(drawnNumbers.add(n));
			setLatestNumbers((prev) => {
				const prevClone = [...prev];
				if (prevClone.length === 5) {
					prevClone.shift();
				}
				prevClone.push(n);
				return prevClone;
			});
		}, VIDEO_ANIMATION_DURATION + BALL_ANIMATION_DURATION);
	}

	function handleMaxNumber(value: number) {
		if (value > 0 && value <= 90) {
			setMaxNumber(value);
		}
	}

	return (
		<main className="min-h-screen flex flex-col">
			<Header />
			<div className="flex flex-col lg:flex-row flex-1 items-center justify-center gap-8 p-4 h-full w-full">
				<BingoBoard maxNumber={maxNumber} drawnNumbers={drawnNumbers} position="LEFT" />
				<div className="flex flex-col gap-8 order-1 lg:order-2">
					<div className="flex flex-col font-bold text-blue-700">
						<div className="flex flex-col lg:flex-row text-4xl gap-1 items-center">
							<h1 className="">Roleta de Bingo</h1>
							<div className="flex gap-1">
								<span>1-</span>
								<Input
									className="w-17 h-11 p-1 show-arrows text-4xl! pr-0 text-center"
									type="number"
									placeholder="number"
									disabled={drawnNumbers.size > 0}
									min={1}
									max={90}
									value={maxNumber}
									onChange={(e) => handleMaxNumber(+e.target.value)}
								/>
							</div>
						</div>
						<span className="text-muted-foreground text-center">
							Números sorteados ({drawnNumbers.size}/{maxNumber}):
						</span>
					</div>
					<BingoCage
						spinning={spinning}
						setSpinning={setSpinning}
						number={currentDrawn}
						speakNumber={speakNumber}
					/>

					<Button
						onClick={drawNumber}
						disabled={spinning}
						type="button"
						className={`px-6 py-3 rounded-lg text-white font-semibold text-lg shadow-lg transition-all ${
							spinning
								? "bg-gray-400 cursor-not-allowed"
								: "bg-blue-600 hover:bg-blue-700 hover:scale-105"
						}`}
					>
						Sortear Número
					</Button>

					<ResetButton spinning={spinning} drawnNumbers={drawnNumbers} resetGame={resetGame} />

					<div className="flex flex-col mt-4 text-lg text-center bg-white rounded-lg p-4 shadow-md">
						<strong className="text-blue-700">Últimos números sorteados:</strong>
						<span className="text-2xl font-bold text-gray-800 mt-2">
							{latestNumbers.length > 0 ? latestNumbers.join(", ") : "-"}
						</span>
					</div>
				</div>
				<BingoBoard maxNumber={maxNumber} drawnNumbers={drawnNumbers} position="RIGHT" />
				<BingoBoard maxNumber={maxNumber} drawnNumbers={drawnNumbers} />
			</div>
		</main>
	);
}

export default App;
