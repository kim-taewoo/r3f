import { OrbitControls, RoundedBox } from '@react-three/drei'
// import { Perf } from 'r3f-perf'
import { Composer } from '../effects/Composer'
import { Snow } from './Snow'
// import { GlitchMode, BlendFunction } from 'postprocessing'

export function Home() {
  return (
    <>
      <color args={['#000000']} attach="background" />
      {/* <fog attach="fog" color="lightgrey" near={13} far={100} /> */}

      {/* <Perf position="top-left" /> */}
      <OrbitControls makeDefault />

      {/* Lights */}
      <directionalLight castShadow position={[1, 2, 3]} intensity={4.5} />
      <ambientLight intensity={1.5} />

      {/* Effects */}
      <Composer />

      {/* <Snow /> */}

      <mesh castShadow position-x={-2}>
        <sphereGeometry />
        <meshStandardMaterial color="orange" />
      </mesh>

      <mesh castShadow position-x={2} position-y={-0.49}>
        <boxGeometry />
        <meshStandardMaterial color="mediumpurple" />
      </mesh>

      <RoundedBox position-y={-1.3} receiveShadow args={[10, 0.6, 10]} radius={0.2}>
        <meshStandardMaterial color="white" emissive="white" emissiveIntensity={1} />
      </RoundedBox>
      {/* <mesh receiveShadow position-y={-1}>
        <boxGeometry args={[10, 0.3, 10]} />
        <meshStandardMaterial color="white" emissive="white" emissiveIntensity={0.5} />
      </mesh> */}
      {/* <mesh receiveShadow position-y={-1.4}>
        <boxGeometry args={[10, 0.5, 10]} />
        <meshStandardMaterial color="lightgrey" />
      </mesh> */}
    </>
  )
}
