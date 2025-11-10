import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "./ui/AlertDialog";
import { Button } from "./ui/Button";

type IResetButton = {
	resetGame: () => void;
	spinning: boolean;
	drawnNumbers: Set<number>;
};

export function ResetButton({ resetGame, spinning, drawnNumbers }: IResetButton) {
	return (
		<AlertDialog>
			<AlertDialogTrigger asChild>
				<Button
					disabled={spinning || drawnNumbers.size === 0}
					type="button"
					variant={"destructive"}
					className="px-4 py-2 rounded-md border-2 border-foreground font-semibold transition-all"
				>
					Reiniciar
				</Button>
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Você tem certeza ?</AlertDialogTitle>
					<AlertDialogDescription>
						Essa ação não pode ser desfeita e todo o seu jogo sera perdido.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Cancelar</AlertDialogCancel>
					<AlertDialogAction variant={"destructive"} onClick={resetGame}>
						Continuar
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
