import { motion } from "motion/react";

type BingoBall = {
	number: number;
	onAnimationEnd: () => void;
};

export function BingoBall({ number, onAnimationEnd }: BingoBall) {
	return (
		<motion.div
			className="inset-0 pointer-events-none flex items-center justify-center z-50 absolute"
			initial={{ opacity: 1 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			transition={{ duration: 0.3 }}
		>
			<motion.div
				initial={{
					y: 0,
					opacity: 1,
				}}
				animate={{
					scale: [0.3, 1.2, 0.85, 1.05, 1, 1, 1, 1],
					opacity: [1, 1, 1, 1, 1, 1, 1, 0],
				}}
				transition={{
					duration: 3,
					ease: "easeIn",
				}}
				onAnimationComplete={onAnimationEnd}
			>
				<div className="relative w-56 h-56">
					{/* Ground shadow */}
					<motion.div
						className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 w-32 h-8 bg-black opacity-20 rounded-full blur-lg"
						initial={{ scale: 0.5, opacity: 0 }}
						animate={{
							scale: [0.5, 1.2, 1, 1, 1],
							opacity: [0, 0.3, 0.2, 0.2, 0],
						}}
						transition={{
							duration: 4,
							times: [0, 0.3, 0.7, 0.95, 1],
						}}
					/>

					{/* Main bingo ball */}
					<motion.div
						className="absolute inset-0 rounded-full flex items-center justify-center"
						style={{
							background:
								"radial-gradient(circle at 30% 30%, #ffffff, #ff9933 20%, #ff6600 50%, #cc5200)",
							boxShadow:
								"0 25px 50px -12px rgba(0, 0, 0, 0.5), inset -20px -20px 40px rgba(0, 0, 0, 0.2), inset 20px 20px 40px rgba(255, 255, 255, 0.3)",
						}}
					>
						{/* Glossy highlight */}
						<div
							className="absolute top-8 left-8 w-24 h-24 rounded-full opacity-60 blur-2xl"
							style={{
								background:
									"radial-gradient(circle, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0) 70%)",
							}}
						/>

						{/* Secondary highlight */}
						<div
							className="absolute top-12 left-12 w-16 h-16 rounded-full opacity-40 blur-xl"
							style={{
								background:
									"radial-gradient(circle, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0) 60%)",
							}}
						/>

						{/* Number circle background (white center) */}
						<div className="relative w-32 h-32 rounded-full bg-white shadow-xl flex items-center justify-center border-4 border-orange-600">
							{/* Inner shadow on white circle */}
							<div
								className="absolute inset-0 rounded-full"
								style={{
									boxShadow: "inset 0 4px 8px rgba(0, 0, 0, 0.15)",
								}}
							/>

							{/* Number */}
							<motion.span
								className="text-7xl font-black z-10"
								style={{
									color: "#cc5200",
									textShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)",
								}}
								initial={{ scale: 0 }}
								animate={{ scale: 1 }}
								transition={{
									delay: 0.6,
									duration: 0.8,
									type: "spring",
									stiffness: 120,
									damping: 12,
								}}
							>
								{number}
							</motion.span>
						</div>

						{/* Rim reflection */}
						<div
							className="absolute inset-0 rounded-full"
							style={{
								background:
									"linear-gradient(135deg, transparent 40%, rgba(255, 255, 255, 0.2) 45%, rgba(255, 255, 255, 0.4) 50%, rgba(255, 255, 255, 0.2) 55%, transparent 60%)",
							}}
						/>
					</motion.div>
				</div>
			</motion.div>
		</motion.div>
	);
}
