import './App.css'
import { Canvas } from '@react-three/fiber'
import { Home } from './components/Home'

function App() {
  return (
    <>
      <Canvas
        camera={{
          fov: 45,
          near: 0.1,
          far: 200,
          position: [4, 2, 6],
        }}
      >
        <Home />
      </Canvas>
    </>
  )
}

export default App
