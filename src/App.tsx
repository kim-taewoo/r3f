import './App.css'
import { Canvas } from '@react-three/fiber'
import { Home } from './components/Composer'

function App() {
  return (
    <>
      <Canvas
        className="r3f"
        camera={{
          fov: 45,
          near: 0.1,
          far: 200,
          position: [2, 1.3, 4],
        }}
      >
        <Home />
      </Canvas>
    </>
  )
}

export default App
