import { OrbitControls, useGLTF } from '@react-three/drei'
import { Perf } from 'r3f-perf'
import { CollisionEnterHandler, CylinderCollider, Physics, RapierRigidBody, RigidBody } from '@react-three/rapier'
import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export function PhysicsComponent() {
  const twisterRef = useRef<RapierRigidBody>(null)
  const jumpableCubeRef = useRef<RapierRigidBody>(null)

  const [hitSound] = useState(() => new Audio('/hit.mp3'))

  useFrame(state => {
    const time = state.clock.getElapsedTime()
    const eulerRotation = new THREE.Euler(0, time * 3, 0)
    const quaternionRotation = new THREE.Quaternion().setFromEuler(eulerRotation)
    twisterRef.current?.setNextKinematicRotation(quaternionRotation)

    const angle = (time * 1) / 2
    const x = Math.cos(angle)
    const z = Math.cos(angle)
    twisterRef.current?.setNextKinematicTranslation({ x, y: -0.8, z })
  })

  const handleCollisionEnter: CollisionEnterHandler = _event => {
    // console.log('Collision enter:', event)
    hitSound.currentTime = 0
    hitSound.volume = Math.random()
    hitSound.play()
  }

  function jumpCube() {
    jumpableCubeRef.current?.applyImpulse({ x: 0, y: 5, z: 0 }, true)
    jumpableCubeRef.current?.applyTorqueImpulse(
      {
        x: Math.random() - 0.5,
        y: Math.random() - 0.5,
        z: Math.random() - 0.5,
      },
      true,
    )
  }

  const hamburger = useGLTF('/hamburger.glb')

  return (
    <>
      <Perf position="top-left" />

      <OrbitControls makeDefault />

      <directionalLight castShadow position={[1, 2, 3]} intensity={4.5} />
      <ambientLight intensity={1.5} />

      <Physics debug>
        <RigidBody colliders="ball">
          <mesh castShadow position={[-3.2, 3.3, 0]}>
            <sphereGeometry />
            <meshStandardMaterial color="orange" />
          </mesh>
        </RigidBody>

        <RigidBody colliders="trimesh">
          <mesh castShadow position={[-3.2, 1, 0]} rotation={[Math.PI * 0.5, 0, 0]}>
            <torusGeometry args={[1, 0.5, 16, 32]} />
            <meshStandardMaterial color="mediumpurple" />
          </mesh>
        </RigidBody>

        <RigidBody
          onSleep={() => console.log('sleep')}
          onWake={() => console.log('wake')}
          onCollisionEnter={handleCollisionEnter}
          ref={jumpableCubeRef}
          colliders="cuboid"
        >
          <mesh onPointerDown={jumpCube} castShadow position={[2.5, 2.5, 0]}>
            <boxGeometry />
            <meshStandardMaterial color="lightblue" />
          </mesh>
        </RigidBody>

        <RigidBody ref={twisterRef} position={[0, -0.8, 0]} friction={0} type="kinematicPosition">
          <mesh castShadow scale={[0.4, 0.4, 3]}>
            <boxGeometry />
            <meshStandardMaterial color="lightcoral" />
          </mesh>
        </RigidBody>

        <RigidBody type="fixed" colliders={false}>
          <CylinderCollider position={[0, -1.25, 0]} args={[0.25, 5]} />
          <mesh receiveShadow position-y={-1.25}>
            {/* <boxGeometry args={[10, 0.5, 10]} /> */}
            <cylinderGeometry args={[5, 5, 0.5, 32]} />
            <meshStandardMaterial color="greenyellow" />
          </mesh>
        </RigidBody>
        <RigidBody colliders={false} position={[0, 4, 0]}>
          <primitive object={hamburger.scene} scale={0.25} />
          <CylinderCollider args={[0.5, 1.25]} />
        </RigidBody>
      </Physics>
    </>
  )
}
