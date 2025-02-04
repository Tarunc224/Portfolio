"use client"

import { useRef, useEffect } from "react"
import * as THREE from "three"

const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min

export const EnhancedBackground: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!mountRef.current) return

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })

    renderer.setSize(window.innerWidth, window.innerHeight)
    mountRef.current.appendChild(renderer.domElement)

    const particles = new THREE.Group()
    scene.add(particles)

    const particleCount = 300
    const particleGeometry = new THREE.SphereGeometry(0.05, 8, 8)
    const particleMaterial = new THREE.MeshBasicMaterial({ color: 0x8a2be2 })

    for (let i = 0; i < particleCount; i++) {
      const particle = new THREE.Mesh(particleGeometry, particleMaterial)
      particle.position.set(randomInRange(-20, 20), randomInRange(-20, 20), randomInRange(-20, 20))
      particle.userData = {
        velocity: new THREE.Vector3(randomInRange(-0.02, 0.02), randomInRange(-0.02, 0.02), randomInRange(-0.02, 0.02)),
      }
      particles.add(particle)
    }

    // Add floating code snippets
    const snippetCount = 10
    const snippetGeometry = new THREE.PlaneGeometry(2, 1)
    const snippetTexture = new THREE.CanvasTexture(createCodeSnippetTexture())
    const snippetMaterial = new THREE.MeshBasicMaterial({ map: snippetTexture, transparent: true, opacity: 0.7 })

    for (let i = 0; i < snippetCount; i++) {
      const snippet = new THREE.Mesh(snippetGeometry, snippetMaterial)
      snippet.position.set(randomInRange(-15, 15), randomInRange(-15, 15), randomInRange(-10, -5))
      snippet.rotation.z = randomInRange(-0.2, 0.2)
      snippet.userData = {
        velocity: new THREE.Vector3(0, randomInRange(-0.005, 0.005), 0),
      }
      scene.add(snippet)
    }

    camera.position.z = 30

    const animate = () => {
      requestAnimationFrame(animate)

      particles.children.forEach((particle: THREE.Mesh) => {
        particle.position.add(particle.userData.velocity)

        if (particle.position.x < -20 || particle.position.x > 20) particle.userData.velocity.x *= -1
        if (particle.position.y < -20 || particle.position.y > 20) particle.userData.velocity.y *= -1
        if (particle.position.z < -20 || particle.position.z > 20) particle.userData.velocity.z *= -1
      })

      scene.children.forEach((child) => {
        if (child instanceof THREE.Mesh && child.geometry instanceof THREE.PlaneGeometry) {
          child.position.y += child.userData.velocity.y
          if (child.position.y < -15 || child.position.y > 15) child.userData.velocity.y *= -1
        }
      })

      particles.rotation.x += 0.0005
      particles.rotation.y += 0.0005

      renderer.render(scene, camera)
    }

    animate()

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
      mountRef.current?.removeChild(renderer.domElement)
    }
  }, [])

  return <div ref={mountRef} className="fixed inset-0 z-0" />
}

function createCodeSnippetTexture() {
  const canvas = document.createElement("canvas")
  canvas.width = 256
  canvas.height = 128
  const ctx = canvas.getContext("2d")
  if (!ctx) return canvas

  ctx.fillStyle = "rgba(30, 30, 30, 0.7)"
  ctx.fillRect(0, 0, 256, 128)

  ctx.font = "12px monospace"
  ctx.fillStyle = "#00FF00"
  ctx.fillText("function ml() {", 10, 20)
  ctx.fillText("  const model = tf.sequential();", 10, 40)
  ctx.fillText("  model.add(tf.layers.dense({units: 1, inputShape: [1]}));", 10, 60)
  ctx.fillText('  model.compile({loss: "meanSquaredError", optimizer: "sgd"});', 10, 80)
  ctx.fillText("  return model;", 10, 100)
  ctx.fillText("}", 10, 120)

  return canvas
}

