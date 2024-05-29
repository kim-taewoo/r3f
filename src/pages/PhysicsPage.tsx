import { Canvas } from '@react-three/fiber'
import { PhysicsComponent } from '../components/Physics'
import { useState } from 'react'
import { Perf } from 'r3f-perf'

export function PhysicsPage() {
  const [isDebugMode, setIsDebugMode] = useState(false)

  return (
    <div className="w-full h-full">
      <div className="absolute top-0 right-0 m-4 z-50">
        <button className="p-2 bg-blue-500 text-white rounded-md" onClick={() => setIsDebugMode(!isDebugMode)}>
          {isDebugMode ? 'Debug Mode On' : 'Debug Mode Off'}
        </button>
      </div>
      <Canvas
        shadows
        camera={{
          fov: 45,
          near: 0.1,
          far: 200,
          position: [0, 4, 15],
        }}
      >
        <Perf position="top-left" />
        <PhysicsComponent isDebugMode={isDebugMode} />
      </Canvas>
    </div>
  )
}
