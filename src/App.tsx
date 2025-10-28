import { useState } from "react";
import { toast } from "sonner";
import BingoCage from "./components/BingoCage";
import { Button } from "./components/ui/Button";
import { Input } from "./components/ui/Input";

function speakNumber(n: number) {
	if ("speechSynthesis" in window) {
		const utter = new window.SpeechSynthesisUtterance(n.toString());
		utter.lang = "pt-BR";
		window.speechSynthesis.speak(utter);
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
		setDrawnNumbers(drawnNumbers.add(n));
		setCurrentDraw(n);
		setLatestNumbers((prev) => {
			const prevClone = [...prev];
			if (prevClone.length === 5) {
				prevClone.shift();
			}
			prevClone.push(n);
			return prevClone;
		});
		speakNumber(n);
	}

	function handleMaxNumber(value: number) {
		if (value > 0 && value <= 90) {
			setMaxNumber(value);
		}
	}

	return (
		<main className="min-h-screen flex flex-col items-center justify-center gap-8 p-4 bg-gray-200">
			<div className="flex font-bold text-blue-700 gap-1">
				<h1 className="text-4xl">Roleta de Bingo 1-</h1>
				{drawnNumbers.size > 0 ? (
					<span className="text-4xl">{maxNumber}</span>
				) : (
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
				)}
			</div>

			<BingoCage spinning={spinning} setSpinning={setSpinning} number={currentDrawn} />

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

			<Button
				onClick={resetGame}
				disabled={spinning}
				type="button"
				className="px-4 py-2 rounded-md border-2 border-blue-600 text-blue-600 hover:bg-blue-100 font-semibold transition-all"
			>
				Reiniciar
			</Button>

			<div className="flex flex-col mt-4 text-lg text-center bg-white rounded-lg p-4 shadow-md">
				<strong className="text-blue-700">Últimos números sorteados:</strong>
				<span className="text-2xl font-bold text-gray-800 mt-2">
					{latestNumbers.length > 0 ? latestNumbers.join(", ") : "-"}
				</span>
			</div>

			<div className="max-w-xl mt-2 text-sm text-gray-700 bg-white rounded-lg p-4 shadow-md">
				<strong className="text-blue-700">
					Números sorteados ({drawnNumbers.size}/{maxNumber}):
				</strong>
				<div className="mt-2">
					{drawnNumbers.size > 0
						? Array.from(drawnNumbers)
								.sort((a, b) => a - b)
								.join(", ")
						: "-"}
				</div>
			</div>
		</main>
	);
}

export default App;
