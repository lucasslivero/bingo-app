import { ThemeSwitcher } from "./ThemeSwitcher";

export function Header() {
	return (
		<header className="sticky top-0 flex h-[60px] items-center justify-between border-b-2 bg-default px-10 py-2">
			<img src="/logo.png" className="w-14 rounded" alt="App logo" />
			<div className="flex items-baseline gap-4">
				<h1 className="text-3xl font-bold -tracking-wider">Binko App</h1>
			</div>

			<ThemeSwitcher />
		</header>
	);
}
