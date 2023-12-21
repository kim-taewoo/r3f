import { ContactShadows, Float, OrbitControls, PresentationControls, RoundedBox, Text } from '@react-three/drei'
// import { Perf } from 'r3f-perf'
import { Composer } from '../effects/Composer'
// import { GlitchMode, BlendFunction } from 'postprocessing'

export function Home() {
  return (
    <>
      <color args={['#ffffff']} attach="background" />
      {/* <fog attach="fog" color="lightgrey" near={13} far={100} /> */}

      {/* <Perf position="top-left" /> */}
      {/* <OrbitControls makeDefault /> */}

      {/* Lights */}
      <directionalLight castShadow position={[1, 2, 3]} intensity={8} />
      <ambientLight intensity={15} />

      {/* Effects */}
      <Composer />

      {/* <Snow /> */}

      {/* <mesh castShadow position-x={-2}>
        <sphereGeometry />
        <meshStandardMaterial color="orange" />
      </mesh>

      <mesh castShadow position-x={2} position-y={-0.49}>
        <boxGeometry />
        <meshStandardMaterial color="mediumpurple" />
      </mesh> */}

      {/* <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial color="lightgrey" />
      </mesh> */}

      <PresentationControls
        global
        // rotation={[0.13, 0.1, 0]}
        // polar={[-0.4, 0.2]}
        // azimuth={[-1, 0.75]}
        // config={{ mass: 2, tension: 400 }}
        // snap={{ mass: 4, tension: 400 }}
      >
        <Float rotationIntensity={1}>
          <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
            {/* <boxGeometry /> */}
            <cylinderGeometry args={[1, 1, 0.15, 50]} />

            <meshStandardMaterial color="#FCC201" roughness={10} metalness={1} />
          </mesh>

          <Text
            receiveShadow
            // font="./bangers-v20-latin-regular.woff"
            fontSize={0.3}
            position={[0, 0, 0.08]}
            // rotation-y={-1.25}
            maxWidth={1.3}
            color={'#FCC201'}
          >
            2023 TAEWOO AWARDS
          </Text>
        </Float>
      </PresentationControls>

      <ContactShadows position-y={-1.4} opacity={0.4} scale={5} blur={2.4} />

      {/* <RoundedBox position-y={-1.3} receiveShadow args={[10, 0.6, 10]} radius={0.2}>
        <meshStandardMaterial color="gold" emissive="gold" emissiveIntensity={0.2} />
      </RoundedBox> */}
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
