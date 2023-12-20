import { OrbitControls } from '@react-three/drei'
import { Perf } from 'r3f-perf'
import { Composer } from '../effects/Composer'
import { DoubleSide } from 'three'
// import { GlitchMode, BlendFunction } from 'postprocessing'

export function Home() {
  return (
    <>
      <color args={['#000000']} attach="background" />

      {/* <Perf position="top-left" /> */}
      <OrbitControls makeDefault />

      {/* Lights */}
      <directionalLight castShadow position={[1, 2, 3]} intensity={4.5} />
      <ambientLight intensity={1.5} />

      {/* Effects */}
      <Composer />

      <mesh castShadow position-x={-2}>
        <sphereGeometry />
        <meshStandardMaterial color="orange" />
      </mesh>

      <mesh castShadow position-x={2} position-y={-0.49}>
        <boxGeometry />
        <meshStandardMaterial color="mediumpurple" />
      </mesh>

      <mesh receiveShadow position-y={-1}>
        <boxGeometry args={[10, 0.5, 10]} />
        <meshStandardMaterial color="white" emissive="white" emissiveIntensity={0.5} />
      </mesh>
    </>
  )
}
