import { Canvas } from '@react-three/fiber'
import { PhysicsComponent } from '../components/Physics'

export function PhysicsPage() {
  return (
    <>
      <Canvas
        shadows
        camera={{
          fov: 45,
          near: 0.1,
          far: 200,
          position: [0, 4, 15],
        }}
      >
        <PhysicsComponent />
      </Canvas>
    </>
  )
}
