import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, ScrollControls, useScroll } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";

function GeometricShape({ type, position, rotationSpeed, scale, active }) {
	const meshRef = useRef();
	const scroll = useScroll();

	useFrame((state) => {
		if (meshRef.current) {
			const scrollRotation = scroll.offset * 2;
			const speedMultiplier = active ? 5 : 1;
			meshRef.current.rotation.x += (rotationSpeed.x + scrollRotation * 0.01) * speedMultiplier;
			meshRef.current.rotation.y += (rotationSpeed.y + scrollRotation * 0.01) * speedMultiplier;
		}
	});

	const geometry = useMemo(() => {
		switch (type) {
			case "icosahedron":
				return new THREE.IcosahedronGeometry(1.5, 1);
			case "torus":
				return new THREE.TorusGeometry(1.2, 0.4, 8, 24);
			case "dodecahedron":
				return new THREE.DodecahedronGeometry(1.3, 0);
			case "tetrahedron":
				return new THREE.TetrahedronGeometry(1.4, 0);
			case "cone":
				return new THREE.ConeGeometry(1, 2, 8, 1, true);
			case "octahedron":
			default:
				return new THREE.OctahedronGeometry(1.4, 0);
		}
	}, [type]);

	return (
		<mesh ref={meshRef} position={position} scale={active ? scale * 1.3 : scale}>
			<primitive object={geometry} attach="geometry" />
			<meshBasicMaterial 
				color={active ? "#A3E635" : "#4d6239"} 
				wireframe={true} 
				transparent 
				opacity={active ? 0.6 : 0.25} 
			/>
		</mesh>
	);
}

function ParticleField() {
	const pointsRef = useRef();
	const scroll = useScroll();

	const [positions] = useMemo(() => {
		const count = 1200;
		const posArray = new Float32Array(count * 3);
		for (let i = 0; i < count; i++) {
			posArray[i * 3] = (Math.random() - 0.5) * 40;
			posArray[i * 3 + 1] = (Math.random() - 0.5) * 30;
			posArray[i * 3 + 2] = (Math.random() - 0.5) * 20;
		}
		return [posArray];
	}, []);

	useFrame((state) => {
		if (pointsRef.current) {
			pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.015 + scroll.offset * 0.5;
			pointsRef.current.rotation.x = state.clock.getElapsedTime() * 0.005;
		}
	});

	return (
		<points ref={pointsRef}>
			<bufferGeometry>
				<bufferAttribute attach="attributes-position" args={[positions, 3]} />
			</bufferGeometry>
			<pointsMaterial
				color="#A3E635"
				size={0.035}
				sizeAttenuation={true}
				transparent={true}
				opacity={0.15}
				blending={THREE.AdditiveBlending}
			/>
		</points>
	);
}

function MouseAndIntroTracker({ isEntering }) {
	const { camera, mouse } = useThree();

	useFrame(() => {
		if (isEntering) {
			camera.position.z = THREE.MathUtils.lerp(camera.position.z, 10, 0.08);
			camera.position.x = THREE.MathUtils.lerp(camera.position.x, 0, 0.08);
			camera.position.y = THREE.MathUtils.lerp(camera.position.y, 0, 0.08);
		} else {
			camera.position.x = THREE.MathUtils.lerp(camera.position.x, mouse.x * 2, 0.05);
			camera.position.y = THREE.MathUtils.lerp(camera.position.y, mouse.y * 2, 0.05);
			camera.position.z = THREE.MathUtils.lerp(camera.position.z, 10, 0.05);
		}
		camera.lookAt(0, 0, 0);
	});
	return null;
}

export default function Background3D({ activeProject, isEntering }) {
	return (
		<div className="fixed top-0 left-0 w-full h-full z-0 pointer-events-none select-none overflow-hidden m-0 p-0">
			<Canvas camera={{ position: [0, 0, 24], fov: 60 }} style={{ width: '100vw', height: '100vh', display: 'block' }}>
				<ambientLight intensity={1.5} />
				<ScrollControls pages={3}>
					<ParticleField />
					
					<Float speed={1.2} rotationIntensity={1.5} floatIntensity={1.5}>
						<GeometricShape type="icosahedron" position={[-8, 6, -5]} rotationSpeed={{ x: 0.002, y: 0.003 }} scale={1.2} active={activeProject === 1} />
					</Float>
					<Float speed={1.5} rotationIntensity={1.2} floatIntensity={1.2}>
						<GeometricShape type="torus" position={[9, -5, -2]} rotationSpeed={{ x: 0.003, y: 0.001 }} scale={1} active={activeProject === 2} />
					</Float>
					<Float speed={1.8} rotationIntensity={2} floatIntensity={2}>
						<GeometricShape type="octahedron" position={[-6, 0, 3]} rotationSpeed={{ x: 0.004, y: 0.002 }} scale={1.5} active={activeProject === 3} />
					</Float>
					<Float speed={1.1} rotationIntensity={1.8} floatIntensity={1.3}>
						<GeometricShape type="dodecahedron" position={[-7, -6, -4]} rotationSpeed={{ x: -0.002, y: 0.002 }} scale={1.1} active={false} />
					</Float>
					<Float speed={1.6} rotationIntensity={1.1} floatIntensity={1.8}>
						<GeometricShape type="tetrahedron" position={[10, 7, -8]} rotationSpeed={{ x: 0.003, y: -0.003 }} scale={1.3} active={false} />
					</Float>
					<Float speed={1.4} rotationIntensity={2.5} floatIntensity={1.4}>
						<GeometricShape type="cone" position={[4, 5, 2]} rotationSpeed={{ x: 0.001, y: 0.005 }} scale={0.9} active={false} />
					</Float>
					<Float speed={1.3} rotationIntensity={1.4} floatIntensity={2.1}>
						<GeometricShape type="torus" position={[-3, -8, -10]} rotationSpeed={{ x: -0.003, y: -0.001 }} scale={0.8} active={false} />
					</Float>
					<Float speed={1.7} rotationIntensity={1.7} floatIntensity={1.2}>
						<GeometricShape type="icosahedron" position={[7, 1, -5]} rotationSpeed={{ x: 0.004, y: 0.004 }} scale={1.4} active={false} />
					</Float>
				</ScrollControls>

				<EffectComposer disableNormalPass>
					<Bloom luminanceThreshold={0.3} mipmapBlur intensity={1.2} radius={0.5} />
				</EffectComposer>
				
				<MouseAndIntroTracker isEntering={isEntering} />
			</Canvas>
		</div>
	);
}
