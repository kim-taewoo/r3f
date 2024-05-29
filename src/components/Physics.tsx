import { OrbitControls, useGLTF } from '@react-three/drei'
import {
  CollisionEnterHandler,
  CuboidCollider,
  CylinderCollider,
  InstancedRigidBodies,
  InstancedRigidBodyProps,
  Physics,
  RapierRigidBody,
  RigidBody,
} from '@react-three/rapier'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export function PhysicsComponent({ isDebugMode }: { isDebugMode: boolean }) {
  const twisterRef = useRef<RapierRigidBody>(null)
  const jumpableCubeRef = useRef<RapierRigidBody>(null)

  const [hitSound] = useState(() => new Audio('/hit.mp3'))

  const cubesCount = 300

  const instances = useMemo(() => {
    const objects: InstancedRigidBodyProps[] = []
    for (let i = 0; i < cubesCount; i++) {
      objects.push({
        key: `instance_${i}`,
        position: [(Math.random() - 0.5) * 6, 6 + i * 0.2, (Math.random() - 0.5) * 6],
        rotation: [Math.random(), Math.random(), Math.random()],
        scale: [0.6, 0.6, 0.6],
      })
    }
    return objects
  }, [cubesCount])

  const cubesRef = useRef<THREE.InstancedMesh>(null)

  useEffect(() => {
    for (let index = 0; index < cubesCount; index++) {
      const matrix = new THREE.Matrix4()
      // matrix 에는 position, rotation, scale 이 모두 들어간다.
      // matrix 는 vertices 를 어떻게 변환할지에 대한 정보를 담고 있다.
      // three js 가 렌더 직전에 이걸 계산해 적용한 뒤 shader 에 넘긴다.
      matrix.compose(new THREE.Vector3(index * 2, 0, 0), new THREE.Quaternion(), new THREE.Vector3(1, 1, 1))
      cubesRef.current?.setMatrixAt(index, matrix)
    }
  }, [])

  useFrame(state => {
    const time = state.clock.getElapsedTime()
    const eulerRotation = new THREE.Euler(0, time * 3, 0)
    const quaternionRotation = new THREE.Quaternion().setFromEuler(eulerRotation)
    twisterRef.current?.setNextKinematicRotation(quaternionRotation)

    const angle = time * (1 / 2)
    const x = Math.cos(angle) * 0.5
    const z = Math.sin(angle) * 0.5
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
        x: (Math.random() - 0.5) * 8,
        y: (Math.random() - 0.5) * 8,
        z: (Math.random() - 0.5) * 8,
      },
      true,
    )
  }

  const hamburger = useGLTF('/hamburger.glb')

  return (
    <>
      <OrbitControls makeDefault />

      <directionalLight castShadow position={[1, 2, 3]} intensity={4.5} />
      <ambientLight intensity={1.5} />

      <Physics debug={isDebugMode}>
        <RigidBody restitution={0.9} colliders="ball">
          <mesh castShadow position={[-3.5, 3, 0]}>
            <sphereGeometry />
            <meshStandardMaterial color="orange" />
          </mesh>
        </RigidBody>

        {/* trimesh collider 는 동적인 rigidBody 에 적용하면 이상한 에러가 많다. */}
        <RigidBody type="fixed" colliders="trimesh">
          <mesh castShadow position={[-3.5, -0.5, 0]} rotation={[Math.PI * 0.5, 0, 0]}>
            <torusGeometry args={[1, 0.5, 16, 32]} />
            <meshStandardMaterial color="mediumpurple" />
          </mesh>
        </RigidBody>

        <RigidBody
          onSleep={() => console.log('sleep')}
          onWake={() => console.log('wake')}
          ref={jumpableCubeRef}
          colliders="cuboid"
        >
          <mesh onPointerDown={jumpCube} castShadow position={[2.5, 2.5, 0]}>
            <boxGeometry />
            <meshStandardMaterial color="lightblue" />
          </mesh>
        </RigidBody>

        <RigidBody
          onCollisionEnter={handleCollisionEnter}
          ref={twisterRef}
          position={[0, -0.8, 0]}
          friction={0}
          type="kinematicPosition"
        >
          <mesh castShadow scale={[0.4, 0.4, 3]}>
            <boxGeometry />
            <meshStandardMaterial color="lightcoral" />
          </mesh>
        </RigidBody>

        <RigidBody colliders={false} position={[0, 4, 0]}>
          <primitive object={hamburger.scene} scale={0.25} />
          <CylinderCollider args={[0.5, 1.25]} />
        </RigidBody>

        <RigidBody type="fixed" colliders={false}>
          <CylinderCollider position={[0, -1.24, 0]} args={[0.24, 5]} />
          <mesh receiveShadow position-y={-1.25}>
            {/* <boxGeometry args={[10, 0.5, 10]} /> */}
            <cylinderGeometry args={[5, 5, 0.5, 32]} />
            <meshStandardMaterial color="greenyellow" />
          </mesh>
        </RigidBody>

        <RigidBody type="fixed">
          <CuboidCollider args={[5, 2, 0.5]} position={[0, 1, 5.5]} />
          <CuboidCollider args={[5, 2, 0.5]} position={[0, 1, -5.5]} />
          <CuboidCollider args={[0.5, 2, 5]} position={[5.5, 1, 0]} />
          <CuboidCollider args={[0.5, 2, 5]} position={[-5.5, 1, 0]} />
        </RigidBody>

        {/* instanceMesh 를 쓰는 이유. `One Draw Call` 에 모든 것을 한 번에 그리기 때문. 10개든 100개든 한 번의 draw call 만 사용 */}
        {/* instanceMesh 는 굳이 Physics 에 있을 필요는 없다. */}
        {/* geometry, material 을 Null 로 우선주고 children 에서 구현 */}
        <InstancedRigidBodies instances={instances}>
          <instancedMesh castShadow ref={cubesRef} args={[undefined, undefined, cubesCount]}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color="lightgreen" />
          </instancedMesh>
        </InstancedRigidBodies>
      </Physics>
    </>
  )
}
