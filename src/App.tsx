import { useMemo, useState } from "react";
import { toast } from "sonner";
import BingoCage from "./components/BingoCage";
import { ThemeSwitcher } from "./components/ThemeSwitcher";
import { Button } from "./components/ui/Button";
import { Input } from "./components/ui/Input";
import { cn } from "./lib/utils";

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

	const boardRows = useMemo(() => {
		return Array.from({ length: Math.ceil(maxNumber / 10) }, (_, index) => index);
	}, [maxNumber]);

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
	}

	function handleMaxNumber(value: number) {
		if (value > 0 && value <= 90) {
			setMaxNumber(value);
		}
	}

	return (
		<main className="min-h-screen flex flex-col">
			<header className="sticky top-0 flex h-[60px] items-center justify-between border-b-2 bg-default px-10 py-2">
				<img src="/public/logo.png" className="w-14 rounded" alt="App logo" />
				<div className="flex items-baseline gap-4">
					<h1 className="text-3xl font-bold -tracking-wider">Binko App</h1>
				</div>

				<ThemeSwitcher />
			</header>
			<div className="flex flex-1 items-center justify-center gap-8 p-4 h-full w-full">
				<div className="space-y-3">
					{boardRows.map((row) => (
						<div key={`left-${row}`} className="flex gap-2 justify-center">
							{[1, 2, 3, 4, 5].map((col) => {
								const num = row * 10 + col;
								const isDrawn = drawnNumbers.has(num);
								return (
									<div
										key={num}
										className={cn(
											"w-11 h-11 rounded-full flex items-center justify-center text-sm font-bold transition-all",
											isDrawn &&
												"bg-foreground shadow-lg border-4 border-green-500 text-background",
											!isDrawn && "text-gray-400",
										)}
									>
										{num}
									</div>
								);
							})}
						</div>
					))}
				</div>
				<div className="flex flex-col gap-8">
					<div className="flex flex-col font-bold text-blue-700">
						<div className="flex">
							<h1 className="text-4xl">Roleta de Bingo 1 -</h1>
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

					<Button
						onClick={resetGame}
						disabled={spinning}
						type="button"
						className="px-4 py-2 rounded-md border-2 border-foreground font-semibold transition-all bg-destructive"
					>
						Reiniciar
					</Button>

					<div className="flex flex-col mt-4 text-lg text-center bg-white rounded-lg p-4 shadow-md">
						<strong className="text-blue-700">Últimos números sorteados:</strong>
						<span className="text-2xl font-bold text-gray-800 mt-2">
							{latestNumbers.length > 0 ? latestNumbers.join(", ") : "-"}
						</span>
					</div>
				</div>
				<div className="space-y-3">
					{boardRows.map((row) => (
						<div key={`right-${row}`} className="flex gap-2 justify-center">
							{[6, 7, 8, 9, 10].map((col) => {
								const num = row * 10 + col;
								const isDrawn = drawnNumbers.has(num);
								return (
									<div
										key={num}
										className={cn(
											"w-11 h-11 rounded-full flex items-center justify-center text-sm font-bold transition-all",
											isDrawn &&
												"bg-foreground shadow-lg border-2 border-green-500 text-background",
											!isDrawn && "text-gray-400",
										)}
									>
										{num}
									</div>
								);
							})}
						</div>
					))}
				</div>
			</div>
		</main>
	);
}

export default App;
