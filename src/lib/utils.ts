import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function getLetterForNumber(num: number) {
	if (num >= 1 && num <= 15) return "B";
	if (num >= 16 && num <= 30) return "I";
	if (num >= 31 && num <= 45) return "N";
	if (num >= 46 && num <= 60) return "G";
	if (num >= 61 && num <= 90) return "O";
	return "";
}
