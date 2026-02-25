"use client";

import { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

interface FloatingShapeProps {
  position: [number, number, number];
  rotationSpeed: number;
  floatSpeed: number;
  floatAmplitude: number;
  scale: number;
  opacity: number;
  color: string;
  shape: "icosahedron" | "octahedron" | "tetrahedron";
}

function FloatingShape({
  position,
  rotationSpeed,
  floatSpeed,
  floatAmplitude,
  scale,
  opacity,
  color,
  shape,
}: FloatingShapeProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const initialY = position[1];
  const timeOffset = useMemo(() => Math.random() * Math.PI * 2, []);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += rotationSpeed * 0.01;
      meshRef.current.rotation.y += rotationSpeed * 0.015;
      meshRef.current.position.y =
        initialY + Math.sin(state.clock.elapsedTime * floatSpeed + timeOffset) * floatAmplitude;
    }
  });

  const geometry = useMemo(() => {
    switch (shape) {
      case "icosahedron":
        return <icosahedronGeometry args={[1, 0]} />;
      case "octahedron":
        return <octahedronGeometry args={[1, 0]} />;
      case "tetrahedron":
        return <tetrahedronGeometry args={[1, 0]} />;
      default:
        return <icosahedronGeometry args={[1, 0]} />;
    }
  }, [shape]);

  return (
    <Float speed={1} rotationIntensity={0.2} floatIntensity={0.3}>
      <mesh ref={meshRef} position={position} scale={scale}>
        {geometry}
        <meshBasicMaterial
          color={color}
          wireframe
          transparent
          opacity={opacity}
        />
      </mesh>
    </Float>
  );
}

function Scene() {
  useThree();
  const groupRef = useRef<THREE.Group>(null);
  const [targetRotation, setTargetRotation] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setTargetRotation({
        x: ((e.clientY / window.innerHeight) - 0.5) * 0.1,
        y: ((e.clientX / window.innerWidth) - 0.5) * 0.1,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.x += (targetRotation.x - groupRef.current.rotation.x) * 0.05;
      groupRef.current.rotation.y += (targetRotation.y - groupRef.current.rotation.y) * 0.05;
    }
  });

  const shapes = useMemo(() => {
    const colors = ["#06b6d4", "#0891b2", "#0ea5e9", "#3b82f6", "#6366f1"];
    const types: ("icosahedron" | "octahedron" | "tetrahedron")[] = [
      "icosahedron",
      "octahedron",
      "tetrahedron",
    ];
    return Array.from({ length: 15 }, (_, i) => ({
      id: i,
      position: [
        (Math.random() - 0.5) * 15,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10 - 5,
      ] as [number, number, number],
      rotationSpeed: 0.3 + Math.random() * 0.7,
      floatSpeed: 0.3 + Math.random() * 0.4,
      floatAmplitude: 0.3 + Math.random() * 0.5,
      scale: 0.3 + Math.random() * 0.5,
      opacity: 0.15 + Math.random() * 0.25,
      color: colors[i % colors.length],
      shape: types[i % types.length],
    }));
  }, []);

  return (
    <group ref={groupRef}>
      {shapes.map((shape) => (
        <FloatingShape key={shape.id} {...shape} />
      ))}
    </group>
  );
}

export function HeroBackground() {
  const [isVisible, setIsVisible] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || navigator.maxTouchPoints > 0);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);

    const handleVisibility = () => {
      setIsVisible(!document.hidden);
    };
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      window.removeEventListener("resize", checkMobile);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);

  if (isMobile || !isVisible) return null;

  return (
    <div className="absolute inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        style={{ background: "transparent" }}
        gl={{ alpha: true, antialias: true }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
