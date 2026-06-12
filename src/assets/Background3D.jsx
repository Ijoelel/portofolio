import { useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

function GeometricShape({ type, position, rotationSpeed, scale }) {
	const meshRef = useRef();

	useFrame((state) => {
		if (meshRef.current) {
			meshRef.current.rotation.x += rotationSpeed.x;
			meshRef.current.rotation.y += rotationSpeed.y;
		}
	});

	let geometry;
	switch (type) {
		case "icosahedron":
			geometry = new THREE.IcosahedronGeometry(1.5, 1);
			break;
		case "torus":
			geometry = new THREE.TorusGeometry(1.2, 0.4, 8, 24);
			break;
		case "dodecahedron":
			geometry = new THREE.DodecahedronGeometry(1.3, 0);
			break;
		case "tetrahedron":
			geometry = new THREE.TetrahedronGeometry(1.4, 0);
			break;
		case "cone":
			geometry = new THREE.ConeGeometry(1, 2, 8, 1, true);
			break;
		case "octahedron":
		default:
			geometry = new THREE.OctahedronGeometry(1.4, 0);
			break;
	}

	return (
		<mesh ref={meshRef} position={position} scale={scale} geometry={geometry}>
			<meshBasicMaterial color="#4d6239" wireframe={true} transparent opacity={0.25} />
		</mesh>
	);
}

function MouseTracker() {
	const { camera, mouse } = useThree();

	useFrame(() => {
		// subtle parallax reaction
		camera.position.x = THREE.MathUtils.lerp(camera.position.x, mouse.x * 2, 0.05);
		camera.position.y = THREE.MathUtils.lerp(camera.position.y, mouse.y * 2, 0.05);
		camera.lookAt(0, 0, 0);
	});

	return null;
}

export default function Background3D() {
	return (
		<div className="fixed top-0 left-0 w-full h-full z-0 pointer-events-none opacity-40 select-none overflow-hidden m-0 p-0">
			<Canvas camera={{ position: [0, 0, 10], fov: 60 }} style={{ width: '100vw', height: '100vh', display: 'block' }}>
				<ambientLight intensity={1.5} />
				
				{/* Object 1: Top-Left, far and partially off-screen */}
				<Float speed={1.2} rotationIntensity={1.5} floatIntensity={1.5}>
					<GeometricShape type="icosahedron" position={[-8, 6, -5]} rotationSpeed={{ x: 0.002, y: 0.003 }} scale={1.2} />
				</Float>
				
				{/* Object 2: Bottom-Right, mid distance */}
				<Float speed={1.5} rotationIntensity={1.2} floatIntensity={1.2}>
					<GeometricShape type="torus" position={[9, -5, -2]} rotationSpeed={{ x: 0.003, y: 0.001 }} scale={1} />
				</Float>
				
				{/* Object 3: Left, closer to camera */}
				<Float speed={1.8} rotationIntensity={2} floatIntensity={2}>
					<GeometricShape type="octahedron" position={[-6, 0, 3]} rotationSpeed={{ x: 0.004, y: 0.002 }} scale={1.5} />
				</Float>

				{/* Object 4: Bottom-Left, far away */}
				<Float speed={1.1} rotationIntensity={1.8} floatIntensity={1.3}>
					<GeometricShape type="dodecahedron" position={[-7, -6, -4]} rotationSpeed={{ x: -0.002, y: 0.002 }} scale={1.1} />
				</Float>

				{/* Object 5: Top-Right, very far and partially off-screen */}
				<Float speed={1.6} rotationIntensity={1.1} floatIntensity={1.8}>
					<GeometricShape type="tetrahedron" position={[10, 7, -8]} rotationSpeed={{ x: 0.003, y: -0.003 }} scale={1.3} />
				</Float>

				{/* Object 6: Top slightly right, closer */}
				<Float speed={1.4} rotationIntensity={2.5} floatIntensity={1.4}>
					<GeometricShape type="cone" position={[4, 5, 2]} rotationSpeed={{ x: 0.001, y: 0.005 }} scale={0.9} />
				</Float>

				{/* Object 7: Bottom, very far and fading off-screen */}
				<Float speed={1.3} rotationIntensity={1.4} floatIntensity={2.1}>
					<GeometricShape type="torus" position={[-3, -8, -10]} rotationSpeed={{ x: -0.003, y: -0.001 }} scale={0.8} />
				</Float>

				{/* Object 8: Right side, mid-field */}
				<Float speed={1.7} rotationIntensity={1.7} floatIntensity={1.2}>
					<GeometricShape type="icosahedron" position={[7, 1, -5]} rotationSpeed={{ x: 0.004, y: 0.004 }} scale={1.4} />
				</Float>

				<MouseTracker />
			</Canvas>
		</div>
	);
}
