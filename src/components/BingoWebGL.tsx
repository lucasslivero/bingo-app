// import { useEffect, useRef, useState } from "react";
// import * as THREE from "three";

// const BingoWebGL = () => {
// 	const mountRef = useRef(null);
// 	const [drawnNumbers, setDrawnNumbers] = useState([]);
// 	const [currentNumber, setCurrentNumber] = useState(null);
// 	const [isSpinning, setIsSpinning] = useState(false);
// 	const sceneRef = useRef(null);
// 	const ballsRef = useRef([]);
// 	const selectedBallRef = useRef(null);
// 	const [animationDuration, setAnimationDuration] = useState(15);

// 	useEffect(() => {
// 		if (!mountRef.current) return;

// 		const scene = new THREE.Scene();
// 		scene.background = new THREE.Color(0x0a0a1a);
// 		sceneRef.current = scene;

// 		const camera = new THREE.PerspectiveCamera(
// 			60,
// 			mountRef.current.clientWidth / mountRef.current.clientHeight,
// 			0.1,
// 			1000,
// 		);
// 		camera.position.set(0, 3, 12);
// 		camera.lookAt(0, 0, 0);

// 		const renderer = new THREE.WebGLRenderer({ antialias: true });
// 		renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
// 		renderer.shadowMap.enabled = true;
// 		mountRef.current.appendChild(renderer.domElement);

// 		// Iluminação
// 		const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
// 		scene.add(ambientLight);

// 		const mainLight = new THREE.DirectionalLight(0xffffff, 0.8);
// 		mainLight.position.set(5, 10, 5);
// 		mainLight.castShadow = true;
// 		scene.add(mainLight);

// 		const pointLight1 = new THREE.PointLight(0xff6b35, 0.6);
// 		pointLight1.position.set(-5, 5, 3);
// 		scene.add(pointLight1);

// 		const pointLight2 = new THREE.PointLight(0x4ecdc4, 0.6);
// 		pointLight2.position.set(5, 5, 3);
// 		scene.add(pointLight2);

// 		// Criar globo transparente (recipiente das bolas)
// 		const globeGeometry = new THREE.SphereGeometry(3.5, 32, 32);
// 		const globeMaterial = new THREE.MeshPhysicalMaterial({
// 			color: 0x88ccff,
// 			transparent: true,
// 			opacity: 0.15,
// 			metalness: 0.1,
// 			roughness: 0.1,
// 			transmission: 0.9,
// 			thickness: 0.5,
// 		});
// 		const globe = new THREE.Mesh(globeGeometry, globeMaterial);
// 		globe.position.y = 0;
// 		scene.add(globe);

// 		// Criar suporte do globo
// 		const standGeometry = new THREE.CylinderGeometry(0.3, 0.5, 2, 16);
// 		const standMaterial = new THREE.MeshStandardMaterial({
// 			color: 0x2a2a3a,
// 			metalness: 0.7,
// 			roughness: 0.3,
// 		});
// 		const stand = new THREE.Mesh(standGeometry, standMaterial);
// 		stand.position.y = -4.5;
// 		scene.add(stand);

// 		// Criar base
// 		const baseGeometry = new THREE.CylinderGeometry(2, 2.5, 0.5, 32);
// 		const baseMaterial = new THREE.MeshStandardMaterial({
// 			color: 0x1a1a2a,
// 			metalness: 0.5,
// 			roughness: 0.5,
// 		});
// 		const base = new THREE.Mesh(baseGeometry, baseMaterial);
// 		base.position.y = -5.75;
// 		scene.add(base);

// 		// Criar tubo de saída
// 		const tubeGeometry = new THREE.CylinderGeometry(0.4, 0.4, 3, 16);
// 		const tubeMaterial = new THREE.MeshStandardMaterial({
// 			color: 0x2a2a3a,
// 			metalness: 0.6,
// 			roughness: 0.4,
// 		});
// 		const tube = new THREE.Mesh(tubeGeometry, tubeMaterial);
// 		tube.position.set(4, -2, 0);
// 		tube.rotation.z = Math.PI / 2;
// 		scene.add(tube);

// 		// Criar bolas de bingo dentro do globo
// 		const ballGeometry = new THREE.SphereGeometry(0.25, 16, 16);
// 		const colors = [0xff6b35, 0x4ecdc4, 0xf7b731, 0xff5e78, 0x7bed9f];

// 		ballsRef.current = [];
// 		const numBalls = 50;

// 		for (let i = 0; i < numBalls; i++) {
// 			const ballMaterial = new THREE.MeshStandardMaterial({
// 				color: colors[i % colors.length],
// 				metalness: 0.4,
// 				roughness: 0.3,
// 			});
// 			const ball = new THREE.Mesh(ballGeometry, ballMaterial);

// 			// Posição aleatória dentro do globo
// 			const theta = Math.random() * Math.PI * 2;
// 			const phi = Math.random() * Math.PI;
// 			const radius = Math.random() * 2.8 + 0.5;

// 			ball.position.x = radius * Math.sin(phi) * Math.cos(theta);
// 			ball.position.y = radius * Math.sin(phi) * Math.sin(theta);
// 			ball.position.z = radius * Math.cos(phi);

// 			// Velocidade aleatória
// 			ball.userData = {
// 				velocity: new THREE.Vector3(
// 					(Math.random() - 0.5) * 0.1,
// 					(Math.random() - 0.5) * 0.1,
// 					(Math.random() - 0.5) * 0.1,
// 				),
// 				isSelected: false,
// 			};

// 			scene.add(ball);
// 			ballsRef.current.push(ball);
// 		}

// 		// Partículas de fundo
// 		const particlesGeometry = new THREE.BufferGeometry();
// 		const particlesCount = 300;
// 		const positions = new Float32Array(particlesCount * 3);

// 		for (let i = 0; i < particlesCount * 3; i++) {
// 			positions[i] = (Math.random() - 0.5) * 30;
// 		}

// 		particlesGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
// 		const particlesMaterial = new THREE.PointsMaterial({
// 			color: 0xffffff,
// 			size: 0.05,
// 			transparent: true,
// 			opacity: 0.4,
// 		});
// 		const particles = new THREE.Points(particlesGeometry, particlesMaterial);
// 		scene.add(particles);

// 		// Animação
// 		let animationId;
// 		let time = 0;

// 		const animate = () => {
// 			animationId = requestAnimationFrame(animate);
// 			time += 0.016;

// 			// Rotação do globo
// 			globe.rotation.y += 0.002;

// 			// Rotação das partículas
// 			particles.rotation.y += 0.001;
// 			particles.rotation.x += 0.0005;

// 			// Animar bolas dentro do globo
// 			if (isSpinning) {
// 				ballsRef.current.forEach((ball) => {
// 					if (!ball.userData.isSelected) {
// 						// Movimento mais agitado durante o sorteio
// 						ball.position.x += ball.userData.velocity.x * 3;
// 						ball.position.y += ball.userData.velocity.y * 3;
// 						ball.position.z += ball.userData.velocity.z * 3;

// 						// Manter bolas dentro do globo
// 						const distance = ball.position.length();
// 						if (distance > 3) {
// 							ball.position.normalize().multiplyScalar(3);
// 							ball.userData.velocity.reflect(ball.position.clone().normalize());
// 						}

// 						ball.rotation.x += 0.1;
// 						ball.rotation.y += 0.1;
// 					}
// 				});
// 			} else {
// 				// Movimento suave normal
// 				ballsRef.current.forEach((ball) => {
// 					if (!ball.userData.isSelected) {
// 						ball.position.x += ball.userData.velocity.x;
// 						ball.position.y += ball.userData.velocity.y;
// 						ball.position.z += ball.userData.velocity.z;

// 						const distance = ball.position.length();
// 						if (distance > 3) {
// 							ball.position.normalize().multiplyScalar(3);
// 							ball.userData.velocity.reflect(ball.position.clone().normalize());
// 						}

// 						ball.rotation.x += 0.02;
// 						ball.rotation.y += 0.02;
// 					}
// 				});
// 			}

// 			// Animar bola selecionada saindo pelo tubo
// 			if (selectedBallRef.current) {
// 				const selectedBall = selectedBallRef.current;
// 				selectedBall.rotation.x += 0.15;
// 				selectedBall.rotation.y += 0.15;
// 			}

// 			renderer.render(scene, camera);
// 		};
// 		animate();

// 		const handleResize = () => {
// 			if (!mountRef.current) return;
// 			camera.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight;
// 			camera.updateProjectionMatrix();
// 			renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
// 		};
// 		window.addEventListener("resize", handleResize);

// 		return () => {
// 			window.removeEventListener("resize", handleResize);
// 			cancelAnimationFrame(animationId);
// 			mountRef.current?.removeChild(renderer.domElement);
// 			renderer.dispose();
// 		};
// 	}, [isSpinning]);

// 	const drawNumber = () => {
// 		if (drawnNumbers.length >= 75 || isSpinning) return;

// 		setIsSpinning(true);
// 		setCurrentNumber(null);

// 		const duration = animationDuration * 1000;

// 		setTimeout(() => {
// 			const availableNumbers = Array.from({ length: 75 }, (_, i) => i + 1).filter(
// 				(num) => !drawnNumbers.includes(num),
// 			);

// 			const randomNumber = availableNumbers[Math.floor(Math.random() * availableNumbers.length)];

// 			// Selecionar uma bola aleatória para sair
// 			const availableBalls = ballsRef.current.filter((ball) => !ball.userData.isSelected);
// 			if (availableBalls.length > 0) {
// 				const selectedBall = availableBalls[Math.floor(Math.random() * availableBalls.length)];
// 				selectedBall.userData.isSelected = true;
// 				selectedBallRef.current = selectedBall;

// 				// Animar bola saindo pelo tubo
// 				const startPos = selectedBall.position.clone();
// 				const endPos = new THREE.Vector3(5.5, -2, 0);
// 				let progress = 0;

// 				const exitAnimation = setInterval(() => {
// 					progress += 0.02;
// 					if (progress >= 1) {
// 						clearInterval(exitAnimation);
// 						selectedBall.scale.set(3, 3, 3);
// 						selectedBall.position.set(0, -2, 5);
// 						setTimeout(() => {
// 							selectedBall.visible = false;
// 							selectedBallRef.current = null;
// 						}, 2000);
// 					} else {
// 						selectedBall.position.lerpVectors(startPos, endPos, progress);
// 						selectedBall.scale.multiplyScalar(1.02);
// 					}
// 				}, 20);
// 			}

// 			setCurrentNumber(randomNumber);
// 			setDrawnNumbers((prev) => [...prev, randomNumber]);

// 			setTimeout(() => {
// 				setIsSpinning(false);
// 			}, 2000);
// 		}, duration);
// 	};

// 	const reset = () => {
// 		setDrawnNumbers([]);
// 		setCurrentNumber(null);

// 		ballsRef.current.forEach((ball) => {
// 			ball.visible = true;
// 			ball.scale.set(1, 1, 1);
// 			ball.userData.isSelected = false;

// 			const theta = Math.random() * Math.PI * 2;
// 			const phi = Math.random() * Math.PI;
// 			const radius = Math.random() * 2.8 + 0.5;

// 			ball.position.x = radius * Math.sin(phi) * Math.cos(theta);
// 			ball.position.y = radius * Math.sin(phi) * Math.sin(theta);
// 			ball.position.z = radius * Math.cos(phi);
// 		});

// 		selectedBallRef.current = null;
// 	};

// 	const getNumberLetter = (num) => {
// 		if (num <= 15) return "B";
// 		if (num <= 30) return "I";
// 		if (num <= 45) return "N";
// 		if (num <= 60) return "G";
// 		return "O";
// 	};

// 	return (
// 		<div className="w-full h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 flex flex-col">
// 			<div className="flex-1 relative" ref={mountRef}>
// 				{currentNumber && (
// 					<div className="absolute top-20 left-1/2 transform -translate-x-1/2 text-center pointer-events-none z-10">
// 						<div className="bg-gradient-to-r from-orange-500 to-pink-500 text-white px-12 py-6 rounded-3xl shadow-2xl animate-pulse">
// 							<div className="text-7xl font-bold">
// 								{getNumberLetter(currentNumber)}-{currentNumber}
// 							</div>
// 						</div>
// 					</div>
// 				)}
// 				{isSpinning && !currentNumber && (
// 					<div className="absolute top-20 left-1/2 transform -translate-x-1/2 text-center pointer-events-none z-10">
// 						<div className="bg-slate-800 bg-opacity-90 text-white px-8 py-4 rounded-2xl shadow-xl">
// 							<div className="text-3xl font-bold animate-pulse">Sorteando...</div>
// 						</div>
// 					</div>
// 				)}
// 			</div>

// 			<div className="bg-slate-900 p-6 border-t-4 border-orange-500">
// 				<div className="max-w-6xl mx-auto">
// 					<div className="flex justify-between items-center mb-4 flex-wrap gap-4">
// 						<div className="text-white">
// 							<h2 className="text-2xl font-bold mb-1">🎱 Bingo 3D Realista</h2>
// 							<p className="text-gray-400">Números sorteados: {drawnNumbers.length}/75</p>
// 						</div>
// 						<div className="flex gap-3 items-center flex-wrap">
// 							<div className="flex items-center gap-2">
// 								<label className="text-white text-sm">Duração:</label>
// 								<select
// 									value={animationDuration}
// 									onChange={(e) => setAnimationDuration(Number(e.target.value))}
// 									disabled={isSpinning}
// 									className="bg-slate-700 text-white px-3 py-2 rounded-lg"
// 								>
// 									<option value={10}>10s</option>
// 									<option value={15}>15s</option>
// 									<option value={20}>20s</option>
// 									<option value={25}>25s</option>
// 									<option value={30}>30s</option>
// 								</select>
// 							</div>
// 							<button
// 								onClick={drawNumber}
// 								disabled={drawnNumbers.length >= 75 || isSpinning}
// 								className={`px-8 py-3 rounded-lg font-bold text-lg transition-all ${
// 									drawnNumbers.length >= 75 || isSpinning
// 										? "bg-gray-600 cursor-not-allowed"
// 										: "bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 active:scale-95"
// 								} text-white shadow-lg`}
// 							>
// 								{isSpinning ? "Sorteando..." : "Sortear Número"}
// 							</button>
// 							<button
// 								onClick={reset}
// 								className="px-6 py-3 bg-slate-700 hover:bg-slate-600 rounded-lg font-bold text-white transition-all active:scale-95"
// 							>
// 								Reiniciar
// 							</button>
// 						</div>
// 					</div>

// 					<div className="bg-slate-800 p-4 rounded-lg">
// 						<h3 className="text-white font-bold mb-3">Últimos números sorteados:</h3>
// 						<div className="flex flex-wrap gap-2">
// 							{drawnNumbers
// 								.slice()
// 								.reverse()
// 								.slice(0, 15)
// 								.map((num, idx) => (
// 									<div
// 										key={idx}
// 										className={`w-12 h-12 rounded-lg flex items-center justify-center font-bold text-white ${
// 											idx === 0
// 												? "bg-gradient-to-br from-orange-500 to-pink-500 scale-110 shadow-lg"
// 												: "bg-slate-700"
// 										} transition-all`}
// 									>
// 										{num}
// 									</div>
// 								))}
// 						</div>
// 					</div>
// 				</div>
// 			</div>
// 		</div>
// 	);
// };

// export default BingoWebGL;
