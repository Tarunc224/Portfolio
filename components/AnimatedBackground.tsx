'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Sphere } from '@react-three/drei'
import * as THREE from 'three'

function Particles({ count = 1000 }) {
  const points = useRef()
  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const theta = THREE.MathUtils.randFloatSpread(360)
      const phi = THREE.MathUtils.randFloatSpread(360)
      positions[i * 3] = 10 * Math.sin(theta) * Math.cos(phi)
      positions[i * 3 + 1] = 10 * Math.sin(theta) * Math.sin(phi)
      positions[i * 3 + 2] = 10 * Math.cos(theta)
    }
    return positions
  }, [count])

  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    for (let i = 0; i < count; i++) {
      const x = particlesPosition[i * 3]
      const y = particlesPosition[i * 3 + 1]
      const z = particlesPosition[i * 3 + 2]

      points.current.geometry.attributes.position.array[i * 3] = x + Math.sin(time * 0.1 + x) * 0.1
      points.current.geometry.attributes.position.array[i * 3 + 1] = y + Math.cos(time * 0.1 + y) * 0.1
      points.current.geometry.attributes.position.array[i * 3 + 2] = z + Math.sin(time * 0.1 + z) * 0.1
    }
    points.current.geometry.attributes.position.needsUpdate = true
  })

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particlesPosition.length / 3}
          array={particlesPosition}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.05} color="#8a2be2" sizeAttenuation={true} />
    </points>
  )
}

export default function AnimatedBackground() {
  return (
    <div className="fixed inset-0">
      <Canvas camera={{ position: [0, 0, 15] }}>
        <ambientLight intensity={0.5} />
        <Particles />
        <Sphere args={[1, 16, 16]} position={[0, 0, 0]}>
          <meshBasicMaterial color="#8a2be2" wireframe />
        </Sphere>
        <OrbitControls enableZoom={false} enablePan={false} enableRotate={true} autoRotate autoRotateSpeed={0.5} />
      </Canvas>
    </div>
  )
}

