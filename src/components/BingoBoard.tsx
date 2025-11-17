import { useMemo } from "react";
import { cn } from "@/lib/utils";

type IbingoBoard = {
	maxNumber: number;
	drawnNumbers: Set<number>;
	position?: "LEFT" | "RIGHT";
};

export function BingoBoard({ maxNumber, position, drawnNumbers }: IbingoBoard) {
	const boardRows = useMemo(() => {
		return Array.from({ length: Math.ceil(maxNumber / 10) }, (_, index) => index);
	}, [maxNumber]);

	const boardRange = useMemo(() => {
		if (position === "LEFT") {
			return [1, 2, 3, 4, 5];
		} else if (position === "RIGHT") {
			return [6, 7, 8, 9, 10];
		}
		return Array.from({ length: 10 }, (_, index) => index + 1);
	}, [position]);

	return (
		<div
			className={cn(
				"space-y-3 lg:block",
				position === "LEFT" && "hidden",
				position === "RIGHT" && "hidden",
			)}
		>
			{boardRows.map((row) => (
				<div key={`left-${row}`} className="flex gap-2 lg:gap-4 justify-center">
					{boardRange.map((col) => {
						const num = row * 10 + col;
						const isDrawn = drawnNumbers.has(num);
						return (
							<div
								key={num}
								className={cn(
									"w-8 h-8 lg:w-10 lg:h-10 rounded-full flex items-center justify-center font-bold transition-all",
									isDrawn && "bg-foreground shadow-lg border-4 border-green-500 text-background",
									!isDrawn && "text-gray-400 opacity-40",
								)}
							>
								{num}
							</div>
						);
					})}
				</div>
			))}
		</div>
	);
}
