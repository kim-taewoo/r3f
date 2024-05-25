import { OrbitControls } from '@react-three/drei'
import { Perf } from 'r3f-perf'
import { Physics, RapierRigidBody, RigidBody } from '@react-three/rapier'
import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export function PhysicsComponent() {
  const twisterRef = useRef<RapierRigidBody>(null)
  const jumpableCubeRef = useRef<RapierRigidBody>(null)
  useFrame(state => {
    const time = state.clock.getElapsedTime()
    const eulerRotation = new THREE.Euler(0, time * 3, 0)
    const quaternionRotation = new THREE.Quaternion().setFromEuler(eulerRotation)
    twisterRef.current?.setNextKinematicRotation(quaternionRotation)
  })

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

  return (
    <>
      <Perf position="top-left" />

      <OrbitControls makeDefault />

      <directionalLight castShadow position={[1, 2, 3]} intensity={4.5} />
      <ambientLight intensity={1.5} />

      <Physics debug>
        <RigidBody colliders="ball">
          <mesh castShadow position={[-3, 3.3, 0]}>
            <sphereGeometry />
            <meshStandardMaterial color="orange" />
          </mesh>
        </RigidBody>

        <RigidBody colliders="trimesh">
          <mesh castShadow position={[-3, 1, 0]} rotation={[Math.PI * 0.5, 0, 0]}>
            <torusGeometry args={[1, 0.5, 16, 32]} />
            <meshStandardMaterial color="mediumpurple" />
          </mesh>
        </RigidBody>

        <RigidBody ref={jumpableCubeRef} colliders="cuboid">
          <mesh onPointerDown={jumpCube} castShadow position={[3, 2.5, 0]}>
            <boxGeometry />
            <meshStandardMaterial color="lightblue" />
          </mesh>
        </RigidBody>

        <RigidBody ref={twisterRef} position={[0, -0.8, 0]} friction={0} type="kinematicPosition">
          <mesh castShadow scale={[0.4, 0.4, 10]}>
            <boxGeometry />
            <meshStandardMaterial color="lightcoral" />
          </mesh>
        </RigidBody>

        <RigidBody type="fixed">
          <mesh receiveShadow position-y={-1.25}>
            <boxGeometry args={[10, 0.5, 10]} />
            <meshStandardMaterial color="greenyellow" />
          </mesh>
        </RigidBody>
      </Physics>
    </>
  )
}
